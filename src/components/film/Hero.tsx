'use client'

import { useEffect, type RefObject } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { trips } from '@/data/site'
import { useUpcoming } from '@/lib/upcoming'

// Opening frame of the film: headline, one promise, two clear actions. Fades out as the film starts to move (Shell drives opacity).
export default function Hero({ heroRef }: { heroRef: RefObject<HTMLDivElement | null> }) {
  const { list, mounted } = useUpcoming()
  const next = list[0]
  const trip = trips.find((t) => t.name === next?.trip)

  // Text drifts a few pixels against the pointer, so the copy sits in front of the photograph.
  useEffect(() => {
    const el = heroRef.current
    if (!el || !matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (e: PointerEvent) => {
      el.style.setProperty('--dx', `${((e.clientX / innerWidth - 0.5) * -12).toFixed(1)}px`)
      el.style.setProperty('--dy', `${((e.clientY / innerHeight - 0.5) * -12).toFixed(1)}px`)
    }
    addEventListener('pointermove', move)
    return () => removeEventListener('pointermove', move)
  }, [heroRef])

  // The film's own play button is hidden; this one starts it.
  const play = () => document.querySelector<HTMLButtonElement>('.autoplay')?.click()

  return (
    <div ref={heroRef} className="hero">
      <div className="hero-copy">
        <p className="hero-eyebrow">Guided 4x4 convoys since 2016</p>
        <h1 className="hero-h1 display">
          <span className="hl">
            <span>Beyond the</span>
          </span>
          <span className="hl">
            <span>
              <em>last</em> road.
            </span>
          </span>
          <span className="sr-only"> — 4x4 Expeditions in India</span>
        </h1>
        <p className="hero-sub">
          Small, guided convoys through Ladakh, Spiti, Uttarakhand and Arunachal. Eight vehicles. One pace. Everyone comes back.
        </p>
        <div className="hero-cta">
          <a className="pill pill-rust" href="/expeditions">
            Explore expeditions <ArrowRight size={16} aria-hidden="true" />
          </a>
          <button type="button" className="pill pill-glass" onClick={play}>
            <Play size={14} aria-hidden="true" /> Watch the film
          </button>
        </div>
      </div>
      {mounted && next && (
        <a className="hero-card" href="/join">
          <span className="mono">Next convoy</span>
          <strong className="display">{trip ? trip.name.replace(' Expedition', '') : next.trip}</strong>
          <span className="hero-card-meta">
            {next.date} · {next.seats} seats left <ArrowRight size={14} aria-hidden="true" />
          </span>
        </a>
      )}
    </div>
  )
}
