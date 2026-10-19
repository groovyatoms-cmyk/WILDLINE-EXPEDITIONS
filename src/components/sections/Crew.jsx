import { crew } from '@/data/site.js'
import Section from '@/components/ui/Section.jsx'
import Reveal from '@/components/ui/Reveal.jsx'

export default function Crew({ to }) {
  return (
    <Section id="crew" className="crew" title={crew.headline} to={to}>
      <dl className="mono specs">
        {(to ? crew.specs.slice(0, 6) : crew.specs).map(([k, v], i) => (
          <Reveal key={k} index={i}><dt>{k}</dt><dd>{v}</dd></Reveal>
        ))}
      </dl>
    </Section>
  )
}
