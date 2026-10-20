'use client'

import { useEffect, useRef, useState } from 'react'
import { join, trips } from '@/data/site'
import { openEnquire } from '@/lib/enquire'

const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

// One line of the board. Every character is a flap: when the board scrolls into view they cycle and lock left to right.
// The server renders the real text, so crawlers and no-JS visitors see it too.
function Flap({ text, go, delay }: { text: string; go: boolean; delay: number }) {
  const [shown, setShown] = useState(text)
  useEffect(() => {
    setShown(text)
    if (!go || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t0 = performance.now() + delay
    const id = setInterval(() => {
      const el = performance.now() - t0
      if (el < 0) return setShown(text.replace(/\S/g, ' '))
      let done = true
      const out = [...text]
        .map((c, i) => {
          if (c === ' ' || el >= 350 + i * 80) return c
          done = false
          return CH[Math.floor(Math.random() * CH.length)]
        })
        .join('')
      setShown(out)
      if (done) clearInterval(id)
    }, 55)
    return () => clearInterval(id)
  }, [go, text, delay])
  return (
    <span className="flap" aria-hidden="true">
      {[...shown].map((c, i) => (
        <i key={i}>{c === ' ' ? ' ' : c}</i>
      ))}
    </span>
  )
}

const MON = (s: string) => s.split(' ').slice(0, 2).join(' ').toUpperCase()

// The next departures as a station board: one row per convoy, flaps for date, route, length, price, status and seats.
export default function DepartureBoard({ list }: { list: typeof join.dates }) {
  const ref = useRef<HTMLDivElement>(null)
  const [go, setGo] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="board">
      <div className="board-head mono" aria-hidden="true">
        <span>Date</span>
        <span>Route</span>
        <span>Days</span>
        <span>From</span>
        <span>Status</span>
        <span>Seats</span>
        <span />
      </div>
      <ul>
        {list.map((d, r) => {
          const t = trips.find((x) => x.name === d.trip)
          const status = r === 0 ? 'NEXT' : d.seats <= 3 ? 'FILLING' : 'OPEN'
          const route = (t ? t.name.replace(' Expedition', '') : d.trip).toUpperCase()
          const row = r * 160
          return (
            <li
              key={d.date + d.trip}
              aria-label={`${d.date}, ${d.trip}, ${t ? `${t.days} days, from ${t.price}, ` : ''}${d.seats} seats left`}
            >
              <Flap text={MON(d.date)} go={go} delay={row} />
              <Flap text={route} go={go} delay={row + 60} />
              <Flap text={t ? `${String(t.days).padStart(2, '0')}D` : '--'} go={go} delay={row + 120} />
              <Flap text={t ? t.price : '--'} go={go} delay={row + 180} />
              <span className="flap-status" data-s={status}>
                <Flap text={status} go={go} delay={row + 240} />
              </span>
              <Flap text={String(d.seats).padStart(2, '0')} go={go} delay={row + 300} />
              <button type="button" className="pill pill-rust" onClick={openEnquire} aria-haspopup="dialog">
                Reserve
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
