'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { MotionConfig, motion } from 'framer-motion'
import { chapters, film, site } from '@/data/site'
import { useProgress, useScrollProgress } from '@/hooks/useScrollProgress'
import { loadShot, type Shots } from '@/lib/frames'
import CornerTitle from '@/components/film/CornerTitle'
import Coordinates from '@/components/film/Coordinates'
import Preloader from '@/components/ui/Preloader'
import PublicLayout from '@/layout/PublicLayout'
import Home from '@/components/Home'

const top = (id: string) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity

const pastFilm = () => top('expeditions') < innerHeight * 0.5

function chapterFor(p: number) {
  if (pastFilm()) return site.name // below the film the header is just the logo name
  if (p < 0.03) return chapters.start
  if (p < film.shot1End) return chapters.run
  if (p < film.shot2Start) return chapters.valley
  return chapters.basin
}

// Client shell for every route: preloader, header, footer, overlays. The home route
// (pathname "/") is drawn here because the scroll film shares state with the header.
export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'
  const filmRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLParagraphElement>(null)
  const shots = useRef<Shots>({ 1: [], 2: [] })
  const [progress, setProgress] = useState(0)
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

  // Shot one blocks the preloader; shot two decodes in the background.
  useEffect(() => {
    history.scrollRestoration = 'manual'
    scrollTo(0, 0)
    loadShot(1, shots.current[1], setProgress).then(() => loadShot(2, shots.current[2]))
  }, [])

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
        <h1 className="sr-only">{site.fullName} —{site.tagline}</h1>
        <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
          {isHome ? <Home store={store} shots={shots} filmRef={filmRef} tagRef={tagRef} /> : children}
        </motion.div>
      </PublicLayout>
    </MotionConfig>
  )
}
