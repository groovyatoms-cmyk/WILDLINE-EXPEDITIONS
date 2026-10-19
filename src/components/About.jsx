import { about } from '../data/site.js'

export default function About({ to }) {
  return (
    <section id="about" className="section about" aria-labelledby="about-h">
      <h2 id="about-h" className="display about-head">{about.headline}</h2>
      <div className="about-body">
        {(to ? about.body.slice(0, 1) : about.body).map((p) => <p key={p}>{p}</p>)}
      </div>
      {!to && <dl className="about-stats">
        {about.highlights.map(([v, k]) => (
          <div key={k}><dd className="display">{v}</dd><dt className="mono">{k}</dt></div>
        ))}
      </dl>}
      {to && <a className="pill pill-line section-more" href={to}>VIEW MORE →</a>}
    </section>
  )
}
