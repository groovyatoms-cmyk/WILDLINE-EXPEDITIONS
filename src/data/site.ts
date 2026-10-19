// All editable copy, numbers and dates live here.
export const site = {
  name: 'WILDLINE',
  fullName: 'WILDLINE EXPEDITIONS',
  tagline: 'Far roads. Good company.',
  whatsapp: '919000000000', // digits only, with country code
  email: 'roll@wildline.example',
  facebook: 'https://facebook.com/wildline.expeditions',
  instagram: 'https://instagram.com/wildline.expeditions',
  youtube: 'https://youtube.com/@wildline.expeditions',
  copyright: '© 2026 WILDLINE EXPEDITIONS',
}

// Frames per shot. Mobile set = every 2nd frame, 1080px wide (see README).
// Per shot: shot 1 is 23 s of footage so it gets ~26 fps worth of frames; shot 2 is 10 s at ~20 fps.
// w / mw = widest decoded frame (desktop / mobile) and must match the exported files.
export const frames = {
  1: { count: 600, mobileCount: 300, w: 1280, mw: 720 },
  2: { count: 200, mobileCount: 100, w: 1920, mw: 1080 },
}

// Film layout: fractions of the pinned scroll film (0–1).
export const film = { heightVh: 1200, shot1End: 0.45, shot2Start: 0.55, shot2End: 0.9 }

export const chapters = {
  start: 'THE WILDLINE',
  run: 'THE RUN',
  valley: "NO MAN'S LAND",
  basin: 'ROUTE SPITI',
  // optional additions, in route order
  pass: 'KUNZUM PASS',
  lake: 'CHANDRATAL',
  village: 'ROOF OF THE WORLD',
  end: 'THE LONG WAY HOME',
}

export const bigLines = [
  { at: 0.05, text: 'NO ROAD. NO PROBLEM.' },
  { at: 0.1,  text: 'LEAVE THE TARMAC.' },
  { at: 0.17, text: 'AIR DOWN. GEAR UP.' },
  { at: 0.25, text: 'CROSS THE PASS.' },
  { at: 0.32, text: 'THE TRAIL DECIDES.' },
  { at: 0.4,  text: 'FIND THE EDGE.' },
  // { at: 0.47, text: 'MUD IS A LANGUAGE.' },
  { at: 0.56, text: 'BUILT FOR THE LONG WAY.' },
  { at: 0.78,  text: 'WE DRIVE TOGETHER.' },
  { at: 0.90,  text: 'THE EXPEDITION BEGINS.' },
]

export const stats = {
  at: 0.65,
  items: [
    { value: 48000, label: 'KM DRIVEN' },
    { value: 32, label: 'PASSES CROSSED' },
    { value: 5360, label: 'M HIGHEST CAMP' },
    { value: 120, label: 'CONVOYS LED' },
    // optional additions
    { value: 14, label: 'EXPEDITIONS A YEAR' },
    { value: 0, label: 'PAVED ROADS' },
  ],
}

// Decimal degrees; formatted as 34°09′N in Coordinates.
export const route = {
  from: { lat: 34.15, lon: 77.5833, alt: 3500 },
  to: { lat: 33.75, lon: 78.6667, alt: 4350 },
}

type Trip = { name: string; slug?: string; days: number; alt: string; season: string; price: string; still: string; alt_text: string }

