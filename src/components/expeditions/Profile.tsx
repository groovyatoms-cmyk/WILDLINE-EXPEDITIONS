// Altitude profile: one point per stop, in route order, drawn from the same stops list shown beside it.
const W = 800,
  H = 220,
  PAD = 28
const metres = (s: string) => parseInt(s.replace(/[^\d]/g, ''), 10)

export default function Profile({ stops }: { stops: string[][] }) {
  const alts = stops.map(([, a]) => metres(a))
  if (stops.length < 2 || alts.some(Number.isNaN)) return null
  const lo = Math.min(...alts),
    hi = Math.max(...alts)
  const x = (i: number) => PAD + (i / (stops.length - 1)) * (W - PAD * 2)
  const y = (a: number) => H - PAD - ((a - lo) / (hi - lo || 1)) * (H - PAD * 2 - 16)
  const line = alts.map((a, i) => `${x(i).toFixed(1)},${y(a).toFixed(1)}`).join(' ')
  return (
    <figure className="detail-profile">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Altitude profile, ${lo.toLocaleString('en-US')} to ${hi.toLocaleString('en-US')} metres`}
      >
        <polygon points={`${x(0)},${H - PAD} ${line} ${x(stops.length - 1)},${H - PAD}`} className="profile-fill" />
        <polyline points={line} className="profile-line" />
        {alts.map((a, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(a)} r="4" />
            {(i === alts.indexOf(hi) || i === 0 || i === stops.length - 1) && (
              <text x={x(i)} y={y(a) - 10} textAnchor={i === 0 ? 'start' : i === stops.length - 1 ? 'end' : 'middle'}>
                {a.toLocaleString('en-US')} m
              </text>
            )}
          </g>
        ))}
      </svg>
      <figcaption className="mono">
        {stops[0][0]} → {stops[stops.length - 1][0]}
      </figcaption>
    </figure>
  )
}
