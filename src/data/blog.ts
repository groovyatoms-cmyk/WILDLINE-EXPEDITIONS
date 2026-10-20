import { about, crew, faq, join, tripDetails, tripItinerary, tripSlug, trips } from '@/data/site'
import { MONTHS, inSeason } from '@/lib/season'

// Every post is assembled from the site's own data (routes, itineraries, seasons, crew commitments, FAQ), so what the blog says
// can never drift from what the rest of the site says. Add a post by adding an entry to POSTS.
type Block = { t: 'h2' | 'p' | 'quote'; text: string } | { t: 'ul'; items: string[] }
export type Post = {
  slug: string
  title: string
  description: string
  tag: string
  date: string // ISO, the day the post went live
  cover: string // a frame in /public
  trip?: string // slug of the expedition the post leads to
  blocks: Block[]
}

const find = (slug: string) => {
  const t = trips.find((x) => tripSlug(x) === slug)
  if (!t) throw new Error(`blog: no expedition with slug "${slug}"`)
  return t
}
const days = (s: string) => s.replace('DAY ', 'Day ')
const metres = (t: { alt: string }) => parseInt(t.alt.replace(/,/g, ''), 10)
const spec = (k: string) => crew.specs.find(([n]) => n.toLowerCase() === k.toLowerCase())?.[1] ?? ''
const answer = (q: string) => faq.groups.flatMap((g) => g.items).find(([x]) => x === q)?.[1] ?? ''
const DATE = '2026-10-20'

const ladakh = find('ladakh'),
  spiti = find('spiti'),
  winter = find('winter-spiti')
const L = tripDetails.ladakh!,
  S = tripDetails.spiti!,
  W = tripDetails['winter-spiti']!

// Which routes run in each month, read straight from the season of every trip.
const calendar = MONTHS.map(
  (m, i) =>
    `${m}: ${trips
      .filter((t) => inSeason(t.season, i))
      .map((t) => t.name.replace(' Expedition', ''))
      .join(', ')}`,
)
const highest = [...trips].sort((a, b) => metres(b) - metres(a)).slice(0, 5)

