'use client'

import { useEffect, useState, type RefObject } from 'react'
import { ArrowLeft, ArrowRight, ArrowUp, Play } from 'lucide-react'
import { trips } from '@/data/site'
import { usePrefs } from '@/lib/prefs'
import { read, write } from '@/lib/storage'
import { useUpcoming } from '@/lib/upcoming'

// Opening frame of the film: headline, one promise, two clear actions. Fades out as the film starts to move (Shell drives opacity).
export default function Hero({ heroRef }: { heroRef: RefObject<HTMLDivElement | null> }) {
  const { list, mounted } = useUpcoming()
  const next = list[0]
  const { t, lang } = usePrefs()
  const [asked, setAsked] = useState(false) // the cookie banner has been answered
  const [played, setPlayed] = useState(true) // the how-to hint shows on a visitor's first visit only: hidden until storage says it is new
  useEffect(() => {
    if (!read('film-hint-seen')) setPlayed(false)
    if (read('cookie-consent')) setAsked(true)
    const answered = () => setAsked(true)
    addEventListener('cookie-choice', answered)
    const done = () => {
      setPlayed(true)
      write('film-hint-seen', '1')
    }
    addEventListener('film:play', done)
    return () => {
      removeEventListener('film:play', done)
      removeEventListener('cookie-choice', answered)
    }
  }, [])
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

  const play = () => dispatchEvent(new Event('film:play'))

  return (
    <div ref={heroRef} className="hero">
      <div className="hero-copy">
        <p className="hero-eyebrow">{t('Guided 4x4 convoys since 2016')}</p>
        <h1 className="hero-h1 display">
          <span className="hl">
            <span>{t('Beyond the')}</span>
          </span>
          <span className="hl">
            <span>
              {lang === 'en' ? (
                <>
                  <em>last</em> road.
                </>
              ) : (
                <em>{t('last road.')}</em>
              )}
            </span>
          </span>
          <span className="sr-only"> — 4x4 Expeditions in India</span>
        </h1>
        <p className="hero-sub">
          {t('Small, guided convoys through Ladakh, Spiti, Uttarakhand and Arunachal. Eight vehicles. One pace. Everyone comes back.')}
        </p>
        <div className="hero-cta">
          <a className="pill pill-rust" href="/expeditions">
            {t('Explore expeditions')} <ArrowRight size={16} aria-hidden="true" />
          </a>
          <button type="button" className={`pill pill-glass${played ? '' : ' pulse'}`} onClick={play}>
            <Play size={14} aria-hidden="true" /> {t('Watch the film')}
          </button>
          {!played && asked && (
            <span className="hint mono" aria-hidden="true">
              <ArrowLeft className="hint-side" size={16} />
              <ArrowUp className="hint-up" size={16} /> {t('Press play, the road scrolls for you')}
            </span>
          )}
        </div>
      </div>
      {mounted && next && (
        <a className="hero-card" href="/join">
          <span className="mono">{t('Next convoy')}</span>
          <strong className="display">{trip ? trip.name.replace(' Expedition', '') : next.trip}</strong>
          <span className="hero-card-meta">
            {next.date} · {t('{n} seats left', { n: next.seats })} <ArrowRight size={14} aria-hidden="true" />
          </span>
        </a>
      )}
    </div>
  )
}
