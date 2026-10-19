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

// Windowed frame cache for one shot. Decoded bitmaps are big (a 1440px frame is ~4.7 MB in memory), so only a
// window around the playhead stays decoded, plus sparse "anchor" frames that give a picture while scrubbing fast.
// `out` is the caller-owned sparse array the canvas draws from.
const BEHIND = 12
const AHEAD = 48
const ANCHOR = 30
const CONCURRENCY = 4

export function createLoader(shot: 1 | 2, out: ImageBitmap[], onLoaded: (i: number) => void = () => {}) {
  const mobile = isMobile()
  const total = mobile ? cfg[shot].mobileCount : cfg[shot].count
  out.length = total
  const inflight = new Set<number>()
  const queue: number[] = []
  let center = -1
  let anchors = false
  let active = 0

  const inWindow = (i: number) => i >= center - BEHIND && i <= center + AHEAD
  const keep = (i: number) => inWindow(i) || (anchors && i % ANCHOR === 0)
  const want = (i: number) => i >= 0 && i < total && !out[i] && !inflight.has(i)

  const pump = () => {
    while (active < CONCURRENCY && queue.length) {
      const i = queue.shift()!
      if (!want(i) || !keep(i)) continue
      active++
      inflight.add(i)
      decode(shot, i, total, mobile).then((b) => {
        inflight.delete(i)
        active--
        if (keep(i)) { out[i] = b; onLoaded(i) } else b.close() // the playhead moved on while it loaded
        pump()
      })
    }
  }

  const plan = () => {
    for (let i = 0; i < total; i++) if (out[i] && !keep(i)) { out[i].close(); delete out[i] }
    queue.length = 0
    for (let d = 0; d <= AHEAD; d++) {
      if (want(center + d)) queue.push(center + d)
      if (d <= BEHIND && d > 0 && want(center - d)) queue.push(center - d)
    }
    if (anchors) for (let i = 0; i < total; i += ANCHOR) if (want(i)) queue.push(i)
    pump()
  }

  return {
    // Call with the playhead's frame position (fractional is fine).
    update(pos: number) {
      const c = Math.round(pos)
      if (c === center) return
      center = c
      plan()
    },
    // Also keep every 30th frame decoded for the whole shot.
    loadAnchors() {
      if (anchors) return
      anchors = true
      if (center >= 0) plan()
    },
  }
}
