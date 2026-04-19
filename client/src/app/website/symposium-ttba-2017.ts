import { speakersObj } from './speakers-obj';
import { commiteesArray } from './commitees-array';
import { commiteesObj } from './commitees-array';


export const ttbaSymposium2017 = {
	'symposiumInfo': {
		'name': 'BTBA Symposium 2026',
		'location': 'Virtual',
		'time': {
			'from': new Date('2026/07/11'),
			'to': new Date('2026/07/12')
		},
		'timeZone': 'America/New_York',
		'year': '2026',
		'title': '',
		'showPageLink': false,
		'registrationLink': 'https://buytickets.at/btba/2137594',
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
		'title': 'BTBA 2026 Annual Symposium',
		'showPageLink': true,
		'subjects': [{
			'title': '',
			'description': `
			<p>2026 BTBA 14th Annual Symposium will take place on <b>July 11-12, at Northwest Building, Harvard University, Cambridge, MA. </b> <a href="https://www.btbatw.org/symposium.html" target="_blank" rel="noopener noreferrer">Learn more about our past annual symposia.</a></p>
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
			'from': new Date('2026/07/11 08:00 EDT'),
			'to': new Date('2026/07/11 08:45 EDT'),
			'title': 'Registration and Poster Setup',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2026/07/11 08:45 EDT'),
			'to': new Date('2026/07/11 09:00 EDT'),
			'title': 'Opening Remarks',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': [
				speakersObj['Yien Liao'],
				speakersObj['Chih-Hsiang Yang'],
			],
		}, {
			'from': new Date('2026/07/11 09:00 EDT'),
			'to': new Date('2026/07/11 10:00 EDT'),
			'title': 'Keynote Speech I: ',
			'topic': "Strategic decision-making in pharma R&D",
			'tags': [],
			'rooms': [],
			'speakers': [],
			'moderators': [{'name': '', 'link': ''}]
		}, {
			'from': new Date('2026/07/11 10:00 EDT'),
			'to': new Date('2026/07/11 10:30 EDT'),
			'title': 'Group Photo and Coffee Break',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2026/07/11 10:30 EDT'),
			'to': new Date('2026/07/11 11:50 EDT'),
			'title': 'Trending Topic',
			'topic': 'Frontiers in Functional Genomics: Bridging Discovery and Platform Innovation',
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': [],
			'moderators': [
				{'name': '', 'link': ''},
				{'name': '', 'link': ''}
			],
		}, {
			'from': new Date('2026/07/11 11:50 EDT'),
			'to': new Date('2026/07/11 12:00 EDT'),
			'title': 'Mentor Appreciation Ceremony',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': [],
			'moderators': [
				{'name': '', 'link': ''},
				{'name': '', 'link': ''}
			],
		}, {
			'from': new Date('2026/07/11 12:00 EDT'),
			'to': new Date('2026/07/11 13:30 EDT'),
			'title': 'Lunch with Roundtable',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2026/07/11 13:30 EDT'),
			'to': new Date('2026/07/11 14:00 EDT'),
			'title': 'Best Poster Oral Presentation',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2026/07/11 14:00 EDT'),
			'to': new Date('2026/07/11 15:00 EDT'),
			'numOfParallelSessions': 2,
			'title': 'Panel 1',
			'topic': 'Translating Rare Disease Genomics into Precision Therapies',
			'tags': [],
			'rooms': [],
			'speakers': [],
			'moderators': [
				{'name': '', 'link': ''},
				{'name': '', 'link': ''}
			]
		}, {
			'from': new Date('2026/07/11 14:00 EDT'),
			'to': new Date('2026/07/11 15:00 EDT'),
			'numOfParallelSessions': 2,
			'title': 'Panel 2',
			'topic': "Gene Therapy Delivery: LNP, ANP, and Beyond",
			'tags': [],
			'rooms': [],
			'speakers': [],
			'moderators': [
				{'name': '', 'link': ''},
				{'name': '', 'link': ''}
			]
		}, {
			'from': new Date('2026/07/11 15:00 EDT'),
			'to': new Date('2026/07/11 15:30 EDT'),
			'title': 'Coffee Break',
			'topic': null,
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2026/07/11 15:30 EDT'),
			'to': new Date('2026/07/11 17:00 EDT'),
			'title': 'Trending Topic',
			'topic': 'Al in healthcare: Opportunities and Regulatory Considerations',
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2026/07/11 17:00 EDT'),
			'to': new Date('2026/07/11 19:00 EDT'),
			'title': 'Poster Session',
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2026/07/11 18:00 EDT'),
			'to': new Date('2026/07/11 20:00 EDT'),
			'title': 'Light Dinner',
			'sessionDescription': '',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2026/07/12 08:00 EDT'),
			'to': new Date('2026/07/12 09:20 EDT'),
			'title': 'Breakfast and Meeting with Experts',
			'topic': null,
			'sessionDescription': ``,
			'speakers': [],
			'tags': [],
			'rooms': []
		}, {
			'from': new Date('2026/07/12 09:30 EDT'),
			'to': new Date('2026/07/12 10:30 EDT'),
			'title': 'Keynote Speech II',
			'topic': 'The Discovery of Immune checkpoints: from Basic Immunology to Cancer Therapy',
			'tags': [],
			'rooms': [],
			'speakers': [],
			'moderators': [{'name': '', 'link': ''}]
		}, {
			'from': new Date('2026/07/12 10:30 EDT'),
			'to': new Date('2026/07/12 11:00 EDT'),
			'title': 'Coffee Break',
			'tags': [],
			'rooms': [],
			'speakers': []
		}, {
			'from': new Date('2026/07/12 11:00 EDT'),
			'to': new Date('2026/07/12 12:00 EDT'),
			'title': 'Panel 3',
			'topic': 'Beyond Small Molecules: The Rise of Novel Therapeutic Modalities',
			'numOfParallelSessions': 2,
			'sessionDescription': ``,
			'tags': [],
			'rooms': [],
			'speakers': [],
			'moderators': [{'name': '', 'link': ''}]
		}, {
			'from': new Date('2026/07/12 11:00 EDT'),
			'to': new Date('2026/07/12 12:00 EDT'),
			'title': 'Panel 4',
			'topic': "Synthetic Biology and Biotechnology Beyond Medicine",
			'numOfParallelSessions': 2,
			'sessionDescription': ``,
			'tags': [],
			'rooms': [],
			'speakers': [],
			'moderators': [{'name': '', 'link': ''}]
		}, {
			'from': new Date('2026/07/12 12:10 EDT'),
			'to': new Date('2026/07/12 12:30 EDT'),
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
		'link': 'https://docs.google.com/forms/d/e/1FAIpQLSddceAFwPhM2QJA7nlE9Z6XIXj0wgsUIqObpWb4wIVsGi_Wag/viewform?fbclid=IwY2xjawQ6rGxleHRuA2FlbQIxMABicmlkETE4N2puY0tTT0dTeXhOTXRFc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHoAMB2HlphkgBijx_TNF3-r2QrqwqwerLDe0yB3Dn4Qd5W366L-xMMzapr2M_aem_sTpEsGpbOnlzU-LImiPUOQ'
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
				'logoUrl': 'ww-holding_v2.png',
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
				'name': 'Taiwan Bio Therapeutics Inc.',
				'logoUrl': 'TAIWAN_BIO.png',
				'link': 'https://twbio-thera.com/en'
			},
			{
				'level': 'string',
				'name': 'Syneos Health',
				'logoUrl': 'Syneos Health Logo_Conference.jpg',
				'link': 'https://www.syneoshealth.com/'
			},
			{
				'level': 'string',
				'name': 'InFocus Therapeutics',
				'logoUrl': 'InFocus_Original on transparent.png',
				'link': 'https://infocustx.com/'
			},
			{
				'level': 'string',
				'name': 'Metals Industry Research and Development Center',
				'logoUrl': 'MIRDC.jpg',
				'link': 'https://www.mirdc.org.tw/english/'
			},
		]
	},
	'imgs': [{
		'usage': 'string',
		'imgLinks': []
	}]
};

// module.exports = ttbaSymposium2017;
