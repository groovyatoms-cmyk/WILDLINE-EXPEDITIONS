import { useEffect, useRef, useState } from 'react'

export default function Preloader({ progress, onDone }) {
  const [wipe, setWipe] = useState(false)
  const [shown, setShown] = useState(0)
  const target = useRef(0)
  target.current = progress * 100

  // Eased count that chases the real decode progress; hits 100 only after it is real.
  useEffect(() => {
    let raf, v = 0, last = performance.now()
    const tick = (now) => {
      // Time-based, ~40%/s max: steady even when decode progress arrives in bursts.
      v = Math.min(target.current, v + Math.min(now - last, 50) * 0.04)
      last = now
      setShown(v)
      if (v < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const n = Math.round(shown)

  useEffect(() => {
    if (n < 100) return
    const a = setTimeout(() => setWipe(true), 350)
    const b = setTimeout(onDone, 1250)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [n, onDone])

  return (
    <div className={`preloader${wipe ? ' wipe' : ''}`} role="status" aria-label={`Loading ${n} percent`}>
      <div className="preloader-count display">{String(n).padStart(3, '0')}<span className="preloader-pct">%</span></div>
      <div className="mono preloader-label">WILDLINE — LOADING ROUTE</div>
    </div>
  )
}
