import type { RefObject } from 'react'
import type { Store } from '@/hooks/useScrollProgress'
import type { Shots } from '@/lib/frames'
import { bigLines, film } from '@/data/site'
import dynamic from 'next/dynamic'
import Reviews from '@/components/about/Reviews'
import About from '@/components/about/About'
import SectionSkeleton from '@/components/ui/SectionSkeleton'
import AutoPlay from '@/components/film/AutoPlay'
import BigLine from '@/components/film/BigLine'
import FrameCanvas from '@/components/film/FrameCanvas'
import Hero from '@/components/film/Hero'
import ScrollCue from '@/components/film/ScrollCue'
import Stats from '@/components/film/Stats'

// Skeleton heights are the real sections' heights on a 1280 px desktop and a 390 px phone, so nothing below jumps when a chunk arrives.
// Everything below the film is split into its own chunk and loads as it is needed; the skeleton holds the section's height meanwhile.
const ConvoyCockpit = dynamic(() => import('@/components/safety/ConvoyCockpit'), {
  loading: () => <SectionSkeleton id="convoy" height={1166} mobile={1020} blocks={2} />,
})
const BlogPreview = dynamic(() => import('@/components/blog/BlogPreview'), {
  loading: () => <SectionSkeleton id="blog" height={974} mobile={785} blocks={3} />,
})
const Enquiry = dynamic(() => import('@/components/contact/Enquiry'), {
  loading: () => <SectionSkeleton id="enquiry" height={963} mobile={954} blocks={1} />,
})
const Expeditions = dynamic(() => import('@/components/expeditions/Expeditions'), {
  loading: () => <SectionSkeleton id="expeditions" height={6316} mobile={922} blocks={4} />,
})
const Faq = dynamic(() => import('@/components/contact/Faq'), {
  loading: () => <SectionSkeleton id="faq" height={1627} mobile={2115} blocks={1} />,
})
const Gallery = dynamic(() => import('@/components/about/Gallery'), {
  loading: () => <SectionSkeleton id="gallery" height={983} mobile={724} blocks={3} />,
})
const How = dynamic(() => import('@/components/safety/How'), {
  loading: () => <SectionSkeleton id="how" height={2350} mobile={505} blocks={4} />,
})
const Join = dynamic(() => import('@/components/convoys/Join'), {
  loading: () => <SectionSkeleton id="join" height={1088} mobile={856} blocks={3} />,
})
const Team = dynamic(() => import('@/components/about/Team'), {
  loading: () => <SectionSkeleton id="team" height={1000} mobile={947} blocks={2} />,
})

// Home previews every section; each heading opens that section's own page, which carries the full version.
type HomeProps = {
  store: Store
  shots: RefObject<Shots>
  filmRef: RefObject<HTMLElement | null>
  heroRef: RefObject<HTMLDivElement | null>
}

export default function Home({ store, shots, filmRef, heroRef }: HomeProps) {
  return (
    <>
      <section
        id="basecamp"
        ref={filmRef}
        className="film"
        style={{ height: `${film.heightVh}vh` }}
        aria-label="Drone shots: The Run and The Basin"
      >
        <div className="stage">
          <FrameCanvas store={store} shots={shots} />
          <div className="vignette" />
          <div className="grade" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />
          <div className="bars" aria-hidden="true" />
          <Hero heroRef={heroRef} />
          <ScrollCue store={store} />
          {bigLines.map((l) => (
            <BigLine key={l.text} store={store} {...l} />
          ))}
          <Stats store={store} />
          <AutoPlay filmRef={filmRef} shots={shots} store={store} />
        </div>
      </section>
      <About to="/about" />
      <Expeditions to="/expeditions" />
      <ConvoyCockpit to="/safety" />
      <BlogPreview to="/blog" />
      <How to="/safety" />
      <Gallery to="/gallery" />
      <Reviews to="/about" />
      <Team to="/team" />
      <Join to="/join" />
      <Faq to="/faq" />
      <Enquiry to="/contact" />
    </>
  )
}
