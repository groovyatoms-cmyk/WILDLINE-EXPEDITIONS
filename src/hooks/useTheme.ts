'use client'

import { useCallback, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const KEY = 'theme'
const COLORS = { dark: '#0B0D10', light: '#F4F1EA' }

// The first paint is themed by the inline script in app/layout.tsx; this keeps React in sync.
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => { setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark') }, [])

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[next])
    try { localStorage.setItem(KEY, next) } catch { /* storage blocked: theme lasts for this visit */ }
    setTheme(next)
  }, [theme])

  return [theme, toggle]
}
