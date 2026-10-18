import { team } from '../data/site.js'

export default function Team() {
  return (
    <section id="team" className="section team" aria-labelledby="team-h">
      <h2 id="team-h" className="display team-head">{team.headline}</h2>
      <ul className="members">
        {team.members.map((m) => (
          <li key={m.name}>
            {m.photo
              ? <img className="member-photo" src={`${import.meta.env.BASE_URL}${m.photo}`} alt={m.name} loading="lazy" />
              : <div className="member-photo member-ph" role="img" aria-label={`Photo of ${m.name} coming soon`}>{m.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</div>}
            <h3 className="display">{m.name}</h3>
            <p className="mono member-role">{m.role}</p>
            <p>{m.bio}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
