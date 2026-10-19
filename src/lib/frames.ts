import { frames as cfg } from '@/data/site'

export type Shots = { 1: ImageBitmap[]; 2: ImageBitmap[] }

export const isMobile = () => window.matchMedia('(max-width: 768px)').matches
export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const pad = (n: number) => String(n).padStart(4, '0')

// Placeholder: gradient that shifts with frame number, number drawn on it.
function placeholder(shot: number, i: number, total: number) {
  const c = new OffscreenCanvas(960, 540)
  const g = c.getContext('2d')!
  const t = i / (total - 1)
  const hue = shot === 1 ? 210 - t * 170 : 30 + t * 20 // cold dawn -> dust gold / warm dusk
  const grad = g.createLinearGradient(0, 0, 960, 540)
  grad.addColorStop(0, `hsl(${hue} 45% ${14 + t * 22}%)`)
  grad.addColorStop(1, `hsl(${hue + 40} 55% ${8 + t * 30}%)`)
  g.fillStyle = grad
  g.fillRect(0, 0, 960, 540)
  g.strokeStyle = 'rgba(236,237,232,.12)'
  for (let x = ((i * 6) % 80) - 80; x < 960; x += 80) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 140, 540); g.stroke() }
  g.fillStyle = 'rgba(236,237,232,.85)'
  g.font = '700 220px "JetBrains Mono", monospace'
  g.textAlign = 'center'
  g.fillText(pad(i + 1), 480, 320)
  g.font = '28px "JetBrains Mono", monospace'
  g.fillText(`SHOT ${shot} · PLACEHOLDER`, 480, 380)
  return createImageBitmap(c)
}

async function decode(shot: 1 | 2, i: number, total: number, mobile: boolean) {
  const dir = `frames/shot${shot}${mobile ? 'm' : ''}`
  // Cover-fit upscales when the window is taller than 16:9, so size for the larger edge.
  const w = Math.round(Math.min(mobile ? cfg[shot].mw : cfg[shot].w, Math.max(window.innerWidth, (window.innerHeight * 16) / 9) * (window.devicePixelRatio || 1)))
  try {
    const res = await fetch(`/${dir}/${pad(i + 1)}.webp`)
    // Vite dev serves index.html for missing files, so check the type too.
    if (!res.ok || !res.headers.get('content-type')?.startsWith('image/')) throw 0
    return await createImageBitmap(await res.blob(), { resizeWidth: w, resizeQuality: 'medium' })
  } catch {
    return placeholder(shot, i, total)
  }
}

// Decodes a shot in small parallel batches into the caller-owned `out` array (filled as it goes).
const idle = () => new Promise<void>((r) => ('requestIdleCallback' in window ? requestIdleCallback(() => r(), { timeout: 40 }) : setTimeout(r, 0)))

// The first `eagerShare` of the frames load flat out (the preloader waits for them); the rest trickle in 8 at a time
// whenever the browser is idle (waiting at most 40 ms), so decoding never blocks scrolling or input.
export async function loadShot(shot: 1 | 2, out: ImageBitmap[], onProgress: (done: number) => void = () => {}, eagerShare = 0) {
  const mobile = isMobile()
  const total = mobile ? cfg[shot].mobileCount : cfg[shot].count
  out.length = total
  let done = 0
  const eager = Math.ceil(total * eagerShare)
  for (let s = 0; s < total; ) {
    const batch = s < eager ? 16 : 8
    if (s >= eager) await idle()
    await Promise.all(
      Array.from({ length: Math.min(batch, total - s) }, async (_, k) => {
        out[s + k] = await decode(shot, s + k, total, mobile)
        onProgress(++done / total)
      }),
    )
    s += batch
  }
  return out
}
