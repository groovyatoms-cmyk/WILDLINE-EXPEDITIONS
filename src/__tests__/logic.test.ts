import { clamp01 } from '@/hooks/useScrollProgress'
import { film, join, trips, tripDetails, tripItinerary, tripSlug, site } from '@/data/site'
import { legal } from '@/data/legal'
import { timeline } from '@/lib/timeline'
import { wa } from '@/lib/enquire'

describe('clamp01', () => {
  it.each([[-1, 0], [0.4, 0.4], [7, 1]])('clamp01(%p) = %p', (x, want) => expect(clamp01(x)).toBe(want))
})

describe('timeline', () => {
  it('is at the start of shot 1 at p=0', () => expect(timeline(0)).toEqual({ t: 0, f1: 0, f2: 0 }))
  it('has finished shot 1 and not begun the cut at shot1End', () => {
    const r = timeline(film.shot1End)
    expect(r.f1).toBe(1)
    expect(r.t).toBe(0)
  })
  it('is fully in shot 2 at p=1', () => {
    const r = timeline(1)
    expect(r.t).toBe(1)
    expect(r.f2).toBe(1)
  })
  it('crossfades only between shot1End and shot2Start', () => {
    expect(timeline((film.shot1End + film.shot2Start) / 2).t).toBeCloseTo(0.5)
  })
})

describe('wa', () => {
  it('builds a plain chat link', () => expect(wa()).toBe(`https://wa.me/${site.whatsapp}`))
  it('encodes the message', () => expect(wa('Hi & bye')).toBe(`https://wa.me/${site.whatsapp}?text=Hi%20%26%20bye`))
})

describe('site data', () => {
  it('gives every trip a unique slug with details and an itinerary', () => {
    const slugs = trips.map(tripSlug)
    expect(new Set(slugs).size).toBe(trips.length)
    slugs.forEach((s) => {
      expect(tripDetails[s]).toBeDefined()
      expect(tripItinerary[s]?.length).toBeGreaterThan(0)
    })
  })
  it('only lists departures for real trips', () => {
    join.dates.forEach((d) => expect(trips.some((t) => t.name === d.trip)).toBe(true))
  })
  it('keys legal docs by their URL path', () => {
    Object.entries(legal).forEach(([key, doc]) => expect(doc.path).toBe(`/${key}`))
  })
})
