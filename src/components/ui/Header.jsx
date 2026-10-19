import { useEffect, useState } from 'react'
import { menuLinks } from '@/data/site.js'
import { legal } from '@/data/legal.js'
import { openEnquire } from '@/lib/enquire.js'
import Button from './Button.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [])

  return (
    <>
      <div className="header-bar" aria-hidden="true" />
      <nav className="nav" aria-label="Primary">
        <a className="mono nav-menu" href="/" onClick={() => setOpen(false)}>HOME</a>
        <button className="mono nav-menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>{open ? 'CLOSE' : 'MENU'}</button>
        <Button variant="rust" className="nav-book" onClick={() => { setOpen(false); openEnquire() }}>BOOK NOW</Button>
        <ThemeToggle />
      </nav>
      <div id="menu" className={`menu${open ? ' open' : ''}`} {...(open ? {} : { inert: '' })}>
        <ul>
          {menuLinks.map((l, i) => (
            <li key={l.label} style={{ '--i': i }}>
              <a className="display" href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <nav className="mono menu-legal" aria-label="Policies">
          {Object.values(legal).map((d) => (
            <a key={d.path} href={d.path} onClick={() => setOpen(false)}>{d.title}</a>
          ))}
          <a href="/faq" onClick={() => setOpen(false)}>FAQ</a>
        </nav>
      </div>
    </>
  )
}
