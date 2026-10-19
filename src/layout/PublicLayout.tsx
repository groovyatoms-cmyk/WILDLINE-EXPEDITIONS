'use client'

import CookieBanner from '@/components/overlays/CookieBanner'
import Enquire from '@/components/overlays/Enquire'
import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import TopBar from '@/components/ui/TopBar'

// Shared shell for every public page: header (nav + menu), optional extra header content,
// page body, footer, and the site-wide enquire panel and cookie banner.
type Props = { header: React.ReactNode; routeKey: string; ready?: boolean; children: React.ReactNode }

export default function PublicLayout({ header, routeKey, ready = true, children }: Props) {
  return (
    <>
      <TopBar routeKey={routeKey} />
      <Header />
      {header}
      <main>{children}</main>
      <Footer />
      <Enquire />
      {ready && <CookieBanner />}
    </>
  )
}