export const trips: Trip[] = [
  { name: 'WINTER FROZEN SPITI EXPEDITION', slug: 'winter-spiti', days: 9, alt: '4,400 m', season: 'Jan–Mar', price: '₹1,45,000', still: 'frames/shot1/0088.webp', alt_text: 'Convoy driving a snow-covered road through the frozen Spiti valley' },
  { name: 'ADI KAILASH EXPEDITION', slug: 'adi-kailash', days: 9, alt: '4,572 m', season: 'May–Jun, Sep–Oct', price: '₹1,25,000', still: 'frames/shot2/0020.webp', alt_text: 'Convoy on the high road toward Adi Kailash in the Kumaon Himalaya' },
  { name: 'NEPAL EXPEDITION', days: 10, alt: '3,800 m', season: 'Mar–May, Sep–Nov', price: '₹1,50,000', still: 'frames/shot1/0359.webp', alt_text: 'Convoy on a mountain road above a Himalayan valley in Nepal' },
  { name: 'EXPLORE ZANSKAR EXPEDITION', slug: 'zanskar', days: 9, alt: '4,401 m', season: 'Jun–Sep', price: '₹1,20,000', still: 'frames/shot2/0140.webp', alt_text: 'Convoy on the high road to Zanskar over Pensi La' },
  { name: 'LADAKH EXPEDITION', days: 12, alt: '5,359 m', season: 'Jun–Sep', price: '₹1,65,000', still: 'frames/shot2/0060.webp', alt_text: 'Convoy crossing a high pass in Ladakh' },
  { name: 'SPITI EXPEDITION', days: 9, alt: '4,590 m', season: 'May–Oct', price: '₹1,05,000', still: 'frames/shot1/0179.webp', alt_text: 'Convoy climbing a switchback road above the Spiti valley' },
  { name: 'ARUNACHAL EXPEDITION', days: 11, alt: '4,170 m', season: 'Apr–Jun, Oct–Nov', price: '₹1,35,000', still: 'frames/shot1/0449.webp', alt_text: 'Convoy on a mountain road through Arunachal forest toward Sela Pass' },
  { name: 'SIKKIM EXPEDITION', days: 8, alt: '5,100 m', season: 'Apr–Jun, Sep–Nov', price: '₹95,000', still: 'frames/shot1/0299.webp', alt_text: 'Convoy on a mountain road toward Nathu La, Sikkim' },
  { name: 'KASHMIR EXPEDITION', days: 9, alt: '3,530 m', season: 'May–Sep', price: '₹1,10,000', still: 'frames/shot2/0100.webp', alt_text: 'Convoy on the Zojila road above Kashmir valleys' },
  { name: 'UTTARAKHAND EXPEDITION', days: 7, alt: '4,500 m', season: 'May–Jun, Sep–Oct', price: '₹78,000', still: 'frames/shot1/0179.webp', alt_text: 'Convoy climbing through Himalayan foothills in Uttarakhand' },
  { name: 'RAJASTHAN EXPEDITION', days: 6, alt: '250 m', season: 'Nov–Feb', price: '₹62,000', still: 'frames/shot2/0180.webp', alt_text: 'Dune camp with a small fire at golden hour in Rajasthan' },
  { name: 'KUTCH EXPEDITION', days: 5, alt: '50 m', season: 'Nov–Feb', price: '₹55,000', still: 'frames/shot2/0180.webp', alt_text: 'Convoy crossing the white salt desert of Kutch' },
  { name: 'MEGHALAYA EXPEDITION', days: 6, alt: '1,960 m', season: 'Oct–Apr', price: '₹68,000', still: 'frames/shot1/0449.webp', alt_text: 'Convoy on a forest road in the Meghalaya hills' },
  { name: 'WESTERN GHATS EXPEDITION', days: 7, alt: '1,800 m', season: 'Oct–Feb', price: '₹70,000', still: 'frames/shot1/0299.webp', alt_text: 'Convoy on a misty ghat road in the Western Ghats' },
]

export const crew = {
  headline: 'BUILT TO GET YOU THERE. BUILT TO GET YOU BACK.',
  specs: [
    ['LEAD + SWEEP', 'Two crew vehicles bracket every convoy'],
    ['RECOVERY', 'Winches and recovery boards on every car'],
    ['COMMS', 'Sat phone + VHF, no dead zones'],
    ['MECHANIC', 'On-convoy mechanic, spares in the sweep'],
    ['OXYGEN', 'Oxygen support above 4,500 m'],
    ['PACE', 'Max 8 vehicles. We wait for the slowest car.'],
    ['MEDICAL', 'Wilderness-first-aid trained crew, full medical kit, AMS protocol'],
    ['ACCLIMATISATION', 'Built-in rest days and gradual altitude gain on every high route'],
    ['PERMITS', 'Inner Line and protected-area permits handled before you leave'],
    ['STAYS', 'Camps, homestays and guesthouses chosen for the route, hot meals included'],
    ['FUEL + RANGE', 'Fuel caches and jerry cans for stretches with no pumps'],
    ['BRIEFING', 'Pre-trip route, gear and driving briefing for every guest'],
    ['EVACUATION', 'Emergency evacuation plan and nearest-hospital map for every day of the route'],
    ['VEHICLE CHECK', 'Daily pre-drive inspection of tyres, fluids and brakes on every car'],
    ['WEATHER CALLS', 'Route-closure and weather decisions made by the lead, never by the schedule'],
    ['DRIVING SUPPORT', 'Crew coaching on water crossings, loose gravel and steep descents'],
  ],
}

export const about = {
  headline: 'ABOUT US',
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
    ['2016', 'FIRST CONVOY'],
    ['48,000+', 'KM DRIVEN'],
    ['120+', 'CONVOYS LED'],
    ['10', 'STATES COVERED'],
  ],
}

// Placeholder people: replace names, roles and bios with the real crew.
// Add `photo: 'team/name.webp'` (file in public/) to a member to replace the grey placeholder box.
type Member = { name: string; role: string; bio: string; photo?: string }

