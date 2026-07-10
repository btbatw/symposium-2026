#!/usr/bin/env python3
"""
precrop_headshots.py

Batch-normalizes a folder of mixed headshots into consistent 500x500 (or any
size) squares with similar face framing, ready for a final touch-up pass in
Photoshop (Generative Fill on any still-visible seams).

Pipeline per image:
  1. Load (any format Pillow supports: jpg, png, tiff, bmp, webp, heic*, etc.)
  2. Detect the most prominent face with YuNet (a small DNN detector, cv2's
     FaceDetectorYN). It returns the face box AND eye landmarks, and is far
     more robust than Haar to pose/expression/scale. The ~230KB model is
     downloaded and cached under ./models on first run. If it can't be loaded
     (e.g. offline first run), detection falls back to bundled Haar cascades
     (no eye landmarks — see step 4).
  3. Compute a square crop box: the face-box height sets the zoom
     (--face-ratio), and the EYE LINE is anchored at a fixed vertical
     position (--vertical-pos), so eye level is consistent across the whole
     batch regardless of how each person is framed in their source photo.
     (Haar fallback has no eyes, so it anchors on the face box + a flat
     head-pad estimate instead — less precise vertical framing.)
  4. If that box extends past the original image edges, fill a canvas of
     the box size with the detected background color, paste the real
     pixels at the correct offset, and feather-blend a strip along
     whichever sides were actually extended (usually left/right) so the
     seam isn't hard. Everything else is real cropped image.
  5. Resize the result to --size x --size at --dpi and save.
  6. Log every file to manifest.csv: face_detected, detect_method
     (yunet/haar), extended_canvas, bg_color_used, original_dims,
     crop_box — so you know which ones need a look.

Files with no detected face fall back to a center square crop and are
flagged in the manifest for manual review (they still get resized/saved so
nothing is skipped).

*HEIC needs pillow-heif installed separately; not included by default.

USAGE
  python precrop_headshots.py INPUT_DIR OUTPUT_DIR
  python precrop_headshots.py INPUT_DIR OUTPUT_DIR --size 500 --dpi 72 \
      --face-ratio 0.45 --vertical-pos 0.42 --feather-px 24

Auto background-color matching can be overridden with a fixed fill via
--canvas-color R,G,B if you'd rather force one color across the whole batch.

Even with color-matching + feathering, run a final eyeball pass in
Photoshop / Image Processor — this gets most extended images close enough
that Generative Fill (or nothing at all) is a quick finish, not a rebuild.
"""

import argparse
import csv
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

SUPPORTED_EXT = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".bmp", ".webp"}

# Haar cascades ship with opencv-python — no download required. We run several
# frontal cascades and pool their detections: no single Haar cascade is reliable
# across pose/lighting/glasses, but they fail on different images, so the union
# catches faces any one of them would miss (e.g. a subject looking upward).
# "alt2"/"alt" tend to be more robust than "default", so they lead.
_CASCADE_FILES = [
    "haarcascade_frontalface_alt2.xml",
    "haarcascade_frontalface_default.xml",
    "haarcascade_frontalface_alt.xml",
]
_face_detectors = [
    cv2.CascadeClassifier(cv2.data.haarcascades + f) for f in _CASCADE_FILES
]


def detect_largest_face(bgr_img):
    """Returns (x, y, w, h) of the largest detected face, or None.

    Runs on the plain grayscale (equalizeHist was found to *hurt* detection on
    these studio headshots) and floors face size at a fraction of the image so
    spurious tiny sub-detections can't outrank — or stand in for — the real
    face. Pools detections from several cascades and picks the largest.
    """
    gray = cv2.cvtColor(bgr_img, cv2.COLOR_BGR2GRAY)
    h, w = gray.shape[:2]
    # A real headshot face is a big chunk of the frame; anything under ~12% of
    # the smaller side is almost certainly a false positive (an eye, a fold).
    min_side = max(60, int(min(w, h) * 0.12))
    faces = []
    for det in _face_detectors:
        found = det.detectMultiScale(
            gray, scaleFactor=1.1, minNeighbors=5, minSize=(min_side, min_side)
        )
        faces.extend(found)
    if not faces:
        return None
    # pick largest by area
    return max(faces, key=lambda f: f[2] * f[3])


