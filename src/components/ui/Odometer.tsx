'use client'

import { useEffect, useRef, useState } from 'react'

// A figure like "48,000+" whose digits are reels that roll to their value, one after another, when it scrolls into view.
// Screen readers get the real value from the label; the reels are decoration.
export default function Odometer({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return setOn(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  let n = 0
  return (
    <span ref={ref} className="odo" data-on={on ? '' : undefined} role="img" aria-label={value}>
      {[...value].map((c, i) =>
        /\d/.test(c) ? (
          <span key={i} className="odo-col" aria-hidden="true" style={{ '--d': c, '--i': n++ } as React.CSSProperties}>
            <span>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                <i key={d}>{d}</i>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden="true">
            {c}
          </span>
        ),
      )}
    </span>
  )
}
