import { useRef } from 'react'
import { useProgress } from '../hooks/useScrollProgress.js'
import { route } from '../data/site.js'

const dm = (v, pos, neg) => {
  const d = Math.floor(Math.abs(v)), m = Math.round((Math.abs(v) - d) * 60)
  return `${d}°${String(m).padStart(2, '0')}′${v >= 0 ? pos : neg}`
}
const lerp = (a, b, t) => a + (b - a) * t

export default function Coordinates({ store }) {
  const ref = useRef()
  useProgress(store, (p) => {
    const { from: a, to: b } = route
    ref.current.textContent = `${dm(lerp(a.lat, b.lat, p), 'N', 'S')} ${dm(lerp(a.lon, b.lon, p), 'E', 'W')} · ${Math.round(lerp(a.alt, b.alt, p)).toLocaleString('en-US')} M`
  })
  return <div ref={ref} className="mono coords" />
}
