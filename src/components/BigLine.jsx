import { useRef } from 'react'
import { useProgress, clamp01 } from '../hooks/useScrollProgress.js'

// Slides up 40px + fades in at `at`, holds, then drifts up and out.
export default function BigLine({ store, at, text }) {
  const ref = useRef()
  useProgress(store, (p) => {
    const i = clamp01((p - (at - 0.03)) / 0.03)
    const o = clamp01((p - (at + 0.05)) / 0.03)
    ref.current.style.opacity = i * (1 - o)
    ref.current.style.transform = `translateY(${(1 - i) * 40 - o * 40}px)`
  })
  return <p ref={ref} className="display big-line" style={{ opacity: 0 }}>{text}</p>
}
