import { crew } from '../data/site.js'

export default function Crew({ to }) {
  return (
    <section id="crew" className="section crew" aria-labelledby="crew-h">
      <h2 id="crew-h" className="display crew-head">{crew.headline}</h2>
      <dl className="mono specs">
        {(to ? crew.specs.slice(0, 6) : crew.specs).map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
      {to && <a className="pill pill-line section-more" href={to}>VIEW MORE →</a>}
    </section>
  )
}
