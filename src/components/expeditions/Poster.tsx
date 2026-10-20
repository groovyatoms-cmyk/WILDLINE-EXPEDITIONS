'use client'

import { ArrowRight } from 'lucide-react'
import { tripDetails, trips, tripSlug } from '@/data/site'
import { usePrefs } from '@/lib/prefs'
import ShimmerImg from '@/components/ui/ShimmerImg'

export type Trip = (typeof trips)[number]
export const metres = (t: Trip) => parseInt(t.alt.replace(/,/g, ''), 10)

// Poster: the pass height is the hero of each card. On hover or focus the card opens to show what the route is.
export default function Poster({ t }: { t: Trip }) {
  const d = tripDetails[tripSlug(t)]
  const { t: tr, money } = usePrefs()
  return (
    <a className="trip" href={`/expeditions/${tripSlug(t)}`}>
      <ShimmerImg src={`/${t.still}`} alt={t.altText} onError={(e) => (e.currentTarget.style.display = 'none')} />
      <span className="trip-alt display" aria-hidden="true">
        {t.alt.replace(/\s*m$/, '')}
        <small>m</small>
      </span>
      <span className="display trip-name">{t.name}</span>
      <span className="mono trip-meta">
        <span>{tr('{n} days', { n: t.days })}</span>
        <span>{t.season}</span>
        <span>{tr('from {price}', { price: money(t.price) })}</span>
      </span>
      {d && (
        <span className="trip-more">
          <span>{d.overview}</span>
          <span className="trip-go">
            See the route <ArrowRight size={16} aria-hidden="true" />
          </span>
        </span>
      )}
    </a>
  )
}
