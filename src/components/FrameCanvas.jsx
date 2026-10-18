import { useEffect, useRef } from 'react'
import { useProgress } from '../hooks/useScrollProgress.js'
import { timeline, frameTotal } from '../lib/timeline.js'
import { reduced } from '../lib/frames.js'

// Nearest decoded frame around index i (shot 2 may still be decoding).
function pick(arr, i) {
  for (let d = 0; d < arr.length; d++) if (arr[i - d] || arr[i + d]) return arr[i - d] || arr[i + d]
  return null
}

function cover(ctx, img, W, H) {
  const s = Math.max(W / img.width, H / img.height)
  ctx.drawImage(img, (W - img.width * s) / 2, (H - img.height * s) / 2, img.width * s, img.height * s)
}

export default function FrameCanvas({ store, shots }) {
  const ref = useRef()
  const size = useRef({ w: 0, h: 0, dpr: 1 })

  useEffect(() => {
    const fit = () => {
      const dpr = window.devicePixelRatio || 1
      size.current = { w: innerWidth * dpr, h: innerHeight * dpr, dpr }
      ref.current.width = size.current.w
      ref.current.height = size.current.h
    }
    fit()
    addEventListener('resize', fit)
    return () => removeEventListener('resize', fit)
  }, [])

  useProgress(store, (p) => {
    const { w: W, h: H } = size.current
    const ctx = ref.current.getContext('2d')
    const n = frameTotal()
    const { t, f1, f2 } = timeline(p)
    const still = reduced() // one still per shot, crossfaded
    const mid = Math.floor(n / 2)
    const a = pick(shots.current[1], still ? mid : Math.round(f1 * (n - 1)))
    const b = pick(shots.current[2], still ? mid : Math.round(f2 * (n - 1)))
    // Blur peaks mid-transition and is gone at both ends (CSS filter: works in Safari too).
    const blur = still ? 0 : Math.sin(Math.PI * t) * 18
    ref.current.style.filter = blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : ''
    ctx.imageSmoothingQuality = 'high'
    ctx.fillStyle = '#0B0D10'
    ctx.fillRect(0, 0, W, H)
    if (a) cover(ctx, a, W, H)
    if (t <= 0 || !b) return
    ctx.globalAlpha = t // crossfade, blurred by the CSS filter above
    cover(ctx, b, W, H)
    ctx.globalAlpha = 1
  })

  return <canvas ref={ref} className="frame-canvas" role="img" aria-label="Aerial drone footage: a convoy of 4x4s running a Himalayan road, then a high-altitude lake basin with a parked camp" />
}
