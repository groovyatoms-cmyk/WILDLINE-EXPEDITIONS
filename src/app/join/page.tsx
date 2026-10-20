import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Join from '@/components/convoys/Join'

export const metadata: Metadata = pageMeta(
  'Join the next convoy — departures and booking',
  'Upcoming WILDLINE departure dates, seats left, what is included and how booking works.',
  '/join',
)

export default function Page() {
  return (
    <div className="page">
      <Join />
    </div>
  )
}
