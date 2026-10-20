'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
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
    <Section id="gallery" className="gallery" title="On the road" to={to} heading="h2">
      <div className="flow" ref={ref} role="region" aria-roledescription="carousel" aria-label="Photographs from the road">
        <ul className="flow-track">
          {SHOTS.map((t, i) => (
            <li
              key={t.still}
              ref={(el) => {
                slides.current[i] = el
              }}
            >
              <div className="shot">
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
          <small> / {String(SHOTS.length).padStart(2, '0')}</small>
        </span>
        <button type="button" aria-label="Next photograph" onClick={() => api?.scrollNext()}>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </Section>
  )
}
