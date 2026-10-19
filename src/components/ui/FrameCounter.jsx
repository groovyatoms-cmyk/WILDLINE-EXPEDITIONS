import { useRef } from 'react'
import { useProgress } from '@/hooks/useScrollProgress.js'
import { timeline, frameNo, frameTotal } from '@/lib/timeline.js'

const pad = (n) => String(n).padStart(3, '0')

export default function FrameCounter({ store }) {
  const ref = useRef()
  useProgress(store, (p) => {
    const { t, f1, f2 } = timeline(p)
    ref.current.textContent = `FR ${pad(frameNo(t > 0.5 ? f2 : f1))} / ${pad(frameTotal())}`
  })
  return <div ref={ref} className="mono frame-counter" aria-hidden="true" />
}
