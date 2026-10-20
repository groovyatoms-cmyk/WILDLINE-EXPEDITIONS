'use client'

import { useEffect, useRef, useState } from 'react'
import { Minus, Plus, Send } from 'lucide-react'
import { trips } from '@/data/site'
import { MONTHS } from '@/lib/season'
import { wa } from '@/lib/enquire'
import { confetti } from '@/lib/confetti'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import NightCamp from '@/components/contact/NightCamp'

const PHONE = /^[0-9+ ()-]{7,16}$/

type Pop = 'trip' | 'month' | 'size' | null

// The enquiry is one sentence with blanks. Press a blank to fill it; the sun in the picture climbs as the sentence completes.
// No backend yet: sending opens WhatsApp with the sentence written out.
export default function Enquiry({ to }: { to?: string }) {
  const [trip, setTrip] = useState('')
  const [month, setMonth] = useState<number | 'flex' | null>(null)
  const [size, setSize] = useState(2)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [open, setOpen] = useState<Pop>(null)
  const [tried, setTried] = useState(false)
  const [sent, setSent] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const out = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.('.blank-wrap')) setOpen(null)
    }
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
    }
    addEventListener('pointerdown', out)
    addEventListener('keydown', esc)
    return () => {
      removeEventListener('pointerdown', out)
      removeEventListener('keydown', esc)
    }
  }, [open])

  const phoneOk = PHONE.test(phone.trim())
  const miss = { trip: !trip, month: month === null, name: !name.trim(), phone: !phoneOk }
  const monthLabel = month === null ? 'a month' : month === 'flex' ? 'any month' : MONTHS[month]
  // 1 = by myself, 2 = as a duo, 3 or more = as a group.
  const who = size === 1 ? 'by myself' : size === 2 ? 'as a duo' : `as a group of ${size}`
  const anyMissing = miss.trip || miss.month || miss.name || miss.phone

  const send = () => {
    setTried(true)
    if (anyMissing) {
      const first = (['trip', 'month', 'name', 'phone'] as const).find((k) => miss[k])
      root.current?.querySelector<HTMLElement>(`[data-blank="${first}"]`)?.focus()
      return
    }
    const msg = `Hi Wildline Expeditions, I'm ${name.trim()}. I'd like to join the ${trip} around ${monthLabel} ${who}. You can reach me on WhatsApp at ${phone.trim()}.${note ? ` ${note}` : ''}`
    window.open(wa(msg), '_blank', 'noopener')
    setSent(true)
    confetti()
  }
  const again = () => {
    setTrip('')
    setMonth(null)
    setSize(2)
    setName('')
    setPhone('')
    setNote('')
    setTried(false)
    setSent(false)
  }

  const blank = (key: 'trip' | 'month' | 'size', label: string, filledIn: boolean, body: React.ReactNode) => (
    <span className="blank-wrap">
      <button
        type="button"
        className="blank"
        data-blank={key}
        data-filled={filledIn ? '' : undefined}
        data-missing={tried && key !== 'size' && miss[key] ? '' : undefined}
        aria-haspopup="true"
        aria-expanded={open === key}
        onClick={() => setOpen(open === key ? null : key)}
      >
        {label}
      </button>
      {open === key && (
        <span className="blank-pop" role="group" aria-label={key}>
          {body}
        </span>
      )}
    </span>
  )

  return (
    <Section id="enquiry" className="enquiry" title="Your next horizon is waiting." to={to} heading="h2">
      <NightCamp />

      <div ref={root} className="mad">
        {sent ? (
          <div className="mad-done" role="status">
            <span className="lp-stamp display">Cleared for departure</span>
            <p>WhatsApp has opened with your sentence ready. Press send there and we reply within one working day.</p>
            <Button onClick={again}>Write another</Button>
          </div>
        ) : (
          <>
            <p className="mad-sentence display">
              Hi Wildline, I’m{' '}
              <input
                data-blank="name"
                className="blank blank-input"
                data-filled={name.trim() ? '' : undefined}
                data-missing={tried && miss.name ? '' : undefined}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="your name"
                aria-label="Your name"
                autoComplete="name"
                style={{ width: `${Math.max(name.length, 9) + 1}ch` }}
              />
              . I’d like to join{' '}
              {blank(
                'trip',
                trip ? `the ${trip}` : 'pick an expedition',
                !!trip,
                <span className="pop-grid">
                  {trips.map((t) => (
                    <button
                      key={t.name}
                      type="button"
                      aria-pressed={trip === t.name}
                      onClick={() => {
                        setTrip(t.name)
                        setOpen(null)
                      }}
                    >
                      {t.name.replace(' Expedition', '')}
                      <small>{t.alt}</small>
                    </button>
                  ))}
                </span>,
              )}{' '}
              around{' '}
              {blank(
                'month',
                monthLabel,
                month !== null,
                <span className="pop-grid pop-months">
                  {MONTHS.map((m, i) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={month === i}
                      onClick={() => {
                        setMonth(i)
                        setOpen(null)
                      }}
                    >
                      {m}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="wide"
                    aria-pressed={month === 'flex'}
                    onClick={() => {
                      setMonth('flex')
                      setOpen(null)
                    }}
                  >
                    Any month
                  </button>
                </span>,
              )}{' '}
              travelling{' '}
              {blank(
                'size',
                who,
                true,
                <span className="pop-who">
                  <span className="pop-grid">
                    <button
                      type="button"
                      aria-pressed={size === 1}
                      onClick={() => {
                        setSize(1)
                        setOpen(null)
                      }}
                    >
                      Myself<small>solo</small>
                    </button>
                    <button
                      type="button"
                      aria-pressed={size === 2}
                      onClick={() => {
                        setSize(2)
                        setOpen(null)
                      }}
                    >
                      Duo<small>two of us</small>
                    </button>
                    <button type="button" aria-pressed={size >= 3} onClick={() => setSize(Math.max(3, size))}>
                      Group<small>three or more</small>
                    </button>
                  </span>
                  {size >= 3 && (
                    <span className="pop-size" role="group" aria-label="Group size">
                      <button type="button" aria-label="One fewer" onClick={() => setSize(Math.max(3, size - 1))}>
                        <Minus size={18} aria-hidden="true" />
                      </button>
                      <output className="display" aria-live="polite">
                        {size}
                      </output>
                      <button type="button" aria-label="One more" onClick={() => setSize(Math.min(24, size + 1))}>
                        <Plus size={18} aria-hidden="true" />
                      </button>
                    </span>
                  )}
                </span>,
              )}
              . You can reach me on WhatsApp at{' '}
              <input
                data-blank="phone"
                className="blank blank-input"
                type="tel"
                data-filled={phoneOk ? '' : undefined}
                data-missing={tried && miss.phone ? '' : undefined}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                aria-label="WhatsApp number"
                autoComplete="tel"
                style={{ width: `${Math.max(phone.length, 14) + 1}ch` }}
              />
              .
            </p>
            <label className="mad-note">
              Anything else we should know? (optional)
              <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
            </label>
            {tried && anyMissing && (
              <p className="field-error" role="alert">
                Fill the highlighted blanks first{phone && !phoneOk ? ' (check the WhatsApp number)' : ''}.
              </p>
            )}
            <div className="mad-send">
              <Button variant="rust" onClick={send}>
                <Send size={16} aria-hidden="true" /> Send on WhatsApp
              </Button>
            </div>
          </>
        )}
      </div>
    </Section>
  )
}
