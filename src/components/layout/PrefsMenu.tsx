'use client'

import { useEffect, useRef, useState } from 'react'
import { Coins, Languages } from 'lucide-react'
import { CURRENCIES } from '@/data/currencies'
import { LANGS } from '@/data/languages'
import { usePrefs } from '@/lib/prefs'

type Pop = 'lang' | 'currency' | null

// Language and currency pickers: two icon buttons beside the menu icon, each opening a small list.
// The language list holds English only for now (see data/languages.ts).
export default function PrefsMenu() {
  const { currency, setCurrency } = usePrefs()
  const [open, setOpen] = useState<Pop>(null)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const out = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(null)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    addEventListener('pointerdown', out)
    addEventListener('keydown', esc)
    return () => {
      removeEventListener('pointerdown', out)
      removeEventListener('keydown', esc)
    }
  }, [open])

  const toggle = (p: Exclude<Pop, null>) => setOpen(open === p ? null : p)
  const options =
    open === 'lang'
      ? LANGS.map((l) => ({ code: l.code, label: l.name }))
      : CURRENCIES.map((c) => ({ code: c.code, label: `${c.code} · ${c.name}` }))
  const current = open === 'lang' ? LANGS[0].code : currency

  return (
    <div ref={box} className="prefs">
      <button
        type="button"
        className="nav-menu"
        aria-haspopup="listbox"
        aria-expanded={open === 'lang'}
        aria-label="Language"
        onClick={() => toggle('lang')}
      >
        <Languages size={24} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="nav-menu"
        aria-haspopup="listbox"
        aria-expanded={open === 'currency'}
        aria-label="Currency"
        onClick={() => toggle('currency')}
      >
        <Coins size={24} strokeWidth={1.75} aria-hidden="true" />
      </button>
      {open && (
        <div className="prefs-pop" role="listbox" aria-label={open === 'lang' ? 'Language' : 'Currency'}>
          {options.map((o) => (
            <button
              key={o.code}
              type="button"
              role="option"
              aria-selected={o.code === current}
              onClick={() => {
                if (open === 'currency') setCurrency(o.code as typeof currency)
                setOpen(null)
              }}
            >
              {o.label}
              {o.code === current && <i className="live-dot" aria-hidden="true" />}
            </button>
          ))}
          {open === 'currency' && <p className="mono">Prices are approximate; you pay in rupees (INR).</p>}
        </div>
      )}
    </div>
  )
}
