import { crew } from '@/data/site.js'
import Section from '@/components/ui/Section.jsx'

export default function Crew({ to }) {
  return (
    <Section id="crew" className="crew" title={crew.headline} to={to}>
      <dl className="mono specs">
        {(to ? crew.specs.slice(0, 6) : crew.specs).map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </Section>
  )
}
