'use client'

import { useEffect, useRef } from 'react'
import { Compass } from 'lucide-react'

// Gold ring that trails the pointer and swells over links and buttons. Fine pointers only; touch gets nothing.
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let x = innerWidth / 2,
      y = innerHeight / 2,
      rx = x,
      ry = y,
      raf = 0
    let tilted: HTMLElement | null = null
    let pulled: HTMLElement | null = null
    const untilt = () => {
      tilted?.style.removeProperty('--rx')
      tilted?.style.removeProperty('--ry')
      tilted = null
    }
    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      el.dataset.on = '1'
      const hit = (e.target as Element | null)?.closest?.('a, button, summary, select, input')
      el.dataset.hot = hit ? (hit.closest('.trip') ? 'view' : '1') : ''
      // Tiles get a soft light under the pointer
      const spot = (e.target as Element | null)?.closest?.<HTMLElement>('.bento-tile, .passes li')
      if (spot) {
        const r = spot.getBoundingClientRect()
        spot.style.setProperty('--sx', `${e.clientX - r.left}px`)
        spot.style.setProperty('--sy', `${e.clientY - r.top}px`)
      }
      // Buttons are drawn gently toward the pointer, with a glow under it
      const pill = (e.target as Element | null)?.closest?.<HTMLElement>('.pill') ?? null
      if (pill !== pulled) {
        pulled?.style.removeProperty('--mx')
        pulled?.style.removeProperty('--my')
        pulled = pill
      }
      if (pill) {
        const r = pill.getBoundingClientRect()
        pill.style.setProperty('--mx', `${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px`)
        pill.style.setProperty('--my', `${((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1)}px`)
        pill.style.setProperty('--px', `${(e.clientX - r.left).toFixed(0)}px`)
        pill.style.setProperty('--py', `${(e.clientY - r.top).toFixed(0)}px`)
      }
      // tvOS-style focus: cards lean toward the pointer and catch a light glint
      // The li stays flat, so hit-testing and the rect do not flap at the card's edge while it is rotated.
      const slot = (e.target as Element | null)?.closest?.<HTMLElement>('.expeditions li')
      const card = slot?.querySelector<HTMLElement>('.trip') ?? null
      if (card !== tilted) untilt()
      if (card && slot) {
        const r = slot.getBoundingClientRect(),
          px = (e.clientX - r.left) / r.width,
          py = (e.clientY - r.top) / r.height
        card.style.setProperty('--rx', `${((0.5 - py) * 6).toFixed(2)}deg`)
        card.style.setProperty('--ry', `${((px - 0.5) * 8).toFixed(2)}deg`)
        card.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
        card.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
        tilted = card
      }
    }
    const leave = () => {
      el.dataset.on = ''
      untilt()
      pulled?.style.removeProperty('--mx')
      pulled?.style.removeProperty('--my')
      pulled = null
    }
    // Press ripple: an expanding gold disc from the pointer, removed when it ends.
    const down = (e: PointerEvent) => {
      const pill = (e.target as Element | null)?.closest?.<HTMLElement>('.pill')
      if (!pill) return
      const r = pill.getBoundingClientRect(),
        d = Math.max(r.width, r.height) * 2
      const rip = document.createElement('span')
      rip.className = 'ripple'
      rip.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`
      pill.append(rip)
      rip.addEventListener('animationend', () => rip.remove())
    }
    const tick = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      el.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    addEventListener('pointermove', move)
    addEventListener('pointerdown', down)
    document.documentElement.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', move)
      removeEventListener('pointerdown', down)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])
  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <Compass size={18} strokeWidth={1.5} />
    </div>
  )
}
