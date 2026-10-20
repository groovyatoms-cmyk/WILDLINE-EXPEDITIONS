// Full-section night scene, drawn as layers that all share one coordinate system so they always line up:
//   sky (CSS gradient + warm horizon glow) > stars (top 55% only) > far mountains > near ridge > back pines > front pines
//   > ground hill with a firelit rim > tents and flag, stone-ringed campfire > fire glow (screen blend) > embers.
// One SVG (viewBox 1440 x 520) is anchored to the bottom of the section; every object's base is computed from the ground curve,
// so nothing floats. Decorative only. Numbers are rounded so the server and the browser draw the same scene.
const W = 1440,
  H = 520
const FIRE_X = 907 // 63% across
const r1 = (v: number) => Math.round(v * 10) / 10
// Ground surface height at x: a gentle hill that crests near the fire.
const ground = (x: number) => r1(384 - 20 * Math.cos((x - FIRE_X) / 330))
const points = (() => {
  const p: string[] = []
  for (let x = -80; x <= W + 80; x += 20) p.push(`${x},${ground(x)}`)
  return p
})()
const RIDGE = `M${points.join(' L')}`
const GROUND = `${RIDGE} L${W + 80},${H + 4} L-80,${H + 4}Z`

// [x, scale, hide on phones]
const BACK: [number, number, boolean][] = [
  [40, 1.5, false],
  [150, 1.2, true],
  [250, 1.45, false],
  [330, 1, true],
  [1130, 1.1, true],
  [1210, 1.5, false],
  [1300, 1.3, true],
  [1380, 1.6, false],
]
const FRONT: [number, number, boolean][] = [
  [-10, 2.2, false],
  [96, 1.7, true],
  [196, 2, false],
  [1250, 1.9, true],
  [1340, 2.4, false],
  [1436, 2, false],
]
const STARS = Array.from({ length: 80 }, (_, k) => {
  const f = (v: number) => v - Math.floor(v)
  return [
    r1(f(Math.sin(k * 12.9898) * 43758.5453) * 100),
    r1(f(Math.sin(k * 78.233) * 12345.6789) * 100),
    1 + r1(f(Math.sin(k * 39.346) * 9871.123)),
    r1(f(k * 0.37) * 4),
  ] as const
})

function Pine({ x, s, hide, fill }: { x: number; s: number; hide: boolean; fill: string }) {
  return (
    <g className={hide ? 'hide-m' : undefined} transform={`translate(${x} ${r1(ground(x) + 8)}) scale(${s})`} fill={fill}>
      <rect x="-4" y="-12" width="8" height="20" />
      <path d="M0,-150 L22,-112 L10,-112 L30,-78 L13,-78 L36,-44 L16,-44 L42,-10 L-42,-10 L-16,-44 L-36,-44 L-13,-78 L-30,-78 L-10,-112 L-22,-112Z" />
    </g>
  )
}

