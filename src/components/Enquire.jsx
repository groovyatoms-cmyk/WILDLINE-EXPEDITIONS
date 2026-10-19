import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { site, trips } from '../data/site.js'

export const wa = (text = '') => `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
export const openEnquire = () => dispatchEvent(new Event('open-enquire'))

// Mounted once in App so BOOK NOW and ENQUIRE work from every page.
export default function Enquire() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const show = () => setOpen(true)
    addEventListener('open-enquire', show)
    return () => removeEventListener('open-enquire', show)
  }, [])

  // No backend: the enquiry is handed to WhatsApp, prefilled.
  const submit = (e) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    window.open(wa(`Hi WILDLINE EXPEDITIONS, I'm ${f.name} (${f.phone}). Enquiring about ${f.trip} for a group of ${f.size}.`), '_blank', 'noopener')
    setOpen(false)
  }

  return (
    <>
      <motion.div className={`panel-scrim${open ? ' open' : ''}`} onClick={() => setOpen(false)} initial={false} animate={{ opacity: open ? 1 : 0 }} />
      <motion.aside className="panel" role="dialog" aria-label="Enquire" aria-hidden={!open} {...(open ? {} : { inert: '' })}
        initial={false} animate={{ x: open ? 0 : '110%' }} transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}>
        <button className="mono panel-close" onClick={() => setOpen(false)}>CLOSE ✕</button>
        <form onSubmit={submit}>
          <h3 className="display">ENQUIRE</h3>
          <label className="mono">NAME<input name="name" required autoComplete="name" /></label>
          <label className="mono">PHONE<input name="phone" required type="tel" pattern="[0-9+ ()\-]{7,16}" autoComplete="tel" /></label>
          <label className="mono">TRIP
            <select name="trip">{trips.map((t) => <option key={t.name}>{t.name}</option>)}</select>
          </label>
          <label className="mono">GROUP SIZE<input name="size" type="number" min="1" max="24" defaultValue="2" required /></label>
          <button className="pill pill-rust" type="submit">SEND VIA WHATSAPP</button>
        </form>
      </motion.aside>
    </>
  )
}
