import { about } from '@/data/site.js'
import Section from '@/components/ui/Section.jsx'
import Reveal from '@/components/ui/Reveal.jsx'

export default function About({ to }) {
  return (
    <Section id="about" className="about" title={about.headline} to={to}>
      <div className="about-body">
        {about.body.map((p) => <p key={p}>{p}</p>)}
      </div>
      <dl className="about-stats">
        {about.highlights.map(([v, k], i) => (
          <Reveal key={k} index={i}><dd className="display">{v}</dd><dt className="mono">{k}</dt></Reveal>
        ))}
      </dl>
    </Section>
  )
}
