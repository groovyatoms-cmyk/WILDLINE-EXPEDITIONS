'use client'

import { useEffect, useRef } from 'react'
import { useProgress, useScrollProgress } from '@/hooks/useScrollProgress'
import Poster, { metres, type Trip } from '@/components/expeditions/Poster'

const GAP = 320 // px between rungs
const PAD = 240 // px above the highest and below the lowest

// Seeded and rounded so the server and the browser draw the same sky.
const r1 = (v: number) => Math.round(v * 10) / 10
const STARS = Array.from({ length: 140 }, (_, k) => {
  const f = (v: number) => v - Math.floor(v)
  return [
    r1(f(Math.sin(k * 12.9898) * 43758.5453) * 100),
    r1(f(Math.sin(k * 78.233) * 12345.6789) * 100),
    r1(0.5 + f(Math.sin(k * 39.346) * 9871.123) * 1.4),
    r1(f(k * 0.37) * 4),
  ] as const
})

// The expeditions as a climb. The stage pins and the page scrolls you up a mountain: sea level at the bottom, the highest pass
// at the top, one route on every rung, the sky changing as you rise and a live altimeter at the edge.
export default function Climb({ list, on }: { list: Trip[]; on: (t: Trip) => boolean }) {
  const n = list.length
  const H = PAD * 2 + n * GAP
  const wrap = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const meter = useRef<HTMLSpanElement>(null)
  const size = useRef(900)
  const focus = useRef(-1)
  const store = useScrollProgress(wrap, 0.1)
  const alts = list.map(metres)

  useEffect(() => {
    const el = stage.current
    if (!el) return
    const measure = () => {
      size.current = el.clientHeight
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useProgress(store, (p) => {
    const vh = size.current
    const ty = -(1 - p) * (H - vh)
    if (track.current) track.current.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0)`
    stage.current?.style.setProperty('--p', p.toFixed(3))
    // Rung index under the middle of the screen, as a fraction (0 = lowest).
    const c = vh / 2 - ty
    const f = Math.min(n - 1, Math.max(0, n - 1 - (c - PAD - GAP / 2) / GAP))
    const lo = Math.floor(f),
      hi = Math.min(n - 1, lo + 1)
    const alt = alts[lo] + (alts[hi] - alts[lo]) * (f - lo)
    if (meter.current) meter.current.textContent = Math.round(alt).toLocaleString('en-US')
    const near = Math.round(f)
    if (near !== focus.current) {
      focus.current = near
      track.current?.querySelectorAll('li').forEach((li, i) => li.toggleAttribute('data-focus', i === near))
    }
  })

  return (
    <div ref={wrap} className="climb" style={{ '--n': n } as React.CSSProperties}>
      <div ref={stage} className="climb-stage">
        <div className="climb-sky" aria-hidden="true">
          <i className="milky" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
            {STARS.map(([x, y, r, d], i) => (
              <circle key={i} className="fs" cx={x} cy={y} r={r * 0.08} style={{ animationDelay: `${d}s` }} />
            ))}
          </svg>
          <i className="shoot s1" />
          <i className="shoot s2" />
        </div>
        <ul ref={track} className="climb-track" style={{ height: H }}>
          {list.map((t, i) => (
            <li
              key={t.name}
              data-side={i % 2 ? 'right' : 'left'}
              data-off={on(t) ? undefined : ''}
              style={{ top: PAD + (n - 1 - i) * GAP, height: GAP }}
            >
              <i className="rung-dot" aria-hidden="true" />
              <Poster t={t} />
            </li>
          ))}
        </ul>
        <div className="climb-meter" aria-hidden="true">
          <span className="mono">Altitude</span>
          <b className="display">
            <span ref={meter}>{(alts[0] ?? 0).toLocaleString('en-US')}</span>
            <small>m</small>
          </b>
          <i />
        </div>
      </div>
    </div>
  )
}
