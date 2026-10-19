import { join, tripDetails, tripFaq, tripItinerary, tripSlug, trips } from '@/data/site.js'
import { openEnquire, wa } from '@/lib/enquire.js'
import Section from '@/components/ui/Section.jsx'
import Button from '@/components/ui/Button.jsx'

export default function ExpeditionDetail({ slug }) {
  const t = trips.find((x) => tripSlug(x) === slug)
  if (!t) return <Section id="expedition" title="NOT FOUND"><Button href="/expeditions">ALL EXPEDITIONS</Button></Section>
  const d = tripDetails[slug]
  const itinerary = tripItinerary[slug]
  const departures = join.dates.filter((x) => x.trip === t.name)
  return (
    <Section id="expedition" className="expedition-detail" title={t.name}>
      <img className="detail-hero" src={`${import.meta.env.BASE_URL}${t.still}`} alt={t.alt_text} />
      <p className="mono trip-meta">
        <span>{t.days} days</span><span>{t.alt}</span><span>{t.season}</span><span>from {t.price}</span>{d && <span>{d.level}</span>}
      </p>
      {d && <p className="careers-intro">{d.overview}</p>}
      {d && (
        <>
          <p className="mono label">ROUTE</p>
          <p className="mono">{d.route.join(' → ')}</p>
          <p className="mono label">HIGHLIGHTS</p>
          <ul className="detail-list mono">{d.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        </>
      )}
      {itinerary && (
        <>
          <p className="mono label">ITINERARY</p>
          <ol className="detail-days">
            {itinerary.map(([day, title, text]) => (
              <li key={day}><span className="mono">{day}</span><h3 className="display">{title}</h3><p>{text}</p></li>
            ))}
          </ol>
        </>
      )}
      <p className="mono label">INCLUDED</p>
      <p className="mono">{join.includes.join(' · ')}</p>
      <p className="mono label">NOT INCLUDED</p>
      <p className="mono">{join.excludes.join(' · ')}</p>
      {departures.length > 0 && (
        <>
          <p className="mono label">NEXT DEPARTURES</p>
          <ul className="detail-list mono">{departures.map((x) => <li key={x.date}>{x.date} · {x.seats} SEATS LEFT</li>)}</ul>
        </>
      )}
      <p className="mono label">QUESTIONS</p>
      <dl className="detail-faq">
        {tripFaq.map(([q, a]) => <div key={q}><dt className="mono">{q}</dt><dd>{a}</dd></div>)}
      </dl>
      <p className="mono join-note">{join.note}</p>
      <div className="cta">
        <Button variant="rust" href={wa(`Hi, I want to join the ${t.name}`)} target="_blank">WHATSAPP US</Button>
        <Button onClick={openEnquire} aria-haspopup="dialog">ENQUIRE</Button>
        <Button href="/expeditions">ALL EXPEDITIONS</Button>
      </div>
    </Section>
  )
}
