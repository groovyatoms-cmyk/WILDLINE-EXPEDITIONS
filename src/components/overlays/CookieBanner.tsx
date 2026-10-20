'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { confetti } from '@/lib/confetti'
import Button from '@/components/ui/Button'

const KEY = 'cookie-consent'
const read = (): string | null => {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

// The site sets no cookies yet; the choice is stored so analytics can honour it later.
export default function CookieBanner() {
  // undefined until mounted: localStorage is unavailable on the server and the banner must not flash for returning visitors.
  const [choice, setChoice] = useState<string | null | undefined>(undefined)
  useEffect(() => setChoice(read()), [])

  const pick = (v: string) => {
    try {
      localStorage.setItem(KEY, v)
    } catch {
      /* private mode: ask again next visit */
    }
    setChoice(v)
    if (v === 'accepted') confetti(28) // a few crumbs
  }

  return (
    <AnimatePresence>
      {choice === null && (
        <motion.div
          className="cookie"
          role="dialog"
          aria-label="Cookie consent"
          initial={{ y: '120%' }}
          animate={{ y: 0 }}
          exit={{ y: '120%' }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
          <span className="cookie-icon" aria-hidden="true">
            <Cookie size={28} strokeWidth={1.5} />
          </span>
          <div className="cookie-copy">
            <h2 className="display">Trail snacks?</h2>
            <p className="mono">
              Only the essentials ride in this convoy: your choice and nothing else. Say yes and we may add a little analytics to see what
              works. See our <a href="/cookies">Cookies Policy</a>.
            </p>
          </div>
          <div className="cookie-actions">
            <Button onClick={() => pick('declined')}>Decline</Button>
            <Button variant="rust" onClick={() => pick('accepted')}>
              Accept
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
