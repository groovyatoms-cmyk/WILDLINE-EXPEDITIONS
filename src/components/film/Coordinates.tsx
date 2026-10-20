'use client'

import { useRef } from 'react'
import { useProgress, type Store } from '@/hooks/useScrollProgress'
import { route } from '@/data/site'

const dm = (v: number, pos: string, neg: string) => {
  const d = Math.floor(Math.abs(v)),
    m = Math.round((Math.abs(v) - d) * 60)
  return `${d}°${String(m).padStart(2, '0')}′${v >= 0 ? pos : neg}`
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function Coordinates({ store }: { store: Store }) {
  const ref = useRef<HTMLDivElement>(null)
  useProgress(store, (p) => {
    const { from: a, to: b } = route
    const text = `${dm(lerp(a.lat, b.lat, p), 'N', 'S')} ${dm(lerp(a.lon, b.lon, p), 'E', 'W')} · ${Math.round(lerp(a.alt, b.alt, p)).toLocaleString('en-US')} M`
    if (ref.current && ref.current.textContent !== text) ref.current.textContent = text // no write when unchanged: skips a layout pass
  })
  return <div ref={ref} className="mono coords" />
}
