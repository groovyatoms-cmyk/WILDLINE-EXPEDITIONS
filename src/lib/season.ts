export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// True when a season string such as "May–Jun, Sep–Oct" or "Nov–Feb" (wraps the new year) covers month index 0–11.
export function inSeason(season: string, month: number) {
  for (const [, a, b] of season.matchAll(/([A-Z][a-z]{2})\s*[–-]\s*([A-Z][a-z]{2})/g)) {
    const s = MONTHS.indexOf(a),
      e = MONTHS.indexOf(b)
    if (s < 0 || e < 0) continue
    if (s <= e ? month >= s && month <= e : month >= s || month <= e) return true
  }
  return false
}
