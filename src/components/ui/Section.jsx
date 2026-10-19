import { motion } from 'framer-motion'

// Shared shell for every content section: heading (a link to the full page when `to` is set), body.
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
      <h2 id={`${id}-h`} className="display section-head">{to ? <a href={to}>{title}</a> : title}</h2>
      {children}
    </motion.section>
  )
}
