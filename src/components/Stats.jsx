import { useRef } from 'react'
import { useProgress, clamp01 } from '../hooks/useScrollProgress.js'
import { stats } from '../data/site.js'

export default function Stats({ store }) {
  const root = useRef()
  const nums = useRef([])
  useProgress(store, (p) => {
    const k = clamp01((p - stats.at) / 0.07)
    const o = clamp01((p - (stats.at + 0.09)) / 0.03)
    root.current.style.opacity = clamp01((p - (stats.at - 0.03)) / 0.03) * (1 - o)
    stats.items.forEach((s, i) => {
      nums.current[i].textContent = Math.round(s.value * (1 - (1 - k) ** 3)).toLocaleString('en-US')
    })
  })
  return (
    <dl ref={root} className="stats" style={{ opacity: 0 }}>
      {stats.items.map((s, i) => (
        <div key={s.label}>
          <dd className="display"><span ref={(el) => (nums.current[i] = el)}>0</span></dd>
          <dt className="mono">{s.label}</dt>
        </div>
      ))}
    </dl>
  )
}
