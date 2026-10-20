import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Contact from '@/components/contact/Contact'
import Enquiry from '@/components/contact/Enquiry'

export const metadata: Metadata = pageMeta(
  'Contact us',
  'Reach WILDLINE Expeditions by WhatsApp, email, phone or at our Leh office. We reply within one working day.',
  '/contact',
)

export default function Page() {
  return (
    <div className="page">
      <Contact />
      <Enquiry />
    </div>
  )
}
