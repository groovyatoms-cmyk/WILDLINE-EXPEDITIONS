'use client'

import { useEffect, useRef, useState } from 'react'
import { Anchor, Gauge, HeartPulse, Mountain, Radio, Route, Wind, Wrench, type LucideIcon } from 'lucide-react'
import { crew } from '@/data/site'
import Section from '@/components/ui/Section'
import StarSky from '@/components/ui/StarSky'

// The eight commitments as instruments. Each has a headline figure taken from its own line in the crew data.
const MODULES: { k: string; Icon: LucideIcon; fig: string; unit: string }[] = [
  { k: 'Lead + Sweep', Icon: Route, fig: '2', unit: 'crew vehicles' },
  { k: 'Comms', Icon: Radio, fig: 'Sat + VHF', unit: 'no dead zones' },
  { k: 'Oxygen', Icon: Wind, fig: '4,500', unit: 'metres, then oxygen' },
  { k: 'Pace', Icon: Gauge, fig: '8', unit: 'vehicles, slowest car sets the pace' },
  { k: 'Medical', Icon: HeartPulse, fig: 'AMS', unit: 'protocol, full kit' },
  { k: 'Acclimatisation', Icon: Mountain, fig: 'Rest', unit: 'days built in' },
  { k: 'Recovery', Icon: Anchor, fig: 'Winch', unit: 'on every car' },
  { k: 'Mechanic', Icon: Wrench, fig: '1', unit: 'on the convoy' },
]
const NOTE = new Map(crew.specs.map(([k, v]) => [k, v]))
const EVERY = 4200

const R = 270,
  C = 300
const r1 = (v: number) => Math.round(v * 10) / 10
// Eight vehicles along a gentle S across the radar, lead on the right, sweep on the left.
const BLIPS = Array.from({ length: 8 }, (_, i) => {
  const t = i / 7
  return { x: r1(500 - 400 * t), y: r1(318 - 70 * Math.sin(t * Math.PI * 1.25 + 0.4)) }
})
const WEDGE_END = [r1(C + R * Math.sin((40 * Math.PI) / 180)), r1(C - R * Math.cos((40 * Math.PI) / 180))]

