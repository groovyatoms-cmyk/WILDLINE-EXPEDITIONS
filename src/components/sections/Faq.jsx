import { faq } from '@/data/site.js'
import Section from '@/components/ui/Section.jsx'
import Button from '@/components/ui/Button.jsx'
import { openEnquire } from '@/lib/enquire.js'

export default function Faq() {
  return (
    <Section id="faq" className="faq" title={faq.headline}>
      <p className="careers-intro">{faq.intro}</p>
      {faq.groups.map((g) => (
        <div key={g.title}>
          <p className="mono label">{g.title}</p>
          {g.items.map(([q, a]) => (
            <details key={q} className="faq-item">
              <summary className="mono">{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      ))}
      <div className="cta"><Button onClick={openEnquire} aria-haspopup="dialog">ASK US</Button></div>
    </Section>
  )
}
