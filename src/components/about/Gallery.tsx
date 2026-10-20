'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react'
import { trips } from '@/data/site'
import Section from '@/components/ui/Section'
import ShimmerImg from '@/components/ui/ShimmerImg'

// One frame per distinct still; the caption is the route and its high point, straight from the trip data.
const SHOTS = trips.filter((t, i, a) => a.findIndex((x) => x.still === t.still) === i)

// Cover-flow: the photograph in the middle faces you, the others turn away and fall back. Embla carries the drag.
export default function Gallery({ to }: { to?: string }) {
  const [ref, api] = useEmblaCarousel({ align: 'center', containScroll: false, skipSnaps: false })
  const slides = useRef<(HTMLLIElement | null)[]>([])
  const [at, setAt] = useState(0)
  const [big, setBig] = useState<number | null>(null) // lightbox photo, null = closed
  const box = useRef<HTMLDialogElement>(null)
  const [only, setOnly] = useState<string | null>(null) // trip name, null = all
  const shown = only ? SHOTS.filter((t) => t.name === only) : SHOTS
  const n = shown.length
  const go = (d: number) => setBig((b) => (b === null ? b : (b + d + n) % n))

  useEffect(() => {
    const d = box.current
    if (!d) return
    if (big !== null && !d.open) d.showModal()
    if (big === null && d.open) d.close()
  }, [big])

  const flow = useCallback(() => {
    if (!api) return
    const vp = api.rootNode().getBoundingClientRect()
    const mid = vp.left + vp.width / 2
    slides.current.forEach((li) => {
      if (!li) return
      const r = li.getBoundingClientRect()
      const off = (r.left + r.width / 2 - mid) / li.offsetWidth // 0 in the middle, ±1 one slide away
      const a = Math.min(Math.abs(off), 2)
      li.style.transform = `perspective(1400px) rotateY(${(-off * 32).toFixed(1)}deg) scale(${(1 - a * 0.12).toFixed(3)})`
      li.style.opacity = String(1 - Math.min(a, 1.6) * 0.38)
    })
  }, [api])

  useEffect(() => {
    if (!api) return
    flow()
    const sel = () => setAt(api.selectedScrollSnap())
    sel()
    api.on('scroll', flow).on('reInit', flow).on('resize', flow).on('select', sel)
    return () => {
      api.off('scroll', flow).off('reInit', flow).off('resize', flow).off('select', sel)
    }
  }, [api, flow])

  return (
    <Section id="gallery" className="gallery" title="On the road" to={to}>
      <div className="flow-filter" role="group" aria-label="Filter by expedition">
        {[null, ...SHOTS.map((t) => t.name)].map((name) => (
          <button
            key={name ?? 'all'}
            type="button"
            className="mono"
            aria-pressed={only === name}
            onClick={() => {
              setOnly(name)
              api?.scrollTo(0, true)
            }}
          >
            {name ? name.replace(' Expedition', '') : 'All'}
          </button>
        ))}
      </div>
      <div className="flow" ref={ref} role="region" aria-roledescription="carousel" aria-label="Photographs from the road">
        <ul className="flow-track">
          {shown.map((t, i) => (
            <li
              key={t.still}
              ref={(el) => {
                slides.current[i] = el
              }}
            >
              <div
                className="shot"
                role="button"
                tabIndex={0}
                aria-label={`Enlarge: ${t.altText}`}
                onClick={() => setBig(i)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setBig(i))}
              >
                <ShimmerImg ratio="16 / 10" src={`/${t.still}`} alt={t.altText} draggable={false} />
                <span className="shot-alt display" aria-hidden="true">
                  {t.alt.replace(/\s*m$/, '')}
                  <small>m</small>
                </span>
                <span className="mono">
                  <MapPin size={14} aria-hidden="true" />
                  {t.name.replace(' Expedition', '')} · {t.alt}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flow-nav">
        <button type="button" aria-label="Previous photograph" onClick={() => api?.scrollPrev()}>
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <span className="flow-count display" aria-live="polite">
          {String(at + 1).padStart(2, '0')}
          <small> / {String(n).padStart(2, '0')}</small>
        </span>
        <button type="button" aria-label="Next photograph" onClick={() => api?.scrollNext()}>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
      <dialog
        ref={box}
        className="lightbox"
        aria-label="Photograph"
        onClose={() => setBig(null)}
        onClick={(e) => e.target === e.currentTarget && setBig(null)}
        onKeyDown={(e) => (e.key === 'ArrowRight' ? go(1) : e.key === 'ArrowLeft' ? go(-1) : undefined)}
      >
        {big !== null && (
          <figure>
            <img src={`/${shown[big].still}`} alt={shown[big].altText} />
            <figcaption className="mono">
              {shown[big].name.replace(' Expedition', '')} · {shown[big].alt}
            </figcaption>
          </figure>
        )}
        <button type="button" className="lb-x" aria-label="Close" onClick={() => setBig(null)}>
          <X size={22} aria-hidden="true" />
        </button>
        <button type="button" className="lb-prev" aria-label="Previous photograph" onClick={() => go(-1)}>
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
        <button type="button" className="lb-next" aria-label="Next photograph" onClick={() => go(1)}>
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </dialog>
    </Section>
  )
}
