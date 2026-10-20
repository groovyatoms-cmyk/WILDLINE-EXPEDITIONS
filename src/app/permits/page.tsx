import type { Metadata } from 'next'
import { permits } from '@/data/guides'
import { pageMeta } from '@/lib/seo'
import GuidePage from '@/components/guides/GuidePage'

export const metadata: Metadata = pageMeta(permits.title, permits.description, permits.path)

export default function Page() {
  return (
    <div className="page">
      <GuidePage g={permits} />
    </div>
  )
}
