'use client'

import { useEffect, useRef, type RefObject } from 'react'

export type Store = { p: number; subs: Set<(p: number) => void> }

// Window scroll -> 0–1 progress of `ref`'s element (a tall section with a sticky child),
// lerped inside rAF. Subscribers get called every frame with the eased value.
export function useScrollProgress(ref: RefObject<HTMLElement | null>, ease = 0.1): Store {
  const store = useRef<Store>({ p: 0, subs: new Set() }).current
  useEffect(() => {
    let raf = 0,
      target = 0,
      last = -1
    // Geometry is cached and refreshed only when the page resizes: reading layout every frame forces a reflow.
    let top = 0,
      span = 0,
      seen: HTMLElement | null = null
    const measure = () => {
      const el = ref.current
      seen = el
      if (!el) return
      top = el.getBoundingClientRect().top + window.scrollY
      span = el.offsetHeight - window.innerHeight
      last = -1 // re-notify after a resize
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    const tick = () => {
      if (ref.current !== seen) measure() // the film mounted or unmounted with a route change
      target = span > 0 ? Math.min(1, Math.max(0, (window.scrollY - top) / span)) : 0
      store.p += (target - store.p) * ease
      if (Math.abs(target - store.p) < 0.00005) store.p = target
      if (store.p !== last) {
        // idle frames notify nobody
        last = store.p
        store.subs.forEach((fn) => fn(store.p))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [ref, ease, store])
  return store
}

// Subscribe a callback to the eased progress. Latest `fn` is always used.
export function useProgress(store: Store, fn: (p: number) => void) {
  const f = useRef(fn)
  f.current = fn
  useEffect(() => {
    const sub = (p: number) => f.current(p)
    store.subs.add(sub)
    return () => {
      store.subs.delete(sub)
    }
  }, [store])
}

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
