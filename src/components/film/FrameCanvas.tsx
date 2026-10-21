'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { useProgress, type Store } from '@/hooks/useScrollProgress'
import { timeline, frameTotal } from '@/lib/timeline'
import { reduced, type Shots } from '@/lib/frames'
import { isPresent } from '@/lib/guard'

// Nearest decoded frame around index i (shot 2 may still be decoding).
function pick(arr: ImageBitmap[], i: number) {
  for (let d = 0; d < arr.length; d++) if (arr[i - d] || arr[i + d]) return arr[i - d] || arr[i + d]
  return null
}

function cover(ctx: CanvasRenderingContext2D, img: ImageBitmap, W: number, H: number, zoom = 1) {
  const s = Math.max(W / img.width, H / img.height) * zoom
  ctx.drawImage(img, (W - img.width * s) / 2, (H - img.height * s) / 2, img.width * s, img.height * s)
}

// Draws the frame at fractional position `pos`: the frame below it, then the next one faded in by the
// fraction. The footage has only ~6 frames per second of scroll, so this dissolve is what makes autoplay look smooth.
function drawBlend(ctx: CanvasRenderingContext2D, arr: ImageBitmap[], pos: number, W: number, H: number, alpha = 1, zoom = 1) {
  const i = Math.floor(pos)
  const f = pos - i
  const a = pick(arr, i)
  if (!a) return
  ctx.globalAlpha = alpha
  cover(ctx, a, W, H, zoom)
  const b = f > 0.03 ? pick(arr, Math.min(i + 1, arr.length - 1)) : null
  if (b && b !== a) {
    ctx.globalAlpha = alpha * f
    cover(ctx, b, W, H, zoom)
  }
  ctx.globalAlpha = 1
}

export default function FrameCanvas({ store, shots }: { store: Store; shots: RefObject<Shots> }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const size = useRef({ w: 0, h: 0, dpr: 1 })

  useEffect(() => {
    const fit = () => {
      if (!ref.current) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) // capped: past 1.5x the extra pixels cost frame time with no visible gain during playback
      size.current = { w: innerWidth * dpr, h: innerHeight * dpr, dpr }
      ref.current.width = size.current.w
      ref.current.height = size.current.h
      store.subs.forEach((fn) => fn(store.p)) // resizing clears the canvas: repaint at once
    }
    fit()
    addEventListener('resize', fit)
    return () => removeEventListener('resize', fit)
  }, [store])

  useProgress(store, (p) => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d', { alpha: false }) // opaque canvas: cheaper compositing
    if (!canvas || !ctx) return
    const { w: W, h: H } = size.current
    const { t, f1, f2 } = timeline(p)
    const still = reduced() // one still per shot, crossfaded
    const n1 = frameTotal(1)
    const n2 = frameTotal(2)
    const pos1 = still ? Math.floor(n1 / 2) : f1 * (n1 - 1)
    const pos2 = still ? Math.floor(n2 / 2) : f2 * (n2 - 1)
    // Blur peaks mid-transition and is gone at both ends (CSS filter: works in Safari too).
    const blur = still ? 0 : Math.sin(Math.PI * t) ** 2 * 3
    canvas.style.filter = blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : ''
    ctx.imageSmoothingQuality = 'low' // 'high' resamples every full-screen draw and was the main cost per frame
    ctx.fillStyle = '#0a0a0b'
    ctx.fillRect(0, 0, W, H)
    // Zoom-through: shot 1 accelerates into the lens, shot 2 starts at the same scale and settles out of it. Both
    // scales are equal at t = 0.5, where the short dissolve happens, so the cut is hidden inside one continuous push.
    const smooth = (x: number) => {
      const k = Math.min(1, Math.max(0, x))
      return k * k * (3 - 2 * k)
    }
    const push = still ? 0 : 0.3 // reduced motion: plain crossfade, no zoom
    const loaded = shots.current
    if (!isPresent(loaded)) return // the frame store is not attached yet
    const e = smooth(t) // eased so the zoom starts and ends with no jerk
    drawBlend(ctx, loaded[1], pos1, W, H, 1, 1 + push * e * e)
    if (t > 0) drawBlend(ctx, loaded[2], pos2, W, H, smooth((t - 0.15) / 0.7), 1 + push * (1 - e) * (1 - e))
  })

  return (
    <canvas
      ref={ref}
      className="frame-canvas"
      role="img"
      aria-label="Aerial drone footage: a convoy of 4x4s running a Himalayan road, then a high-altitude lake basin with a parked camp"
    />
  )
}
