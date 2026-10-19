import type { RefObject } from 'react'
import type { Store } from '@/hooks/useScrollProgress'
import type { Shots } from '@/lib/frames'
import { bigLines, film, site } from '@/data/site'
import About from '@/components/sections/About'
import AutoPlay from '@/components/film/AutoPlay'
import BigLine from '@/components/film/BigLine'
import Crew from '@/components/sections/Crew'
import Expeditions from '@/components/sections/Expeditions'
import FrameCanvas from '@/components/film/FrameCanvas'
import FrameCounter from '@/components/ui/FrameCounter'
import Join from '@/components/sections/Join'
import Stats from '@/components/film/Stats'
import Team from '@/components/sections/Team'

// Scroll film, then a short preview of every section, each linking to its own page.
type HomeProps = {
  store: Store
  shots: RefObject<Shots>
  filmRef: RefObject<HTMLElement>
  tagRef: RefObject<HTMLParagraphElement>
}

export default function Home({ store, shots, filmRef, tagRef }: HomeProps) {
  return (
    <>
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
          <AutoPlay filmRef={filmRef} shots={shots} />
        </div>
      </section>
      <Expeditions to="/expeditions" />
      <About to="/about" />
      <Crew to="/about" />
      <Team to="/team" />
      <Join to="/join" />
    </>
  )
}
