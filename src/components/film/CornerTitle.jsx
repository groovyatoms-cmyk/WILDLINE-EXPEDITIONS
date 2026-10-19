import { useEffect, useRef, useState } from 'react'
import { reduced } from '@/lib/frames.js'

const GLYPHS = [...'ཀཁགངཙཞཨॐकखगघधनपमरलश▲◆≋°']
const STAGGER = 35 // ms between letters
const STEP = 50 // ms per glyph flicker
const rand = (n) => Math.floor(Math.random() * n)

export default function CornerTitle({ text, compact, hidden, children }) {
  const [shown, setShown] = useState(text)
  const last = useRef(text)

  useEffect(() => {
    if (reduced()) { last.current = text; return setShown(text) }
    const chars = [...text]
    const prev = [...last.current]
    const flickers = chars.map(() => 4 + rand(3)) // 4–6 random glyphs per letter
    const t0 = performance.now()
    const id = setInterval(() => {
      const el = performance.now() - t0
      let done = true
      const out = chars.map((c, i) => {
        if (c === ' ') return ' '
        const s = (el - i * STAGGER) / STEP
        if (s < 0) { done = false; return prev[i] ?? '' }
        if (s >= flickers[i]) return c
        done = false
        return GLYPHS[rand(GLYPHS.length)]
      })
      last.current = out.join('')
      setShown(last.current)
      if (done) clearInterval(id)
    }, STEP / 2)
    return () => clearInterval(id)
  }, [text])

  return (
    <div className={`corner-title${compact ? ' compact' : ''}${hidden ? ' hidden' : ''}`} aria-hidden={hidden || undefined}>
      <h2 className="display">
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">{shown}</span>
      </h2>
      {children}
    </div>
  )
}
