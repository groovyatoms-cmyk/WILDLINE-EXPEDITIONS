'use client'

import { useRef } from 'react'
import { useProgress, clamp01, type Store } from '@/hooks/useScrollProgress'

// Slides up 40px + fades in at `at`, holds, then drifts up and out.
export default function BigLine({ store, at, text }: { store: Store; at: number; text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useProgress(store, (p) => {
    const i = clamp01((p - (at - 0.03)) / 0.03)
    const o = clamp01((p - (at + 0.05)) / 0.03)
    if (!ref.current) return
    ref.current.style.opacity = String(i * (1 - o))
    ref.current.style.transform = `translateY(${(1 - i) * 40 - o * 40}px)`
  })
  return <p ref={ref} className="display big-line" style={{ opacity: 0 }}>{text}</p>
}
