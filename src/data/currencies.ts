// Currencies the visitor can view prices in. Rupees stay the base: `rate` is a fallback INR to this currency, used until (or
// unless) live rates arrive.
export const CURRENCIES = [
  { code: 'INR', name: 'Indian rupee', locale: 'en-IN', rate: 1 },
  { code: 'USD', name: 'US dollar', locale: 'en-US', rate: 0.0115 },
  { code: 'EUR', name: 'Euro', locale: 'de-DE', rate: 0.0099 },
  { code: 'GBP', name: 'British pound', locale: 'en-GB', rate: 0.0086 },
  { code: 'JPY', name: 'Japanese yen', locale: 'ja-JP', rate: 1.7 },
  { code: 'CNY', name: 'Chinese yuan', locale: 'zh-CN', rate: 0.082 },
  { code: 'BRL', name: 'Brazilian real', locale: 'pt-BR', rate: 0.062 },
] as const

export type Currency = (typeof CURRENCIES)[number]['code']
