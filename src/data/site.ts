// All editable copy, numbers and dates live here.
export const site = {
  name: 'Wildline',
  fullName: 'Wildline Expeditions',
  tagline: 'Far roads. Good company.',
  whatsapp: '919000000000', // digits only, with country code
  email: 'roll@wildline.example',
  facebook: 'https://facebook.com/wildline.expeditions',
  instagram: 'https://instagram.com/wildline.expeditions',
  youtube: 'https://youtube.com/@wildline.expeditions',
  copyright: '© 2026 Wildline Expeditions',
}

// Frames per shot. Mobile set = every 2nd frame, 1080px wide (see README).
// Per shot: shot 1 is 44 s of footage (DJI_0015, 1:19 to 2:03) at 20 fps; shot 2 is 48 s (DJI_0009, 1:18 to 2:06, rotated 90° on desktop) at 20 fps.
// w / mw = widest DECODED frame (desktop / mobile). The files on disk are larger (2560 / 1440 wide) for sharp stills; decoding at this size keeps playback smooth.
export const frames = {
  1: { count: 880, mobileCount: 440, w: 1920, mw: 1080 },
  2: { count: 960, mobileCount: 480, w: 1920, mw: 1080 },
}

// Film layout: fractions of the pinned scroll film (0–1).
export const film = { heightVh: 1800, shot1End: 0.47, shot2Start: 0.53, shot2End: 0.9 }

export const bigLines = [
  { at: 0.05, text: 'No road. No problem.' },
  { at: 0.1, text: 'Leave the tarmac.' },
  { at: 0.17, text: 'Air down. Gear up.' },
  { at: 0.25, text: 'Cross the pass.' },
  { at: 0.32, text: 'The trail decides.' },
  { at: 0.4, text: 'Find the edge.' },
  // { at: 0.47, text: 'Mud is a language.' },
  { at: 0.56, text: 'Built for the long way.' },
  { at: 0.78, text: 'We drive together.' },
  { at: 0.9, text: 'The expedition begins.' },
]

export const stats = {
  at: 0.65,
  items: [
    { value: 48000, label: 'Kilometres driven' },
    { value: 32, label: 'Passes crossed' },
    { value: 5360, label: 'Metres at highest camp' },
    { value: 120, label: 'Convoys led' },
    // optional additions
    { value: 14, label: 'Expeditions a year' },
    { value: 0, label: 'Paved roads' },
  ],
}

// Decimal degrees; formatted as 34°09′N in Coordinates.
export const route = {
  from: { lat: 34.15, lon: 77.5833, alt: 3500 },
  to: { lat: 33.75, lon: 78.6667, alt: 4350 },
}

type Trip = { name: string; slug?: string; days: number; alt: string; season: string; price: string; still: string; altText: string }

export const trips: Trip[] = [
  {
    name: 'Winter Frozen Spiti Expedition',
    slug: 'winter-spiti',
    days: 9,
    alt: '4,400 m',
    season: 'Jan–Mar',
    price: '₹1,45,000',
    still: 'frames/shot1/0088.webp',
    altText: 'Convoy driving a snow-covered road through the frozen Spiti valley',
  },
  {
    name: 'Adi Kailash Expedition',
    slug: 'adi-kailash',
    days: 9,
    alt: '4,572 m',
    season: 'May–Jun, Sep–Oct',
    price: '₹1,25,000',
    still: 'frames/shot2/0030.webp',
    altText: 'Convoy on the high road toward Adi Kailash in the Kumaon Himalaya',
  },
  {
    name: 'Nepal Expedition',
    days: 10,
    alt: '3,800 m',
    season: 'Mar–May, Sep–Nov',
    price: '₹1,50,000',
    still: 'frames/shot1/0359.webp',
    altText: 'Convoy on a mountain road above a Himalayan valley in Nepal',
  },
  {
    name: 'Explore Zanskar Expedition',
    slug: 'zanskar',
    days: 9,
    alt: '4,401 m',
    season: 'Jun–Sep',
    price: '₹1,20,000',
    still: 'frames/shot2/0210.webp',
    altText: 'Convoy on the high road to Zanskar over Pensi La',
  },
  {
    name: 'Ladakh Expedition',
    days: 12,
    alt: '5,359 m',
    season: 'Jun–Sep',
    price: '₹1,65,000',
    still: 'frames/shot2/0090.webp',
    altText: 'Convoy crossing a high pass in Ladakh',
  },
  {
    name: 'Spiti Expedition',
    days: 9,
    alt: '4,590 m',
    season: 'May–Oct',
    price: '₹1,05,000',
    still: 'frames/shot1/0179.webp',
    altText: 'Convoy climbing a switchback road above the Spiti valley',
  },
  {
    name: 'Arunachal Expedition',
    days: 11,
    alt: '4,170 m',
    season: 'Apr–Jun, Oct–Nov',
    price: '₹1,35,000',
    still: 'frames/shot1/0449.webp',
    altText: 'Convoy on a mountain road through Arunachal forest toward Sela Pass',
  },
  {
    name: 'Sikkim Expedition',
    days: 8,
    alt: '5,100 m',
    season: 'Apr–Jun, Sep–Nov',
    price: '₹95,000',
    still: 'frames/shot1/0299.webp',
    altText: 'Convoy on a mountain road toward Nathu La, Sikkim',
  },
  {
    name: 'Kashmir Expedition',
    days: 9,
    alt: '3,530 m',
    season: 'May–Sep',
    price: '₹1,10,000',
    still: 'frames/shot2/0150.webp',
    altText: 'Convoy on the Zojila road above Kashmir valleys',
  },
  {
    name: 'Uttarakhand Expedition',
    days: 7,
    alt: '4,500 m',
    season: 'May–Jun, Sep–Oct',
    price: '₹78,000',
    still: 'frames/shot1/0179.webp',
    altText: 'Convoy climbing through Himalayan foothills in Uttarakhand',
  },
  {
    name: 'Rajasthan Expedition',
    days: 6,
    alt: '250 m',
    season: 'Nov–Feb',
    price: '₹62,000',
    still: 'frames/shot2/0270.webp',
    altText: 'Dune camp with a small fire at golden hour in Rajasthan',
  },
  {
    name: 'Kutch Expedition',
    days: 5,
    alt: '50 m',
    season: 'Nov–Feb',
    price: '₹55,000',
    still: 'frames/shot2/0270.webp',
    altText: 'Convoy crossing the white salt desert of Kutch',
  },
  {
    name: 'Meghalaya Expedition',
    days: 6,
    alt: '1,960 m',
    season: 'Oct–Apr',
    price: '₹68,000',
    still: 'frames/shot1/0449.webp',
    altText: 'Convoy on a forest road in the Meghalaya hills',
  },
  {
    name: 'Western Ghats Expedition',
    days: 7,
    alt: '1,800 m',
    season: 'Oct–Feb',
    price: '₹70,000',
    still: 'frames/shot1/0299.webp',
    altText: 'Convoy on a misty ghat road in the Western Ghats',
  },
]

