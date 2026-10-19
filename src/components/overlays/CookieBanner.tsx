'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const KEY = 'cookie-consent'
const read = (): string | null => { try { return localStorage.getItem(KEY) } catch { return null } }

// The site sets no cookies yet; the choice is stored so analytics can honour it later.
export default function CookieBanner() {
  // undefined until mounted: localStorage is unavailable on the server and the banner must not flash for returning visitors.
  const [choice, setChoice] = useState<string | null | undefined>(undefined)
  useEffect(() => setChoice(read()), [])

  const pick = (v: string) => {
    try { localStorage.setItem(KEY, v) } catch { /* private mode: ask again next visit */ }
    setChoice(v)
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
          transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
        >
          <p className="mono">We use cookies to keep the site working and understand how it is used. See our <a href="/cookies">Cookies Policy</a>.</p>
          <div className="cookie-actions">
            <Button onClick={() => pick('declined')}>DECLINE</Button>
            <Button variant="rust" onClick={() => pick('accepted')}>ACCEPT</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
