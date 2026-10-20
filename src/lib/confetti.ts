// Gold confetti burst from the top centre. Web Animations API, transform + opacity only; skipped for reduced motion.
const COLORS = ['#d4af6a', '#f1dba0', '#a8813f', '#7a1e2e', '#eee7d6']

export function confetti(count = 48) {
  if (typeof document === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const layer = document.createElement('div')
  layer.setAttribute('aria-hidden', 'true')
  layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:120;overflow:hidden'
  document.body.append(layer)
  for (let i = 0; i < count; i++) {
    const p = document.createElement('i')
    const size = 6 + Math.random() * 6
    p.style.cssText = `position:absolute;left:50%;top:30%;width:${size}px;height:${size * 0.5}px;background:${COLORS[i % COLORS.length]}`
    layer.append(p)
    const dx = (Math.random() - 0.5) * innerWidth * 0.7,
      up = -80 - Math.random() * 220,
      fall = innerHeight * (0.5 + Math.random() * 0.4)
    p.animate(
      [
        { transform: 'translate(0,0) rotate(0)', opacity: 1 },
        { transform: `translate(${dx * 0.6}px,${up}px) rotate(${Math.random() * 360}deg)`, opacity: 1, offset: 0.35 },
        { transform: `translate(${dx}px,${fall}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
      ],
      { duration: 1400 + Math.random() * 900, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' },
    )
  }
  setTimeout(() => layer.remove(), 2600)
}
