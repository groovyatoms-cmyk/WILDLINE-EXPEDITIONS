'use client'

import { motion } from 'framer-motion'

// Shared shell for every content section: heading (a link to the full page when `to` is set), body.
// `to` also means "home preview": the caller shows a short version of its content.
type Props = { id: string; className?: string; title: string; to?: string; heading?: 'h1' | 'h2'; children: React.ReactNode }

// The heading is the page's h1 on full pages and an h2 on home previews (`heading` overrides).
export default function Section({ id, className = '', title, to, heading, children }: Props) {
  const H = heading ?? (to ? 'h2' : 'h1')
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
      <H id={`${id}-h`} className="display section-head">{to ? <a href={to}>{title}</a> : title}</H>
      {children}
    </motion.section>
  )
}
