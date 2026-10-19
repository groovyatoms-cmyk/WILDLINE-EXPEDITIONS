import type { Metadata } from 'next'
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = { title: 'Contact us' }

export default function Page() {
  return <div className="page"><Contact /></div>
}
