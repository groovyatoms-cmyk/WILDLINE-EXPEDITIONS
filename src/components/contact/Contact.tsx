'use client'

import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import { contact, site } from '@/data/site'
import { openEnquire, wa } from '@/lib/enquire'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'

// Channel icon names used in data/site.js.
const ICONS: Record<string, LucideIcon> = { whatsapp: MessageCircle, mail: Mail, phone: Phone, map: MapPin }
const ACTIONS: Record<string, React.ReactNode> = {
  whatsapp: (
    <Button variant="rust" href={wa()} target="_blank">
      WhatsApp us
    </Button>
  ),
  mail: <Button href={`mailto:${site.email}`}>{site.email}</Button>,
  phone: <Button href={`tel:+${site.whatsapp}`}>+{site.whatsapp}</Button>,
  map: (
    <Button onClick={openEnquire} aria-haspopup="dialog">
      Enquire
    </Button>
  ),
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