export const crew = {
  headline: 'Built to get you there. Built to get you back.',
  specs: [
    ['Lead + Sweep', 'Two crew vehicles bracket every convoy'],
    ['Recovery', 'Winches and recovery boards on every car'],
    ['Comms', 'Sat phone + VHF, no dead zones'],
    ['Mechanic', 'On-convoy mechanic, spares in the sweep'],
    ['Oxygen', 'Oxygen support above 4,500 m'],
    ['Pace', 'Max 8 vehicles. We wait for the slowest car.'],
    ['Medical', 'Wilderness-first-aid trained crew, full medical kit, AMS protocol'],
    ['Acclimatisation', 'Built-in rest days and gradual altitude gain on every high route'],
    ['Permits', 'Inner Line and protected-area permits handled before you leave'],
    ['Stays', 'Camps, homestays and guesthouses chosen for the route, hot meals included'],
    ['Fuel + Range', 'Fuel caches and jerry cans for stretches with no pumps'],
    ['Briefing', 'Pre-trip route, gear and driving briefing for every guest'],
    ['Evacuation', 'Emergency evacuation plan and nearest-hospital map for every day of the route'],
    ['Vehicle Check', 'Daily pre-drive inspection of tyres, fluids and brakes on every car'],
    ['Weather Calls', 'Route-closure and weather decisions made by the lead, never by the schedule'],
    ['Driving Support', 'Crew coaching on water crossings, loose gravel and steep descents'],
  ],
}

export const about = {
  headline: 'About us',
  manifesto: 'Not a tour. An expedition. Eight vehicles. One pace. Everyone comes back.',
  body: [
    'WILDLINE runs small, guided 4x4 convoy expeditions through the roads most people only see on a map: the high passes of Ladakh and Spiti, the dunes of Rajasthan, the forests of the North East.',
    'We cap every convoy at eight vehicles, travel at the pace of the slowest car, and carry the recovery gear, comms and medical support to get everyone back. Far roads. Good company.',
    'Every route is scouted by our own crew before the season opens. We know which bridge is out, which pass closes by noon, and which village has the best chai. That local knowledge is what turns a drive into an expedition.',
    'Our guests are drivers, photographers, first-timers and families. You do not need to be an expert behind the wheel. You need to be curious, ready for long days, and happy to share a campfire.',
    'We travel light on the land: no littering, no off-track driving, local stays and local guides wherever we go, so the places we love are still there for the next convoy.',
    'Safety is not an add-on. Every convoy runs with a lead and a sweep vehicle, daily vehicle checks, sat phone and VHF comms, oxygen above 4,500 m, and an evacuation plan agreed before we roll out.',
    'We keep groups small on purpose. Eight vehicles means everyone gets a briefing, a seat at the fire, and a crew member who knows their name. Nobody is a number on a manifest.',
    'The season decides the route, not the other way round. We run Ladakh, Spiti and Kashmir in summer, the North East in the shoulder months, and Rajasthan, Kutch and the Western Ghats in winter, so there is a convoy for almost every month.',
  ],
  highlights: [
    ['2016', 'First convoy'],
    ['48,000+', 'Kilometres driven'],
    ['120+', 'Convoys led'],
    ['10', 'States covered'],
  ],
}

