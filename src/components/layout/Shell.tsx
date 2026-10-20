'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { MotionConfig, motion } from 'framer-motion'
import { site } from '@/data/site'
import { isFilled } from '@/lib/guard'
import { useProgress, useScrollProgress } from '@/hooks/useScrollProgress'
import { createLoader, type Shots } from '@/lib/frames'
import { frameTotal, timeline } from '@/lib/timeline'
import CornerTitle from '@/components/film/CornerTitle'
import Coordinates from '@/components/film/Coordinates'
import Cursor from '@/components/layout/Cursor'
import Preloader from '@/components/layout/Preloader'
import PublicLayout from '@/components/layout/PublicLayout'
import Home from '@/components/home/Home'

// Page offset of the first section after the film, cached: reading layout on every scroll frame forces reflows.
let expeditionsTop = Infinity
const measureExpeditions = () => {
  const el = document.getElementById('about')
  expeditionsTop = el ? el.getBoundingClientRect().top + scrollY : Infinity
}

const pastFilm = () => expeditionsTop - scrollY < innerHeight * 0.5

// Frame requests start only after the first contentful paint, so they never compete with the page itself.
const afterFirstPaint = () =>
  new Promise<void>((resolve) => {
    const timer = setTimeout(resolve, 1500) // shortcut: paint never reported (old browsers), so start anyway
    try {
      new PerformanceObserver((_, o) => {
        o.disconnect()
        clearTimeout(timer)
        setTimeout(resolve, 0)
      }).observe({ type: 'largest-contentful-paint', buffered: true })
    } catch {
      clearTimeout(timer)
      resolve()
    }
  })

const PRELOAD_FRAMES = 8

// Client shell for every route: preloader, header, footer, overlays. The home route
// (pathname "/") is drawn here because the scroll film shares state with the header.
export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'
  const filmRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const shots = useRef<Shots>({ 1: [], 2: [] })
  const progress = useRef(0)
  const [ready, setReady] = useState(false)
  const [compact, setCompact] = useState(false)
  const store = useScrollProgress(filmRef)

  // Same-origin path links navigate without a reload.
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="/"]')
      if (!a || a.target || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return
      const href = a.getAttribute('href')
      if (!isFilled(href)) return
      e.preventDefault()
      router.push(href)
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
    let anchorTimer: ReturnType<typeof setTimeout> | undefined
    // The scroll loop only notifies when progress changes, so a frame arriving while the visitor sits still must repaint the canvas itself.
    const redraw = () => store.subs.forEach((fn) => fn(store.p))
    const sync = (p: number) => {
      const { f1, f2 } = timeline(p)
      l1?.update(f1 * (frameTotal(1) - 1))
      if (p > 0) l1?.loadAnchors() // the visitor is scrubbing: sparse frames keep fast scrolls from showing gaps
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
      anchorTimer = setTimeout(() => l1?.loadAnchors(), 4000) // otherwise wait until the page has been idle a while
    })
    store.subs.add(sync)
    return () => {
      store.subs.delete(sync)
      clearTimeout(anchorTimer)
    }
  }, [store])

  useEffect(() => {
    document.documentElement.style.overflow = ready ? '' : 'hidden'
    if (ready) document.documentElement.dataset.ready = '1' // starts the hero's entrance sequence
  }, [ready])

  // Lets the CSS keep the header light while it sits over the dark drone film.
  useEffect(() => {
    document.body.classList.toggle('on-film', isHome && !compact)
  }, [isHome, compact])

  useProgress(store, (p) => {
    if (!isHome) return
    setCompact(pastFilm())
    const hero = heroRef.current
    if (hero) {
      const k = Math.min(1, p / 0.04)
      hero.style.opacity = String(1 - k)
      hero.style.filter = `blur(${k * 14}px)`
      hero.style.visibility = k >= 1 ? 'hidden' : 'visible'
    }
  })

  const done = useCallback(() => setReady(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <Cursor />
      {!ready && <Preloader progress={progress} onDone={done} />}
      <PublicLayout
        ready={ready}
        routeKey={pathname}
        header={
          isHome ? (
            <CornerTitle text={site.name} compact={compact}>
              <Coordinates store={store} />
            </CornerTitle>
          ) : (
            <CornerTitle text={site.name} compact />
          )
        }
      >
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {isHome ? <Home store={store} shots={shots} filmRef={filmRef} heroRef={heroRef} /> : children}
        </motion.div>
      </PublicLayout>
    </MotionConfig>
  )
}
