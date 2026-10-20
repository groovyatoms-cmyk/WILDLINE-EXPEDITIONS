'use client'

import { useState } from 'react'
import { Compass } from 'lucide-react'
import { team } from '@/data/site'
import Section from '@/components/ui/Section'
import ShimmerImg from '@/components/ui/ShimmerImg'

// Crew roster: the names set large on the left; pick one and their crew pass swings into place on its lanyard.
export default function Team({ to }: { to?: string }) {
  const members = team.members
  const [i, setI] = useState(0)
  const m = members[i]
  return (
    <Section id="team" className="team" title={team.headline} to={to}>
      <div className="roster">
        <ul className="roster-list">
          {members.map((x, k) => (
            <li key={x.name}>
              <button
                type="button"
                aria-pressed={k === i}
                onClick={() => setI(k)}
                onFocus={() => setI(k)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setI(k)}
              >
                <span className="display">{x.name}</span>
                <span className="mono">{x.role}</span>
              </button>
            </li>
          ))}
        </ul>
        <figure className="roster-card" aria-live="polite">
          <div className="lanyard" aria-hidden="true">
            <i />
          </div>
          <div key={m.name} className="id-card">
            <div className="id-top mono">
              <Compass size={16} strokeWidth={1.5} aria-hidden="true" />
              Wildline crew pass
            </div>
            {m.photo ? (
              <ShimmerImg className="member-photo" ratio="1 / 1" src={`/${m.photo}`} alt={m.name} />
            ) : (
              <div className="member-photo member-ph" role="img" aria-label={`Photo of ${m.name} coming soon`}>
                {m.name
                  .split(' ')
                  .filter(Boolean)
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)}
              </div>
            )}
            <figcaption>
              <strong className="display">{m.name}</strong>
              <span className="mono">{m.role}</span>
              <p>{m.bio}</p>
            </figcaption>
            <i className="id-code" aria-hidden="true" />
          </div>
        </figure>
      </div>
    </Section>
  )
}