// Placeholder people: replace names, roles and bios with the real crew.
// Add `photo: 'team/name.webp'` (file in public/) to a member to replace the grey placeholder box.
type Member = { name: string; role: string; bio: string; photo?: string }

export const team = {
  headline: 'Our core team',
  members: <Member[]>[
    {
      name: 'Team Member 01',
      role: 'Founder + Lead Guide',
      bio: 'Short bio goes here. Add a line or two about experience and what this person does on the road.',
    },
    {
      name: 'Team Member 02',
      role: 'Head of Recovery',
      bio: 'Short bio goes here. Add a line or two about experience and what this person does on the road.',
    },
    {
      name: 'Team Member 03',
      role: 'Medical Lead',
      bio: 'Short bio goes here. Add a line or two about experience and what this person does on the road.',
    },
    {
      name: 'Team Member 04',
      role: 'Routes + Permits',
      bio: 'Short bio goes here. Add a line or two about experience and what this person does on the road.',
    },
  ],
}

// Placeholder roles: replace with real openings.
export const careers = {
  headline: 'Careers',
  intro:
    'Love the mountains, machines and good company? Join the crew that gets convoys there and back. Send your CV and a few lines about yourself.',
  roles: [
    {
      icon: 'car',
      title: 'Lead Driver-guide',
      type: 'Seasonal · Leh / Manali',
      desc: '5+ years of high-altitude 4x4 driving. Leads a convoy, makes the safety calls, keeps guests calm and moving.',
    },
    {
      icon: 'wrench',
      title: 'Recovery + Mechanic',
      type: 'Seasonal · Sweep vehicle',
      desc: 'Winching, recovery and field repairs. Keeps every car running and the sweep vehicle stocked.',
    },
    {
      icon: 'clipboard',
      title: 'Trip Operations Executive',
      type: 'Full-time · Office',
      desc: 'Permits, stays, vehicles and guest briefings. Makes sure everything is booked before the convoy rolls.',
    },
    {
      icon: 'camera',
      title: 'Content + Photographer',
      type: 'Seasonal / Freelance',
      desc: 'Shoots photo and video on the road for our channels and guests. Drone licence is a plus.',
    },
  ],
  cta: 'Apply by email',
  subject: 'Application: ',
}

export const join = {
  headline: 'Join the next convoy.',
  dates: [
    { date: '14 Jun 2026', trip: 'Ladakh Expedition', seats: 3 },
    { date: '02 Jul 2026', trip: 'Spiti Expedition', seats: 5 },
    { date: '20 Sep 2026', trip: 'Arunachal Expedition', seats: 4 },
    { date: '05 Oct 2026', trip: 'Sikkim Expedition', seats: 6 },
    { date: '11 Nov 2026', trip: 'Rajasthan Expedition', seats: 6 },
    { date: '06 Dec 2026', trip: 'Kutch Expedition', seats: 7 },
    { date: '16 Jan 2027', trip: 'Winter Frozen Spiti Expedition', seats: 4 },
    { date: '12 Jul 2027', trip: 'Explore Zanskar Expedition', seats: 6 },
    { date: '14 Mar 2027', trip: 'Nepal Expedition', seats: 6 },
    { date: '06 Jun 2027', trip: 'Adi Kailash Expedition', seats: 5 },
  ],
  includes: ['4x4 + driver-guide', 'Permits', 'Stays + meals', 'Recovery crew', 'Oxygen + first aid'],
  excludes: [
    'Flights and train fares to the start point',
    'Personal insurance',
    'Fuel for personal vehicles on self-drive trips',
    'Alcohol and personal expenses',
  ],
  steps: [
    ['01 Enquire', 'Message us on WhatsApp or use the enquiry form with your preferred trip and dates.'],
    ['02 Confirm', 'We share the itinerary and cost. Your seat is held once the deposit is paid.'],
    ['03 Prepare', 'Send ID for permits. We send the packing list and book your pre-trip briefing call.'],
    ['04 Roll Out', 'Meet the crew at the start point, get the driving briefing, and the convoy leaves.'],
  ],
  policy: [
    'Group size is capped at 8 vehicles per convoy.',
    'Guests should be 18+ or travel with a guardian. Children are welcome on lower-altitude routes.',
    'A basic fitness level is needed for high-altitude routes. Tell us about any medical condition when you book.',
    'Departures can change or reroute for weather and road closures. Safety calls are made by the lead.',
  ],
  note: 'Seats confirm with a deposit. Free date change up to 30 days before departure.',
}

