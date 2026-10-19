import type { Metadata } from 'next'
import Careers from '@/components/sections/Careers'

export const metadata: Metadata = { title: 'Careers' }

export default function Page() {
  return <div className="page"><Careers /></div>
}
