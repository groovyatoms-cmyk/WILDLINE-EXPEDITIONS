import { Camera, Car, ClipboardList, Wrench } from 'lucide-react'
import { careers, site } from '@/data/site.js'
import Section from '@/components/ui/Section.jsx'
import Button from '@/components/ui/Button.jsx'

// Role icon names used in data/site.js.
const ICONS = { car: Car, wrench: Wrench, clipboard: ClipboardList, camera: Camera }

// Full page only: Careers has no preview on the home page.
export default function Careers() {
  return (
    <Section id="careers" className="careers" title={careers.headline}>
      <p className="careers-intro">{careers.intro}</p>
      <ul className="roles">
        {careers.roles.map((r) => {
          const Icon = ICONS[r.icon]
          return (
            <li key={r.title}>
              <Icon className="role-icon" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="display">{r.title}</h3>
              <span className="mono role-type">{r.type}</span>
              <p>{r.desc}</p>
              <Button href={`mailto:${site.email}?subject=${encodeURIComponent(careers.subject + r.title)}`}>{careers.cta}</Button>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