// Convoy control room: a radar with the eight vehicles on it, and the eight commitments as instruments around it.
// Choose an instrument and the radar shows what it does for the convoy. It advances by itself until you touch it.
export default function ConvoyCockpit({ to }: { to?: string }) {
  const [at, setAt] = useState(0)
  const [hold, setHold] = useState(false)
  useEffect(() => {
    if (hold || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setAt((a) => (a + 1) % MODULES.length), EVERY)
    return () => clearInterval(id)
  }, [hold, at])
  const m = MODULES[at]
  // On phones and tablets the instruments are a swipeable row: keep the selected one in view without moving the page.
  const grid = useRef<HTMLUListElement>(null)
  useEffect(() => {
    const g = grid.current,
      li = g?.children[at] as HTMLElement | undefined
    if (g && li && g.scrollWidth > g.clientWidth + 2)
      g.scrollTo({ left: li.offsetLeft - (g.clientWidth - li.offsetWidth) / 2, behavior: 'smooth' })
  }, [at])

  return (
    <Section id="convoy" className="convoy" title={crew.headline} to={to} heading={to ? 'h2' : 'h1'}>
      <StarSky />
      <div
        className="ck"
        data-sel={at}
        onPointerEnter={() => setHold(true)}
        onPointerLeave={() => setHold(false)}
        onFocusCapture={() => setHold(true)}
        onBlurCapture={() => setHold(false)}
      >
        <div className="ck-radar">
          <svg
            viewBox="0 0 600 600"
            role="img"
            aria-label="Radar view of a convoy of eight vehicles, lead on the right and sweep on the left"
          >
            <defs>
              <linearGradient id="ck-sweep" gradientUnits="userSpaceOnUse" x1={C} y1={C - R} x2={WEDGE_END[0]} y2={WEDGE_END[1]}>
                <stop offset="0" stopColor="#f2a43a" stopOpacity="0" />
                <stop offset="1" stopColor="#f2a43a" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id="ck-bg" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#14202a" />
                <stop offset="1" stopColor="#0a0e12" />
              </radialGradient>
            </defs>
            <circle cx={C} cy={C} r={R + 14} fill="none" stroke="rgba(245,245,247,0.14)" />
            <circle cx={C} cy={C} r={R} fill="url(#ck-bg)" stroke="rgba(245,245,247,0.22)" />
            {[0.25, 0.5, 0.75].map((k) => (
              <circle key={k} cx={C} cy={C} r={R * k} fill="none" stroke="rgba(245,245,247,0.1)" />
            ))}
            <path d={`M${C},${C - R} V${C + R} M${C - R},${C} H${C + R}`} stroke="rgba(245,245,247,0.1)" />
            {Array.from({ length: 72 }, (_, i) => {
              const a = (i / 72) * Math.PI * 2,
                l = i % 6 === 0 ? 12 : 6
              return (
                <line
                  key={i}
                  x1={r1(C + (R + 14) * Math.sin(a))}
                  y1={r1(C - (R + 14) * Math.cos(a))}
                  x2={r1(C + (R + 14 - l) * Math.sin(a))}
                  y2={r1(C - (R + 14 - l) * Math.cos(a))}
                  stroke="rgba(245,245,247,0.3)"
                />
              )
            })}
            <g className="ck-sweep">
              <path d={`M${C},${C} L${C},${C - R} A${R},${R} 0 0 1 ${WEDGE_END[0]},${WEDGE_END[1]}Z`} fill="url(#ck-sweep)" />
            </g>

            {/* overlays: only the one for the selected instrument shows */}
            <g className="ov ov-0">
              <path d={`M${BLIPS[0].x},${BLIPS[0].y} L${BLIPS[7].x},${BLIPS[7].y}`} stroke="#f2a43a" strokeDasharray="6 6" />
              <text x={BLIPS[0].x} y={BLIPS[0].y - 24} textAnchor="middle">
                LEAD
              </text>
              <text x={BLIPS[7].x} y={BLIPS[7].y - 24} textAnchor="middle">
                SWEEP
              </text>
            </g>
            <g className="ov ov-1">
              {BLIPS.map((b, i) => (
                <circle key={i} className="ping" cx={b.x} cy={b.y} r="10" style={{ animationDelay: `${i * 0.18}s` }} />
              ))}
            </g>
            <g className="ov ov-2">
              <circle cx={C} cy={C} r={R * 0.62} fill="none" stroke="#7ec9ff" strokeDasharray="4 7" />
              <text x={C} y={C - R * 0.62 - 8} textAnchor="middle" fill="#7ec9ff">
                OXYGEN ABOVE 4,500 M
              </text>
            </g>
            <g className="ov ov-3">
              {BLIPS.slice(0, 7).map((b, i) => (
                <g key={i}>
                  <line x1={b.x} y1={b.y} x2={BLIPS[i + 1].x} y2={BLIPS[i + 1].y} stroke="#f2a43a" strokeOpacity="0.7" />
                  <text x={r1((b.x + BLIPS[i + 1].x) / 2)} y={r1((b.y + BLIPS[i + 1].y) / 2 - 12)} textAnchor="middle">
                    ▸
                  </text>
                </g>
              ))}
            </g>
            <g className="ov ov-4">
              <path
                className="beat"
                d={`M${C - 120},${C + 190} h50 l12,-34 l18,70 l16,-50 l10,14 h60 l12,-26 l16,44 l12,-18 h70`}
                fill="none"
                stroke="#ff7a7a"
                strokeWidth="2.5"
              />
              <circle cx={BLIPS[4].x} cy={BLIPS[4].y} r="16" fill="none" stroke="#ff7a7a" />
              <path d={`M${BLIPS[4].x - 6},${BLIPS[4].y} h12 M${BLIPS[4].x},${BLIPS[4].y - 6} v12`} stroke="#ff7a7a" strokeWidth="2" />
            </g>
            <g className="ov ov-5">
              <polyline
                className="steps"
                points={`${C - 150},${C + 215} ${C - 90},${C + 215} ${C - 90},${C + 185} ${C - 30},${C + 185} ${C - 30},${C + 155} ${C + 30},${C + 155} ${C + 30},${C + 125} ${C + 90},${C + 125} ${C + 90},${C + 95} ${C + 150},${C + 95}`}
                fill="none"
                stroke="#f2a43a"
                strokeWidth="2.5"
              />
              <text x={C} y={C + 245} textAnchor="middle">
                REST DAYS, THEN CLIMB
              </text>
            </g>
            <g className="ov ov-6">
              <circle cx={r1(BLIPS[7].x - 40)} cy={r1(BLIPS[7].y + 90)} r="9" fill="none" stroke="#ff7a7a" />
              <path
                d={`M${r1(BLIPS[7].x - 46)},${r1(BLIPS[7].y + 84)} l12,12 M${r1(BLIPS[7].x - 34)},${r1(BLIPS[7].y + 84)} l-12,12`}
                stroke="#ff7a7a"
              />
              <path
                className="winch"
                d={`M${BLIPS[7].x},${BLIPS[7].y} L${r1(BLIPS[7].x - 40)},${r1(BLIPS[7].y + 90)}`}
                stroke="#f2a43a"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
            </g>
            <g className="ov ov-7">
              <g className="gear" style={{ transformOrigin: `${BLIPS[7].x}px ${BLIPS[7].y - 38}px` }}>
                <circle
                  cx={BLIPS[7].x}
                  cy={BLIPS[7].y - 38}
                  r="11"
                  fill="none"
                  stroke="#f2a43a"
                  strokeWidth="2.5"
                  strokeDasharray="5 3.4"
                />
                <circle cx={BLIPS[7].x} cy={BLIPS[7].y - 38} r="4" fill="#f2a43a" />
              </g>
            </g>

            {/* the convoy */}
            {BLIPS.map((b, i) => (
              <g key={i} className={`blip${i === 0 || i === 7 ? ' end' : ''}`} data-i={i}>
                <circle className="blip-halo" cx={b.x} cy={b.y} r="13" />
                <circle cx={b.x} cy={b.y} r="5.5" />
              </g>
            ))}
            <circle cx={C} cy={C} r="3" fill="#f5f5f7" />
          </svg>
          <div className="ck-read">
            <span className="mono ck-tag">
              <m.Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              {m.k}
            </span>
            <p className="ck-fig display">
              <span>{m.fig}</span>
              <small>{m.unit}</small>
            </p>
            <p className="ck-note">{NOTE.get(m.k)}</p>
          </div>
        </div>

        <ul ref={grid} className="ck-grid">
          {MODULES.map(({ k, Icon }, i) => (
            <li key={k} data-on={i === at ? '' : undefined}>
              <button type="button" aria-pressed={i === at} onClick={() => setAt(i)}>
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                <span className="display">{k}</span>
                <i className="ck-led" aria-hidden="true" />
              </button>
              {i === at && !hold && <i className="ck-timer" key={at} style={{ animationDuration: `${EVERY}ms` }} />}
            </li>
          ))}
        </ul>
      </div>
      <p className="cut-more mono">
        {crew.specs.length - MODULES.length} more commitments on the <a href="/safety">safety page</a>.
      </p>
    </Section>
  )
}
