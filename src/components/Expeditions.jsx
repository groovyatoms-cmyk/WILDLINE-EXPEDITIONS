import { trips } from '../data/site.js'

export default function Expeditions({ to }) {
  return (
    <section id="expeditions" className="section expeditions" aria-labelledby="exp-h">
      <h2 id="exp-h" className="mono label">EXPEDITIONS — 2026 SEASON</h2>
      <ul>
        {(to ? trips.slice(0, 3) : trips).map((t) => (
          <li key={t.name}>
            <a className="trip" href="/join">
              <img src={`${import.meta.env.BASE_URL}${t.still}`} alt={t.alt_text} loading="lazy" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <span className="display trip-name">{t.name}</span>
              <span className="mono trip-meta">
                <span>{t.days} days</span><span>{t.alt}</span><span>{t.season}</span><span>from {t.price}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      {to && <a className="pill pill-line section-more" href={to}>VIEW MORE →</a>}
    </section>
  )
}
