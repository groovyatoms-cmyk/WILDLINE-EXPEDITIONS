'use client'

import { useRef } from 'react'
import { useProgress, clamp01, type Store } from '@/hooks/useScrollProgress'
import { stats } from '@/data/site'

export default function Stats({ store }: { store: Store }) {
  const root = useRef<HTMLDListElement>(null)
  const nums = useRef<(HTMLSpanElement | null)[]>([])
  useProgress(store, (p) => {
    const k = clamp01((p - stats.at) / 0.07)
    const o = clamp01((p - (stats.at + 0.09)) / 0.03)
    if (root.current) root.current.style.opacity = String(clamp01((p - (stats.at - 0.03)) / 0.03) * (1 - o))
    stats.items.forEach((s, i) => {
      const el = nums.current[i]
      const text = Math.round(s.value * (1 - (1 - k) ** 3)).toLocaleString('en-US')
      if (el && el.textContent !== text) el.textContent = text
    })
  })
  return (
    <dl ref={root} className="stats" style={{ opacity: 0 }}>
      {stats.items.map((s, i) => (
        <div key={s.label}>
          <dd className="display"><span ref={(el) => { nums.current[i] = el }}>0</span></dd>
          <dt className="mono">{s.label}</dt>
        </div>
      ))}
    </dl>
  )
}
