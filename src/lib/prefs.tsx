'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { CURRENCIES, type Currency } from '@/data/currencies'
import { read, write } from '@/lib/storage'

const CUR_KEY = 'pref-currency'
const FX_KEY = 'pref-fx'
const FX_TTL = 864e5 // live rates are reused for a day
const FX_URL = `https://api.frankfurter.dev/v1/latest?base=INR&symbols=${CURRENCIES.filter((c) => c.code !== 'INR')
  .map((c) => c.code)
  .join(',')}`

type Rates = Partial<Record<Currency, number>>

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
  currency: Currency
  setCurrency: (c: Currency) => void
  money: (price: string) => string
}

// Without a provider (tests, isolated components) prices stay in rupees.
const Ctx = createContext<Prefs>({ currency: 'INR', setCurrency: () => {}, money: (price) => price })

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
  const [currency, setCurrencyState] = useState<Currency>('INR')
  const [rates, setRates] = useState<Rates>({})

  // The saved choice is applied after mount, so the server and the first client render agree.
  useEffect(() => {
    const c = CURRENCIES.find((x) => x.code === read(CUR_KEY))
    if (c) setCurrencyState(c.code)
  }, [])

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
      currency,
      setCurrency: (c) => {
        setCurrencyState(c)
        write(CUR_KEY, c)
      },
      money: (price) => convert(price, currency, rates),
    }),
    [currency, rates],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
