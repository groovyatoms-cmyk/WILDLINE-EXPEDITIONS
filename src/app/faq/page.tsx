import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Faq from '@/components/sections/Faq'
import JsonLd from '@/components/JsonLd'
import { faq } from '@/data/site'

export const metadata: Metadata = pageMeta('FAQ — booking, safety, packing', 'Answers on booking, cancellations, altitude sickness, permits, stays, packing and what to expect on a WILDLINE 4x4 convoy.', '/faq')

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.groups.flatMap((g) => g.items).map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }
  return <div className="page"><JsonLd data={ld} /><Faq /></div>
}
