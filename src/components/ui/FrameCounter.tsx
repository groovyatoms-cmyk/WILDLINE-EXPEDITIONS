'use client'

import { useRef } from 'react'
import { useProgress, type Store } from '@/hooks/useScrollProgress'
import { timeline, frameNo, frameTotal } from '@/lib/timeline'

const pad = (n: number) => String(n).padStart(3, '0')

export default function FrameCounter({ store }: { store: Store }) {
  const ref = useRef<HTMLDivElement>(null)
  useProgress(store, (p) => {
    const { t, f1, f2 } = timeline(p)
    const shot = t > 0.5 ? 2 : 1
    const text = `FR ${pad(frameNo(shot === 2 ? f2 : f1, shot))} / ${pad(frameTotal(shot))}`
    if (ref.current && ref.current.textContent !== text) ref.current.textContent = text
  })
  return <div ref={ref} className="mono frame-counter" aria-hidden="true" />
}
