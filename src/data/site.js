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
export const frames = { count: 200, mobileCount: 100, w: 1920, mw: 1080 }

// Film layout: fractions of the pinned scroll film (0–1).
export const film = { heightVh: 1200, shot1End: 0.45, shot2Start: 0.55, shot2End: 0.9 }

export const chapters = {
  start: 'THE WIDELINE',
  run: 'THE RUN',
  valley: 'INTO THE VALLEY',
  basin: 'ROUTE SPITI',
  expeditions: 'EXPEDITIONS',
  join: 'JOIN',
}

export const bigLines = [
  { at: 0.1, text: 'LEAVE THE TARMAC.' },
  { at: 0.25, text: 'CROSS THE PASS.' },
  { at: 0.4, text: 'FIND THE EDGE.' },
  { at: 0.8, text: 'WE DRIVE TOGETHER.' },
]

export const stats = {
  at: 0.65,
  items: [
    { value: 48000, label: 'KM' },
    { value: 32, label: 'PASSES' },
    { value: 5360, label: 'M HIGHEST CAMP' },
    { value: 120, label: 'CONVOYS' },
  ],
}

// Decimal degrees; formatted as 34°09′N in Coordinates.
export const route = {
  from: { lat: 34.15, lon: 77.5833, alt: 3500 },
  to: { lat: 33.75, lon: 78.6667, alt: 4350 },
}

export const trips = [
  { name: 'LADAKH EXPEDITION', days: 12, alt: '5,359 m', season: 'Jun–Sep', price: '₹1,65,000', still: 'frames/shot2/0060.webp', alt_text: 'Convoy crossing a high pass in Ladakh' },
  { name: 'SPITI EXPEDITION', days: 9, alt: '4,590 m', season: 'May–Oct', price: '₹1,05,000', still: 'frames/shot1/0060.webp', alt_text: 'Convoy climbing a switchback road above the Spiti valley' },
  { name: 'ARUNACHAL EXPEDITION', days: 11, alt: '4,170 m', season: 'Apr–Jun, Oct–Nov', price: '₹1,35,000', still: 'frames/shot1/0150.webp', alt_text: 'Convoy on a mountain road through Arunachal forest toward Sela Pass' },
  { name: 'SIKKIM EXPEDITION', days: 8, alt: '5,100 m', season: 'Apr–Jun, Sep–Nov', price: '₹95,000', still: 'frames/shot1/0100.webp', alt_text: 'Convoy on a mountain road toward Nathu La, Sikkim' },
  { name: 'KASHMIR EXPEDITION', days: 9, alt: '3,530 m', season: 'May–Sep', price: '₹1,10,000', still: 'frames/shot2/0100.webp', alt_text: 'Convoy on the Zojila road above Kashmir valleys' },
  { name: 'UTTARAKHAND EXPEDITION', days: 7, alt: '4,500 m', season: 'May–Jun, Sep–Oct', price: '₹78,000', still: 'frames/shot1/0060.webp', alt_text: 'Convoy climbing through Himalayan foothills in Uttarakhand' },
  { name: 'RAJASTHAN EXPEDITION', days: 6, alt: '250 m', season: 'Nov–Feb', price: '₹62,000', still: 'frames/shot2/0180.webp', alt_text: 'Dune camp with a small fire at golden hour in Rajasthan' },
  { name: 'KUTCH EXPEDITION', days: 5, alt: '50 m', season: 'Nov–Feb', price: '₹55,000', still: 'frames/shot2/0180.webp', alt_text: 'Convoy crossing the white salt desert of Kutch' },
  { name: 'MEGHALAYA EXPEDITION', days: 6, alt: '1,960 m', season: 'Oct–Apr', price: '₹68,000', still: 'frames/shot1/0150.webp', alt_text: 'Convoy on a forest road in the Meghalaya hills' },
  { name: 'WESTERN GHATS EXPEDITION', days: 7, alt: '1,800 m', season: 'Oct–Feb', price: '₹70,000', still: 'frames/shot1/0100.webp', alt_text: 'Convoy on a misty ghat road in the Western Ghats' },
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
  ],
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
  ],
  includes: ['4x4 + driver-guide', 'Permits', 'Stays + meals', 'Recovery crew', 'Oxygen + first aid'],
  note: 'Seats confirm with a deposit. Free date change up to 30 days before departure.',
}

export const menuLinks = [
  { label: 'Expeditions', href: '#expeditions' },
  { label: 'The Crew', href: '#crew' },
  { label: 'Join', href: '#join' },
  { label: 'Contact', href: '#contact' },
]
