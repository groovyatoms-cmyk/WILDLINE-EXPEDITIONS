import { Mail, Phone } from 'lucide-react'
import { site } from '@/data/site.js'
import { Facebook, Instagram, Youtube } from './BrandIcons.jsx'

const LINKS = [
  { label: 'Facebook', href: site.facebook, Icon: Facebook, external: true },
  { label: 'Instagram', href: site.instagram, Icon: Instagram, external: true },
  { label: 'YouTube', href: site.youtube, Icon: Youtube, external: true },
  { label: 'Email', href: `mailto:${site.email}`, Icon: Mail },
  { label: 'Call', href: `tel:+${site.whatsapp}`, Icon: Phone },
]

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <nav className="footer-links" aria-label="Contact">
        {LINKS.map(({ label, href, Icon, external }) => (
          <a key={label} href={href} aria-label={label} title={label} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
            <Icon />
          </a>
        ))}
        <span className="mono">{site.copyright}</span>
      </nav>
      <div className="wordmark display" aria-hidden="true">{site.name}</div>
    </footer>
  )
}
