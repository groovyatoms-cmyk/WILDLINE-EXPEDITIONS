'use client'

import { useEffect, useState } from 'react'
import { ArrowUp, Mail, Phone } from 'lucide-react'
import { contact, menuLinks, site, trips, tripSlug } from '@/data/site'
import { legal } from '@/data/legal'
import { wa } from '@/lib/enquire'
import ScrollWords from '@/components/ui/ScrollWords'
import { Facebook, Instagram, Youtube } from '@/components/ui/BrandIcons'

const LINKS = [
  { label: 'Facebook', href: site.facebook, Icon: Facebook, external: true },
  { label: 'Instagram', href: site.instagram, Icon: Instagram, external: true },
  { label: 'YouTube', href: site.youtube, Icon: Youtube, external: true },
  { label: 'Email', href: `mailto:${site.email}`, Icon: Mail },
  { label: 'Call', href: `tel:+${site.whatsapp}`, Icon: Phone },
]
// Passes named in the trip routes, set as an endless ribbon above the footer.
const PASSES = ['Khardung La', 'Pensi La', 'Sela Pass', 'Nathu La', 'Zojila', 'Chang La']
const office = contact.channels.find((c) => c.icon === 'map')?.desc ?? ''

// Local time at base camp (Leh keeps India Standard Time). Filled in after mount so the static page never disagrees with the browser.
function LehTime() {
  const [t, setT] = useState('')
  useEffect(() => {
    const tick = () =>
      setT(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }))
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])
  return <span className="mono leh-time">{t ? `Base camp, Leh · ${t} IST` : ' '}</span>
}

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="ribbon" aria-hidden="true">
        <div className="ribbon-track">
          {[0, 1].map((k) => (
            <div key={k}>
              {PASSES.map((p) => (
                <span key={p} data-t={p}>
                  <i>◆</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-line display">
        <ScrollWords text={site.tagline} />
      </div>

      <div className="footer-cols">
        <nav aria-label="Expeditions">
          <h2 className="mono">Expeditions</h2>
          {trips.slice(0, 6).map((t) => (
            <a key={t.name} href={`/expeditions/${tripSlug(t)}`}>
              {t.name}
            </a>
          ))}
        </nav>
        <nav aria-label="Company">
          <h2 className="mono">Wildline</h2>
          {menuLinks.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
          <a href="/faq">FAQ</a>
        </nav>
        <nav aria-label="Policies">
          <h2 className="mono">Policies</h2>
          {Object.values(legal).map((d) => (
            <a key={d.path} href={d.path}>
              {d.title}
            </a>
          ))}
        </nav>
        <address>
          <h2 className="mono">Find us</h2>
          <p>{office}</p>
          <a href={`tel:+${site.whatsapp}`}>+{site.whatsapp}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={wa()} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </address>
      </div>
      <nav className="footer-links" aria-label="Contact">
        {LINKS.map(({ label, href, Icon, external }) => (
          <a key={label} href={href} aria-label={label} title={label} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
            <Icon />
          </a>
        ))}
        <LehTime />
        <a
          className="to-top"
          href="#"
          aria-label="Back to the top"
          onClick={(e) => {
            e.preventDefault()
            scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <ArrowUp size={18} aria-hidden="true" />
        </a>
        <span className="mono">{site.copyright}</span>
      </nav>
      <div className="footer-mark display" aria-hidden="true">
        WILDLINE
      </div>
    </footer>
  )
}
