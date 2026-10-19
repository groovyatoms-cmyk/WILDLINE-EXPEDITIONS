'use client'

import { useRef } from 'react'
import { useProgress, clamp01, type Store } from '@/hooks/useScrollProgress'

// Slides up 40px + fades in at `at`, holds, then drifts up and out. Each line lives in [at-0.015, at+0.05],
// so lines spaced 0.05 apart never show together.
export default function BigLine({ store, at, text }: { store: Store; at: number; text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useProgress(store, (p) => {
    const i = clamp01((p - (at - 0.015)) / 0.015)
    const o = clamp01((p - (at + 0.035)) / 0.015)
    if (!ref.current) return
    ref.current.style.opacity = String(i * (1 - o))
    ref.current.style.transform = `translateY(${(1 - i) * 40 - o * 40}px)`
  })
  return <p ref={ref} className="display big-line" style={{ opacity: 0 }}>{text}</p>
}
