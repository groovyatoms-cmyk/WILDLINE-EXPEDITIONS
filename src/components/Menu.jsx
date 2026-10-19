import { useEffect, useState } from 'react'
import { menuLinks } from '../data/site.js'

export default function Menu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [])

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <a className="mono nav-menu" href="#" onClick={() => setOpen(false)}>HOME</a>
        <button className="mono nav-menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>{open ? 'CLOSE' : 'MENU'}</button>
        <button className="pill pill-rust nav-book" onClick={() => { setOpen(false); dispatchEvent(new Event('open-enquire')) }}>BOOK NOW</button>
      </nav>
      <div id="menu" className={`menu${open ? ' open' : ''}`} {...(open ? {} : { inert: '' })}>
        <ul>
          {menuLinks.map((l, i) => (
            <li key={l.label} style={{ '--i': i }}>
              <a className="display" href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
