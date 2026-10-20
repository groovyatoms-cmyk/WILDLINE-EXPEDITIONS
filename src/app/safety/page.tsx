import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import ConvoyCockpit from '@/components/safety/ConvoyCockpit'
import Crew from '@/components/safety/Crew'
import How from '@/components/safety/How'

export const metadata: Metadata = pageMeta(
  'Safe Off-Road Travel in India — Wildline Safety',
  'Lead and sweep vehicles, recovery gear, sat comms, oxygen above 4,500 m and acclimatisation built into every Wildline 4x4 convoy.',
  '/safety',
)

export default function Page() {
  return (
    <div className="page">
      <ConvoyCockpit />
      <Crew from={8} title="The rest of the checklist" />
      <How />
    </div>
  )
}
