'use client'

import { Anchor, Cog, Gauge, HeartPulse, Map, Mountain, Radio, Route, ShieldCheck, Wind, Wrench, type LucideIcon } from 'lucide-react'
import { crew } from '@/data/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

// One thin lucide line icon per commitment; the lines draw themselves when the tile arrives.
const ICONS: Record<string, LucideIcon> = {
  'Lead + Sweep': Route,
  Recovery: Anchor,
  Comms: Radio,
  Mechanic: Wrench,
  Oxygen: Wind,
  Pace: Gauge,
  Medical: HeartPulse,
  Acclimatisation: Mountain,
  Permits: Map,
}

// A small live picture of the idea, drawn in CSS and SVG, for the tiles that have one.
const VISUALS: Record<string, React.ReactNode> = {
  'Lead + Sweep': (
    <div className="viz-convoy">
      {Array.from({ length: 8 }, (_, i) => (
        <i key={i} data-end={i === 0 || i === 7 ? '' : undefined} />
      ))}
      <span className="mono">lead</span>
      <span className="mono">sweep</span>
    </div>
  ),
  Comms: (
    <div className="viz-rings">
      <i />
      <i />
      <i />
    </div>
  ),
  Mechanic: <Cog className="viz-cog" strokeWidth={1} />,
  Oxygen: (
    <div className="viz-gauge">
      <i className="viz-fill" />
      <span className="mono viz-mark">4,500 m · oxygen</span>
    </div>
  ),
  Medical: (
    <svg className="viz-ecg" viewBox="0 0 200 40" preserveAspectRatio="none">
      <polyline points="0,20 50,20 60,20 66,6 74,34 82,20 120,20 130,20 136,10 142,28 148,20 200,20" />
    </svg>
  ),
  Acclimatisation: (
    <svg className="viz-steps" viewBox="0 0 200 60" preserveAspectRatio="none">
      <polyline points="0,56 40,56 40,42 80,42 80,28 120,28 120,16 160,16 160,6 200,6" />
    </svg>
  ),
}

// Bento: the first eight commitments on the home preview, all sixteen on the full page.
export default function Crew({ to, from = 0, title }: { to?: string; from?: number; title?: string }) {
  return (
    <Section id="crew" className="crew" title={title ?? crew.headline} to={to} heading={to || title ? 'h2' : 'h1'}>
      <dl className="bento">
        {crew.specs.slice(from, to ? 8 : undefined).map(([k, v], i) => {
          const Icon = ICONS[k] ?? ShieldCheck
          return (
            <Reveal key={k} index={i} className="bento-tile">
              <Icon className="bento-icon" strokeWidth={1.5} aria-hidden="true" />
              {VISUALS[k] && (
                <div className="bento-visual" aria-hidden="true">
                  {VISUALS[k]}
                </div>
              )}
              <dt className="display">{k}</dt>
              <dd>{v}</dd>
            </Reveal>
          )
        })}
      </dl>
    </Section>
  )
}
