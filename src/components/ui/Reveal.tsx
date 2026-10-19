'use client'

import { motion } from 'framer-motion'

// Fades and lifts its content in once, when it first scrolls into view.
// `index` staggers items of a list. Reduced-motion visitors get the fade only (see MotionConfig in App).
type Props = React.ComponentProps<typeof motion.div> & { as?: 'div' | 'li'; index?: number }

export default function Reveal({ as = 'div', index = 0, children, ...props }: Props) {
  const Tag = motion[as] as typeof motion.div
  return (
    <Tag
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Tag>
  )
}