export default function NightCamp() {
  const gy = ground(FIRE_X)
  return (
    <div className="night-camp" aria-hidden="true">
      {/* sky: gradient plus a warm glow at the horizon behind the fire */}
      <div className="nc-sky" />
      {/* stars: only the top 55%, dim, slow twinkle */}
      <svg className="nc-stars" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
        {STARS.map(([x, y, r, d], i) => (
          <circle
            key={i}
            className="nc-star"
            cx={x}
            cy={r1(y * 0.98)}
            r={r1(r * 0.07)}
            style={{ animationDelay: `${d}s`, opacity: 0.3 + (i % 6) * 0.1 }}
          />
        ))}
      </svg>
      <svg className="nc-scene" viewBox={`0 0 ${W} ${H}`} focusable="false">
        <defs>
          <radialGradient id="nc-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ff9f28" stopOpacity="0.55" />
            <stop offset="0.5" stopColor="#ff9f28" stopOpacity="0.2" />
            <stop offset="1" stopColor="#ff9f28" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="nc-flame" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#d9340a" />
            <stop offset="0.45" stopColor="#f2a43a" />
            <stop offset="1" stopColor="#fff0b8" />
          </linearGradient>
          <linearGradient id="nc-rim" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
            <stop offset="0" stopColor="#f2a43a" stopOpacity="0" />
            <stop offset="0.45" stopColor="#f2a43a" stopOpacity="0.15" />
            <stop offset="0.63" stopColor="#ffc46b" stopOpacity="0.85" />
            <stop offset="0.8" stopColor="#f2a43a" stopOpacity="0.15" />
            <stop offset="1" stopColor="#f2a43a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="nc-snow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b9c9e6" stopOpacity="0.5" />
            <stop offset="1" stopColor="#b9c9e6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* mountains: far ridge, with snow on the highest peaks */}
        <path
          fill="#101a2e"
          d={`M-80,${H + 4} L-80,250 L40,150 L150,225 L290,92 L420,214 L540,140 L670,232 L790,106 L930,226 L1060,98 L1190,220 L1310,150 L1440,226 L1520,190 L1520,${H + 4}Z`}
        />
        <path
          fill="url(#nc-snow)"
          d="M290,92 L262,136 L282,130 L298,150 L314,128 L336,138Z M790,106 L764,146 L782,140 L798,158 L816,138 L836,146Z M1060,98 L1032,140 L1052,134 L1068,152 L1086,132 L1108,142Z"
        />
        {/* mountains: nearer ridge */}
        <path
          fill="#0b1322"
          d={`M-80,${H + 4} L-80,300 L80,236 L200,290 L340,214 L480,286 L640,246 L780,296 L940,240 L1090,292 L1230,236 L1380,290 L1520,254 L1520,${H + 4}Z`}
        />

        {/* trees: back row (lighter) then front row (darker), bases buried 8px into the ground */}
        <g>
          {BACK.map(([x, s, h], i) => (
            <Pine key={`b${i}`} x={x} s={s} hide={h} fill="#0a1020" />
          ))}
        </g>
        <g>
          {FRONT.map(([x, s, h], i) => (
            <Pine key={`f${i}`} x={x} s={s} hide={h} fill="#070b14" />
          ))}
        </g>

        {/* ground: a curved hill wider than the section, with a rim light where it catches the fire */}
        <path fill="#0a0a0c" d={GROUND} />
        <path fill="none" stroke="url(#nc-rim)" strokeWidth="2.5" d={RIDGE} />

        {/* tents and flag, standing on the ground line */}
        <g transform={`translate(690 ${ground(690)})`}>
          <path fill="#1a2740" stroke="#2f4468" strokeWidth="1.5" d="M-74,2 L0,-92 L74,2Z" />
          <path className="nc-door" fill="#f2a43a" d="M0,-92 L-24,2 L24,2Z" />
          <path fill="none" stroke="rgba(245,245,247,0.28)" d="M0,-92 L-100,6 M0,-92 L102,6" />
          <path fill="#f2a43a" d="M0,-92 L0,-118 L22,-112 L0,-106" />
        </g>
        <g className="hide-m" transform={`translate(1070 ${ground(1070)})`}>
          <path fill="#1a2740" stroke="#2f4468" strokeWidth="1.5" d="M-56,2 L0,-72 L56,2Z" />
          <path className="nc-door" fill="#f2a43a" d="M0,-72 L-18,2 L18,2Z" />
        </g>

        {/* fire: glow (screen blend), stone ring, logs, three flames, embers. Scales as one unit on phones. */}
        <g className="nc-fire" style={{ transformOrigin: `${FIRE_X}px ${gy}px` }}>
          <ellipse className="nc-fglow" cx={FIRE_X} cy={gy - 20} rx="280" ry="190" fill="url(#nc-glow)" />
          <ellipse className="nc-fglow" cx={FIRE_X} cy={gy + 2} rx="150" ry="18" fill="url(#nc-glow)" />
          {Array.from({ length: 9 }, (_, i) => {
            const a = (i / 9) * Math.PI * 2
            return (
              <ellipse
                key={i}
                cx={r1(FIRE_X + Math.cos(a) * 46)}
                cy={r1(gy + 2 + Math.sin(a) * 9)}
                rx="9"
                ry="6"
                fill="#1b1b20"
                stroke="#2e2e36"
              />
            )
          })}
          <g fill="#3a2417">
            <rect x={FIRE_X - 38} y={gy - 8} width="76" height="11" rx="5" transform={`rotate(-16 ${FIRE_X} ${gy - 2})`} />
            <rect x={FIRE_X - 38} y={gy - 8} width="76" height="11" rx="5" transform={`rotate(16 ${FIRE_X} ${gy - 2})`} />
          </g>
          <g transform={`translate(${FIRE_X} ${gy - 2})`}>
            <path className="nc-flame f0" fill="url(#nc-flame)" d="M0,0 C-40,-8 -36,-52 -12,-86 C-10,-58 8,-52 12,-78 C38,-48 42,-8 0,0Z" />
            <path className="nc-flame f1" fill="url(#nc-flame)" d="M0,0 C-28,-6 -24,-40 -7,-62 C-6,-42 6,-36 9,-56 C26,-34 28,-6 0,0Z" />
            <path className="nc-flame f2" fill="#fff0b8" d="M0,0 C-15,-4 -13,-24 -2,-38 C0,-26 8,-24 10,-33 C17,-17 15,-4 0,0Z" />
          </g>
          {Array.from({ length: 8 }, (_, e) => (
            <circle
              key={e}
              className="nc-ember"
              cx={FIRE_X - 14 + e * 4}
              cy={gy - 60}
              r={r1(1.3 + (e % 3) * 0.5)}
              fill="#ffd58a"
              style={{ animationDelay: `${e * 0.45}s`, animationDuration: `${2.6 + (e % 4) * 0.5}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
