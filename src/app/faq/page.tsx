import type { Metadata } from 'next'
import Faq from '@/components/sections/Faq'

export const metadata: Metadata = { title: 'FAQ' }

export default function Page() {
  return <div className="page"><Faq /></div>
}
