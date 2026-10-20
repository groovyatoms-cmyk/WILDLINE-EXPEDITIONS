import type { Metadata } from 'next'
import { packing } from '@/data/guides'
import { pageMeta } from '@/lib/seo'
import GuidePage from '@/components/guides/GuidePage'

export const metadata: Metadata = pageMeta(packing.title, packing.description, packing.path)

export default function Page() {
  return (
    <div className="page">
      <GuidePage g={packing} />
    </div>
  )
}
