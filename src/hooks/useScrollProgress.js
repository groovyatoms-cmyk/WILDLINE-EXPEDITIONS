import { useEffect, useRef } from 'react'

// Window scroll -> 0–1 progress of `ref`'s element (a tall section with a sticky child),
// lerped inside rAF. Subscribers get called every frame with the eased value.
export function useScrollProgress(ref, ease = 0.1) {
  const store = useRef({ p: 0, subs: new Set() }).current
  useEffect(() => {
    let raf, target = 0
    const tick = () => {
      const el = ref.current
      if (el) {
        const r = el.getBoundingClientRect()
        const span = r.height - window.innerHeight
        target = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
      }
      store.p += (target - store.p) * ease
      if (Math.abs(target - store.p) < 0.00005) store.p = target
      store.subs.forEach((fn) => fn(store.p))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ref, ease, store])
  return store
}

// Subscribe a callback to the eased progress. Latest `fn` is always used.
export function useProgress(store, fn) {
  const f = useRef(fn)
  f.current = fn
  useEffect(() => {
    const sub = (p) => f.current(p)
    store.subs.add(sub)
    return () => store.subs.delete(sub)
  }, [store])
}

export const clamp01 = (x) => Math.min(1, Math.max(0, x))