export const team = {
  headline: 'OUR CORE TEAM',
  members: <Member[]>[
    { name: 'Team Member 01', role: 'FOUNDER + LEAD GUIDE', bio: 'Short bio goes here. Add a line or two about experience and what this person does on the road.' },
    { name: 'Team Member 02', role: 'HEAD OF RECOVERY', bio: 'Short bio goes here. Add a line or two about experience and what this person does on the road.' },
    { name: 'Team Member 03', role: 'MEDICAL LEAD', bio: 'Short bio goes here. Add a line or two about experience and what this person does on the road.' },
    { name: 'Team Member 04', role: 'ROUTES + PERMITS', bio: 'Short bio goes here. Add a line or two about experience and what this person does on the road.' },
  ],
}

// Placeholder roles: replace with real openings.
export const careers = {
  headline: 'CAREERS',
  intro: 'Love the mountains, machines and good company? Join the crew that gets convoys there and back. Send your CV and a few lines about yourself.',
  roles: [
    { icon: 'car', title: 'LEAD DRIVER-GUIDE', type: 'Seasonal · Leh / Manali', desc: '5+ years of high-altitude 4x4 driving. Leads a convoy, makes the safety calls, keeps guests calm and moving.' },
    { icon: 'wrench', title: 'RECOVERY + MECHANIC', type: 'Seasonal · Sweep vehicle', desc: 'Winching, recovery and field repairs. Keeps every car running and the sweep vehicle stocked.' },
    { icon: 'clipboard', title: 'TRIP OPERATIONS EXECUTIVE', type: 'Full-time · Office', desc: 'Permits, stays, vehicles and guest briefings. Makes sure everything is booked before the convoy rolls.' },
    { icon: 'camera', title: 'CONTENT + PHOTOGRAPHER', type: 'Seasonal / Freelance', desc: 'Shoots photo and video on the road for our channels and guests. Drone licence is a plus.' },
  ],
  cta: 'APPLY BY EMAIL',
  subject: 'Application: ',
}

export const join = {
  headline: 'JOIN THE NEXT CONVOY.',
  dates: [
    { date: '14 JUN 2026', trip: 'LADAKH EXPEDITION', seats: 3 },
    { date: '02 JUL 2026', trip: 'SPITI EXPEDITION', seats: 5 },
    { date: '20 SEP 2026', trip: 'ARUNACHAL EXPEDITION', seats: 4 },
    { date: '05 OCT 2026', trip: 'SIKKIM EXPEDITION', seats: 6 },
    { date: '11 NOV 2026', trip: 'RAJASTHAN EXPEDITION', seats: 6 },
    { date: '06 DEC 2026', trip: 'KUTCH EXPEDITION', seats: 7 },
    { date: '16 JAN 2027', trip: 'WINTER FROZEN SPITI EXPEDITION', seats: 4 },
    { date: '12 JUL 2027', trip: 'EXPLORE ZANSKAR EXPEDITION', seats: 6 },
    { date: '14 MAR 2027', trip: 'NEPAL EXPEDITION', seats: 6 },
    { date: '06 JUN 2027', trip: 'ADI KAILASH EXPEDITION', seats: 5 },
  ],
  includes: ['4x4 + driver-guide', 'Permits', 'Stays + meals', 'Recovery crew', 'Oxygen + first aid'],
  excludes: ['Flights and train fares to the start point', 'Personal insurance', 'Fuel for personal vehicles on self-drive trips', 'Alcohol and personal expenses'],
  steps: [
    ['01 ENQUIRE', 'Message us on WhatsApp or use the enquiry form with your preferred trip and dates.'],
    ['02 CONFIRM', 'We share the itinerary and cost. Your seat is held once the deposit is paid.'],
    ['03 PREPARE', 'Send ID for permits. We send the packing list and book your pre-trip briefing call.'],
    ['04 ROLL OUT', 'Meet the crew at the start point, get the driving briefing, and the convoy leaves.'],
  ],
  policy: [
    'Group size is capped at 8 vehicles per convoy.',
    'Guests should be 18+ or travel with a guardian. Children are welcome on lower-altitude routes.',
    'A basic fitness level is needed for high-altitude routes. Tell us about any medical condition when you book.',
    'Departures can change or reroute for weather and road closures. Safety calls are made by the lead.',
  ],
  note: 'Seats confirm with a deposit. Free date change up to 30 days before departure.',
}

