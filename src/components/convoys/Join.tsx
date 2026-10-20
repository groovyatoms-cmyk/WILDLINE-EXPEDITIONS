'use client'

import { join } from '@/data/site'
import { useUpcoming } from '@/lib/upcoming'
import { openEnquire, wa } from '@/lib/enquire'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import StarSky from '@/components/ui/StarSky'
import Countdown from '@/components/convoys/Countdown'
import DepartureBoard from '@/components/convoys/DepartureBoard'

export default function Join({ to }: { to?: string }) {
  const { list } = useUpcoming()
  return (
    <Section id="join" className="join" title={join.headline} to={to}>
      <StarSky />
      <Countdown />
      <DepartureBoard list={to ? list.slice(0, 5) : list} />
      {!to && (
        <>
          <div className="join-lists">
            <div>
              <h3 className="display">Included</h3>
              <ul>
                {join.includes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="display">Not included</h3>
              <ul className="not">
                {join.excludes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          {
            <ol className="dates steps mono">
              {join.steps.map(([h, p], i) => (
                <Reveal as="li" key={h} index={i}>
                  <span>{h}</span>
                  <span>{p}</span>
                </Reveal>
              ))}
            </ol>
          }
          {
            <ul className="join-note join-policy mono">
              {join.policy.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          }
          {<p className="mono join-note">{join.note}</p>}
        </>
      )}
      <div className="cta">
        <Button variant="rust" href={wa()} target="_blank">
          WhatsApp us
        </Button>
        <Button onClick={openEnquire} aria-haspopup="dialog">
          Enquire
        </Button>
      </div>
    </Section>
  )
}
