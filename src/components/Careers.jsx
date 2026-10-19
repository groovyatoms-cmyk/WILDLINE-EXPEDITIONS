import { careers, site } from '../data/site.js'

// Placeholder line icons, one per role; swap for real artwork later.
const ICONS = {
  wheel: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" /><path d="M12 9.5V3M9.8 13.2 4 16M14.2 13.2 20 16" /></>,
  wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v3H9zM8.5 12h7M8.5 16h5" /></>,
  camera: <><path d="M3 8h4l2-3h6l2 3h4v12H3z" /><circle cx="12" cy="13.5" r="3.5" /></>,
}

export default function Careers({ to }) {
  return (
    <section id="careers" className="section careers" aria-labelledby="careers-h">
      <h2 id="careers-h" className="display careers-head">{careers.headline}</h2>
      <p className="careers-intro">{careers.intro}</p>
      <ul className="roles">
        {(to ? careers.roles.slice(0, 2) : careers.roles).map((r) => (
          <li key={r.title}>
            <svg className="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[r.icon]}</svg>
            <h3 className="display">{r.title}</h3>
            <span className="mono role-type">{r.type}</span>
            <p>{r.desc}</p>
            <a className="pill pill-line" href={`mailto:${site.email}?subject=${encodeURIComponent(careers.subject + r.title)}`}>{careers.cta}</a>
          </li>
        ))}
      </ul>
      {to && <a className="pill pill-line section-more" href={to}>VIEW MORE →</a>}
    </section>
  )
}