export const menuLinks = [
  { label: 'Expeditions', href: '/expeditions' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Core Team', href: '/team' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

// Placeholder office details: replace with the real address, phone and hours.
export const contact = {
  headline: 'CONTACT US',
  intro: 'Questions about a route, dates or gear? Reach the crew any way you like. We reply within one working day.',
  channels: [
    { icon: 'whatsapp', title: 'WHATSAPP', desc: 'Fastest way to reach us. Send a message any time.' },
    { icon: 'mail', title: 'EMAIL', desc: 'Itineraries, group bookings and press.' },
    { icon: 'phone', title: 'CALL', desc: 'Mon–Sat, 10:00–18:00 IST.' },
    { icon: 'map', title: 'OFFICE', desc: 'WILDLINE Expeditions, Leh, Ladakh 194101. Visits by appointment.' },
  ],
}

export const tripSlug = (t: { name: string; slug?: string }) => t.slug ?? t.name.split(' ')[0].toLowerCase()

// Placeholder detail copy per expedition (key = first word of the trip name, lowercase): verify routes and stops with the crew.
type TripDetail = { level: string; route: string[]; stops?: string[][]; overview: string; highlights: string[] }

export const tripDetails: Record<string, TripDetail | undefined> = {
  ladakh: { level: 'HARD', route: ['Leh', 'Khardung La', 'Nubra Valley', 'Pangong Tso', 'Tso Moriri', 'Leh'], overview: 'Our flagship run across the highest motorable passes in the world. Long days, thin air and landscapes that do not look real.', highlights: ['Khardung La and Chang La crossings', 'Camp by Pangong Tso', 'Nubra dunes and double-humped camels', 'Monasteries of Hemis and Thiksey'] },
  spiti: { level: 'HARD', route: ['Shimla', 'Kalpa', 'Nako', 'Tabo', 'Kaza', 'Langza', 'Hikkim', 'Key', 'Kaza', 'Shimla'], stops: [['Shimla', '2,276 m'], ['Kalpa', '2,960 m'], ['Nako', '3,662 m'], ['Tabo', '3,280 m'], ['Kaza', '3,800 m'], ['Langza', '4,400 m'], ['Hikkim', '4,400 m'], ['Key', '4,166 m']], overview: 'The cold desert circuit: Kinnaur apple valleys, cliff-edge roads, ancient monasteries and the highest villages in Spiti, with Kaza as the base.', highlights: ['Nako lake and village', 'Tabo monastery, a thousand years old', 'Langza fossils and the giant Buddha statue', 'Hikkim, the highest post office in the world', 'Key monastery on its hilltop'] },
  arunachal: { level: 'MODERATE', route: ['Guwahati', 'Bomdila', 'Sela Pass', 'Tawang', 'Dirang', 'Guwahati'], overview: 'Forest roads, rope bridges and the road to Tawang over Sela Pass, through the least-travelled corner of the Himalaya.', highlights: ['Sela Pass crossing', 'Tawang Monastery', 'Madhuri Lake', 'Homestays with local families'] },
  sikkim: { level: 'MODERATE', route: ['Gangtok', 'Tsomgo Lake', 'Nathu La', 'Lachen', 'Gurudongmar', 'Gangtok'], overview: 'Steep green valleys, border passes and a push to one of the highest lakes in the world.', highlights: ['Nathu La border pass', 'Gurudongmar Lake', 'Tsomgo Lake', 'Yumthang Valley'] },
  kashmir: { level: 'MODERATE', route: ['Srinagar', 'Sonamarg', 'Zojila', 'Kargil', 'Srinagar'], overview: 'Alpine meadows, the Zojila road and the long climb out of the valley into the high desert.', highlights: ['Zojila Pass', 'Dal Lake and Srinagar old city', 'Sonamarg meadows', 'Drass, the second-coldest inhabited place'] },
  uttarakhand: { level: 'MODERATE', route: ['Dehradun', 'Chopta', 'Joshimath', 'Mana', 'Auli', 'Dehradun'], overview: 'Himalayan foothills, river valleys and pilgrim roads, with a push to the last village before the Tibet border.', highlights: ['Mana, the last village', 'Chopta meadows', 'Auli ridge views', 'Alaknanda river gorge'] },
  rajasthan: { level: 'EASY', route: ['Jaipur', 'Jodhpur', 'Jaisalmer', 'Sam dunes', 'Jaipur'], overview: 'Forts, desert tracks and a dune camp under a clear sky. Our gentlest route and a good first convoy.', highlights: ['Dune camp with a fire', 'Jaisalmer Fort', 'Mehrangarh Fort', 'Village stops on desert tracks'] },
  kutch: { level: 'EASY', route: ['Bhuj', 'Dholavira', 'White Rann', 'Khavda', 'Bhuj'], overview: 'A flat white horizon, craft villages and an open-sky camp on the salt desert.', highlights: ['White Rann at sunset', 'Dholavira Harappan site', 'Craft villages of Khavda', 'Full-moon salt desert drive'] },
  meghalaya: { level: 'EASY', route: ['Guwahati', 'Shillong', 'Cherrapunji', 'Dawki', 'Guwahati'], overview: 'Wet forest roads, living root bridges and crystal rivers in the abode of the clouds.', highlights: ['Living root bridges', 'Dawki river', 'Cherrapunji waterfalls', 'Mawlynnong village'] },
  western: { level: 'EASY', route: ['Mumbai', 'Mahabaleshwar', 'Coorg', 'Munnar', 'Kochi'], overview: 'Misty ghat roads, tea estates and forest tracks down the length of the Western Ghats.', highlights: ['Misty ghat sections', 'Tea and coffee estates', 'Forest tracks in Coorg', 'Munnar hills'] },
  'winter-spiti': { level: 'EXTREME', route: ['Shimla', 'Narkanda', 'Kalpa', 'Nako', 'Tabo', 'Kaza', 'Langza', 'Hikkim', 'Key', 'Kaza', 'Shimla'], overview: 'Spiti in deep winter: temperatures near minus 25, a frozen river and empty snow roads. Access is only via Kinnaur, with winter-fitted vehicles, extra rest days and a crew that knows ice.', highlights: ['Frozen Spiti river and snow-covered monasteries', 'Winter-fitted 4x4s with chains and heated stays', 'Langza, Hikkim and Key under snow', 'A chance to spot the snow leopard around Kibber'] },
  zanskar: { level: 'HARD', route: ['Kargil', 'Sankoo', 'Parkachik', 'Rangdum', 'Pensi La', 'Padum', 'Karsha', 'Zangla', 'Padum', 'Kargil'], stops: [['Kargil', '2,676 m'], ['Parkachik', '3,700 m'], ['Rangdum', '3,800 m'], ['Pensi La', '4,401 m'], ['Padum', '3,657 m'], ['Karsha', '3,700 m'], ['Zangla', '3,700 m']], overview: 'The remote valley behind the Great Himalaya: the Suru valley, Pensi La and the old kingdom of Padum. Long gravel days, big skies and some of the quietest roads in the Himalaya.', highlights: ['Pensi La, the gateway to Zanskar', 'Rangdum monastery and the Suru valley', 'Karsha, the largest monastery in Zanskar', 'Zangla royal palace and village stays'] },
  nepal: { level: 'MODERATE', route: ['Kathmandu', 'Pokhara', 'Jomsom', 'Kagbeni', 'Muktinath', 'Tatopani', 'Pokhara', 'Kathmandu'], stops: [['Kathmandu', '1,400 m'], ['Pokhara', '820 m'], ['Jomsom', '2,720 m'], ['Kagbeni', '2,810 m'], ['Muktinath', '3,800 m'], ['Tatopani', '1,190 m']], overview: 'Overland through the heart of Nepal: Kathmandu valley, the lakes of Pokhara and the Kali Gandaki gorge, the deepest in the world, up to the sacred temple of Muktinath.', highlights: ['Kali Gandaki gorge drive to Jomsom', 'Muktinath temple and Kagbeni village', 'Pokhara lakeside and Annapurna views', 'Hot springs at Tatopani'] },
  'adi-kailash': { level: 'HARD', route: ['Dharchula', 'Gunji', 'Kuti', 'Jolingkong', 'Om Parvat viewpoint', 'Gunji', 'Dharchula'], stops: [['Dharchula', '950 m'], ['Gunji', '3,200 m'], ['Kuti', '3,800 m'], ['Jolingkong', '4,572 m'], ['Om Parvat viewpoint', '4,200 m']], overview: 'Pilgrimage and expedition in one: the Kumaon road along the Kali river to the Adi Kailash peak, Parvati Sarovar and the Om Parvat. Inner Line permits are handled by us.', highlights: ['Adi Kailash peak and Parvati Sarovar lake', 'Om Parvat, with the Om formed in snow', 'Gunji and the villages of the Vyas valley', 'The Kali river gorge road from Dharchula'] },
}

// Placeholder day-by-day plans (key = tripSlug): [day range, title, what happens]. Verify with the crew.
export const tripItinerary: Record<string, string[][] | undefined> = {
  ladakh: [
    ['DAY 1–2', 'ARRIVE LEH', 'Airport pickup, briefing, vehicle check. Two full rest days to acclimatise at 3,500 m.'],
    ['DAY 3', 'LEH TO NUBRA VALLEY', 'Over Khardung La (5,359 m) to the Nubra dunes. Camp in the valley.'],
    ['DAY 4–5', 'NUBRA TO PANGONG TSO', 'Via Shyok river and Agham route to the lake. Two nights lakeside.'],
    ['DAY 6–7', 'PANGONG TO TSO MORIRI', 'Chang La and the high plateau of Changthang. Wildlife stops, camp by the lake.'],
    ['DAY 8–9', 'TSO MORIRI TO LEH', 'Remote Mahe route, hot springs and monastery visits on the way back.'],
    ['DAY 10–12', 'RESERVE + FAREWELL', 'Buffer days for weather, Hemis and Thiksey monasteries, farewell dinner, departure.'],
  ],
  spiti: [
    ['DAY 1', 'SHIMLA TO KALPA', 'Foothills to the Kinnaur apple belt. Views of Kinner Kailash.'],
    ['DAY 2', 'KALPA TO NAKO', 'Cliff-edge Hindustan-Tibet road into Spiti, ending at Nako lake.'],
    ['DAY 3', 'NAKO TO TABO', 'Cold desert valley and Tabo monastery, over a thousand years old.'],
    ['DAY 4', 'TABO TO KAZA', 'Drive to Kaza, the Spiti base. Acclimatise at 3,800 m.'],
    ['DAY 5–6', 'LANGZA, HIKKIM AND KEY', 'Fossil village Langza and its Buddha statue, Hikkim with the highest post office, then Key monastery. Back to Kaza, with a buffer day for weather.'],
    ['DAY 7–9', 'KAZA TO SHIMLA', 'Return the way we came, overnight en route, farewell dinner in Shimla.'],
  ],
  arunachal: [
    ['DAY 1', 'GUWAHATI TO BOMDILA', 'Cross into Arunachal, permit checks, drive up through forest.'],
    ['DAY 2–3', 'BOMDILA TO DIRANG', 'Apple orchards, hot springs and Sherpa villages.'],
    ['DAY 4–5', 'SELA PASS TO TAWANG', 'Over Sela (4,170 m), Jaswant Garh, Nuranang falls and into Tawang.'],
    ['DAY 6–7', 'TAWANG', 'Tawang Monastery, Madhuri Lake and Bum La viewpoint.'],
    ['DAY 8–11', 'RETURN VIA ZEMITHANG', 'Slow return on a different road, village homestays, Guwahati farewell.'],
  ],
  sikkim: [
    ['DAY 1', 'ARRIVE GANGTOK', 'Briefing, permits, local market walk.'],
    ['DAY 2', 'TSOMGO AND NATHU LA', 'Frozen-lake altitude and the Indo-China border pass (4,310 m).'],
    ['DAY 3–4', 'GANGTOK TO LACHEN', 'North Sikkim road, waterfalls and the Teesta gorge.'],
    ['DAY 5', 'GURUDONGMAR LAKE', 'Pre-dawn drive to 5,100 m. Back to Lachen for the night.'],
    ['DAY 6–8', 'YUMTHANG AND RETURN', 'Valley of Flowers, hot springs, return to Gangtok and farewell.'],
  ],
  kashmir: [
    ['DAY 1–2', 'SRINAGAR', 'Dal Lake shikara, old city, Mughal gardens. Acclimatise.'],
    ['DAY 3', 'SONAMARG', 'Meadows, Thajiwas glacier and Sindh river.'],
    ['DAY 4–5', 'ZOJILA TO KARGIL', 'Crossing Zojila (3,530 m), Drass and the Kargil memorial.'],
    ['DAY 6–7', 'KARGIL TO SURU VALLEY', 'Rangdum monastery and Suru valley peaks.'],
    ['DAY 8–9', 'RETURN TO SRINAGAR', 'Back over Zojila, farewell dinner.'],
  ],
  uttarakhand: [
    ['DAY 1', 'DEHRADUN TO RISHIKESH', 'Briefing, Ganga aarti, overnight on the river.'],
    ['DAY 2–3', 'CHOPTA', 'Rudraprayag, Ukhimath and the Chopta meadows. Tungnath trek optional.'],
    ['DAY 4', 'JOSHIMATH', 'Alaknanda gorge road and Karnaprayag.'],
    ['DAY 5', 'MANA VILLAGE', 'Badrinath and the last village before the Tibet border.'],
    ['DAY 6–7', 'AULI AND RETURN', 'Ridge views of Nanda Devi, descend to Dehradun.'],
  ],
  rajasthan: [
    ['DAY 1', 'JAIPUR', 'Arrive, briefing, Amber Fort at sunset.'],
    ['DAY 2', 'JAIPUR TO JODHPUR', 'Village stops, Mehrangarh Fort and the blue city.'],
    ['DAY 3', 'JODHPUR TO JAISALMER', 'Desert highway, Jaisalmer Fort walk.'],
    ['DAY 4', 'SAM DUNES', 'Dune bashing, camel ride, campfire and dinner under the stars.'],
    ['DAY 5–6', 'RETURN TO JAIPUR', 'Slow return on desert tracks, farewell dinner.'],
  ],
  kutch: [
    ['DAY 1', 'ARRIVE BHUJ', 'Briefing, Aina Mahal and the old town.'],
    ['DAY 2', 'DHOLAVIRA', 'Harappan site, fossil park and the Great Rann edge.'],
    ['DAY 3', 'WHITE RANN', 'Salt desert drive, sunset and an open-sky camp.'],
    ['DAY 4', 'KHAVDA AND NIRONA', 'Craft villages: bandhani, rogan art and copper bells.'],
    ['DAY 5', 'RETURN TO BHUJ', 'Farewell and departure.'],
  ],
  meghalaya: [
    ['DAY 1', 'GUWAHATI TO SHILLONG', 'Cross into the hills, Umiam lake stop.'],
    ['DAY 2', 'SHILLONG', 'Elephant Falls, Shillong Peak and Don Bosco museum.'],
    ['DAY 3', 'CHERRAPUNJI', 'Nohkalikai falls and double-decker root bridge trek.'],
    ['DAY 4', 'MAWLYNNONG AND DAWKI', 'Cleanest village in Asia and the glass-clear Umngot river.'],
    ['DAY 5–6', 'RETURN TO GUWAHATI', 'Cave stop at Mawsmai, farewell dinner.'],
  ],
  western: [
    ['DAY 1', 'MUMBAI TO MAHABALESHWAR', 'Briefing, ghat climb, strawberry farms.'],
    ['DAY 2–3', 'MAHABALESHWAR TO COORG', 'Forest roads, coffee estates and Namdroling monastery.'],
    ['DAY 4–5', 'COORG TO MUNNAR', 'Wayanad ghat sections, spice plantations.'],
    ['DAY 6', 'MUNNAR', 'Tea estates, Eravikulam park, sunrise at Top Station.'],
    ['DAY 7', 'MUNNAR TO KOCHI', 'Descend to the coast, farewell dinner.'],
  ],
  'winter-spiti': [
    ['DAY 1', 'SHIMLA TO KALPA', 'Winter briefing, chains and gear check. Drive up the Kinnaur road with snow on the peaks.'],
    ['DAY 2', 'KALPA TO NAKO', 'Icy hairpins on the Hindustan-Tibet road to a frozen Nako lake.'],
    ['DAY 3', 'NAKO TO TABO', 'Snow desert valley and Tabo monastery in winter silence.'],
    ['DAY 4', 'TABO TO KAZA', 'Short drive to Kaza. Slow acclimatisation at 3,800 m.'],
    ['DAY 5–6', 'LANGZA, HIKKIM AND KEY', 'Snow-covered villages and monasteries, with a rest day for the cold and a chance to look for the snow leopard.'],
    ['DAY 7–9', 'KAZA TO SHIMLA', 'Return through Kinnaur with buffer for snow and road closures, farewell dinner in Shimla.'],
  ],
  zanskar: [
    ['DAY 1', 'ARRIVE KARGIL', 'Briefing, vehicle check and permits. Rest at 2,676 m.'],
    ['DAY 2', 'KARGIL TO PARKACHIK', 'Up the Suru valley past Sankoo, with first views of Nun and Kun.'],
    ['DAY 3', 'PARKACHIK TO RANGDUM', 'Open green valley and Rangdum monastery on its ridge.'],
    ['DAY 4', 'RANGDUM TO PADUM', 'Over Pensi La (4,401 m) and down into Zanskar to the old capital, Padum.'],
    ['DAY 5', 'PADUM AND KARSHA', 'Rest day: Padum town and the hillside monastery of Karsha.'],
    ['DAY 6', 'STONGDE AND ZANGLA', 'Stongde monastery and the royal village of Zangla.'],
    ['DAY 7', 'PADUM TO RANGDUM', 'Back over Pensi La with time at the Drang Drung glacier viewpoint.'],
    ['DAY 8', 'RANGDUM TO KARGIL', 'Down the Suru valley, farewell dinner in Kargil.'],
    ['DAY 9', 'RESERVE DAY', 'Buffer for weather and road conditions, departure.'],
  ],
  nepal: [
    ['DAY 1', 'ARRIVE KATHMANDU', 'Briefing, border and vehicle paperwork, old-town walk.'],
    ['DAY 2', 'KATHMANDU TO POKHARA', 'Trishuli river road through terraced hills to the lakeside city.'],
    ['DAY 3', 'POKHARA', 'Rest day: Phewa lake and a sunrise viewpoint over Annapurna.'],
    ['DAY 4–5', 'POKHARA TO JOMSOM', 'Up the Kali Gandaki gorge on rough mountain track, with a night in the apple town of Marpha.'],
    ['DAY 6', 'KAGBENI AND MUKTINATH', 'Medieval Kagbeni and the temple of Muktinath at 3,800 m.'],
    ['DAY 7', 'JOMSOM TO TATOPANI', 'Down the gorge to the hot springs.'],
    ['DAY 8', 'TATOPANI TO POKHARA', 'Forest roads back to the lakes.'],
    ['DAY 9–10', 'POKHARA TO KATHMANDU', 'Highway back, farewell dinner, with a buffer day for landslides and weather.'],
  ],
  'adi-kailash': [
    ['DAY 1', 'ARRIVE DHARCHULA', 'Briefing, Inner Line permit checks and vehicle check.'],
    ['DAY 2', 'DHARCHULA TO GUNJI', 'Along the Kali river on the old Lipulekh trade route into the Vyas valley.'],
    ['DAY 3', 'GUNJI TO KUTI', 'Village stay at 3,800 m. Acclimatise.'],
    ['DAY 4', 'KUTI TO JOLINGKONG', 'High road to the Adi Kailash viewpoint at 4,572 m and Parvati Sarovar.'],
    ['DAY 5', 'OM PARVAT', 'Drive to the Om Parvat viewpoint and return to Gunji.'],
    ['DAY 6–7', 'GUNJI TO DHARCHULA', 'Back down the valley with buffer days for landslides and weather.'],
    ['DAY 8–9', 'DHARCHULA TO DEPARTURE', 'Farewell dinner and drive out to the railhead.'],
  ],
}

export const tripFaq = [
  ['Do I need to bring my own vehicle?', 'No. The 4x4 and driver-guide are included. Self-drive options can be arranged on request.'],
  ['Is there a fitness requirement?', 'Hard routes need a basic fitness level. We build rest days in and carry oxygen above 4,500 m.'],
  ['What should I pack?', 'Layers, a warm jacket, sunglasses, sunscreen, personal medicines and a power bank. We send a full list after booking.'],
  ['Can I get a refund if I cancel?', 'See our refund policy page. Date changes are free up to 30 days before departure.'],
]

// Placeholder answers: verify each against real policy.
export const faq = {
  headline: 'FAQ',
  intro: 'Everything people ask before they book. Missing something? Message us.',
  groups: [
    { title: 'BOOKING', items: [
      ['How do I book a seat?', 'Message us on WhatsApp or use the enquiry form. We share the itinerary and cost, and your seat is held once the deposit is paid.'],
      ['How many people are on a convoy?', 'Maximum 8 vehicles per convoy, so every guest gets proper attention from the crew.'],
      ['Can I change my dates?', 'Yes. Date changes are free up to 30 days before departure.'],
      ['What is the cancellation and refund policy?', 'See the Refund policy page for the full terms.'],
    ] },
    { title: 'THE DRIVE', items: [
      ['Do I need to bring my own vehicle?', 'No. The 4x4 and driver-guide are included. Self-drive options can be arranged on request.'],
      ['Do I need 4x4 driving experience?', 'No. You need to be curious and ready for long days. The crew briefs you before every route.'],
      ['What if a road is closed or the weather turns?', 'The lead makes the call and reroutes or holds a day. Safety always comes before the schedule.'],
    ] },
    { title: 'SAFETY + HEALTH', items: [
      ['How do you handle altitude sickness?', 'Routes include rest days and gradual altitude gain. Crew are wilderness-first-aid trained and we carry oxygen above 4,500 m.'],
      ['Is there phone network on the route?', 'Often not. Every convoy carries a sat phone and VHF radios.'],
      ['Is it suitable for children and seniors?', 'Easy routes such as Rajasthan and Kutch suit most ages. Tell us about any medical condition when you book.'],
    ] },
    { title: 'PACKING + STAYS', items: [
      ['What should I pack?', 'Layers, a warm jacket, sunglasses, sunscreen, personal medicines and a power bank. We send a full list after booking.'],
      ['Where do we stay?', 'Camps, homestays and guesthouses chosen for each route. Hot meals are included.'],
      ['Who arranges permits?', 'We do. Send your ID after booking and Inner Line and protected-area permits are handled before you leave.'],
    ] },
  ],
}
