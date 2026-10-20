import { CURRENCIES } from '@/data/currencies'
import { convert } from '@/lib/prefs'

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