# --- YuNet DNN detector (primary) -------------------------------------------
# YuNet is far more robust than Haar across pose/expression/scale AND returns
# facial landmarks, letting us anchor the crop on the true eye line (consistent
# eye level across the batch) instead of guessing from the face box. It needs a
# ~230KB ONNX model that does not ship with opencv-python; we fetch it once and
# cache it next to this script. If it can't be loaded (e.g. offline first run),
# detection falls back to the pooled Haar cascades above.
_YUNET_URL = (
    "https://github.com/opencv/opencv_zoo/raw/main/models/"
    "face_detection_yunet/face_detection_yunet_2023mar.onnx"
)
_YUNET_PATH = Path(__file__).resolve().parent / "models" / _YUNET_URL.rsplit("/", 1)[1]
_yunet = None            # cached cv2.FaceDetectorYN, created lazily
_yunet_tried = False     # so we only attempt (and warn about) loading once


def _load_yunet():
    """Returns a cv2.FaceDetectorYN, downloading+caching the model if needed,
    or None if the model can't be obtained/loaded (caller falls back to Haar)."""
    global _yunet, _yunet_tried
    if _yunet is not None or _yunet_tried:
        return _yunet
    _yunet_tried = True
    if not hasattr(cv2, "FaceDetectorYN"):
        print("NOTE: OpenCV lacks FaceDetectorYN; using Haar fallback.", file=sys.stderr)
        return None
    try:
        if not _YUNET_PATH.exists():
            import urllib.request
            _YUNET_PATH.parent.mkdir(parents=True, exist_ok=True)
            print(f"Downloading YuNet face model -> {_YUNET_PATH} ...", file=sys.stderr)
            urllib.request.urlretrieve(_YUNET_URL, _YUNET_PATH)
        # input size is set per-image before each detect() call
        _yunet = cv2.FaceDetectorYN.create(
            str(_YUNET_PATH), "", (320, 320), 0.6, 0.3, 5000
        )
    except Exception as e:
        print(f"NOTE: could not load YuNet ({e}); using Haar fallback.", file=sys.stderr)
        _yunet = None
    return _yunet


def detect_face(bgr_img, max_side=1024):
    """Detects the most prominent face and (when possible) its eye positions.

    Returns (face_box, eyes, method):
      face_box = (x, y, w, h) in original-image pixels
      eyes     = (eye_x, eye_y) midpoint of the two eyes, or None
      method   = "yunet" | "haar" | None (None => no face found)

    Prefers YuNet (gives eyes); falls back to the pooled Haar cascades (no eyes)
    if the model is unavailable. Large images are downscaled for detection speed
    and the coordinates mapped back to full resolution.
    """
    det = _load_yunet()
    if det is not None:
        H, W = bgr_img.shape[:2]
        scale = max_side / max(H, W) if max(H, W) > max_side else 1.0
        img = cv2.resize(bgr_img, (round(W * scale), round(H * scale))) if scale != 1.0 else bgr_img
        det.setInputSize((img.shape[1], img.shape[0]))
        _, faces = det.detect(img)
        if faces is not None and len(faces):
            f = max(faces, key=lambda r: r[2] * r[3])
            x, y, w, h = (f[:4] / scale)
            # landmark order: right-eye, left-eye, nose, right-mouth, left-mouth
            eye_x = (f[4] + f[6]) / 2 / scale
            eye_y = (f[5] + f[7]) / 2 / scale
            return (x, y, w, h), (eye_x, eye_y), "yunet"
        return None, None, None

    face_box = detect_largest_face(bgr_img)
    if face_box is None:
        return None, None, None
    return tuple(int(v) for v in face_box), None, "haar"


