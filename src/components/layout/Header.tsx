'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { menuLinks } from '@/data/site'
import { legal } from '@/data/legal'
import { openEnquire } from '@/lib/enquire'
import Button from '@/components/ui/Button'

// Sections on the home page the centre links jump to.
const PRIMARY = [
  { label: 'Expeditions', href: '/expeditions' },
  { label: 'Safety', href: '/safety' },
  { label: 'Crew', href: '/team' },
  { label: 'Convoys', href: '/join' },
  { label: 'Blog', href: '/blog' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  // Lock page scroll behind the open menu.
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [])

  return (
    <>
      <div className="header-bar" aria-hidden="true" />
      <nav className="nav-links" aria-label="Primary">
        {PRIMARY.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="nav">
        <Button
          variant="rust"
          className="nav-book"
          onClick={() => {
            setOpen(false)
            openEnquire()
          }}
        >
          Reserve a seat
        </Button>
        <button
          className="nav-menu"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <div id="menu" className={`menu${open ? ' open' : ''}`} inert={!open}>
        <ul>
          {menuLinks.map((l, i) => (
            <li key={l.label} style={{ '--i': i } as React.CSSProperties}>
              <a className="display" href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <nav className="mono menu-legal" aria-label="Policies">
          {Object.values(legal).map((d) => (
            <a key={d.path} href={d.path} onClick={() => setOpen(false)}>
              {d.title}
            </a>
          ))}
          <a href="/faq" onClick={() => setOpen(false)}>
            FAQ
          </a>
        </nav>
      </div>
    </>
  )
}
