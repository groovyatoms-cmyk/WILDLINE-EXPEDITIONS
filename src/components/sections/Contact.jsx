import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { contact, site } from '@/data/site.js'
import { openEnquire, wa } from '@/lib/enquire.js'
import Section from '@/components/ui/Section.jsx'
import Button from '@/components/ui/Button.jsx'
import Reveal from '@/components/ui/Reveal.jsx'

// Channel icon names used in data/site.js.
const ICONS = { whatsapp: MessageCircle, mail: Mail, phone: Phone, map: MapPin }
const ACTIONS = {
  whatsapp: <Button variant="rust" href={wa()} target="_blank">WHATSAPP US</Button>,
  mail: <Button href={`mailto:${site.email}`}>{site.email}</Button>,
  phone: <Button href={`tel:+${site.whatsapp}`}>+{site.whatsapp}</Button>,
  map: <Button onClick={openEnquire} aria-haspopup="dialog">ENQUIRE</Button>,
}

export default function Contact() {
  return (
    <Section id="contact-us" className="careers" title={contact.headline}>
      <p className="careers-intro">{contact.intro}</p>
      <ul className="roles">
        {contact.channels.map((c, i) => {
          const Icon = ICONS[c.icon]
          return (
            <Reveal as="li" key={c.title} index={i}>
              <Icon className="role-icon" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="display">{c.title}</h3>
              <p>{c.desc}</p>
              {ACTIONS[c.icon]}
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
