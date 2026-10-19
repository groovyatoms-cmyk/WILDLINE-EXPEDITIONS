import { join, trips } from '../data/site.js'
import { openEnquire, wa } from './Enquire.jsx'

export default function Join({ to }) {
  return (
    <section id="join" className="section join" aria-labelledby="join-h">
      <h2 id="join-h" className="display join-head">{join.headline}</h2>
      <ul className="dates mono">
        {(to ? join.dates.slice(0, 3) : join.dates).map((d) => {
          const t = trips.find((x) => x.name === d.trip)
          return (
            <li key={d.date}>
              <span>{d.date}</span><span>{d.trip}</span>
              {t && <span>{t.days} days · from {t.price}</span>}
              <span>{d.seats} SEATS LEFT · LIMITED SEATS</span>
            </li>
          )
        })}
      </ul>
      {!to && <p className="mono join-includes">INCLUDED: {join.includes.join(' · ')}</p>}
      {!to && <p className="mono join-note">{join.note}</p>}
      <div className="cta">
        <a className="pill pill-rust" href={wa()} target="_blank" rel="noopener noreferrer">WHATSAPP US</a>
        <button className="pill pill-line" onClick={openEnquire} aria-haspopup="dialog">ENQUIRE</button>
      </div>
      {to && <a className="pill pill-line section-more" href={to}>VIEW MORE →</a>}
    </section>
  )
}
