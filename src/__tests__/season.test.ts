import { inSeason } from '@/lib/season'

describe('inSeason', () => {
  it('reads a single range', () => {
    expect(inSeason('Jun–Sep', 5)).toBe(true)
    expect(inSeason('Jun–Sep', 9)).toBe(false)
  })
  it('reads several ranges', () => {
    expect(inSeason('May–Jun, Sep–Oct', 8)).toBe(true)
    expect(inSeason('May–Jun, Sep–Oct', 7)).toBe(false)
  })
  it('handles a range that wraps the new year', () => {
    expect(inSeason('Nov–Feb', 0)).toBe(true)
    expect(inSeason('Nov–Feb', 11)).toBe(true)
    expect(inSeason('Nov–Feb', 5)).toBe(false)
  })
})
