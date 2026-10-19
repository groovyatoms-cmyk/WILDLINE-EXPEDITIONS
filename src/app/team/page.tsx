import type { Metadata } from 'next'
import Team from '@/components/sections/Team'

export const metadata: Metadata = { title: 'Our Core Team' }

export default function Page() {
  return <div className="page"><Team /></div>
}
