import { hasItems, isFilled, isPresent } from '@/lib/guard'

describe('guard', () => {
  it('isPresent rejects null and undefined only', () => {
    expect(isPresent(null)).toBe(false)
    expect(isPresent(undefined)).toBe(false)
    expect(isPresent(0)).toBe(true)
    expect(isPresent('')).toBe(true)
    expect(isPresent(false)).toBe(true)
  })

  it('isFilled rejects null, undefined, empty and blank strings', () => {
    expect(isFilled(null)).toBe(false)
    expect(isFilled(undefined)).toBe(false)
    expect(isFilled('')).toBe(false)
    expect(isFilled('   ')).toBe(false)
    expect(isFilled('/a.webp')).toBe(true)
  })

  it('hasItems rejects null, undefined and empty arrays', () => {
    expect(hasItems(null)).toBe(false)
    expect(hasItems(undefined)).toBe(false)
    expect(hasItems([])).toBe(false)
    expect(hasItems([1])).toBe(true)
  })
})
