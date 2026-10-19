import type { Metadata } from 'next'
import Join from '@/components/sections/Join'

export const metadata: Metadata = { title: 'Join the next convoy' }

export default function Page() {
  return <div className="page"><Join /></div>
}
