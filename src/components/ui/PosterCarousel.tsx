'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type Peak = { name: string; alt: number; off?: boolean }
const TOP = 5400 // ridge height scale in metres

// Embla carousel for a list of cards: drag with momentum, buttons that grey out at the ends.
// With `peaks`, a ridge line above the cards draws each card's altitude as a mountain; the peak for the card in view
// lights up, and pressing a peak carries the carousel to that card.
export default function PosterCarousel({
  label,
  peaks,
  goTo,
  children,
}: {
  label: string
  peaks?: Peak[]
  goTo?: number | null
  children: React.ReactNode
}) {
  const [ref, api] = useEmblaCarousel({ align: 'start', dragFree: true, containScroll: 'trimSnaps' })
  const [state, setState] = useState({ prev: false, next: true, at: 0 })
  const n = peaks?.length ?? 0
  const sync = useCallback(() => {
    if (!api) return
    setState({ prev: api.canScrollPrev(), next: api.canScrollNext(), at: n > 1 ? Math.round(api.scrollProgress() * (n - 1)) : 0 })
  }, [api, n])
  useEffect(() => {
    if (!api) return
    sync()
    api.on('select', sync).on('reInit', sync).on('scroll', sync)
    return () => {
      api.off('select', sync).off('reInit', sync).off('scroll', sync)
    }
  }, [api, sync])

  // A new filter carries the carousel to its first match.
  useEffect(() => {
    if (api && goTo != null && goTo >= 0) api.scrollTo(goTo)
  }, [api, goTo])

  const H = 160
  const x = (i: number) => ((i + 0.5) / n) * 1000
  const y = (alt: number) => H - Math.max(6, (alt / TOP) * (H - 14))
  const ridge = peaks
    ? `M0,${H} ${peaks.map((p, i) => `L${(i / n) * 1000},${H - 4} L${x(i)},${y(p.alt)}`).join(' ')} L1000,${H - 4} L1000,${H} Z`
    : ''

  return (
    <div className="cards">
      {peaks && (
        <div className="ridge">
          <svg viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d={ridge} />
          </svg>
          {peaks.map((p, i) => (
            <button
              key={p.name}
              type="button"
              className="ridge-peak"
              aria-label={`${p.name}, ${p.alt.toLocaleString('en-US')} metres`}
              aria-pressed={i === state.at}
              data-off={p.off ? '' : undefined}
              style={
                {
                  left: `${(x(i) / 1000) * 100}%`,
                  bottom: `${((H - y(p.alt)) / H) * 100}%`,
                  '--b': (H - y(p.alt)) / H,
                } as React.CSSProperties
              }
              onClick={() => api?.scrollTo(i)}
            >
              <span className="mono">{p.alt.toLocaleString('en-US')}</span>
            </button>
          ))}
        </div>
      )}
      <div className="strip" ref={ref} role="region" aria-roledescription="carousel" aria-label={label}>
        <ul className="strip-track">{children}</ul>
      </div>
      <div className="strip-nav">
        <button type="button" aria-label="Previous" disabled={!state.prev} onClick={() => api?.scrollPrev()}>
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next" disabled={!state.next} onClick={() => api?.scrollNext()}>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
