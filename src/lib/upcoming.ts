'use client'

import { useEffect, useState } from 'react'
import { join } from '@/data/site'

// Departures from today on. Computed after mount so the static page and the browser always agree on the first render.
export function useUpcoming() {
  const [state, set] = useState({ list: join.dates, mounted: false })
  useEffect(() => {
    const cutoff = Date.now() - 864e5
    const list = join.dates.filter((d) => Date.parse(d.date) >= cutoff)
    set({ list: list.length ? list : join.dates, mounted: true })
  }, [])
  return state
}
