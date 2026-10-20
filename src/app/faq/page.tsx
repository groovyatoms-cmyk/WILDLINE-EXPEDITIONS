import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Faq from '@/components/contact/Faq'

export const metadata: Metadata = pageMeta(
  'FAQ — booking, safety, packing',
  'Answers on booking, cancellations, altitude sickness, permits, stays, packing and what to expect on a WILDLINE 4x4 convoy.',
  '/faq',
)

export default function Page() {
  // The Faq component writes the FAQPage schema for exactly what it shows.
  return (
    <div className="page">
      <Faq />
    </div>
  )
}
