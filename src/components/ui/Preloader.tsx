'use client'

import { useEffect, useState, type MutableRefObject } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.7, 0, 0.2, 1] as const
const FULL = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
const WIPED = 'polygon(0 0, 0 0, -25% 100%, -25% 100%)'

// `progress` is a ref (0–1) written by the loader: a state value would re-render the whole app for every decoded frame.
export default function Preloader({ progress, onDone }: { progress: MutableRefObject<number>; onDone: () => void }) {
  const [wipe, setWipe] = useState(false)
  const [n, setN] = useState(0)
  const skip = useReducedMotion()
  // Eases the counter toward the real progress every frame (smooth, never overshoots, always finishes).
  useEffect(() => {
    let v = 0
    let raf = 0
    const tick = () => {
      const t = progress.current * 100
      v = skip ? t : Math.min(t, v + Math.max((t - v) * 0.2, 0.6))
      setN(Math.round(v))
      if (v < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [skip, progress])

  useEffect(() => {
    if (n < 100) return
    const a = setTimeout(() => setWipe(true), 100)
    const b = setTimeout(onDone, 750)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [n, onDone])

  return (
    <motion.div
      className="preloader"
      role="status"
      aria-label={`Loading ${n} percent`}
      initial={false}
      animate={{ clipPath: wipe ? WIPED : FULL }}
      transition={{ duration: skip ? 0.3 : 0.6, ease: EASE }}
    >
      <div className="preloader-count display">{n}<span className="preloader-pct">%</span></div>
      <div className="mono preloader-label">WILDLINE — LOADING ROUTE</div>
    </motion.div>
  )
}
