import { crew, faq, film, frames, join, site, tripDetails, tripItinerary, tripSlug, trips } from '@/data/site'
import { MONTHS, inSeason } from '@/lib/season'
import { abs, jsonLd } from '@/lib/seo'
import { openEnquire, wa } from '@/lib/enquire'
import { frameNo, frameTotal } from '@/lib/timeline'

describe('film config', () => {
  it('orders the cut points', () => {
    expect(0 < film.shot1End && film.shot1End < film.shot2Start && film.shot2Start < film.shot2End && film.shot2End <= 1).toBe(true)
  })
  it('has whole frame counts and mobile uses no more frames than desktop', () => {
    for (const s of [1, 2] as const) {
      expect(Number.isInteger(frames[s].count)).toBe(true)
      expect(frames[s].mobileCount).toBeGreaterThan(0)
      expect(frames[s].mobileCount).toBeLessThanOrEqual(frames[s].count)
    }
  })
  it('numbers frames from 1 to the total', () => {
    for (const s of [1, 2] as const) {
      expect(frameNo(0, s)).toBe(1)
      expect(frameNo(1, s)).toBe(frameTotal(s))
    }
  })
})

describe('trips', () => {
  it('has a still, alt text, price and positive days on every trip', () => {
    trips.forEach((t) => {
      expect(t.still).toMatch(/^frames\/shot\d\/\d{4}\.webp$/)
      expect(t.altText.length).toBeGreaterThan(10)
      expect(t.price).toMatch(/₹/)
      expect(t.days).toBeGreaterThan(0)
    })
  })
  it('points every still at a frame inside the set', () => {
    trips.forEach((t) => {
      const [, shot, n] = t.still.match(/shot(\d)\/(\d{4})/) ?? []
      expect(Number(n)).toBeLessThanOrEqual(frames[Number(shot) as 1 | 2].count)
    })
  })
  it('has details and an itinerary for every trip', () => {
    trips.forEach((t) => expect(tripItinerary[tripSlug(t)]?.length).toBeGreaterThan(0))
    expect(Object.keys(tripDetails).sort()).toEqual(trips.map(tripSlug).sort())
  })
  it('has season text that names at least one month', () => {
    trips.forEach((t) => expect(MONTHS.some((_, m) => inSeason(t.season, m))).toBe(true))
  })
})

describe('departures', () => {
  it('has valid dates, non-negative seats and a known trip', () => {
    join.dates.forEach((d) => {
      expect(Number.isNaN(Date.parse(d.date))).toBe(false)
      expect(d.seats).toBeGreaterThanOrEqual(0)
      expect(trips.some((t) => t.name === d.trip)).toBe(true)
    })
  })
})

describe('copy', () => {
  it('has non-empty FAQ questions and answers', () => {
    faq.groups
      .flatMap((g) => g.items)
      .forEach(([q, a]) => {
        expect(q.trim()).not.toBe('')
        expect(a.trim()).not.toBe('')
      })
  })
  it('has crew specs and a site name', () => {
    expect(crew.specs.length).toBeGreaterThan(0)
    expect(site.fullName).toBeTruthy()
  })
})

describe('helpers', () => {
  it('abs joins the site url and a path', () => expect(abs('/blog')).toMatch(/\/blog$/))
  it('jsonLd escapes angle brackets', () => expect(jsonLd({ a: '</script>' })).not.toContain('<'))
  it('wa leaves no text param when empty', () => expect(wa()).not.toContain('?text='))
  it('openEnquire dispatches open-enquire', () => {
    const fn = jest.fn()
    window.addEventListener('open-enquire', fn)
    openEnquire()
    expect(fn).toHaveBeenCalledTimes(1)
    window.removeEventListener('open-enquire', fn)
  })
  it('inSeason is false for unreadable text', () => expect(inSeason('all year', 3)).toBe(false))
})
