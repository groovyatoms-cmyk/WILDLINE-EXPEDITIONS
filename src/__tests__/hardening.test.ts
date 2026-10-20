import nextConfig from '../../next.config'
import { read, write } from '@/lib/storage'
import { jsonLd } from '@/lib/seo'
import { hasItems, isFilled, isPresent } from '@/lib/guard'

describe('storage', () => {
  beforeEach(() => localStorage.clear())
  it('reads back what it wrote and gives null for a missing key', () => {
    expect(read('k')).toBeNull()
    write('k', 'v')
    expect(read('k')).toBe('v')
  })
  it('never throws when storage is blocked', () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const set = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(read('k')).toBeNull()
    expect(() => write('k', 'v')).not.toThrow()
    spy.mockRestore()
    set.mockRestore()
  })
})

describe('security', () => {
  it('sends the security headers on every route and hides X-Powered-By', async () => {
    const rules = (await nextConfig.headers?.()) ?? []
    const all = rules.find((r) => r.source === '/:path*')?.headers.map((h) => h.key) ?? []
    expect(all).toEqual(
      expect.arrayContaining(['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Strict-Transport-Security']),
    )
    expect(nextConfig.poweredByHeader).toBe(false)
  })
  it('cannot close the JSON-LD script tag from inside the data', () => {
    expect(jsonLd({ name: '</script><script>alert(1)</script>' })).not.toContain('</script>')
  })
})

describe('guards', () => {
  it('treat null, undefined, empty and blank as missing', () => {
    expect([isPresent(null), isPresent(undefined), isPresent(0), isPresent('')]).toEqual([false, false, true, true])
    expect([isFilled(null), isFilled(undefined), isFilled(''), isFilled('  '), isFilled('a')]).toEqual([false, false, false, false, true])
    expect([hasItems(null), hasItems(undefined), hasItems([]), hasItems([1])]).toEqual([false, false, false, true])
  })
})
