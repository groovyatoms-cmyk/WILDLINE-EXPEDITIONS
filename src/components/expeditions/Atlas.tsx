'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { tripDetails, tripPlace, tripSlug, trips } from '@/data/site'
import { openEnquire } from '@/lib/enquire'
import { inSeason } from '@/lib/season'
import Button from '@/components/ui/Button'
import ShimmerImg from '@/components/ui/ShimmerImg'

// Field atlas: the trips are places, so they are browsed as places. Lat/lon grid, the Himalayan arc,
// a pin per route. Pick a pin (or step with the arrows) and the dossier on the right changes.
const LON = [68, 94],
  LAT = [8, 36]
const W = 1000,
  H = Math.round(((LAT[1] - LAT[0]) / (LON[1] - LON[0])) * W)
const px = (lon: number) => ((lon - LON[0]) / (LON[1] - LON[0])) * 100 // percent across the map
const py = (lat: number) => ((LAT[1] - lat) / (LAT[1] - LAT[0])) * 100
const sx = (lon: number) => (px(lon) / 100) * W // same point in viewBox units
const sy = (lat: number) => (py(lat) / 100) * H

const ARC: [number, number][] = [
  [74, 35],
  [77, 34.6],
  [79.5, 32],
  [81, 30.4],
  [84, 28.7],
  [88, 27.8],
  [92, 28.2],
  [94, 28.8],
]
const CITIES: [string, number, number][] = [
  ['Delhi', 77.2, 28.6],
  ['Mumbai', 72.9, 19.1],
  ['Kolkata', 88.4, 22.6],
  ['Chennai', 80.3, 13.1],
]

export default function Atlas({ month = null }: { month?: number | null }) {
  const slugs = trips.map(tripSlug)
  const [slug, setSlug] = useState('ladakh')
  const i = slugs.indexOf(slug)
  const t = trips[i]
  const d = tripDetails[slug]
  const step = (n: number) => setSlug(slugs[(i + n + slugs.length) % slugs.length])

  return (
    <div className="atlas">
      <div className="atlas-map">
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
          {[72, 76, 80, 84, 88, 92].map((lon) => (
            <g key={lon}>
              <line x1={sx(lon)} x2={sx(lon)} y1="0" y2={H} />
              <text x={sx(lon) + 6} y="18">
                {lon}°E
              </text>
            </g>
          ))}
          {[12, 16, 20, 24, 28, 32].map((lat) => (
            <g key={lat}>
              <line x1="0" x2={W} y1={sy(lat)} y2={sy(lat)} />
              <text x="8" y={sy(lat) - 6}>
                {lat}°N
              </text>
            </g>
          ))}
          <polyline className="atlas-arc" points={ARC.map(([lo, la]) => `${sx(lo)},${sy(la)}`).join(' ')} />
          <path id="arc-road" d={`M${ARC.map(([lo, la]) => `${sx(lo)},${sy(la)}`).join(' L')}`} fill="none" stroke="none" />
          <circle className="atlas-convoy" r="5">
            <animateMotion dur="16s" repeatCount="indefinite">
              <mpath href="#arc-road" />
            </animateMotion>
          </circle>
          <text className="atlas-sea" x={sx(70.2)} y={sy(15)}>
            Arabian Sea
          </text>
          <text className="atlas-sea" x={sx(86)} y={sy(15)}>
            Bay of Bengal
          </text>
          <text className="atlas-sea" x={sx(80.4)} y={sy(31.4)} transform={`rotate(-38 ${sx(80.4)} ${sy(31.4)})`}>
            Himalaya
          </text>
          {CITIES.map(([n, lo, la]) => (
            <g key={n} className="atlas-city">
              <path d={`M${sx(lo) - 5},${sy(la)}h10M${sx(lo)},${sy(la) - 5}v10`} />
              <text x={sx(lo) + 9} y={sy(la) + 4}>
                {n}
              </text>
            </g>
          ))}
        </svg>
        {trips.map((x, k) => {
          const s = slugs[k],
            [lat, lon] = tripPlace[s]
          return (
            <button
              key={s}
              type="button"
              className="atlas-pin"
              data-side={lon > 86 || s === 'uttarakhand' ? 'left' : 'right'}
              aria-pressed={s === slug}
              data-off={month !== null && !inSeason(x.season, month) ? '' : undefined}
              aria-label={`${x.name}, ${x.alt}`}
              style={{ left: `${px(lon)}%`, top: `${py(lat)}%`, '--i': k } as React.CSSProperties}
              onClick={() => setSlug(s)}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setSlug(s)}
            >
              <span className="atlas-pin-label mono">{x.name.replace(' Expedition', '')}</span>
            </button>
          )
        })}
      </div>

      <aside className="atlas-card" aria-live="polite">
        <div key={slug} className="atlas-dossier">
          <div className="atlas-photo">
            <ShimmerImg ratio="4 / 3" src={`/${t.still}`} alt={t.altText} />
            <span className="display atlas-alt" aria-hidden="true">
              {t.alt.replace(/\s*m$/, '')}
              <small>m</small>
            </span>
          </div>
          <h3 className="display">{t.name}</h3>
          <p className="mono atlas-meta">
            <span>{t.days} days</span>
            <span>{t.season}</span>
            <span>from {t.price}</span>
            {d && <span>{d.level}</span>}
          </p>
          {d && <p className="atlas-overview">{d.overview}</p>}
          {d && <p className="mono atlas-route">{d.route.join(' → ')}</p>}
        </div>
        <div className="atlas-actions">
          <Button variant="rust" href={`/expeditions/${slug}`}>
            View expedition
          </Button>
          <Button onClick={openEnquire} aria-haspopup="dialog">
            Enquire
          </Button>
          <span className="atlas-step">
            <button type="button" aria-label="Previous expedition" onClick={() => step(-1)}>
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next expedition" onClick={() => step(1)}>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </span>
        </div>
      </aside>
    </div>
  )
}
