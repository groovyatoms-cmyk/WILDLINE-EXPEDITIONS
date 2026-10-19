'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

// Thin bar fixed to the top: shows how far down the page you are, and sweeps once
// when the page (routeKey) changes so a click on any link gives instant feedback.
export default function TopBar({ routeKey }: { routeKey: string }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  const reduced = useReducedMotion()
  const [loading, setLoading] = useState(false)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) { first.current = false; return }
    if (reduced) return
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [routeKey, reduced])

  return (
    <>
      <motion.div className="topbar" style={{ scaleX }} aria-hidden="true" />
      <AnimatePresence>
        {loading && (
          <motion.div
            className="topbar topbar-load"
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
