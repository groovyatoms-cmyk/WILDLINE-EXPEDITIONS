import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from './Button.jsx'

// Shared shell for every content section: heading, optional "view more" link, body.
// `to` also means "home preview": the caller shows a short version of its content.
export default function Section({ id, className = '', title, to, children }) {
  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      aria-labelledby={`${id}-h`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 id={`${id}-h`} className="display section-head">{title}</h2>
      {to && <Button className="section-more" href={to}>VIEW MORE <ArrowRight size={18} aria-hidden="true" /></Button>}
      {children}
    </motion.section>
  )
}
