import type { Metadata } from 'next'
import About from '@/components/sections/About'
import Crew from '@/components/sections/Crew'

export const metadata: Metadata = { title: 'About us' }

export default function Page() {
  return <div className="page"><About /><Crew /></div>
}
