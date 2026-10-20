'use client'

import { useEffect, useRef, useState } from 'react'
import { Coins, Languages } from 'lucide-react'
import { CURRENCIES, LANGS } from '@/data/i18n'
import { usePrefs } from '@/lib/prefs'

type Pop = 'lang' | 'currency' | null

// Language and currency pickers: two icon buttons beside the menu icon, each opening a small list.
export default function PrefsMenu() {
  const { lang, currency, setLang, setCurrency, t } = usePrefs()
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
  const current = open === 'lang' ? lang : currency

  return (
    <div ref={box} className="prefs">
      <button
        type="button"
        className="nav-menu"
        aria-haspopup="listbox"
        aria-expanded={open === 'lang'}
        aria-label={t('Language')}
        onClick={() => toggle('lang')}
      >
        <Languages size={24} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="nav-menu"
        aria-haspopup="listbox"
        aria-expanded={open === 'currency'}
        aria-label={t('Currency')}
        onClick={() => toggle('currency')}
      >
        <Coins size={24} strokeWidth={1.75} aria-hidden="true" />
      </button>
      {open && (
        <div className="prefs-pop" role="listbox" aria-label={open === 'lang' ? t('Language') : t('Currency')}>
          {options.map((o) => (
            <button
              key={o.code}
              type="button"
              role="option"
              aria-selected={o.code === current}
              onClick={() => {
                if (open === 'lang') setLang(o.code as typeof lang)
                else setCurrency(o.code as typeof currency)
                setOpen(null)
              }}
            >
              {o.label}
              {o.code === current && <i className="live-dot" aria-hidden="true" />}
            </button>
          ))}
          {open === 'currency' && <p className="mono">{t('Prices are approximate; you pay in rupees (INR).')}</p>}
        </div>
      )}
    </div>
  )
}
