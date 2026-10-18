import { site } from '../data/site.js'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <nav className="mono footer-links" aria-label="Contact">
        <a href={site.instagram} target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
        <a href={site.youtube} target="_blank" rel="noopener noreferrer">YOUTUBE</a>
        <a href={`mailto:${site.email}`}>{site.email.toUpperCase()}</a>
        <span>{site.copyright}</span>
      </nav>
      <div className="wordmark display" aria-hidden="true">{site.name}</div>
    </footer>
  )
}