// The four steps of a convoy, as shown on the home page.
export const how = [
  ['Choose your route', 'Message us with your preferred trip and dates. We share the itinerary and cost.'],
  ['Vehicle check and briefing', 'Daily vehicle checks, and a route, gear and driving briefing before we roll out.'],
  ['Drive in convoy', 'A lead and a sweep vehicle bracket the convoy. We travel at the pace of the slowest car.'],
  ['Come home with stories', 'Everyone comes back. That is the whole plan.'],
]

export const menuLinks = [
  { label: 'Expeditions', href: '/expeditions' },
  { label: 'Safety', href: '/safety' },
  { label: 'Convoys', href: '/join' },
  { label: 'Blog', href: '/blog' },
  { label: 'Our core team', href: '/team' },
  { label: 'About us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

// Placeholder office details: replace with the real address, phone and hours.
export const contact = {
  headline: 'Contact us',
  intro: 'Questions about a route, dates or gear? Reach the crew any way you like. We reply within one working day.',
  channels: [
    { icon: 'whatsapp', title: 'WhatsApp', desc: 'Fastest way to reach us. Send a message any time.' },
    { icon: 'mail', title: 'Email', desc: 'Itineraries, group bookings and press.' },
    { icon: 'phone', title: 'Call', desc: 'Mon–Sat, 10:00–18:00 IST.' },
    { icon: 'map', title: 'Office', desc: 'WILDLINE Expeditions, Leh, Ladakh 194101. Visits by appointment.' },
  ],
}

// Approximate start region of each route as [lat, lon], keyed by tripSlug (drawn on the home atlas).
export const tripPlace: Record<string, [number, number]> = {
  'winter-spiti': [32.7, 78.55],
  'adi-kailash': [30.25, 80.6],
  nepal: [28.2, 84.0],
  zanskar: [33.5, 76.85],
  ladakh: [34.15, 77.6],
  spiti: [32.2, 78.0],
  arunachal: [27.4, 92.2],
  sikkim: [27.4, 88.6],
  kashmir: [34.05, 74.8],
  uttarakhand: [30.6, 79.2],
  rajasthan: [26.9, 71.0],
  kutch: [23.7, 69.8],
  meghalaya: [25.5, 91.4],
  western: [12.4, 75.8],
}

export const tripSlug = (t: { name: string; slug?: string }) => t.slug ?? t.name.split(' ')[0].toLowerCase()

// Placeholder detail copy per expedition (key = first word of the trip name, lowercase): verify routes and stops with the crew.
type TripDetail = { level: string; route: string[]; stops?: string[][]; overview: string; highlights: string[] }

export const tripDetails: Record<string, TripDetail | undefined> = {
  ladakh: {
    level: 'Hard',
    route: ['Leh', 'Khardung La', 'Nubra Valley', 'Pangong Tso', 'Tso Moriri', 'Leh'],
    overview:
      'Our flagship run across the highest motorable passes in the world. Long days, thin air and landscapes that do not look real.',
    highlights: [
      'Khardung La and Chang La crossings',
      'Camp by Pangong Tso',
      'Nubra dunes and double-humped camels',
      'Monasteries of Hemis and Thiksey',
    ],
  },
  spiti: {
    level: 'Hard',
    route: ['Shimla', 'Kalpa', 'Nako', 'Tabo', 'Kaza', 'Langza', 'Hikkim', 'Key', 'Kaza', 'Shimla'],
    stops: [
      ['Shimla', '2,276 m'],
      ['Kalpa', '2,960 m'],
      ['Nako', '3,662 m'],
      ['Tabo', '3,280 m'],
      ['Kaza', '3,800 m'],
      ['Langza', '4,400 m'],
      ['Hikkim', '4,400 m'],
      ['Key', '4,166 m'],
    ],
    overview:
      'The cold desert circuit: Kinnaur apple valleys, cliff-edge roads, ancient monasteries and the highest villages in Spiti, with Kaza as the base.',
    highlights: [
      'Nako lake and village',
      'Tabo monastery, a thousand years old',
      'Langza fossils and the giant Buddha statue',
      'Hikkim, the highest post office in the world',
      'Key monastery on its hilltop',
    ],
  },
  arunachal: {
    level: 'Moderate',
    route: ['Guwahati', 'Bomdila', 'Sela Pass', 'Tawang', 'Dirang', 'Guwahati'],
    overview: 'Forest roads, rope bridges and the road to Tawang over Sela Pass, through the least-travelled corner of the Himalaya.',
    highlights: ['Sela Pass crossing', 'Tawang Monastery', 'Madhuri Lake', 'Homestays with local families'],
  },
  sikkim: {
    level: 'Moderate',
    route: ['Gangtok', 'Tsomgo Lake', 'Nathu La', 'Lachen', 'Gurudongmar', 'Gangtok'],
    overview: 'Steep green valleys, border passes and a push to one of the highest lakes in the world.',
    highlights: ['Nathu La border pass', 'Gurudongmar Lake', 'Tsomgo Lake', 'Yumthang Valley'],
  },
  kashmir: {
    level: 'Moderate',
    route: ['Srinagar', 'Sonamarg', 'Zojila', 'Kargil', 'Srinagar'],
    overview: 'Alpine meadows, the Zojila road and the long climb out of the valley into the high desert.',
    highlights: ['Zojila Pass', 'Dal Lake and Srinagar old city', 'Sonamarg meadows', 'Drass, the second-coldest inhabited place'],
  },
  uttarakhand: {
    level: 'Moderate',
    route: ['Dehradun', 'Chopta', 'Joshimath', 'Mana', 'Auli', 'Dehradun'],
    overview: 'Himalayan foothills, river valleys and pilgrim roads, with a push to the last village before the Tibet border.',
    highlights: ['Mana, the last village', 'Chopta meadows', 'Auli ridge views', 'Alaknanda river gorge'],
  },
  rajasthan: {
    level: 'Easy',
    route: ['Jaipur', 'Jodhpur', 'Jaisalmer', 'Sam dunes', 'Jaipur'],
    overview: 'Forts, desert tracks and a dune camp under a clear sky. Our gentlest route and a good first convoy.',
    highlights: ['Dune camp with a fire', 'Jaisalmer Fort', 'Mehrangarh Fort', 'Village stops on desert tracks'],
  },
  kutch: {
    level: 'Easy',
    route: ['Bhuj', 'Dholavira', 'White Rann', 'Khavda', 'Bhuj'],
    overview: 'A flat white horizon, craft villages and an open-sky camp on the salt desert.',
    highlights: ['White Rann at sunset', 'Dholavira Harappan site', 'Craft villages of Khavda', 'Full-moon salt desert drive'],
  },
  meghalaya: {
    level: 'Easy',
    route: ['Guwahati', 'Shillong', 'Cherrapunji', 'Dawki', 'Guwahati'],
    overview: 'Wet forest roads, living root bridges and crystal rivers in the abode of the clouds.',
    highlights: ['Living root bridges', 'Dawki river', 'Cherrapunji waterfalls', 'Mawlynnong village'],
  },
  western: {
    level: 'Easy',
    route: ['Mumbai', 'Mahabaleshwar', 'Coorg', 'Munnar', 'Kochi'],
    overview: 'Misty ghat roads, tea estates and forest tracks down the length of the Western Ghats.',
    highlights: ['Misty ghat sections', 'Tea and coffee estates', 'Forest tracks in Coorg', 'Munnar hills'],
  },
  'winter-spiti': {
    level: 'Extreme',
    route: ['Shimla', 'Narkanda', 'Kalpa', 'Nako', 'Tabo', 'Kaza', 'Langza', 'Hikkim', 'Key', 'Kaza', 'Shimla'],
    overview:
      'Spiti in deep winter: temperatures near minus 25, a frozen river and empty snow roads. Access is only via Kinnaur, with winter-fitted vehicles, extra rest days and a crew that knows ice.',
    highlights: [
      'Frozen Spiti river and snow-covered monasteries',
      'Winter-fitted 4x4s with chains and heated stays',
      'Langza, Hikkim and Key under snow',
      'A chance to spot the snow leopard around Kibber',
    ],
  },
  zanskar: {
    level: 'Hard',
    route: ['Kargil', 'Sankoo', 'Parkachik', 'Rangdum', 'Pensi La', 'Padum', 'Karsha', 'Zangla', 'Padum', 'Kargil'],
    stops: [
      ['Kargil', '2,676 m'],
      ['Parkachik', '3,700 m'],
      ['Rangdum', '3,800 m'],
      ['Pensi La', '4,401 m'],
      ['Padum', '3,657 m'],
      ['Karsha', '3,700 m'],
      ['Zangla', '3,700 m'],
    ],
    overview:
      'The remote valley behind the Great Himalaya: the Suru valley, Pensi La and the old kingdom of Padum. Long gravel days, big skies and some of the quietest roads in the Himalaya.',
    highlights: [
      'Pensi La, the gateway to Zanskar',
      'Rangdum monastery and the Suru valley',
      'Karsha, the largest monastery in Zanskar',
      'Zangla royal palace and village stays',
    ],
  },
  nepal: {
    level: 'Moderate',
    route: ['Kathmandu', 'Pokhara', 'Jomsom', 'Kagbeni', 'Muktinath', 'Tatopani', 'Pokhara', 'Kathmandu'],
    stops: [
      ['Kathmandu', '1,400 m'],
      ['Pokhara', '820 m'],
      ['Jomsom', '2,720 m'],
      ['Kagbeni', '2,810 m'],
      ['Muktinath', '3,800 m'],
      ['Tatopani', '1,190 m'],
    ],
    overview:
      'Overland through the heart of Nepal: Kathmandu valley, the lakes of Pokhara and the Kali Gandaki gorge, the deepest in the world, up to the sacred temple of Muktinath.',
    highlights: [
      'Kali Gandaki gorge drive to Jomsom',
      'Muktinath temple and Kagbeni village',
      'Pokhara lakeside and Annapurna views',
      'Hot springs at Tatopani',
    ],
  },
  'adi-kailash': {
    level: 'Hard',
    route: ['Dharchula', 'Gunji', 'Kuti', 'Jolingkong', 'Om Parvat viewpoint', 'Gunji', 'Dharchula'],
    stops: [
      ['Dharchula', '950 m'],
      ['Gunji', '3,200 m'],
      ['Kuti', '3,800 m'],
      ['Jolingkong', '4,572 m'],
      ['Om Parvat viewpoint', '4,200 m'],
    ],
    overview:
      'Pilgrimage and expedition in one: the Kumaon road along the Kali river to the Adi Kailash peak, Parvati Sarovar and the Om Parvat. Inner Line permits are handled by us.',
    highlights: [
      'Adi Kailash peak and Parvati Sarovar lake',
      'Om Parvat, with the Om formed in snow',
      'Gunji and the villages of the Vyas valley',
      'The Kali river gorge road from Dharchula',
    ],
  },
}

// Placeholder day-by-day plans (key = tripSlug): [day range, title, what happens]. Verify with the crew.
export const tripItinerary: Record<string, string[][] | undefined> = {
  ladakh: [
    ['Day 1–2', 'Arrive Leh', 'Airport pickup, briefing, vehicle check. Two full rest days to acclimatise at 3,500 m.'],
    ['Day 3', 'Leh to Nubra Valley', 'Over Khardung La (5,359 m) to the Nubra dunes. Camp in the valley.'],
    ['Day 4–5', 'Nubra to Pangong Tso', 'Via Shyok river and Agham route to the lake. Two nights lakeside.'],
    ['Day 6–7', 'Pangong to Tso Moriri', 'Chang La and the high plateau of Changthang. Wildlife stops, camp by the lake.'],
    ['Day 8–9', 'Tso Moriri to Leh', 'Remote Mahe route, hot springs and monastery visits on the way back.'],
    ['Day 10–12', 'Reserve + Farewell', 'Buffer days for weather, Hemis and Thiksey monasteries, farewell dinner, departure.'],
  ],
  spiti: [
    ['Day 1', 'Shimla to Kalpa', 'Foothills to the Kinnaur apple belt. Views of Kinner Kailash.'],
    ['Day 2', 'Kalpa to Nako', 'Cliff-edge Hindustan-Tibet road into Spiti, ending at Nako lake.'],
    ['Day 3', 'Nako to Tabo', 'Cold desert valley and Tabo monastery, over a thousand years old.'],
    ['Day 4', 'Tabo to Kaza', 'Drive to Kaza, the Spiti base. Acclimatise at 3,800 m.'],
    [
      'Day 5–6',
      'Langza, Hikkim and Key',
      'Fossil village Langza and its Buddha statue, Hikkim with the highest post office, then Key monastery. Back to Kaza, with a buffer day for weather.',
    ],
    ['Day 7–9', 'Kaza to Shimla', 'Return the way we came, overnight en route, farewell dinner in Shimla.'],
  ],
  arunachal: [
    ['Day 1', 'Guwahati to Bomdila', 'Cross into Arunachal, permit checks, drive up through forest.'],
    ['Day 2–3', 'Bomdila to Dirang', 'Apple orchards, hot springs and Sherpa villages.'],
    ['Day 4–5', 'Sela Pass to Tawang', 'Over Sela (4,170 m), Jaswant Garh, Nuranang falls and into Tawang.'],
    ['Day 6–7', 'Tawang', 'Tawang Monastery, Madhuri Lake and Bum La viewpoint.'],
    ['Day 8–11', 'Return via Zemithang', 'Slow return on a different road, village homestays, Guwahati farewell.'],
  ],
  sikkim: [
    ['Day 1', 'Arrive Gangtok', 'Briefing, permits, local market walk.'],
    ['Day 2', 'Tsomgo and Nathu La', 'Frozen-lake altitude and the Indo-China border pass (4,310 m).'],
    ['Day 3–4', 'Gangtok to Lachen', 'North Sikkim road, waterfalls and the Teesta gorge.'],
    ['Day 5', 'Gurudongmar Lake', 'Pre-dawn drive to 5,100 m. Back to Lachen for the night.'],
    ['Day 6–8', 'Yumthang and Return', 'Valley of Flowers, hot springs, return to Gangtok and farewell.'],
  ],
  kashmir: [
    ['Day 1–2', 'Srinagar', 'Dal Lake shikara, old city, Mughal gardens. Acclimatise.'],
    ['Day 3', 'Sonamarg', 'Meadows, Thajiwas glacier and Sindh river.'],
    ['Day 4–5', 'Zojila to Kargil', 'Crossing Zojila (3,530 m), Drass and the Kargil memorial.'],
    ['Day 6–7', 'Kargil to Suru Valley', 'Rangdum monastery and Suru valley peaks.'],
    ['Day 8–9', 'Return to Srinagar', 'Back over Zojila, farewell dinner.'],
  ],
  uttarakhand: [
    ['Day 1', 'Dehradun to Rishikesh', 'Briefing, Ganga aarti, overnight on the river.'],
    ['Day 2–3', 'Chopta', 'Rudraprayag, Ukhimath and the Chopta meadows. Tungnath trek optional.'],
    ['Day 4', 'Joshimath', 'Alaknanda gorge road and Karnaprayag.'],
    ['Day 5', 'Mana Village', 'Badrinath and the last village before the Tibet border.'],
    ['Day 6–7', 'Auli and Return', 'Ridge views of Nanda Devi, descend to Dehradun.'],
  ],
  rajasthan: [
    ['Day 1', 'Jaipur', 'Arrive, briefing, Amber Fort at sunset.'],
    ['Day 2', 'Jaipur to Jodhpur', 'Village stops, Mehrangarh Fort and the blue city.'],
    ['Day 3', 'Jodhpur to Jaisalmer', 'Desert highway, Jaisalmer Fort walk.'],
    ['Day 4', 'Sam Dunes', 'Dune bashing, camel ride, campfire and dinner under the stars.'],
    ['Day 5–6', 'Return to Jaipur', 'Slow return on desert tracks, farewell dinner.'],
  ],
  kutch: [
    ['Day 1', 'Arrive Bhuj', 'Briefing, Aina Mahal and the old town.'],
    ['Day 2', 'Dholavira', 'Harappan site, fossil park and the Great Rann edge.'],
    ['Day 3', 'White Rann', 'Salt desert drive, sunset and an open-sky camp.'],
    ['Day 4', 'Khavda and Nirona', 'Craft villages: bandhani, rogan art and copper bells.'],
    ['Day 5', 'Return to Bhuj', 'Farewell and departure.'],
  ],
  meghalaya: [
    ['Day 1', 'Guwahati to Shillong', 'Cross into the hills, Umiam lake stop.'],
    ['Day 2', 'Shillong', 'Elephant Falls, Shillong Peak and Don Bosco museum.'],
    ['Day 3', 'Cherrapunji', 'Nohkalikai falls and double-decker root bridge trek.'],
    ['Day 4', 'Mawlynnong and Dawki', 'Cleanest village in Asia and the glass-clear Umngot river.'],
    ['Day 5–6', 'Return to Guwahati', 'Cave stop at Mawsmai, farewell dinner.'],
  ],
  western: [
    ['Day 1', 'Mumbai to Mahabaleshwar', 'Briefing, ghat climb, strawberry farms.'],
    ['Day 2–3', 'Mahabaleshwar to Coorg', 'Forest roads, coffee estates and Namdroling monastery.'],
    ['Day 4–5', 'Coorg to Munnar', 'Wayanad ghat sections, spice plantations.'],
    ['Day 6', 'Munnar', 'Tea estates, Eravikulam park, sunrise at Top Station.'],
    ['Day 7', 'Munnar to Kochi', 'Descend to the coast, farewell dinner.'],
  ],
  'winter-spiti': [
    ['Day 1', 'Shimla to Kalpa', 'Winter briefing, chains and gear check. Drive up the Kinnaur road with snow on the peaks.'],
    ['Day 2', 'Kalpa to Nako', 'Icy hairpins on the Hindustan-Tibet road to a frozen Nako lake.'],
    ['Day 3', 'Nako to Tabo', 'Snow desert valley and Tabo monastery in winter silence.'],
    ['Day 4', 'Tabo to Kaza', 'Short drive to Kaza. Slow acclimatisation at 3,800 m.'],
    [
      'Day 5–6',
      'Langza, Hikkim and Key',
      'Snow-covered villages and monasteries, with a rest day for the cold and a chance to look for the snow leopard.',
    ],
    ['Day 7–9', 'Kaza to Shimla', 'Return through Kinnaur with buffer for snow and road closures, farewell dinner in Shimla.'],
  ],
  zanskar: [
    ['Day 1', 'Arrive Kargil', 'Briefing, vehicle check and permits. Rest at 2,676 m.'],
    ['Day 2', 'Kargil to Parkachik', 'Up the Suru valley past Sankoo, with first views of Nun and Kun.'],
    ['Day 3', 'Parkachik to Rangdum', 'Open green valley and Rangdum monastery on its ridge.'],
    ['Day 4', 'Rangdum to Padum', 'Over Pensi La (4,401 m) and down into Zanskar to the old capital, Padum.'],
    ['Day 5', 'Padum and Karsha', 'Rest day: Padum town and the hillside monastery of Karsha.'],
    ['Day 6', 'Stongde and Zangla', 'Stongde monastery and the royal village of Zangla.'],
    ['Day 7', 'Padum to Rangdum', 'Back over Pensi La with time at the Drang Drung glacier viewpoint.'],
    ['Day 8', 'Rangdum to Kargil', 'Down the Suru valley, farewell dinner in Kargil.'],
    ['Day 9', 'Reserve Day', 'Buffer for weather and road conditions, departure.'],
  ],
  nepal: [
    ['Day 1', 'Arrive Kathmandu', 'Briefing, border and vehicle paperwork, old-town walk.'],
    ['Day 2', 'Kathmandu to Pokhara', 'Trishuli river road through terraced hills to the lakeside city.'],
    ['Day 3', 'Pokhara', 'Rest day: Phewa lake and a sunrise viewpoint over Annapurna.'],
    ['Day 4–5', 'Pokhara to Jomsom', 'Up the Kali Gandaki gorge on rough mountain track, with a night in the apple town of Marpha.'],
    ['Day 6', 'Kagbeni and Muktinath', 'Medieval Kagbeni and the temple of Muktinath at 3,800 m.'],
    ['Day 7', 'Jomsom to Tatopani', 'Down the gorge to the hot springs.'],
    ['Day 8', 'Tatopani to Pokhara', 'Forest roads back to the lakes.'],
    ['Day 9–10', 'Pokhara to Kathmandu', 'Highway back, farewell dinner, with a buffer day for landslides and weather.'],
  ],
  'adi-kailash': [
    ['Day 1', 'Arrive Dharchula', 'Briefing, Inner Line permit checks and vehicle check.'],
    ['Day 2', 'Dharchula to Gunji', 'Along the Kali river on the old Lipulekh trade route into the Vyas valley.'],
    ['Day 3', 'Gunji to Kuti', 'Village stay at 3,800 m. Acclimatise.'],
    ['Day 4', 'Kuti to Jolingkong', 'High road to the Adi Kailash viewpoint at 4,572 m and Parvati Sarovar.'],
    ['Day 5', 'Om Parvat', 'Drive to the Om Parvat viewpoint and return to Gunji.'],
    ['Day 6–7', 'Gunji to Dharchula', 'Back down the valley with buffer days for landslides and weather.'],
    ['Day 8–9', 'Dharchula to Departure', 'Farewell dinner and drive out to the railhead.'],
  ],
}

export const tripFaq = [
  ['Do I need to bring my own vehicle?', 'No. The 4x4 and driver-guide are included. Self-drive options can be arranged on request.'],
  ['Is there a fitness requirement?', 'Hard routes need a basic fitness level. We build rest days in and carry oxygen above 4,500 m.'],
  [
    'What should I pack?',
    'Layers, a warm jacket, sunglasses, sunscreen, personal medicines and a power bank. We send a full list after booking.',
  ],
  ['Can I get a refund if I cancel?', 'See our refund policy page. Date changes are free up to 30 days before departure.'],
]

// Placeholder answers: verify each against real policy.
export const faq = {
  headline: 'Faq',
  intro: 'Everything people ask before they book. Missing something? Message us.',
  groups: [
    {
      title: 'Booking',
      items: [
        [
          'How do I book a seat?',
          'Message us on WhatsApp or use the enquiry form. We share the itinerary and cost, and your seat is held once the deposit is paid.',
        ],
        ['How many people are on a convoy?', 'Maximum 8 vehicles per convoy, so every guest gets proper attention from the crew.'],
        ['Can I change my dates?', 'Yes. Date changes are free up to 30 days before departure.'],
        ['What is the cancellation and refund policy?', 'See the Refund policy page for the full terms.'],
      ],
    },
    {
      title: 'The Drive',
      items: [
        ['Do I need to bring my own vehicle?', 'No. The 4x4 and driver-guide are included. Self-drive options can be arranged on request.'],
        [
          'Do I need 4x4 driving experience?',
          'No. You need to be curious and ready for long days. The crew briefs you before every route.',
        ],
        [
          'What if a road is closed or the weather turns?',
          'The lead makes the call and reroutes or holds a day. Safety always comes before the schedule.',
        ],
      ],
    },
    {
      title: 'Safety + Health',
      items: [
        [
          'How do you handle altitude sickness?',
          'Routes include rest days and gradual altitude gain. Crew are wilderness-first-aid trained and we carry oxygen above 4,500 m.',
        ],
        ['Is there phone network on the route?', 'Often not. Every convoy carries a sat phone and VHF radios.'],
        [
          'Is it suitable for children and seniors?',
          'Easy routes such as Rajasthan and Kutch suit most ages. Tell us about any medical condition when you book.',
        ],
      ],
    },
    {
      title: 'Packing + Stays',
      items: [
        [
          'What should I pack?',
          'Layers, a warm jacket, sunglasses, sunscreen, personal medicines and a power bank. We send a full list after booking.',
        ],
        ['Where do we stay?', 'Camps, homestays and guesthouses chosen for each route. Hot meals are included.'],
        [
          'Who arranges permits?',
          'We do. Send your ID after booking and Inner Line and protected-area permits are handled before you leave.',
        ],
      ],
    },
  ],
}
