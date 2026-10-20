import { CURRENCIES, LANGS, dict } from '@/data/i18n'
import { convert, translate } from '@/lib/prefs'

const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join()

describe('translations', () => {
  const keys = Object.keys(dict.hi)
  it.each(LANGS.filter((l) => l.code !== 'en').map((l) => l.code))('%s has every key, no blanks, same placeholders', (code) => {
    expect(Object.keys(dict[code]).sort()).toEqual([...keys].sort())
    keys.forEach((k) => {
      expect(dict[code][k].trim()).not.toBe('')
      expect(placeholders(dict[code][k])).toBe(placeholders(k))
    })
  })
  it('falls back to English for a missing key and fills placeholders', () => {
    expect(translate('de', 'Not translated yet')).toBe('Not translated yet')
    expect(translate('en', '{n} days', { n: 7 })).toBe('7 days')
    expect(translate('de', '{n} days', { n: 7 })).toBe('7 Tage')
  })
})

describe('currency', () => {
  it('keeps rupee prices as written', () => {
    expect(convert('₹1,45,000', 'INR', {})).toBe('₹1,45,000')
  })
  it('converts with a live rate, else the fallback, and marks it approximate', () => {
    expect(convert('₹1,00,000', 'USD', { USD: 0.01 })).toBe('≈ $1,000')
    expect(convert('₹1,00,000', 'USD', {})).toContain('1,150')
    expect(convert('₹1,00,000', 'EUR', {})).toMatch(/^≈ /)
  })
  it('leaves unparseable prices alone', () => {
    expect(convert('Ask us', 'USD', {})).toBe('Ask us')
  })
  it('has a fallback rate for every currency', () => {
    CURRENCIES.forEach((c) => expect(c.rate).toBeGreaterThan(0))
  })
})