export const POSTS: Post[] = [
  {
    slug: 'ladakh-4x4-road-trip-guide',
    title: 'Ladakh by 4x4: the route, day by day',
    description: `${ladakh.days} days, up to ${ladakh.alt}: where the Wildline Ladakh convoy goes each day, and what to expect at altitude.`,
    tag: 'Route guide',
    date: DATE,
    cover: ladakh.still,
    trip: 'ladakh',
    blocks: [
      { t: 'p', text: L.overview },
      { t: 'h2', text: 'The route' },
      { t: 'p', text: L.route.join(' → ') },
      { t: 'h2', text: 'Day by day' },
      ...(tripItinerary.ladakh ?? []).map(([d, title, text]): Block => ({ t: 'p', text: `${days(d)}, ${title.toLowerCase()}. ${text}` })),
      { t: 'h2', text: 'What you will see' },
      { t: 'ul', items: L.highlights },
      { t: 'h2', text: 'When it runs' },
      {
        t: 'p',
        text: `The Ladakh convoy runs ${ladakh.season.replace('–', ' to ')}, over ${ladakh.days} days, from ${ladakh.price} per person. We rate it ${L.level.toLowerCase()}. ${spec('Comms')}.`,
      },
      { t: 'quote', text: spec('Acclimatisation') },
    ],
  },
  {
    slug: 'best-time-for-a-himalayan-4x4-trip',
    title: 'When to go: reading the season calendar',
    description: 'Which of our routes run in which month, from the high passes in summer to the desert and the Ghats in winter.',
    tag: 'Planning',
    date: DATE,
    cover: spiti.still,
    blocks: [
      { t: 'p', text: about.body[7] },
      { t: 'h2', text: 'Month by month' },
      { t: 'ul', items: calendar },
      { t: 'h2', text: 'How we use this' },
      { t: 'p', text: `Roads close and passes shut by noon, so the route follows the season, not the schedule. ${spec('Weather calls')}.` },
      {
        t: 'p',
        text: `If your dates are fixed, tell us the month and we will point you to the routes that run then. Date changes are free up to 30 days before departure.`,
      },
    ],
  },
  {
    slug: 'how-a-wildline-convoy-runs',
    title: 'How a Wildline convoy runs, from booking to the drive home',
    description: 'Eight vehicles, one pace: the four steps of a convoy and what travels with every one.',
    tag: 'Inside the convoy',
    date: DATE,
    cover: 'frames/shot2/0030.webp',
    blocks: [
      { t: 'p', text: about.body[1] },
      { t: 'h2', text: 'Four steps' },
      ...join.steps.map(([h, p]): Block => ({ t: 'p', text: `${h.replace(/^\d+\s/, '')}. ${p}` })),
      { t: 'h2', text: 'What travels with you' },
      { t: 'ul', items: crew.specs.slice(0, 8).map(([k, v]) => `${k}: ${v}`) },
      { t: 'quote', text: 'We keep groups small on purpose. Nobody is a number on a manifest.' },
      { t: 'p', text: about.body[6] },
    ],
  },
  {
    slug: 'altitude-and-acclimatisation',
    title: 'Altitude and acclimatisation: how we build rest into the route',
    description:
      'Rest days, oxygen above 4,500 m and an evacuation plan agreed before we roll out. What a high route looks like on our convoys.',
    tag: 'Safety',
    date: DATE,
    cover: 'frames/shot1/0299.webp',
    blocks: [
      { t: 'p', text: answer('How do you handle altitude sickness?') },
      { t: 'h2', text: 'Rest days are part of the plan' },
      { t: 'p', text: spec('Acclimatisation') + '.' },
      { t: 'h2', text: 'Oxygen and first aid' },
      { t: 'p', text: `${spec('Oxygen')}. ${spec('Medical')}.` },
      { t: 'h2', text: 'If someone is unwell' },
      { t: 'p', text: `${spec('Evacuation')}. ${spec('Weather calls')}.` },
      { t: 'h2', text: 'The highest routes' },
      { t: 'ul', items: highest.map((t) => `${t.name.replace(' Expedition', '')}: up to ${t.alt}, ${t.days} days`) },
      {
        t: 'quote',
        text: 'This is not medical advice. Talk to your doctor before you book a high-altitude trip, and tell us about any medical condition when you book.',
      },
    ],
  },
  {
    slug: 'spiti-in-summer-and-winter',
    title: 'Spiti in summer and in winter',
    description: `Two very different convoys over the same valley: ${spiti.season} and ${winter.season}.`,
    tag: 'Route guide',
    date: DATE,
    cover: winter.still,
    trip: 'spiti',
    blocks: [
      {
        t: 'p',
        text: 'The same villages, two completely different journeys. Here is how our Spiti and Winter Frozen Spiti expeditions compare.',
      },
      { t: 'h2', text: `Spiti, ${spiti.season}` },
      { t: 'p', text: `${S.overview} ${spiti.days} days, up to ${spiti.alt}, from ${spiti.price}.` },
      { t: 'ul', items: S.highlights },
      { t: 'h2', text: `Winter Frozen Spiti, ${winter.season}` },
      { t: 'p', text: `${W.overview} ${winter.days} days, up to ${winter.alt}, from ${winter.price}.` },
      { t: 'ul', items: W.highlights },
      { t: 'h2', text: 'Which one is for you' },
      {
        t: 'p',
        text: `Summer is ${S.level.toLowerCase()} and the roads are open for most of the season. Winter is ${W.level.toLowerCase()}: winter-fitted vehicles, extra rest days and a crew that knows ice.`,
      },
    ],
  },
  {
    slug: 'permits-and-paperwork',
    title: 'Permits and paperwork: what we handle for you',
    description: 'Inner Line and protected-area permits are arranged before you leave. What we ask of you, and when.',
    tag: 'Planning',
    date: DATE,
    cover: 'frames/shot1/0449.webp',
    blocks: [
      { t: 'p', text: answer('Who arranges permits?') },
      { t: 'h2', text: 'What we need from you' },
      { t: 'p', text: join.steps[2][1] },
      { t: 'h2', text: 'What we take care of' },
      { t: 'p', text: `${spec('Permits')}.` },
    ],
  },
]

export const post = (slug: string) => POSTS.find((p) => p.slug === slug)
export const readMinutes = (p: Post) =>
  Math.max(
    1,
    Math.round(
      p.blocks
        .map((b) => (b.t === 'ul' ? b.items.join(' ') : b.text))
        .join(' ')
        .split(/\s+/).length / 200,
    ),
  )
