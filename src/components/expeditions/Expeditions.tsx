'use client'

import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { trips } from '@/data/site'
import { MONTHS, inSeason } from '@/lib/season'
import Section from '@/components/ui/Section'
import PosterCarousel from '@/components/ui/PosterCarousel'
import Poster, { metres, type Trip } from '@/components/expeditions/Poster'
import Atlas from '@/components/expeditions/Atlas'
import Climb from '@/components/expeditions/Climb'

// The 2026 range, climbing from the lowest route to the highest.
const RANGE = [...trips].sort((a, b) => metres(a) - metres(b))

// Wide screens climb the range (see Climb); narrow ones get a swipeable carousel under a ridge line of the same heights.
// Pick a month and the routes that run then stay lit everywhere (climb, ridge, cards and, on the full page, the atlas).
export default function Expeditions({ to }: { to?: string }) {
  const [month, setMonth] = useState<number | null>(null)
  const on = (t: Trip) => month === null || inSeason(t.season, month)
  const live = RANGE.filter(on)
  const monthName = month === null ? '' : new Date(2026, month).toLocaleString('en-IN', { month: 'long' })
  return (
    <Section id="expeditions" className="expeditions" title="Expeditions" to={to}>
      <p className="mono label">2026 season</p>
      <div className="months" role="group" aria-label="Month of travel">
        <span className="months-label mono">
          <CalendarDays size={16} aria-hidden="true" />
          When are you going?
        </span>
        <button type="button" aria-pressed={month === null} onClick={() => setMonth(null)}>
          Any month
        </button>
        {MONTHS.map((m, i) => (
          <button key={m} type="button" aria-pressed={month === i} onClick={() => setMonth(month === i ? null : i)}>
            {m}
          </button>
        ))}
      </div>
      <p className="mono months-note" aria-live="polite">
        {month === null ? ' ' : `${live.length} of ${trips.length} routes run in ${monthName}.`}
      </p>
      {!to && <Atlas month={month} />}
      <Climb list={RANGE} on={on} />
      <PosterCarousel
        label="Expeditions, 2026 season"
        goTo={month === null ? null : RANGE.findIndex(on)}
        peaks={RANGE.map((t) => ({ name: t.name, alt: metres(t), off: !on(t) }))}
      >
        {RANGE.map((t) => (
          <li key={t.name} data-off={on(t) ? undefined : ''}>
            <Poster t={t} />
          </li>
        ))}
      </PosterCarousel>
    </Section>
  )
}
