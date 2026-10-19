import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import { abs, jsonLd, pageMeta } from '@/lib/seo'
import { trips } from '@/data/site'
import { legal } from '@/data/legal'

describe('seo', () => {
  it('lists every page, trip and legal doc in the sitemap exactly once', () => {
    const urls = sitemap().map((e) => e.url)
    expect(new Set(urls).size).toBe(urls.length)
    expect(urls).toHaveLength(8 + trips.length + Object.keys(legal).length)
    expect(urls).toContain(abs('/expeditions/ladakh'))
  })
  it('points robots at the sitemap', () => expect(robots().sitemap).toBe(abs('/sitemap.xml')))
  it('builds canonical and social tags from one call', () => {
    const m = pageMeta('T', 'D', '/x')
    expect(m.alternates?.canonical).toBe('/x')
    expect(m.description).toBe('D')
    expect(m.openGraph?.url).toBe('/x')
  })
  it('escapes < so structured data cannot close the script tag', () => {
    expect(jsonLd({ a: '</script>' })).not.toContain('<')
  })
})
