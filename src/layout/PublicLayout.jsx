import CookieBanner from '@/components/overlays/CookieBanner.jsx'
import Enquire from '@/components/overlays/Enquire.jsx'
import Footer from '@/components/ui/Footer.jsx'
import Header from '@/components/ui/Header.jsx'
import TopBar from '@/components/ui/TopBar.jsx'

// Shared shell for every public page: header (nav + menu), optional extra header content,
// page body, footer, and the site-wide enquire panel and cookie banner.
export default function PublicLayout({ header, routeKey, ready = true, children }) {
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
