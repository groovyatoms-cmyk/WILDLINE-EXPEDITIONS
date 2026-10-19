import { ImageResponse } from 'next/og'
import { site, tripSlug, trips } from '@/data/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamicParams = false

export const generateStaticParams = () => trips.map((t) => ({ slug: tripSlug(t) }))

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = trips.find((x) => tripSlug(x) === slug)
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 80, background: '#0B0D10', color: '#ff7a1a' }}>
        <div style={{ fontSize: 110, fontWeight: 900, lineHeight: 1 }}>{t?.name ?? site.fullName}</div>
        {t && <div style={{ fontSize: 44, color: '#ECEDE8', marginTop: 24 }}>{`${t.days} days · ${t.alt} · ${t.season} · from ${t.price}`}</div>}
        <div style={{ fontSize: 32, color: '#8a8d88', marginTop: 24 }}>{site.fullName}</div>
      </div>
    ),
    size,
  )
}
