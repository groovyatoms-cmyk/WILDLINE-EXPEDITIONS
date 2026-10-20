'use client'

import { useEffect, useState } from 'react'
import { trips } from '@/data/site'
import { useUpcoming } from '@/lib/upcoming'

const pad = (n: number) => String(n).padStart(2, '0')

// Live count to the next departure, from the dates in the site data. Renders an empty, reserved box until the browser knows the time.
export default function Countdown() {
  const { list, mounted } = useUpcoming()
  const [now, setNow] = useState(0)
  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(id)
  }, [])
  const next = list[0]
  if (!mounted || !now || !next) return <div className="countdown" />
  const diff = Math.max(0, Date.parse(next.date) - now)
  const days = Math.floor(diff / 864e5),
    hours = Math.floor((diff % 864e5) / 36e5),
    mins = Math.floor((diff % 36e5) / 6e4)
  const name = trips.find((t) => t.name === next.trip)?.name ?? next.trip
  return (
    <div
      className="countdown"
      role="timer"
      aria-label={`Next convoy, ${name}, rolls out in ${days} days, ${hours} hours and ${mins} minutes`}
    >
      <p className="mono">Next convoy rolls out in</p>
      <div className="count" aria-hidden="true">
        <span>
          <b>{pad(days)}</b>days
        </span>
        <i>:</i>
        <span>
          <b>{pad(hours)}</b>hours
        </span>
        <i>:</i>
        <span>
          <b>{pad(mins)}</b>minutes
        </span>
      </div>
      <p className="count-trip">
        {name} · {next.date} · {next.seats} seats left
      </p>
    </div>
  )
}
