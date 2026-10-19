import { join, trips } from '@/data/site.js'
import { openEnquire, wa } from '@/lib/enquire.js'
import Section from '@/components/ui/Section.jsx'
import Button from '@/components/ui/Button.jsx'
import Reveal from '@/components/ui/Reveal.jsx'

export default function Join({ to }) {
  return (
    <Section id="join" className="join" title={join.headline} to={to}>
      <ul className="dates mono">
        {(to ? join.dates.slice(0, 3) : join.dates).map((d, i) => {
          const t = trips.find((x) => x.name === d.trip)
          return (
            <Reveal as="li" key={d.date} index={i}>
              <span>{d.date}</span><span>{d.trip}</span>
              {t && <span>{t.days} days · from {t.price}</span>}
              <span>{d.seats} SEATS LEFT · LIMITED SEATS</span>
            </Reveal>
          )
        })}
      </ul>
      {!to && <p className="mono join-includes">INCLUDED: {join.includes.join(' · ')}</p>}
      {!to && <p className="mono join-note">{join.note}</p>}
      <div className="cta">
        <Button variant="rust" href={wa()} target="_blank">WHATSAPP US</Button>
        <Button onClick={openEnquire} aria-haspopup="dialog">ENQUIRE</Button>
      </div>
    </Section>
  )
}
