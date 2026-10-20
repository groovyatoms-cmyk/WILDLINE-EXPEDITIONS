'use client'

import { about } from '@/data/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import { CalendarDays, Car, MapPinned, Route, type LucideIcon } from 'lucide-react'
import ScrollWords from '@/components/ui/ScrollWords'
import Odometer from '@/components/ui/Odometer'

const STAT_ICONS: LucideIcon[] = [CalendarDays, Route, Car, MapPinned]

export default function About({ to }: { to?: string }) {
  return (
    <Section id="about" className={to ? 'about about-home' : 'about'} title={to ? 'About Wildline' : about.headline} to={to}>
      {to ? (
        <div className="about-body manifesto">
          <ScrollWords text={about.manifesto} highlight={['expedition.', 'pace.', 'back.']} />
        </div>
      ) : (
        <div className="about-body">{about.body.map((p, i) => (i === 0 ? <ScrollWords key={p} text={p} /> : <p key={p}>{p}</p>))}</div>
      )}
      <dl className="about-stats">
        {about.highlights.map(([v, k], i) => (
          <Reveal key={k} index={i}>
            {(() => {
              const Icon = STAT_ICONS[i]
              return Icon && <Icon className="stat-icon" size={22} strokeWidth={1.5} aria-hidden="true" />
            })()}
            <dd className="display">
              <Odometer value={v} />
            </dd>
            <dt className="mono">{k}</dt>
          </Reveal>
        ))}
      </dl>
    </Section>
  )
}
