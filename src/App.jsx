import { useCallback, useEffect, useRef, useState } from 'react'
import { bigLines, chapters, film, site } from './data/site.js'
import { useProgress, useScrollProgress } from './hooks/useScrollProgress.js'
import { loadShot } from './lib/frames.js'
import About from './components/About.jsx'
import BigLine from './components/BigLine.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import Coordinates from './components/Coordinates.jsx'
import CornerTitle from './components/CornerTitle.jsx'
import Careers from './components/Careers.jsx'
import Crew from './components/Crew.jsx'
import Enquire from './components/Enquire.jsx'
import Expeditions from './components/Expeditions.jsx'
import Footer from './components/Footer.jsx'
import FrameCanvas from './components/FrameCanvas.jsx'
import FrameCounter from './components/FrameCounter.jsx'
import Join from './components/Join.jsx'
import Menu from './components/Menu.jsx'
import Preloader from './components/Preloader.jsx'
import Stats from './components/Stats.jsx'
import Team from './components/Team.jsx'

const top = (id) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity

function chapterFor(p) {
  for (const id of ['join', 'careers', 'team', 'about', 'expeditions']) if (top(id) < innerHeight * 0.5) return chapters[id]
  if (p < 0.03) return chapters.start
  if (p < film.shot1End) return chapters.run
  if (p < film.shot2Start) return chapters.valley
  return chapters.basin
}

// Real paths (/about) via the History API. Needs a host fallback to index.html (see vercel.json).
const readPage = () => location.pathname.replace(/^\/|\/$/g, '')
const pages = {
  expeditions: <Expeditions />,
  about: <><About /><Crew /></>,
  team: <Team />,
  careers: <Careers />,
  join: <Join />,
}

export default function App() {
  const filmRef = useRef()
  const tagRef = useRef()
  const shots = useRef({ 1: [], 2: [] })
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [chapter, setChapter] = useState(chapters.start)
  const store = useScrollProgress(filmRef)
  const [page, setPage] = useState(readPage)

  useEffect(() => {
    const go = () => { setPage(readPage()); scrollTo(0, 0) }
    // Same-origin path links navigate without a reload.
    const click = (e) => {
      const a = e.target.closest?.('a[href^="/"]')
      if (!a || a.target || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return
      e.preventDefault()
      history.pushState(null, '', a.getAttribute('href'))
      go()
    }
    addEventListener('popstate', go)
    document.addEventListener('click', click)
    return () => { removeEventListener('popstate', go); document.removeEventListener('click', click) }
  }, [])

  // Shot one blocks the preloader; shot two decodes in the background.
  useEffect(() => {
    history.scrollRestoration = 'manual'
    scrollTo(0, 0)
    loadShot(1, shots.current[1], setProgress).then(() => loadShot(2, shots.current[2]))
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  useProgress(store, (p) => {
    setChapter(chapterFor(p))
    if (tagRef.current) tagRef.current.style.opacity = 1 - Math.min(1, p / 0.06)
  })

  const done = useCallback(() => setReady(true), [])

  return (
    <>
      {!ready && <Preloader progress={progress} onDone={done} />}
      <Menu />
      {!pages[page] && (
        <CornerTitle text={chapter}>
          <Coordinates store={store} />
        </CornerTitle>
      )}

      <main>
        <h1 className="sr-only">{site.fullName} —{site.tagline}</h1>
        {pages[page] ? <div className="page">{pages[page]}</div> : (
          <section ref={filmRef} className="film" style={{ height: `${film.heightVh}vh` }} aria-label="Drone shots: The Run and The Basin">
            <div className="stage">
              <FrameCanvas store={store} shots={shots} />
              <div className="vignette" />
              <div className="grain" />
              <i className="vf tl" /><i className="vf tr" /><i className="vf bl" /><i className="vf br" />
              <FrameCounter store={store} />
              <p ref={tagRef} className="mono tagline">{site.tagline.toUpperCase()} — {site.fullName}</p>
              {bigLines.map((l) => <BigLine key={l.text} store={store} {...l} />)}
              <Stats store={store} />
            </div>
          </section>
        )}
        {!pages[page] && (
          <>
            <Expeditions to="/expeditions" />
            <About to="/about" />
            <Crew to="/about" />
            <Team to="/team" />
            <Careers to="/careers" />
            <Join to="/join" />
          </>
        )}
      </main>
      <Footer />
      <Enquire />
      {ready && <CookieBanner />}
    </>
  )
}
