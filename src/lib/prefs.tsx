'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { CURRENCIES, LANGS, dict, type Currency, type Lang } from '@/data/i18n'
import { read, write } from '@/lib/storage'

const LANG_KEY = 'pref-lang'
const CUR_KEY = 'pref-currency'
const FX_KEY = 'pref-fx'
const FX_TTL = 864e5 // live rates are reused for a day
const FX_URL = `https://api.frankfurter.dev/v1/latest?base=INR&symbols=${CURRENCIES.filter((c) => c.code !== 'INR')
  .map((c) => c.code)
  .join(',')}`

type Rates = Partial<Record<Currency, number>>

// Fills {placeholders} in a string.
const fill = (s: string, vars?: Record<string, string | number>) =>
  vars ? s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m)) : s

// Translation of an English string, or the English itself when there is none.
export const translate = (lang: Lang, key: string, vars?: Record<string, string | number>) =>
  fill(lang === 'en' ? key : (dict[lang][key] ?? key), vars)

// A rupee price like '₹1,45,000' in the chosen currency, marked approximate. INR keeps the original text.
export function convert(price: string, currency: Currency, rates: Rates): string {
  const inr = parseInt(price.replace(/[^\d]/g, ''), 10)
  const cur = CURRENCIES.find((c) => c.code === currency)
  const rate = rates[currency] ?? cur?.rate
  if (currency === 'INR' || !cur || !rate || Number.isNaN(inr)) return price
  const out = new Intl.NumberFormat(cur.locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(inr * rate)
  return `≈ ${out}`
}

type Prefs = {
  lang: Lang
  currency: Currency
  setLang: (l: Lang) => void
  setCurrency: (c: Currency) => void
  t: (key: string, vars?: Record<string, string | number>) => string
  money: (price: string) => string
}

// Without a provider (tests, isolated components) everything stays English and rupees.
const Ctx = createContext<Prefs>({
  lang: 'en',
  currency: 'INR',
  setLang: () => {},
  setCurrency: () => {},
  t: (key, vars) => fill(key, vars),
  money: (price) => price,
})

export const usePrefs = () => useContext(Ctx)

// Live INR rates from the free Frankfurter (ECB) API, cached for a day. Any failure keeps the built-in fallback rates.
async function liveRates(): Promise<Rates | null> {
  try {
    const cached = JSON.parse(read(FX_KEY) ?? 'null') as { at: number; rates: Rates } | null
    if (cached && Date.now() - cached.at < FX_TTL) return cached.rates
    const res = await fetch(FX_URL)
    if (!res.ok) return null
    const body = (await res.json()) as { rates?: Record<string, unknown> }
    const rates: Rates = {}
    for (const c of CURRENCIES) {
      const v = body.rates?.[c.code]
      if (typeof v === 'number' && Number.isFinite(v) && v > 0) rates[c.code] = v
    }
    if (!Object.keys(rates).length) return null
    write(FX_KEY, JSON.stringify({ at: Date.now(), rates }))
    return rates
  } catch {
    return null
  }
}

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [currency, setCurrencyState] = useState<Currency>('INR')
  const [rates, setRates] = useState<Rates>({})

  // Saved choices are applied after mount, so the server and the first client render agree.
  useEffect(() => {
    const l = LANGS.find((x) => x.code === read(LANG_KEY))
    const c = CURRENCIES.find((x) => x.code === read(CUR_KEY))
    if (l) setLangState(l.code)
    if (c) setCurrencyState(c.code)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (currency === 'INR') return
    let live = true
    liveRates().then((r) => live && r && setRates(r))
    return () => {
      live = false
    }
  }, [currency])

  const value = useMemo<Prefs>(
    () => ({
      lang,
      currency,
      setLang: (l) => {
        setLangState(l)
        write(LANG_KEY, l)
      },
      setCurrency: (c) => {
        setCurrencyState(c)
        write(CUR_KEY, c)
      },
      t: (key, vars) => translate(lang, key, vars),
      money: (price) => convert(price, currency, rates),
    }),
    [lang, currency, rates],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
