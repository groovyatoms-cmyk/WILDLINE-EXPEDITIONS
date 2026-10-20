// A night sky for a section background: twinkling stars, a Milky Way band, the "Convoy" constellation (eight stars, one per vehicle)
// and shooting stars. Decorative only. Star numbers are fixed and rounded so the server and the browser draw the same sky.
const r1 = (v: number) => Math.round(v * 10) / 10
const f = (v: number) => v - Math.floor(v)
const SKY = Array.from(
  { length: 170 },
  (_, k) =>
    [
      r1(f(Math.sin(k * 12.9898) * 43758.5453) * 100),
      r1(f(Math.sin(k * 78.233) * 12345.6789) * 100),
      r1(0.5 + f(Math.sin(k * 39.346) * 9871.123) * 1.5),
      r1(f(k * 0.37) * 4),
    ] as const,
)
const CONVOY: [number, number][] = [
  [58, 12],
  [63, 18],
  [69, 16],
  [75, 23],
  [81, 20],
  [86, 27],
  [91, 24],
  [95, 32],
]

export default function StarSky() {
  return (
    <div className="stargaze" aria-hidden="true">
      <i className="milky" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
        {SKY.map(([x, y, r, d], i) => (
          <circle key={i} className="fs" cx={x} cy={y} r={r1(r * 0.07)} style={{ animationDelay: `${d}s` }} />
        ))}
        <polyline className="constel" points={CONVOY.map(([x, y]) => `${x},${y}`).join(' ')} />
        {CONVOY.map(([x, y], i) => (
          <circle key={i} className="cstar2" cx={x} cy={y} r="0.42" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </svg>
      <i className="shoot s1" />
      <i className="shoot s2" />
      <i className="shoot s3" />
    </div>
  )
}
