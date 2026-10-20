'use client'

import { ArrowLeft, CalendarDays, Check, Clock, Gauge, Mountain, Sun, X, type LucideIcon } from 'lucide-react'
import { join, tripDetails, tripFaq, tripItinerary, tripSlug, trips } from '@/data/site'
import { openEnquire, wa } from '@/lib/enquire'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import ShimmerImg from '@/components/ui/ShimmerImg'

const LEVELS = ['Easy', 'Moderate', 'Hard', 'Extreme']

// One expedition: a photographic opening with the four numbers that matter, the route as a trail, highlights, the day-by-day
// timeline, what is and is not included, departures, questions, and a booking bar that stays in reach.
export default function ExpeditionDetail({ slug }: { slug: string }) {
  const t = trips.find((x) => tripSlug(x) === slug)
  if (!t)
    return (
      <Section id="expedition" title="Not found">
        <Button href="/expeditions">All expeditions</Button>
      </Section>
    )
  const d = tripDetails[slug]
  const itinerary = tripItinerary[slug]
  const departures = join.dates.filter((x) => x.trip === t.name)
  const level = d ? LEVELS.indexOf(d.level.charAt(0) + d.level.slice(1).toLowerCase()) : -1
  const facts: [LucideIcon, string, string][] = [
    [Clock, 'Length', `${t.days} days`],
    [Mountain, 'Highest point', t.alt],
    [Sun, 'Season', t.season],
    [CalendarDays, 'From', `${t.price} per person`],
  ]
  return (
    <Section id="expedition" className="expedition-detail" title={t.name}>
      <a className="detail-back mono" href="/expeditions">
        <ArrowLeft size={16} aria-hidden="true" /> All expeditions
      </a>
      <ShimmerImg className="detail-hero" ratio="21 / 9" src={`/${t.still}`} alt={t.altText} fetchPriority="high" loading="eager" />

      <dl className="detail-facts">
        {facts.map(([Icon, k, v]) => (
          <div key={k}>
            <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
            <dt className="mono">{k}</dt>
            <dd className="display">{v}</dd>
          </div>
        ))}
        {d && (
          <div className="detail-level">
            <Gauge size={20} strokeWidth={1.5} aria-hidden="true" />
            <dt className="mono">Difficulty</dt>
            <dd className="display">{d.level.charAt(0) + d.level.slice(1).toLowerCase()}</dd>
            <span className="level-bars" aria-hidden="true">
              {LEVELS.map((l, i) => (
                <i key={l} data-on={i <= level ? '' : undefined} />
              ))}
            </span>
          </div>
        )}
      </dl>

      {d && <p className="detail-lede">{d.overview}</p>}

      {d && (
        <>
          <h2 className="detail-h display">Route</h2>
          <ol className="detail-route" aria-label="Route">
            {d.route.map((p, i) => (
              <li key={`${p}${i}`}>
                <i aria-hidden="true" />
                {p}
              </li>
            ))}
          </ol>
          {d.stops && (
            <>
              <h2 className="detail-h display">Stops and altitudes</h2>
              <ol className="detail-stops">
                {d.stops.map(([name, alt], i) => (
                  <li key={name}>
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                    <b>{name}</b>
                    <span className="mono">{alt}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
          <h2 className="detail-h display">Highlights</h2>
          <ul className="detail-highlights">
            {d.highlights.map((h) => (
              <li key={h}>
                <Check size={18} strokeWidth={2} aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </>
      )}

      {itinerary && (
        <>
          <h2 className="detail-h display">Itinerary</h2>
          <ol className="detail-days">
            {itinerary.map(([day, title, text], i) => (
              <Reveal as="li" key={day} index={i}>
                <span className="day-tag mono">{day}</span>
                <h3 className="display">{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </ol>
        </>
      )}

      <div className="detail-incl">
        <div>
          <h2 className="detail-h display">Included</h2>
          <ul>
            {join.includes.map((x) => (
              <li key={x}>
                <Check size={18} strokeWidth={2} aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="not">
          <h2 className="detail-h display">Not included</h2>
          <ul>
            {join.excludes.map((x) => (
              <li key={x}>
                <X size={18} strokeWidth={2} aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {departures.length > 0 && (
        <>
          <h2 className="detail-h display">Next departures</h2>
          <ul className="detail-deps">
            {departures.map((x) => (
              <li key={x.date}>
                <b className="display">{x.date}</b>
                <span className="mono">{x.seats} seats left</span>
                <button type="button" className="pill pill-rust" onClick={openEnquire} aria-haspopup="dialog">
                  Reserve
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="detail-h display">Questions</h2>
      <div className="detail-faq">
        {tripFaq.map(([q, a]) => (
          <details key={q} className="faq-item">
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
      <p className="mono join-note">{join.note}</p>

      <div className="detail-bar">
        <div>
          <b className="display">{t.name}</b>
          <span className="mono">
            {t.days} days · from {t.price}
          </span>
        </div>
        <div className="cta">
          <Button variant="rust" href={wa(`Hi, I want to join the ${t.name}`)} target="_blank">
            WhatsApp us
          </Button>
          <Button onClick={openEnquire} aria-haspopup="dialog">
            Enquire
          </Button>
        </div>
      </div>
    </Section>
  )
}
