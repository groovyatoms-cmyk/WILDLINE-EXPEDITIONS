import { bigLines, film, site } from '@/data/site.js'
import About from '@/components/sections/About.jsx'
import BigLine from '@/components/film/BigLine.jsx'
import Crew from '@/components/sections/Crew.jsx'
import Expeditions from '@/components/sections/Expeditions.jsx'
import FrameCanvas from '@/components/film/FrameCanvas.jsx'
import FrameCounter from '@/components/ui/FrameCounter.jsx'
import Join from '@/components/sections/Join.jsx'
import Stats from '@/components/film/Stats.jsx'
import Team from '@/components/sections/Team.jsx'

// Scroll film, then a short preview of every section, each linking to its own page.
export default function Home({ store, shots, filmRef, tagRef }) {
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
