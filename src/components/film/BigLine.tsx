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
    const el = ref.current
    if (!el) return
    const opacity = String(i * (1 - o))
    if (el.style.opacity === opacity) return // off-screen lines stay untouched: no style recalc per frame
    el.style.opacity = opacity
    el.style.transform = `translateY(${(1 - i) * 40 - o * 40}px)`
    el.style.filter = `blur(${(1 - i + o) * 14}px)` // materialises out of focus, leaves the same way
  })
  return (
    <p ref={ref} className="display big-line" style={{ opacity: 0 }}>
      {text}
    </p>
  )
}
