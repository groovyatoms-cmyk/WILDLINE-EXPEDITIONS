import { team } from '@/data/site.js'
import Section from '@/components/ui/Section.jsx'
import Reveal from '@/components/ui/Reveal.jsx'

export default function Team({ to }) {
  return (
    <Section id="team" className="team" title={team.headline} to={to}>
      <ul className="members">
        {(to ? team.members.slice(0, 4) : team.members).map((m, i) => (
          <Reveal as="li" key={m.name} index={i}>
            {m.photo
              ? <img className="member-photo" src={`${import.meta.env.BASE_URL}${m.photo}`} alt={m.name} loading="lazy" />
              : <div className="member-photo member-ph" role="img" aria-label={`Photo of ${m.name} coming soon`}>{m.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</div>}
            <h3 className="display">{m.name}</h3>
            <p className="mono member-role">{m.role}</p>
            <p>{m.bio}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
