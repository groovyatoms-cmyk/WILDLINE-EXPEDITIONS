// All editable copy, numbers and dates live here.
export const site = {
  name: 'WILDLINE',
  fullName: 'WILDLINE EXPEDITIONS',
  tagline: 'Far roads. Good company.',
  whatsapp: '919000000000', // digits only, with country code
  email: 'roll@wildline.example',
  instagram: 'https://instagram.com/wildline.expeditions',
  youtube: 'https://youtube.com/@wildline.expeditions',
  copyright: '© 2026 WILDLINE EXPEDITIONS',
}

// Frames per shot. Mobile set = every 2nd frame, 1080px wide (see README).
export const frames = { count: 200, mobileCount: 100, w: 1920, mw: 1080 }

// Film layout: fractions of the pinned scroll film (0–1).
export const film = { heightVh: 1200, shot1End: 0.45, shot2Start: 0.55, shot2End: 0.9 }

export const chapters = {
  start: 'WILDLINE',
  run: 'THE RUN',
  valley: 'INTO THE VALLEY',
  basin: 'MIGHTY SPITI ROUTE',
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
  { name: 'CHANGTHANG TRAVERSE', days: 10, alt: '5,360 m', season: 'Jun–Sep', price: '₹1,45,000', still: 'frames/shot2/0100.webp', alt_text: 'Convoy parked beside a high-altitude lake at dawn' },
  { name: 'SPITI LOOP', days: 8, alt: '4,590 m', season: 'May–Oct', price: '₹98,000', still: 'frames/shot1/0100.webp', alt_text: 'Line of 4x4s passing whitewashed stone houses and prayer flags' },
  { name: 'THAR DUNE RUN', days: 6, alt: '250 m', season: 'Nov–Feb', price: '₹62,000', still: 'frames/shot2/0180.webp', alt_text: 'Dune camp with a small fire at golden hour' },
  { name: 'SPITI EXPEDITION', days: 9, alt: '4,590 m', season: 'May–Oct', price: '₹1,05,000', still: 'frames/shot1/0060.webp', alt_text: 'Convoy climbing a switchback road above the Spiti valley' },
  { name: 'LADAKH EXPEDITION', days: 12, alt: '5,359 m', season: 'Jun–Sep', price: '₹1,65,000', still: 'frames/shot2/0060.webp', alt_text: 'Convoy crossing a high pass in Ladakh' },
  { name: 'ARUNACHAL EXPEDITION', days: 11, alt: '4,170 m', season: 'Apr–Jun, Oct–Nov', price: '₹1,35,000', still: 'frames/shot1/0150.webp', alt_text: 'Convoy on a mountain road through Arunachal forest toward Sela Pass' },
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
  ],
}

export const join = {
  headline: 'JOIN THE NEXT CONVOY.',
  dates: [
    { date: '14 JUN 2026', trip: 'CHANGTHANG TRAVERSE', seats: 3 },
    { date: '02 JUL 2026', trip: 'SPITI LOOP', seats: 5 },
    { date: '11 NOV 2026', trip: 'THAR DUNE RUN', seats: 6 },
  ],
}

export const menuLinks = [
  { label: 'Expeditions', href: '#expeditions' },
  { label: 'The Crew', href: '#crew' },
  { label: 'Join', href: '#join' },
  { label: 'Contact', href: '#contact' },
]
