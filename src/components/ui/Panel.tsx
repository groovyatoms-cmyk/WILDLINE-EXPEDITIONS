'use client'

import { X } from 'lucide-react'
import { motion } from 'framer-motion'

// Slide-in side panel with a dimmed backdrop. Used by the enquiry form.
type Props = { open: boolean; onClose: () => void; label: string; className?: string; children: React.ReactNode }

export default function Panel({ open, onClose, label, className = '', children }: Props) {
  return (
    <>
      <motion.div className={`panel-scrim${open ? ' open' : ''}`} onClick={onClose} initial={false} animate={{ opacity: open ? 1 : 0 }} />
      <motion.aside className={`panel ${className}`.trim()} role="dialog" aria-label={label} aria-hidden={!open} {...(open ? {} : ({ inert: '' } as object))}
        initial={false} animate={{ x: open ? 0 : '110%' }} transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}>
        <button className="mono panel-close" onClick={onClose}>CLOSE <X size={14} aria-hidden="true" /></button>
        {children}
      </motion.aside>
    </>
  )
}
