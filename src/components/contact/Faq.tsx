'use client'

import { useState } from 'react'
import { CheckCheck, Search } from 'lucide-react'
import { faq } from '@/data/site'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { openEnquire } from '@/lib/enquire'
import JsonLd from '@/components/ui/JsonLd'

const CHIPS = ['Altitude', 'Permits', 'Refund', 'Packing']
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// The searched words, marked in amber.
function Mark({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>
  return (
    <>{text.split(new RegExp(`(${esc(q)})`, 'ig')).map((p, i) => (p.toLowerCase() === q.toLowerCase() ? <mark key={i}>{p}</mark> : p))}</>
  )
}

// Three dots that show for a moment when the answer is about to arrive, then step aside.
function Typing() {
  const [gone, setGone] = useState(false)
  if (gone) return null
  return (
    <Reveal index={3} onViewportEnter={() => setTimeout(() => setGone(true), 1500)}>
      <p className="bubble in typing" aria-hidden="true">
        <i />
        <i />
        <i />
      </p>
    </Reveal>
  )
}

// The questions as a thread you can search: type a word, or tap a topic, and the thread narrows to the questions that mention it.
export default function Faq({ to }: { to?: string }) {
  // Home preview: the six most-asked questions. Full page: every group. Either way the schema lists exactly what is on screen by default.
  const groups = to ? [{ title: 'Before you book', items: faq.groups.flatMap((g) => g.items).slice(0, 6) }] : faq.groups
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: groups
      .flatMap((g) => g.items)
      .map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }
  const [query, setQuery] = useState('')
  const q = query.trim()
  const has = (s: string) => s.toLowerCase().includes(q.toLowerCase())
  const shown = groups.map((g) => ({ ...g, items: g.items.filter(([a, b]) => !q || has(a) || has(b)) })).filter((g) => g.items.length)
  return (
    <Section id="faq" className="faq" title={to ? 'Questions' : faq.headline} to={to}>
      <JsonLd data={ld} />
      <p className="careers-intro">{faq.intro}</p>
      <div className="chat">
        <header className="chat-head">
          <i aria-hidden="true">W</i>
          <div>
            <strong>Wildline Expeditions</strong>
            <span>Usually replies within one working day</span>
          </div>
        </header>
        <div className="chat-body" aria-live="polite">
          {shown.map((g) => (
            <section key={g.title} aria-label={g.title}>
              <p className="chat-day mono">{g.title}</p>
              {g.items.map(([a, b]) => (
                <div key={a} className="chat-pair">
                  <Reveal>
                    <p className="bubble out">
                      <span>
                        <Mark text={a} q={q} />
                      </span>
                      <CheckCheck size={14} aria-hidden="true" />
                    </p>
                  </Reveal>
                  <Typing />
                  <Reveal index={5}>
                    <p className="bubble in">
                      <Mark text={b} q={q} />
                    </p>
                  </Reveal>
                </div>
              ))}
            </section>
          ))}
          {!shown.length && (
            <div className="chat-pair">
              <p className="bubble out">
                <span>{q}</span>
                <CheckCheck size={14} aria-hidden="true" />
              </p>
              <p className="bubble in">We have nothing written on that yet. Ask us and the crew will reply within one working day.</p>
            </div>
          )}
        </div>
        <footer className="chat-input">
          <label className="chat-search">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the questions"
              aria-label="Search the questions"
            />
          </label>
          <div className="chat-chips" role="group" aria-label="Topics">
            {CHIPS.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={q.toLowerCase() === c.toLowerCase()}
                onClick={() => setQuery(q.toLowerCase() === c.toLowerCase() ? '' : c)}
              >
                {c}
              </button>
            ))}
          </div>
          <Button variant="rust" onClick={openEnquire} aria-haspopup="dialog">
            Ask us
          </Button>
        </footer>
      </div>
    </Section>
  )
}
