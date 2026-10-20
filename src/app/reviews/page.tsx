import type { Metadata } from 'next'
import { reviews } from '@/data/reviews'
import { pageMeta } from '@/lib/seo'
import Reviews from '@/components/about/Reviews'

export const metadata: Metadata = {
  ...pageMeta('Rider reviews', 'What riders say about WILDLINE 4x4 convoy expeditions, in their own words.', '/reviews'),
  robots: reviews.length ? undefined : { index: false }, // nothing to index until a real review is added
}

export default function Page() {
  return (
    <div className="page">
      <Reviews />
    </div>
  )
}
