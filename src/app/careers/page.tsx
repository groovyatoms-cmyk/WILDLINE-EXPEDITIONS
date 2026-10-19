import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Careers from '@/components/sections/Careers'

export const metadata: Metadata = pageMeta('Careers', 'Join the WILDLINE crew: lead driver-guides, recovery mechanics, trip operations and content roles for 4x4 expeditions.', '/careers')

export default function Page() {
  return <div className="page"><Careers /></div>
}
