import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion'

const EASE = [0.7, 0, 0.2, 1]
const FULL = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
const WIPED = 'polygon(0 0, 0 0, -25% 100%, -25% 100%)'

export default function Preloader({ progress, onDone }) {
  const [wipe, setWipe] = useState(false)
  const [n, setN] = useState(0)
  const skip = useReducedMotion()
  const count = useMotionValue(0)
  useMotionValueEvent(count, 'change', (v) => setN(Math.round(v)))

  // Glide to the real decode progress; 100 is only reached once decoding is done.
  useEffect(() => {
    const c = animate(count, progress * 100, { duration: skip ? 0 : 0.8, ease: 'easeOut' })
    return c.stop
  }, [progress, count, skip])

  useEffect(() => {
    if (n < 100) return
    const a = setTimeout(() => setWipe(true), 350)
    const b = setTimeout(onDone, 1250)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [n, onDone])

  return (
    <motion.div
      className="preloader"
      role="status"
      aria-label={`Loading ${n} percent`}
      initial={false}
      animate={{ clipPath: wipe ? WIPED : FULL }}
      transition={{ duration: skip ? 0.5 : 0.9, ease: EASE }}
    >
      <div className="preloader-count display">{String(n).padStart(3, '0')}<span className="preloader-pct">%</span></div>
      <div className="mono preloader-label">WILDLINE — LOADING ROUTE</div>
    </motion.div>
  )
}
