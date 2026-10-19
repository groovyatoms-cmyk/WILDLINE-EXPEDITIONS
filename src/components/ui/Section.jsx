import { ArrowRight } from 'lucide-react'
import Button from './Button.jsx'

// Shared shell for every content section: heading, optional "view more" link, body.
// `to` also means "home preview": the caller shows a short version of its content.
export default function Section({ id, className = '', title, to, children }) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="display section-head">{title}</h2>
      {to && <Button className="section-more" href={to}>VIEW MORE <ArrowRight size={18} aria-hidden="true" /></Button>}
      {children}
    </section>
  )
}
