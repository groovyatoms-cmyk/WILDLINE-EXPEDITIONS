import { useCallback, useState } from 'react'

const KEY = 'theme'
const COLORS = { dark: '#0B0D10', light: '#F4F1EA' }

// The first paint is themed by the inline script in index.html; this keeps React in sync.
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[next])
    try { localStorage.setItem(KEY, next) } catch { /* storage blocked: theme lasts for this visit */ }
    setTheme(next)
  }, [theme])

  return [theme, toggle]
}
