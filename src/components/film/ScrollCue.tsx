'use client'

import { useRef } from 'react'
import { useProgress, clamp01, type Store } from '@/hooks/useScrollProgress'

// Gold line that drips down the bottom of the hero until the visitor starts scrolling.
export default function ScrollCue({ store }: { store: Store }) {
  const ref = useRef<HTMLDivElement>(null)
  useProgress(store, (p) => {
    if (ref.current) ref.current.style.opacity = String(1 - clamp01(p / 0.03))
  })
  return (
    <div ref={ref} className="scroll-cue" aria-hidden="true">
      <i />
      <span className="mono">Scroll</span>
    </div>
  )
}
