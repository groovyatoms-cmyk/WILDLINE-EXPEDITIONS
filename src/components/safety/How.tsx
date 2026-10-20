'use client'

import { useRef, useState } from 'react'
import { Car } from 'lucide-react'
import { how } from '@/data/site'
import { useProgress, useScrollProgress } from '@/hooks/useScrollProgress'
import Section from '@/components/ui/Section'

// The four steps as a climb up one mountain ridge. The page stops; scrolling draws the trail along the ridge and drives a convoy
// marker up it. Each step is a checkpoint flag with its card, lit as the convoy reaches it. Dusk at the foot, dawn at the top.
const VW = 1600,
  VH = 760,
  N = 120
const r1 = (v: number) => Math.round(v * 10) / 10
const PTS = Array.from({ length: N + 1 }, (_, i) => {
  const t = i / N
  return { x: r1(80 + 1440 * t), y: r1(590 - 340 * Math.pow(t, 1.08) + 24 * Math.sin(t * 22) + 11 * Math.sin(t * 51 + 1)) }
})
const CUM = PTS.reduce<number[]>((a, p, i) => (a.push(i ? a[i - 1] + Math.hypot(p.x - PTS[i - 1].x, p.y - PTS[i - 1].y) : 0), a), [])
const LEN = CUM[N]
const TRAIL = `M${PTS.map((p) => `${p.x},${p.y}`).join(' L')}`
const MOUNT = `${TRAIL} L${VW},${VH} L0,${VH}Z`
const STOPS = [6, 44, 80, 114].map((i) => ({ ...PTS[i], at: CUM[i] / LEN }))

function at(p: number) {
  const s = p * LEN
  let lo = 0,
    hi = N
  while (hi - lo > 1) {
    const m = (lo + hi) >> 1
    if (CUM[m] <= s) lo = m
    else hi = m
  }
  const k = (s - CUM[lo]) / Math.max(1e-6, CUM[hi] - CUM[lo])
  return { x: PTS[lo].x + (PTS[hi].x - PTS[lo].x) * k, y: PTS[lo].y + (PTS[hi].y - PTS[lo].y) * k }
}

const STARS = Array.from({ length: 70 }, (_, k) => {
  const f = (v: number) => v - Math.floor(v)
  return [
    r1(f(Math.sin(k * 12.9898) * 43758.5453) * 100),
    r1(f(Math.sin(k * 78.233) * 12345.6789) * 55),
    r1(0.5 + f(Math.sin(k * 39.346) * 9871.123)),
    r1(f(k * 0.37) * 4),
  ] as const
})

export default function How({ to }: { to?: string }) {
  const n = how.length
  const wrap = useRef<HTMLDivElement>(null)
  const trail = useRef<SVGPathElement>(null)
  const marker = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [a, setA] = useState(-1)
  const store = useScrollProgress(wrap, 0.1)
  useProgress(store, (p) => {
    const m = at(p)
    if (marker.current) {
      marker.current.style.left = `${((m.x / VW) * 100).toFixed(2)}%`
      marker.current.style.top = `${((m.y / VH) * 100).toFixed(2)}%`
    }
    if (trail.current) trail.current.style.strokeDashoffset = String(LEN * (1 - p))
    if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(3)})`
    stage.current?.style.setProperty('--p', p.toFixed(3))
    let act = -1
    STOPS.forEach((s, i) => {
      if (p >= s.at - 0.012) act = i
    })
    setA((prev) => (prev === act ? prev : act))
  })

  return (
    <Section id="how" className="how" title="How a convoy works" to={to} heading="h2">
      <div ref={wrap} className="drive" style={{ '--n': n } as React.CSSProperties}>
        <div ref={stage} className="drive-stage tr">
          <div className="tr-sky" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
              {STARS.map(([x, y, r, d], i) => (
                <circle key={i} className="tr-star" cx={x} cy={y} r={r * 0.09} style={{ animationDelay: `${d}s` }} />
              ))}
            </svg>
            <i className="tr-sun" />
          </div>
          <div className="tr-scene">
            <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="tr-mount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#18233c" />
                  <stop offset="1" stopColor="#070a12" />
                </linearGradient>
              </defs>
              <path
                className="tr-far"
                d={`M0,${VH} L0,420 L140,330 L260,400 L410,280 L560,390 L700,320 L860,420 L1010,300 L1170,400 L1330,310 L1480,390 L1600,340 L1600,${VH}Z`}
              />
              <path fill="url(#tr-mount)" d={MOUNT} />
              <path className="tr-ghost" d={TRAIL} />
              <path ref={trail} className="tr-trail" d={TRAIL} strokeDasharray={LEN} strokeDashoffset={LEN} />
            </svg>
            {STOPS.map((s, i) => {
              const [h, p] = how[i]
              return (
                <div
                  key={h}
                  className="tr-stop"
                  data-on={i <= a ? '' : undefined}
                  data-now={i === a ? '' : undefined}
                  style={
                    {
                      left: `${(s.x / VW) * 100}%`,
                      top: `${(s.y / VH) * 100}%`,
                      '--lx': `clamp(10.5rem, 0px, 100%)`,
                    } as React.CSSProperties
                  }
                >
                  <i className="tr-flag" aria-hidden="true">
                    <b>{i + 1}</b>
                  </i>
                  <div className="tr-card" data-edge={i === n - 1 ? 'right' : i === 0 ? 'left' : undefined}>
                    <span className="mono">
                      Step {i + 1} of {n}
                    </span>
                    <h3 className="display">{h}</h3>
                    <p>{p}</p>
                  </div>
                </div>
              )
            })}
            <span ref={marker} className="tr-marker" aria-hidden="true">
              <Car size={20} strokeWidth={1.75} />
            </span>
          </div>
          <div className="drive-hud" aria-hidden="true">
            <span className="mono">Scroll to climb</span>
            <span className="drive-bar">
              <span ref={bar} />
            </span>
          </div>
        </div>
      </div>
      <ol className="drive-list">
        {how.map(([h, p], i) => (
          <li key={h}>
            <span className="mono">
              Step {i + 1} of {n}
            </span>
            <h3 className="display">{h}</h3>
            <p>{p}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
