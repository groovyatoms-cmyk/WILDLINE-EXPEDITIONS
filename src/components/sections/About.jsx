import { about } from '@/data/site.js'
import Section from '@/components/ui/Section.jsx'

export default function About({ to }) {
  return (
    <Section id="about" className="about" title={about.headline} to={to}>
      <div className="about-body">
        {(to ? about.body.slice(0, 1) : about.body).map((p) => <p key={p}>{p}</p>)}
      </div>
      {!to && <dl className="about-stats">
        {about.highlights.map(([v, k]) => (
          <div key={k}><dd className="display">{v}</dd><dt className="mono">{k}</dt></div>
        ))}
      </dl>}
    </Section>
  )
}
