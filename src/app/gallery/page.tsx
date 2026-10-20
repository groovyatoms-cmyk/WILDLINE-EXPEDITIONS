import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Gallery from '@/components/about/Gallery'

export const metadata: Metadata = pageMeta(
  'Gallery — on the road',
  'Photographs from WILDLINE 4x4 convoy expeditions across Ladakh, Spiti, Uttarakhand and Arunachal.',
  '/gallery',
)

export default function Page() {
  return (
    <div className="page">
      <Gallery />
    </div>
  )
}
