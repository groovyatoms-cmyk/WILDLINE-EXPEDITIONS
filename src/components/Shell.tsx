'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { MotionConfig, motion } from 'framer-motion'
import { chapters, film, site } from '@/data/site'
import { useProgress, useScrollProgress } from '@/hooks/useScrollProgress'
import { createLoader, type Shots } from '@/lib/frames'
import { frameTotal, timeline } from '@/lib/timeline'
import CornerTitle from '@/components/film/CornerTitle'
import Coordinates from '@/components/film/Coordinates'
import Preloader from '@/components/ui/Preloader'
import PublicLayout from '@/layout/PublicLayout'
import Home from '@/components/Home'

// Page offset of the Expeditions section, cached: reading layout on every scroll frame forces reflows.
let expeditionsTop = Infinity
const measureExpeditions = () => {
  const el = document.getElementById('expeditions')
  expeditionsTop = el ? el.getBoundingClientRect().top + scrollY : Infinity
}

const pastFilm = () => expeditionsTop - scrollY < innerHeight * 0.5

function chapterFor(p: number) {
  if (pastFilm()) return site.name // below the film the header is just the logo name
  if (p < 0.03) return chapters.start
  if (p < film.shot1End) return chapters.run
  if (p < film.shot2Start) return chapters.valley
  return chapters.basin
}

// Frame requests start only after the first contentful paint, so they never compete with the page itself.
const afterFirstPaint = () => new Promise<void>((resolve) => {
  const timer = setTimeout(resolve, 1500) // shortcut: paint never reported (old browsers), so start anyway
  try {
    new PerformanceObserver((_, o) => { o.disconnect(); clearTimeout(timer); setTimeout(resolve, 0) }).observe({ type: 'largest-contentful-paint', buffered: true })
  } catch { clearTimeout(timer); resolve() }
})

const PRELOAD_FRAMES = 16

// Client shell for every route: preloader, header, footer, overlays. The home route
// (pathname "/") is drawn here because the scroll film shares state with the header.
export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'
  const filmRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLParagraphElement>(null)
  const shots = useRef<Shots>({ 1: [], 2: [] })
  const progress = useRef(0)
  const [ready, setReady] = useState(false)
  const [chapter, setChapter] = useState<string>(chapters.start)
  const [compact, setCompact] = useState(false)
  const store = useScrollProgress(filmRef)

  // Same-origin path links navigate without a reload.
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="/"]')
      if (!a || a.target || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return
      e.preventDefault()
      router.push(a.getAttribute('href')!)
    }
    document.addEventListener('click', click)
    return () => document.removeEventListener('click', click)
  }, [router])

  useEffect(() => {
    if (!isHome) return
    measureExpeditions()
    const ro = new ResizeObserver(measureExpeditions)
    ro.observe(document.body)
    return () => ro.disconnect()
  }, [isHome])

  // Frames stream in a window around the playhead (see createLoader). The preloader only waits for the
  // first PRELOAD_FRAMES of shot 1; shot 2 starts loading once the visitor is a third of the way through shot 1.
  useEffect(() => {
    history.scrollRestoration = 'manual'
    scrollTo(0, 0)
    let l1: ReturnType<typeof createLoader> | undefined
    let l2: ReturnType<typeof createLoader> | undefined
    let preloaded = 0
    // The scroll loop only notifies when progress changes, so a frame arriving while the visitor sits still must repaint the canvas itself.
    const redraw = () => store.subs.forEach((fn) => fn(store.p))
    const sync = (p: number) => {
      const { f1, f2 } = timeline(p)
      l1?.update(f1 * (frameTotal(1) - 1))
      if (p > 0.15) {
        l2 ??= createLoader(2, shots.current[2], redraw)
        l2.update(f2 * (frameTotal(2) - 1))
        l2.loadAnchors()
      }
    }
    afterFirstPaint().then(() => {
      l1 = createLoader(1, shots.current[1], (i) => {
        if (i < PRELOAD_FRAMES) progress.current = ++preloaded / PRELOAD_FRAMES
        redraw()
      })
      sync(store.p)
      l1.loadAnchors()
    })
    store.subs.add(sync)
    return () => { store.subs.delete(sync) }
  }, [store])

  useEffect(() => {
    document.documentElement.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  // Lets the CSS keep the header light while it sits over the dark drone film.
  useEffect(() => {
    document.body.classList.toggle('on-film', isHome && !compact)
  }, [isHome, compact])

  useProgress(store, (p) => {
    if (!isHome) return
    setChapter(chapterFor(p))
    setCompact(pastFilm())
    if (tagRef.current) tagRef.current.style.opacity = String(1 - Math.min(1, p / 0.06))
  })

  const done = useCallback(() => setReady(true), [])

  return (
    <MotionConfig reducedMotion="user">
      {!ready && <Preloader progress={progress} onDone={done} />}
      <PublicLayout
        ready={ready}
        routeKey={pathname}
        header={isHome
          ? (
            <CornerTitle text={chapter} compact={compact} hidden={compact}>
              <Coordinates store={store} />
            </CornerTitle>
          )
          : <CornerTitle text={site.name} compact />}
      >
        {isHome && <h1 className="sr-only">{site.fullName} — {site.tagline}</h1>}
        <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
          {isHome ? <Home store={store} shots={shots} filmRef={filmRef} tagRef={tagRef} /> : children}
        </motion.div>
      </PublicLayout>
    </MotionConfig>
  )
}
