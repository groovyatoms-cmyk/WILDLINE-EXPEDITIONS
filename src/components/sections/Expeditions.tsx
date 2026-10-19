'use client'

import { trips, tripSlug } from '@/data/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import ShimmerImg from '@/components/ui/ShimmerImg'

export default function Expeditions({ to }: { to?: string }) {
  return (
    <Section id="expeditions" className="expeditions" title="EXPEDITIONS" to={to}>
      <p className="mono label">2026 SEASON</p>
      <ul>
        {(to ? trips.slice(0, 4) : trips).map((t, i) => (
          <Reveal as="li" key={t.name} index={i}>
            <a className="trip" href={`/expeditions/${tripSlug(t)}`}>
              <ShimmerImg src={`/${t.still}`} alt={t.alt_text} loading="lazy" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <span className="display trip-name">{t.name}</span>
              <span className="mono trip-meta">
                <span>{t.days} days</span><span>{t.alt}</span><span>{t.season}</span><span>from {t.price}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
