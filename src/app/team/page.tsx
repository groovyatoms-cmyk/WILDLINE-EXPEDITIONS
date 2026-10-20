import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Team from '@/components/about/Team'

export const metadata: Metadata = pageMeta(
  'Our core team',
  'Meet the guides, recovery leads and medical crew who take WILDLINE convoys there and back.',
  '/team',
)

export default function Page() {
  return (
    <div className="page">
      <Team />
    </div>
  )
}
