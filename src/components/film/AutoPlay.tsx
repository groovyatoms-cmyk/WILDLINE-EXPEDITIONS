'use client'

import { useEffect, useState, type RefObject } from 'react'
import { Pause, Play } from 'lucide-react'
import { film } from '@/data/site'
import type { Shots } from '@/lib/frames'
import { isPresent } from '@/lib/guard'
import { frameTotal, timeline } from '@/lib/timeline'

// Seconds to play each stretch of the film: [from, to, seconds]. Shot 1 is 44 s of footage and plays in
// about real time, so the convoy moves like video instead of in slow motion; shot 2 gets a little longer for its text.
const PLAN: [number, number, number][] = [
  [0, film.shot1End, 44],
  [film.shot1End, film.shot2Start, 2],
  [film.shot2Start, film.shot2End, 48],
  [film.shot2End, 1, 3],
]
// Film progress gained per second at progress p.
const rate = (p: number) => {
  const [a, b, sec] = PLAN.find(([, to]) => p < to) ?? PLAN[PLAN.length - 1]
  return (b - a) / sec
}

// Play/pause button for the hero film. It only plays when the visitor presses play: the page then scrolls at a
// steady pace (the film's own easing smooths it) and a camera-style REC badge shows. Any wheel, touch or key press
// hands control back and the badge goes away.
export default function AutoPlay({ filmRef, shots }: { filmRef: RefObject<HTMLElement | null>; shots: RefObject<Shots> }) {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    let raf = 0
    const begin = performance.now()
    let last = begin
    const el0 = filmRef.current
    const span0 = el0 ? el0.offsetHeight - innerHeight : 0
    let p = span0 > 0 ? Math.min(1, scrollY / span0) : 0
    const stop = () => setPlaying(false)
    // True when the frames a little ahead of progress `at` are decoded (on a slow network playback pauses, never freezes).
    const buffered = (at: number) => {
      const { t, f1, f2 } = timeline(at)
      const ahead = (shot: 1 | 2, f: number) => {
        const n = frameTotal(shot)
        return isPresent(shots.current?.[shot]?.[Math.min(n - 1, Math.round(f * (n - 1)) + 16)])
      }
      return (t >= 1 || ahead(1, f1)) && (t <= 0 || ahead(2, f2))
    }
    // The button's own press toggles the state in onClick; stopping here too would make a tap on Pause restart playback.
    const interrupt = (e: Event) => {
      if (!(e.target as Element | null)?.closest?.('.autoplay')) stop()
    }
    const tick = (now: number) => {
      const el = filmRef.current
      if (!el) return stop()
      const span = el.offsetHeight - innerHeight
      if (!buffered(p)) {
        last = now
        raf = requestAnimationFrame(tick)
        return
      } // wait for frames that have not arrived yet instead of showing a frozen picture
      const ramp = Math.min(1, (now - begin) / 1200) // ease into speed so playback never starts with a jolt
      p = Math.min(1, p + rate(p) * ramp * ((now - last) / 1000))
      last = now
      scrollTo(0, p * span)
      if (p >= 1) return stop()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const events = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const
    events.forEach((e) => addEventListener(e, interrupt, { passive: true }))
    return () => {
      cancelAnimationFrame(raf)
      events.forEach((e) => removeEventListener(e, interrupt))
    }
  }, [playing, filmRef, shots])

  return (
    <>
      <button
        type="button"
        className="autoplay"
        aria-label={playing ? 'Pause the film' : 'Play the film'}
        aria-pressed={playing}
        onClick={() => setPlaying((p) => !p)}
      >
        {playing ? <Pause size={30} aria-hidden="true" /> : <Play size={30} aria-hidden="true" />}
      </button>
      {playing && (
        <p className="rec mono" aria-hidden="true">
          <i className="rec-dot" />
          REC 4K/25FPS ISO 100
        </p>
      )}
    </>
  )
}
