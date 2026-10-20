'use client'

import { X } from 'lucide-react'
import { motion, useDragControls } from 'framer-motion'

// Slide-in side panel with a dimmed backdrop. Used by the enquiry form.
type Props = { open: boolean; onClose: () => void; label: string; className?: string; children: React.ReactNode }

export default function Panel({ open, onClose, label, className = '', children }: Props) {
  const drag = useDragControls()
  return (
    <>
      <motion.div className={`panel-scrim${open ? ' open' : ''}`} onClick={onClose} initial={false} animate={{ opacity: open ? 1 : 0 }} />
      <motion.aside
        className={`panel ${className}`.trim()}
        role="dialog"
        aria-label={label}
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={{ x: open ? 0 : '110%' }}
        drag="x"
        dragControls={drag}
        dragListener={false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0.04, right: 0.7 }}
        onDragEnd={(_, { offset, velocity }) => {
          if (offset.x + velocity.x * 0.25 > 140) onClose()
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.45 }}
      >
        <div className="panel-grip" onPointerDown={(e) => drag.start(e)} aria-hidden="true" />
        <button className="mono panel-close" onClick={onClose}>
          Close <X size={14} aria-hidden="true" />
        </button>
        {children}
      </motion.aside>
    </>
  )
}
