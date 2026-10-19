import { trips, tripSlug } from '@/data/site.js'
import Section from '@/components/ui/Section.jsx'
import Reveal from '@/components/ui/Reveal.jsx'
import ShimmerImg from '@/components/ui/ShimmerImg.jsx'

export default function Expeditions({ to }) {
  return (
    <Section id="expeditions" className="expeditions" title="EXPEDITIONS" to={to}>
      <p className="mono label">2026 SEASON</p>
      <ul>
        {(to ? trips.slice(0, 3) : trips).map((t, i) => (
          <Reveal as="li" key={t.name} index={i}>
            <a className="trip" href={`/expeditions/${tripSlug(t)}`}>
              <ShimmerImg src={`${import.meta.env.BASE_URL}${t.still}`} alt={t.alt_text} loading="lazy" onError={(e) => (e.currentTarget.style.display = 'none')} />
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
