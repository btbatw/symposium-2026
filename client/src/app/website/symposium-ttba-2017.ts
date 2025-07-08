import { speakersObj } from './speakers-obj';
import { commiteesArray } from './commitees-array';
import { commiteesObj } from './commitees-array';


export const ttbaSymposium2017 = {
	'symposiumInfo': {
		'name': 'BTBA Symposium 2025',
		'location': 'Virtual',
		'time': {
			'from': new Date('2025/07/12'),
			'to': new Date('2025/07/13')
		},
		'timeZone': 'America/New_York',
		'year': '2025',
		'title': '',
		'showPageLink': false,
		'registrationLink': 'https://www.tickettailor.com/events/btba/1638644',
		'programbookLink': ''
	},
	'host': {
		'name': 'Boston Taiwanese Biotechnology Association',
		'nameShort': 'BTBA',
		'nameCh': '波士頓臺灣人生物科技協會',
		'webLink': 'https://www.btbatw.org/',
		'logoSmall': 'logo-ttba-small.png',
		'email': 'btba@btbatw.org',
		'supportLink': 'https://www.btbatw.org/support.html'
	},
	'about': {
		'title': 'BTBA 2025 Annual Symposium',
		'showPageLink': true,
		'subjects': [{
			'title': '',
			'description': `
			<p>2025 BTBA 13th Annual Symposium will take place on <b>July 12-13, at Northwest Building, Harvard University, Cambridge, MA. </b> <a href="https://www.btbatw.org/symposium.html" target="_blank" rel="noopener noreferrer">Learn more about our past annual symposia.</a></p>
            `
		}, {
			'title': 'Registration',
			'description': `<p>Registration is now open for in-person attendance and is limited.</p>`
		}, {
			'title': 'About BTBA',
			'description': '<p>BTBA is a 501(c)(3) non-profit organization started in 2012 by a group of Taiwanese graduate Students, postdocs and young professionals in the greater Boston area. Our goals are to foster individual career development, to enhance scientific collaborations, to facilitate interactions and to strengthen networking among academic and industrial bioscience communities in Taiwan and the US. We hold annual symposiums as well as seminars and workshops throughout the year. We hope to serve as a platform to foster a community for young scientists to share their research, exchange ideas and explore career opportunities. <a href="https://btbatw.org/committee.html">Our organizing committee.</a></p>'
		}]
	},
	'programme': {
		'title': 'Programme',
		'showPageLink': true,
		'schedules': [{
			'from': new Date('2025/07/12 08:00 EDT'),
			'to': new Date('2025/07/12 08:45 EDT'),
			'title': 'Registration and Poster Setup',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2025/07/12 08:45 EDT'),
			'to': new Date('2025/07/12 09:00 EDT'),
			'title': 'Opening Remarks',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': [
				speakersObj['Jimmy Luo'],
				speakersObj['Ginnie Hu'],
			],
		}, {
			'from': new Date('2025/07/12 09:00 EDT'),
			'to': new Date('2025/07/12 10:00 EDT'),
			'title': 'Keynote Speech I: Michael McKenna, Chief Surgical Officer and Co-Founder of Akouos (A subsidiary of Eli Lilly and Company)',
			'topic': "Gene Therapy for Hearing Loss: From Bench to Bedside",
			'tags': [],
			'rooms': [],
			'speakers': [speakersObj['Michael McKenna']],
			'moderators': [{'name': 'Ting-Wei Liao', 'link': 'https://www.linkedin.com/in/liao-ting-wei/'}]
		}, {
			'from': new Date('2025/07/12 10:00 EDT'),
			'to': new Date('2025/07/12 10:20 EDT'),
			'title': 'Group Photo and Coffee Break',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2025/07/12 10:20 EDT'),
			'to': new Date('2025/07/12 11:50 EDT'),
			'title': 'Trending Topic',
			'topic': 'AI-Powered Breakthroughs: Revolutionizing Drug Discovery, Genomics, and Biotech Innovation',
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': [
				speakersObj['Wei-Hung Weng'],
				speakersObj['Jeffrey Ruffolo'],
				speakersObj['Chong Duan'],
				speakersObj['Dirk Tomandl'],
			],
			'moderators': [
				{'name': 'Ju-Chun (Ivy) Huang', 'link': 'https://www.linkedin.com/in/ju-chun-huang/'},
				{'name': 'Yi-Lun (Olivia) Tsai', 'link': 'https://www.linkedin.com/in/yi-lun-tsai-653320298/'}
			],
		}, {
			'from': new Date('2025/07/12 12:00 EDT'),
			'to': new Date('2025/07/12 12:45 EDT'),
			'title': 'Oral Presentation from Best Poster Award',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': [
				speakersObj['Hawa Dembele'],
				speakersObj['Yu-Ju Chen'],
				speakersObj['Yu-Wen Jan'],
			],
			'moderators': [
				{'name': 'Yu-Ting Huang', 'link': 'https://www.linkedin.com/in/yuthuang/'},
				{'name': 'Chin-Yen (Jean) Lin', 'link': 'https://www.linkedin.com/in/chin-yen-lin-238698205'}
			]
		}, {
			'from': new Date('2025/07/12 12:45 EDT'),
			'to': new Date('2025/07/12 13:00 EDT'),
			'title': 'Mentor Appreciation Ceremony',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2025/07/12 13:00 EDT'),
			'to': new Date('2025/07/12 13:45 EDT'),
			'title': 'Lunch',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2025/07/12 13:45 EDT'),
			'to': new Date('2025/07/12 15:15 EDT'),
			'title': 'Career Development Roundtable',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': [
				speakersObj['Hong-Ren Wang'],
				speakersObj['Lewis Lau'],
				speakersObj['Carolyn Hsu'],
				speakersObj['Ying-Ja Chen'],
				speakersObj['Yan-Jhu Su'],
				speakersObj['Ting-Wei Liao'],
				speakersObj['Pei-Jung Wu'],
				speakersObj['George Chan'],
				speakersObj['Jerry Lin'],
				speakersObj['Liang-Yuan Chiu'],
				speakersObj['Cheng-Yi Chen'],
				speakersObj['Shang-Chuen Wu'],
				speakersObj['Danny Chou'],
				speakersObj['Zoey Chou'],
				speakersObj['Sidney Hsieh'],
				speakersObj['Mong-Hsun Tsai'],
				speakersObj['Tsyr-Yan Yu'],
				speakersObj['Su Hao Lo'],
			],
		}, {
			'from': new Date('2025/07/12 15:15 EDT'),
			'to': new Date('2025/07/12 15:30 EDT'),
			'title': 'Coffee Break',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2025/07/12 15:30 EDT'),
			'to': new Date('2025/07/12 17:00 EDT'),
			'numOfParallelSessions': 2,
			'title': 'Panel 1',
			'topic': 'Battling the Invisible Foe: Infectious Diseases, Global Threats, and Next-Gen Therapeutics',
			'tags': [],
			'rooms': [],
			'speakers': [
				speakersObj['Dan H Barouch'],
				speakersObj['Wilfredo F. Garcia-Beltran'],
				speakersObj['Anne Wyllie'],
				speakersObj['Nicolas Alan Menzies'],
			],
			'moderators': [
				{'name': 'Hsin-Wen (Cindy) Liang', 'link': 'https://www.linkedin.com/in/hsin-wen-liang/'},
				{'name': 'Chia-Jung Li', 'link':'https://www.linkedin.com/in/chia-jung-li-a453a11a1/'}
			]
		}, {
			'from': new Date('2025/07/12 15:30 EDT'),
			'to': new Date('2025/07/12 17:00 EDT'),
			'numOfParallelSessions': 2,
			'title': 'Panel 2',
			'topic': "Tailoring Tomorrow's Treatments: Advances and Challenges in Personalized Medicine",
			'tags': [],
			'rooms': [],
			'speakers': [
				speakersObj['Pei-Ken Hsu'],
				speakersObj['Liang-Bo Wang'],
				speakersObj['Alan Gilbert']
			],
			'moderators': [
				{'name': 'Ping-Wei Chen', 'link': 'https://www.linkedin.com/in/ping-wei-chen-b0ba78a6/'},
				{'name': 'Yen-Ting Kuang', 'link': 'https://www.linkedin.com/in/yentingkuang/'}
			]
		}, {
			'from': new Date('2025/07/12 17:00 EDT'),
			'to': new Date('2025/07/12 18:00 EDT'),
			'title': 'Poster Session',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2025/07/12 18:00 EDT'),
			'to': new Date('2025/07/12 20:00 EDT'),
			'title': 'Networking Dinner',
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2025/07/13 08:00 EDT'),
			'to': new Date('2025/07/13 09:00 EDT'),
			'title': 'Breakfast and Meeting with Experts',
			'topic': null,
			'sessionDescription': ``,
			'speakers': [
				speakersObj['Liang-Hui Chu'],
				speakersObj['Vincent Tseng'],
				speakersObj['Hao-Wei Su'],
				speakersObj['Gerogia Lin'],
				speakersObj['Shih-Ying Wu'],
				speakersObj['Jessica Huang'],
				speakersObj['Jennifer Lu'],
				speakersObj['Ho-Chou Tu'],
				speakersObj['Ming-Ju Tsai'],
				speakersObj['Kai-Chih Huang'],
				speakersObj['Meng-Ju Wu'],
				speakersObj['Shang-Chuen Wu'],
				speakersObj['Hsuan-Ping Chang'],
				speakersObj['Sarah Chen'],
				speakersObj['Nelson Liu'],
				speakersObj['Ting-Hui Wu'],
				speakersObj['Tsyr-Yan Yu'],
				speakersObj['Amy Hung'],
				speakersObj['Sheng-hong Chen'],
				speakersObj['Jason Lu'],
			],
			'tags': [],
			'rooms': []
		}, {
			'from': new Date('2025/07/13 09:00 EDT'),
			'to': new Date('2025/07/13 10:00 EDT'),
			'title': 'Keynote Speech II: Kornelia Polyak, Professor at Dana-Farber Cancer Institute and Harvard Medical School',
			'topic': 'Breast Tumor Evolution',
			'tags': [],
			'rooms': [],
			'speakers': [speakersObj['Kornelia Polyak']],
			'moderators': [{'name': 'Chun-Chen Yao', 'link': 'https://www.linkedin.com/in/chun-chen-yao-028944123/'}]
		}, {
			'from': new Date('2025/07/13 10:00 EDT'),
			'to': new Date('2025/07/13 10:40 EDT'),
			'title': 'Special Talk: Danny Hung-Chieh Chou, Associate Professor at Stanford University',
			'topic': 'The Path to Tenured Faculty at a Top University',
			'tags': [],
			'rooms': [],
			'speakers': [speakersObj['Danny Chou']],
			'moderators': [{'name': 'Yi-Yun Ho', 'link': 'https://www.linkedin.com/in/yi-yun-ho-476b995b/'}]
		}, {
			'from': new Date('2025/07/13 10:40 EDT'),
			'to': new Date('2025/07/13 11:00 EDT'),
			'title': 'Coffee Break',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2025/07/13 11:00 EDT'),
			'to': new Date('2025/07/13 12:30 EDT'),
			'title': 'Panel 3',
			'topic': 'Decoding Aging: Mechanisms, Diseases, and the Future of Longevity',
			'numOfParallelSessions': 2,
			'sessionDescription': ``,
			'tags': [],
			'rooms': [],
			'speakers': [
				speakersObj['Sheng-hong Chen'],
				speakersObj['Kejun (Albert) Ying'],
				speakersObj['Raghav Sehgal'],
				speakersObj['Stan Wang'],
			],
			'moderators': [
				{'name': 'Jerry Lin', 'link': 'https://www.linkedin.com/in/chih-chung-jerry-lin-680b48113/'},
				{'name': 'Michael Sun', 'link': 'www.linkedin.com/in/michael-a-sun'}]
		}, {
			'from': new Date('2025/07/13 11:00 EDT'),
			'to': new Date('2025/07/13 12:30 EDT'),
			'title': 'Panel 4',
			'topic': "Consultants: The Unsung heroes of Biotech and Pharma Companies' Success",
			'numOfParallelSessions': 2,
			'sessionDescription': ``,
			'tags': [],
			'rooms': [],
			'speakers': [
				speakersObj['Ting-Hui Wu'],
				speakersObj['Ariel Yeh'],
				speakersObj['Li-Chun Wang'],
				speakersObj['Amy Shyu'],
			],
			'moderators': [
				{'name': 'Chun-Tien (Jimmy) Kuo', 'link': 'https://www.linkedin.com/in/chuntien-jimmy-kuo/'},
				{'name': 'Shu-Yu Hsu', 'link': 'https://www.linkedin.com/in/shuyu-hsu/'}
			]
		}, {
			'from': new Date('2025/07/13 12:30 EDT'),
			'to': new Date('2025/07/13 12:50 EDT'),
			'title': 'Closing Remarks & Award Ceremony',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}]
	},
	'submission': {
		'title': 'Call for Submissions',
		'showPageLink': true,
		'text': '',
		'link': 'https://forms.gle/vbo2mWdXSAeYAVMg7'
	},
	'location': {
		'title': 'Location',
		'showPageLink': true,
		'text': 'Venue',
		'address': 'Harvard Northwest Building <br/>52 Oxford St, Cambridge, MA 02138',
		'googleMapLink': 'https://www.google.com/maps/place/Northwest+Building/@42.3801535,-71.1152319,15z/data=!4m6!3m5!1s0x89e37740b5a8044b:0x439e0d320f628161!8m2!3d42.3801535!4d-71.1152319!16s%2Fg%2F11clvx3pq2?entry=ttu',
		'directions': [{
			'method': 'Parking',
			'lots': [{
				'name': 'street parking',
				'description': '$1/hour on Saturday free after 6 pm; free on Sunday',
				'address': 'On Dean Keeton Street',
				'link': ''
			}, {
				'name': 'San Jacinto Garage (SJG)',
				'description': '$3/hour, max $18/day',
				'address': '2401 San Jacinto Boulevard',
				'link': 'https://www.google.com/maps/place/San+Jacinto+Garage/@30.2866002,-97.7330305,17.36z/data=!4m5!3m4!1s0x0:0xa097d977872555e7!8m2!3d30.287725!4d-97.7328837'
			}, {
				'name': 'Speedway Garage (SWG)',
				'description': '$3/hour, max $18/day',
				'address': '2105 E. 27th Street',
				'link': 'https://www.google.com/maps/place/Speedway+Garage+(SWG)/@30.2901508,-97.737673,18z/data=!4m5!3m4!1s0x8644b583975605b3:0x2e2d30a8bb92908a!8m2!3d30.2911695!4d-97.7370948'
			}, {
				'name': '27th Street Garage (TSG)',
				'description': '$3/hour, max $18/day',
				'address': '109 W. 27th St.',
				'link': 'https://www.google.com/maps/place/27th+Street+Garage,+109+W+27th+St,+Austin,+TX+78712/@30.2912949,-97.7407441,17z/data=!3m1!4b1!4m5!3m4!1s0x8644b583b190db59:0x2e1eb5678aa95217!8m2!3d30.2912611!4d-97.7385507'
			}]
		}],
		'lodging': {
			'text': 'Lodging',
			'description': '<a>Drury Inn & Suites Austin North</a> is our partner of TTBA 2017 Symposium. Rooms have been held for TTBA attendees. Make your reservations by <a>Friday, October 13, 2017</a> to receive the group rate. For more info, click the button below.',
			'hotels': [{
				'name': 'Drury Inn & Suites Austin North',
				'location': '6711 IH 35 NORTH, Austin, TX 78752',
				'tel': '(512) 467-9500',
				'displayText': 'Please make your reservations by Wednesday, October 13, 2017 to receive the group rate.'
			}]
		}
	},
	'acknowledgement': {
		'title': 'Organizing Committee',
		'description': '',
		'commitees': commiteesArray
	},
	'sponsor': {
		'title': 'Sponsors',
		'showPageLink': false,
		'sponsors': [
			{
				'level': 'string',
				'name': 'NTSC (國科會)',
				'logoUrl': 'NSTC_logo.png',
				'link': 'https://www.nstc.gov.tw'
			},
			{
				'level': 'string',
				'name': 'Ministry of Education 教育部',
				'logoUrl': 'Ministry_of_Education.png',
				'link': 'https://english.moe.gov.tw/'
			},
			{
				'level': 'string',
				'name': 'TECO Boston',
				'logoUrl': 'teco.png',
				'link': 'https://www.roc-taiwan.org/usbos_en/'
			},
			{
				'level': 'string',
				'name': '僑委會',
				'logoUrl': 'OCAC.png',
				'link': 'https://www.ocac.gov.tw/OCAC/SubSites/Home.aspx?site=7a4eb84a-7632-4679-ac66-35970250e9c9'
			},
			{
				'level': 'string',
				'name': 'PharmaEssentia',
				'logoUrl': 'PharmaEssentia.png',
				'link': 'https://us.pharmaessentia.com/'
			},
			{
				'level': '',
				'name': 'METiS Therapeutics',
				'logoUrl': 'metis.png',
				'link': 'https://www.metistx.com/'
			},
			{
				'level': 'string',
				'name': 'string',
				'logoUrl': 'MJNE.png',
				'link': 'http://www.mj-ne.org/'
			},
			{
				'level': '',
				'name': 'WW Holding',
				'logoUrl': 'ww-holding.png',
				'link': 'https://www.ww-holding.com.tw/en/'
			},
			{
				'level': 'string',
				'name': 'Vizuro',
				'logoUrl': 'vizuro.png',
				'link': 'https://www.vizuro.com/'
			},
			{
				'level': 'string',
				'name': 'Wegreened',
				'logoUrl': 'North America Immigration Law Group.png',
				'link': 'https://www.wegreened.com/'
			},
			{
				'level': 'string',
				'name': 'BioLegend',
				'logoUrl': 'biolegend.png',
				'link': 'https://www.biolegend.com'
			},
			{
				'level': 'string',
				'name': 'Development Center of Biotechnology',
				'logoUrl': 'dcb.png',
				'link': 'https://www.dcb.org.tw/pages/1?locale=en'
			},
			{
				'level': 'string',
				'name': '3G Leadership Solutions',
				'logoUrl': '3g-leadership-solutions.png',
				'link': 'https://www.linkedin.com/in/chia-lin-ho/'
			},
			{
				'level': 'string',
				'name': 'Home Boston Group',
				'logoUrl': 'home-boston-group.png',
				'link': 'https://homeboston-spassetinvest.mystrikingly.com'
			},
			{
				'level': 'string',
				'name': 'string',
				'logoUrl': 'sheen-lab.png',
				'link': 'https://molbio.mgh.harvard.edu/sheenweb/main_page.html'
			},
			{
				'level': 'string',
				'name': 'Prometrika',
				'logoUrl': 'prometrika.png',
				'link': 'https://www.prometrika.com/'
			},
			{
				'level': 'string',
				'name': 'string',
				'logoUrl': 'BTCC.png',
				'link': 'https://www.facebook.com/bostonbtcc'
			},
			{
				'level': 'string',
				'name': 'LPY Law Group',
				'logoUrl': 'LPY_Law_Group.png',
				'link': 'https://www.niwus.com/'
			},
			{
				'level': 'string',
				'name': '99 Ranch Market',
				'logoUrl': '99 Ranch Market.jpg',
				'link': 'https://www.99ranch.com/'
			},
			{
				'level': 'string',
				'name': 'Taiwan Bio Therapeutics Inc.',
				'logoUrl': 'TAIWAN_BIO.png',
				'link': 'https://twbio-thera.com/en'
			},
		]
	},
	'imgs': [{
		'usage': 'string',
		'imgLinks': []
	}]
};

// module.exports = ttbaSymposium2017;