def detect_background_color(pil_img, border_frac=0.04):
    """
    Estimates the source image's background color by sampling a thin ring
    around its outer edge (where headshot backdrops typically live, clear
    of the face) and taking the per-channel median — robust to a stray
    hair strand or shadow poking into the sample without being thrown off
    by gradients the way a simple corner-pixel read would be.
    """
    arr = np.array(pil_img)
    h, w = arr.shape[:2]
    bw = max(2, int(w * border_frac))
    bh = max(2, int(h * border_frac))
    strips = [
        arr[:bh, :].reshape(-1, 3),
        arr[-bh:, :].reshape(-1, 3),
        arr[:, :bw].reshape(-1, 3),
        arr[:, -bw:].reshape(-1, 3),
    ]
    border_pixels = np.concatenate(strips, axis=0)
    med = np.median(border_pixels, axis=0)
    return tuple(int(v) for v in med)


def estimate_head_top(pil_img, face_box, bg_color, bg_noise_thresh=18,
                       color_dist_thresh=32, min_bg_run=4, max_search_mult=2.5):
    """
    Measures where the actual head/hair stops (not just the Haar face box),
    by scanning upward from the top of the face box within a narrow column
    band centered on the face, and finding where the pixels stop looking
    like "not background" and start matching bg_color.

    Only trustworthy when the backdrop is reasonably flat — checked via
    bg_noise_thresh against the border-color sample's own variance. When
    it's not (busy/textured background) or the scan hits a degenerate
    result, falls back to a flat 1.2x pad on the face-box height, same as
    before.

    Returns (head_top_y, method) where method is "measured" or "fallback".
    """
    fx, fy, fw, fh = face_box
    img_arr = np.array(pil_img).astype(np.float32)
    img_h, img_w = img_arr.shape[:2]
    bg = np.array(bg_color, dtype=np.float32)
    
    def fallback():
        return max(0, round(fy - fh * 0.2)), "fallback"

    return fallback()
    # bail out early if the background doesn't look flat enough to trust
    bh = max(2, int(img_h * 0.04))
    bw = max(2, int(img_w * 0.04))
    border_pixels = np.concatenate([
        img_arr[:bh, :].reshape(-1, 3),
        img_arr[-bh:, :].reshape(-1, 3),
        img_arr[:, :bw].reshape(-1, 3),
        img_arr[:, -bw:].reshape(-1, 3),
    ], axis=0)
    if np.std(border_pixels) > bg_noise_thresh * 3:  # crude "busy background" check
        return fallback()

    band_half = max(4, int(fw * 0.3))
    face_cx = int(fx + fw / 2)
    col_lo = max(0, face_cx - band_half)
    col_hi = min(img_w, face_cx + band_half)
    if col_hi <= col_lo:
        return fallback()

    max_search = min(int(fy), int(fh * max_search_mult))
    if max_search < 2:
        return fallback()

    bg_run = 0
    head_top = max(0, fy - max_search)  # default if we scan all the way without finding bg
    for row in range(int(fy), int(fy) - max_search, -1):
        if row < 0:
            head_top = 0
            break
        band = img_arr[row, col_lo:col_hi]
        dist = np.linalg.norm(band.mean(axis=0) - bg)
        if dist < color_dist_thresh:
            bg_run += 1
            if bg_run >= min_bg_run:
                head_top = row + min_bg_run  # step back to just above the real head
                break
        else:
            bg_run = 0

    head_h = fy + fh - head_top
    # sanity clamp: reject implausible results (shorter than the face box
    # itself, or absurdly tall) rather than trust a noisy read
    if head_h < fh * 0.9 or head_h > fh * 3.0:
        return fallback()

    return head_top, "measured"


def compute_crop_box(face_box, head_top_y, face_ratio, vertical_pos):
    """
    face_box: (x, y, w, h) from Haar detector (roughly forehead-to-chin).
    head_top_y: measured or estimated top of head/hair, in image pixels.
    Returns (left, top, right, bottom) — a square box in original-image
    pixel coordinates, NOT clamped to image bounds.
    """
    fx, fy, fw, fh = face_box
    face_cx = fx + fw / 2
    chin_y = fy + fh
    head_cy = (head_top_y + chin_y) / 2
    approx_head_h = chin_y - head_top_y

    canvas_size = approx_head_h / face_ratio
    left = face_cx - canvas_size / 2
    top = head_cy - canvas_size * vertical_pos
    right = left + canvas_size
    bottom = top + canvas_size
    return left, top, right, bottom


