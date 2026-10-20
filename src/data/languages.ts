// Languages offered in the language picker. Only English is live: add an entry here, plus the translations, to offer another.
export const LANGS = [{ code: 'en', name: 'English' }] as const

export type Lang = (typeof LANGS)[number]['code']
