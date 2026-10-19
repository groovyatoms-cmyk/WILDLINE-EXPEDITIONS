import { ImageResponse } from 'next/og'
import { site } from '@/data/site'

export const alt = `${site.fullName} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 80, background: '#0B0D10', color: '#ff7a1a' }}>
        <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 1 }}>{site.name}</div>
        <div style={{ fontSize: 44, color: '#ECEDE8', marginTop: 24 }}>{`${site.fullName} · ${site.tagline}`}</div>
      </div>
    ),
    size,
  )
}
