'use client'

import { useEffect, useState } from 'react'
import { trips } from '@/data/site'
import { wa } from '@/lib/enquire'
import Button from '@/components/ui/Button'
import Panel from '@/components/overlays/Panel'
import { confetti } from '@/lib/confetti'

// Mounted once in App so BOOK NOW and ENQUIRE work from every page.
export default function Enquire() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const show = () => setOpen(true)
    addEventListener('open-enquire', show)
    return () => removeEventListener('open-enquire', show)
  }, [])

  // No backend: the enquiry is handed to WhatsApp, prefilled.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    window.open(
      wa(`Hi WILDLINE EXPEDITIONS, I'm ${f.name} (${f.phone}). Enquiring about ${f.trip} for a group of ${f.size}.`),
      '_blank',
      'noopener',
    )
    setOpen(false)
    confetti()
  }

  return (
    <>
      <Panel open={open} onClose={() => setOpen(false)} label="Enquire">
        <form onSubmit={submit}>
          <h3 className="display">Enquire</h3>
          <label className="mono">
            Name
            <input name="name" required autoComplete="name" />
          </label>
          <label className="mono">
            Phone
            <input name="phone" required type="tel" pattern="[0-9+ ()\-]{7,16}" autoComplete="tel" />
          </label>
          <label className="mono">
            TRIP
            <select name="trip">
              {trips.map((t) => (
                <option key={t.name}>{t.name}</option>
              ))}
            </select>
          </label>
          <label className="mono">
            Group size
            <input name="size" type="number" min="1" max="24" defaultValue="2" required />
          </label>
          <Button variant="rust" type="submit">
            Send via WhatsApp
          </Button>
        </form>
      </Panel>
    </>
  )
}