def compute_crop_box_eyes(face_box, eye_x, eye_y, face_ratio, vertical_pos):
    """Eye-anchored crop box (used when a landmark detector gives us eyes).

    face_box: (x, y, w, h) tight face box (YuNet, ~brow-to-chin).
    eye_x, eye_y: midpoint of the two eyes, in image pixels.

    The face box sets the *scale* (its height is `face_ratio` of the output) and
    the eyes set both the horizontal center and the vertical anchor, so the eye
    line lands at `vertical_pos` of the output for every image — giving
    consistent eye level regardless of expression/pose/box quirks.

    Returns (left, top, right, bottom), NOT clamped to image bounds.
    """
    _, _, _, fh = face_box
    canvas_size = fh / face_ratio
    left = eye_x - canvas_size / 2
    top = eye_y - canvas_size * vertical_pos
    return left, top, left + canvas_size, top + canvas_size


def build_output_canvas(pil_img, crop_box, out_size, feather_px=24,
                         border_frac=0.04, fixed_color=None):
    """
    Crops pil_img to crop_box. If crop_box exceeds the image bounds:
      - estimates the source's background color (or uses fixed_color if
        given)
      - builds a canvas of crop_box size filled with that color
      - pastes the real image data at the right offset
      - feather-blends a strip along whichever sides were actually
        extended, so the seam between real pixels and fill fades instead
        of cutting hard

    feather_px is specified in OUTPUT (out_size) pixels and converted to the
    original image's resolution here, so the seam blend looks the same in the
    final image regardless of how big or small the source photo was.

    Returns (result_image, extended: bool, bg_color_used: tuple | None).
    """
    img_w, img_h = pil_img.size
    left, top, right, _bottom = crop_box
    box_size = round(right - left)

    # Derive the crop rectangle from a single integer origin + box_size so the
    # geometry stays internally consistent. Rounding left/top/right/bottom
    # independently can make (right-left) differ from box_size by a pixel,
    # which then overflows the paste slice ("could not broadcast ..." errors).
    ileft = round(left)
    itop = round(top)
    iright = ileft + box_size
    ibottom = itop + box_size

    left_ext = ileft < 0
    top_ext = itop < 0
    right_ext = iright > img_w
    bottom_ext = ibottom > img_h
    needs_extension = left_ext or top_ext or right_ext or bottom_ext

    if not needs_extension:
        crop = pil_img.crop((ileft, itop, iright, ibottom))
        return crop, False, None

    bg_color = fixed_color if fixed_color is not None else detect_background_color(pil_img, border_frac)

    # overlap between crop box and actual image, in image coords
    src_left = max(0, ileft)
    src_top = max(0, itop)
    src_right = min(img_w, iright)
    src_bottom = min(img_h, ibottom)
    region_w = max(0, src_right - src_left)
    region_h = max(0, src_bottom - src_top)
    paste_x = src_left - ileft
    paste_y = src_top - itop

    fill_layer = np.full((box_size, box_size, 3), bg_color, dtype=np.float32)

    if region_w == 0 or region_h == 0:
        # nothing overlaps at all (degenerate case) — just return flat fill
        return Image.fromarray(fill_layer.astype(np.uint8)), True, bg_color

    region_arr = np.array(pil_img.crop((src_left, src_top, src_right, src_bottom))).astype(np.float32)

    paste_layer = fill_layer.copy()
    paste_layer[paste_y:paste_y + region_h, paste_x:paste_x + region_w] = region_arr

    # build a blend mask: 1.0 = use real pixel, 0.0 = use fill color,
    # ramping over feather_px only on sides that were actually extended.
    # feather_px is an output-resolution unit; scale it to this image's
    # resolution so the ramp is a consistent width in the final resized output.
    feather_px_src = max(1, round(feather_px * box_size / out_size))
    fpx_x = min(feather_px_src, region_w // 3) if region_w > 0 else 0
    fpx_y = min(feather_px_src, region_h // 3) if region_h > 0 else 0

    x_ramp = np.ones(region_w, dtype=np.float32)
    if left_ext and fpx_x > 0:
        x_ramp[:fpx_x] = np.linspace(0.0, 1.0, fpx_x, dtype=np.float32)
    if right_ext and fpx_x > 0:
        x_ramp[-fpx_x:] = np.linspace(1.0, 0.0, fpx_x, dtype=np.float32)

    y_ramp = np.ones(region_h, dtype=np.float32)
    if top_ext and fpx_y > 0:
        y_ramp[:fpx_y] = np.linspace(0.0, 1.0, fpx_y, dtype=np.float32)
    if bottom_ext and fpx_y > 0:
        y_ramp[-fpx_y:] = np.linspace(1.0, 0.0, fpx_y, dtype=np.float32)

    local_mask = np.outer(y_ramp, x_ramp)  # (region_h, region_w)
    mask = np.zeros((box_size, box_size), dtype=np.float32)
    mask[paste_y:paste_y + region_h, paste_x:paste_x + region_w] = local_mask
    mask = mask[:, :, None]  # broadcast over RGB

    composite = mask * paste_layer + (1 - mask) * fill_layer
    composite = np.clip(composite, 0, 255).astype(np.uint8)

    return Image.fromarray(composite), True, bg_color


def center_square_crop(pil_img):
    w, h = pil_img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    return pil_img.crop((left, top, left + side, top + side))


def process_image(path, out_path, size, dpi, face_ratio, vertical_pos,
                   feather_px, border_frac, fixed_color, quality):
    pil_img = Image.open(path)
    pil_img = pil_img.convert("RGB")
    img_w, img_h = pil_img.size

    bgr = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
    face_box, eyes, method = detect_face(bgr)

    if face_box is None:
        result = center_square_crop(pil_img)
        extended = False
        detected = False
        bg_color = None
        crop_box_str = "n/a (center crop fallback)"
    else:
        if eyes is not None:
            # eye-anchored (YuNet): consistent eye level across the batch
            crop_box = compute_crop_box_eyes(
                face_box, eyes[0], eyes[1], face_ratio, vertical_pos
            )
        else:
            # Haar fallback (no landmarks): anchor on the face box as before
            border_bg_color = detect_background_color(pil_img, border_frac)
            head_top_y, _ = estimate_head_top(pil_img, face_box, border_bg_color)
            crop_box = compute_crop_box(face_box, head_top_y, face_ratio, vertical_pos)
        result, extended, bg_color = build_output_canvas(
            pil_img, crop_box, size, feather_px, border_frac, fixed_color
        )
        detected = True
        crop_box_str = ",".join(str(round(v)) for v in crop_box)

    result = result.resize((size, size), Image.LANCZOS)

    # Per-format save options. JPEG/WebP get the lossy quality setting; PNG
    # can't hold JPEG compression (lossless format) so it just gets optimized.
    save_kwargs = {"dpi": (dpi, dpi)}
    ext = out_path.suffix.lower()
    if ext in (".jpg", ".jpeg"):
        save_kwargs["quality"] = quality
        save_kwargs["optimize"] = True
    elif ext == ".webp":
        save_kwargs["quality"] = quality
    elif ext == ".png":
        save_kwargs["optimize"] = True
    result.save(out_path, **save_kwargs)

    return {
        "filename": path.name,
        "face_detected": detected,
        "detect_method": method if method is not None else "",
        "extended_canvas": extended,
        "bg_color_used": bg_color if bg_color is not None else "",
        "original_size": f"{img_w}x{img_h}",
        "crop_box": crop_box_str,
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("input_dir", type=Path)
    ap.add_argument("output_dir", type=Path)
    ap.add_argument("--size", type=int, default=500, help="output square size in px (default 500)")
    ap.add_argument("--dpi", type=int, default=72, help="output dpi (default 72)")
    ap.add_argument("--face-ratio", type=float, default=0.45,
                     help="detected face-box height (brow-to-chin, tight) as a fraction of "
                          "output size — controls zoom (default 0.45). NOTE: the YuNet box is "
                          "tighter than the old Haar box, so a given value zooms in more than "
                          "before; raise it for a wider crop.")
    ap.add_argument("--vertical-pos", type=float, default=0.42,
                     help="fraction from top where the EYE LINE sits (default 0.42); with "
                          "landmark detection this fixes eye level consistently across images. "
                          "Falls back to face-center placement only when Haar is used.")
    ap.add_argument("--canvas-color", type=str, default=None,
                     help="R,G,B to force a fixed fill color for all extended borders "
                          "(default: auto-detect each image's own background color)")
    ap.add_argument("--feather-px", type=int, default=24,
                     help="width in px (at OUTPUT --size resolution) of the seam blend "
                          "on extended sides; scaled to each source image's resolution "
                          "internally so the blend looks consistent regardless of input "
                          "size (default 24)")
    ap.add_argument("--border-sample-frac", type=float, default=0.04,
                     help="fraction of image width/height sampled as the background-color "
                          "border ring (default 0.04)")
    ap.add_argument("--format", type=str, default=None,
                     help="force output extension, e.g. jpg or png (default: keep source extension)")
    ap.add_argument("--quality", type=int, default=85,
                     help="lossy compression quality (1-95) for JPEG/WebP outputs; "
                          "ignored for PNG, which is lossless but always optimized (default 85)")
    args = ap.parse_args()

    fixed_color = tuple(int(v) for v in args.canvas_color.split(",")) if args.canvas_color else None
    args.output_dir.mkdir(parents=True, exist_ok=True)

    files = sorted(
        p for p in args.input_dir.iterdir()
        if p.is_file() and p.suffix.lower() in SUPPORTED_EXT
    )
    if not files:
        print(f"No supported images found in {args.input_dir}", file=sys.stderr)
        sys.exit(1)

    manifest_rows = []
    for path in files:
        ext = f".{args.format}" if args.format else path.suffix
        out_path = args.output_dir / (path.stem + ext)
        try:
            row = process_image(
                path, out_path, args.size, args.dpi,
                args.face_ratio, args.vertical_pos,
                args.feather_px, args.border_sample_frac, fixed_color,
                args.quality,
            )
        except Exception as e:
            row = {
                "filename": path.name,
                "face_detected": "ERROR",
                "detect_method": "",
                "extended_canvas": "ERROR",
                "bg_color_used": "",
                "original_size": "n/a",
                "crop_box": str(e),
            }
            print(f"FAILED: {path.name} -> {e}", file=sys.stderr)
        manifest_rows.append(row)
        print(f"{path.name}: face={row['face_detected']} extended={row['extended_canvas']}")

    manifest_path = args.output_dir / "manifest.csv"
    with open(manifest_path, "w", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=["filename", "face_detected", "detect_method", "extended_canvas", "bg_color_used", "original_size", "crop_box"],
        )
        writer.writeheader()
        writer.writerows(manifest_rows)

    n_total = len(manifest_rows)
    n_extended = sum(1 for r in manifest_rows if r["extended_canvas"] is True)
    no_face_files = [r["filename"] for r in manifest_rows if r["face_detected"] is False]
    n_no_face = len(no_face_files)
    haar_files = [r["filename"] for r in manifest_rows if r.get("detect_method") == "haar"]
    print(f"\nDone. {n_total} images processed.")
    print(f"  {n_extended} had extended/color-matched + feathered borders — worth a quick eyeball, some may still want Generative Fill.")
    print(f"  {len(haar_files)} fell back to Haar (no eye landmarks -> box-anchored, less precise framing) — worth a look.")
    print(f"  {n_no_face} had no face detected (center-crop fallback — review these).")
    if no_face_files:
        print("  Files with no detected face (center-crop fallback):")
        for name in no_face_files:
            print(f"    - {name}")
    print(f"  Manifest: {manifest_path}")


if __name__ == "__main__":
    main()
