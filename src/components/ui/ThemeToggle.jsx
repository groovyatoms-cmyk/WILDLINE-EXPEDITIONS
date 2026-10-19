import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme.js'

export default function ThemeToggle() {
  const [theme, toggle] = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button className="mono nav-menu" onClick={toggle} aria-label={`Switch to ${next} theme`}>{next === 'light' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}</button>
  )
}
