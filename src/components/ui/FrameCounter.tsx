'use client'

import { useRef } from 'react'
import { useProgress, type Store } from '@/hooks/useScrollProgress'
import { timeline, frameNo, frameTotal } from '@/lib/timeline'

const pad = (n: number) => String(n).padStart(3, '0')

export default function FrameCounter({ store }: { store: Store }) {
  const ref = useRef<HTMLDivElement>(null)
  useProgress(store, (p) => {
    const { t, f1, f2 } = timeline(p)
    if (ref.current) ref.current.textContent = `FR ${pad(frameNo(t > 0.5 ? f2 : f1))} / ${pad(frameTotal())}`
  })
  return <div ref={ref} className="mono frame-counter" aria-hidden="true" />
}
