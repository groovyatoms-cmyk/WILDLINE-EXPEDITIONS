import type { Metadata, Viewport } from 'next'
import Shell from '@/components/Shell'
import JsonLd from '@/components/JsonLd'
import { site } from '@/data/site'
import { abs, siteUrl } from '@/lib/seo'
import './globals.css'

const title = 'WILDLINE EXPEDITIONS — Far roads. Good company.'
const description = 'Guided 4x4 convoy expeditions through Ladakh, Spiti and the Thar Desert.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | WILDLINE EXPEDITIONS' },
  description,
  applicationName: site.fullName,
  keywords: ['4x4 expeditions', 'Ladakh road trip', 'Spiti expedition', 'guided convoy India', 'Himalaya 4x4 tour', 'Rajasthan desert safari', 'Kutch', 'Sikkim', 'Arunachal'],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: { type: 'website', siteName: site.fullName, title, description, url: '/', locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title, description },
}

export const viewport: Viewport = { themeColor: '#0B0D10' }

// Apply the saved theme before first paint to avoid a dark/light flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.dataset.theme=t;document.querySelector('meta[name="theme-color"]').setAttribute('content','#F4F1EA')}}catch(e){}`

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': abs('/#org'),
  name: site.fullName,
  alternateName: site.name,
  slogan: site.tagline,
  description,
  url: abs('/'),
  logo: abs('/icon.svg'),
  image: abs('/opengraph-image'),
  email: site.email,
  telephone: `+${site.whatsapp}`,
  sameAs: [site.facebook, site.instagram, site.youtube],
  areaServed: 'IN',
  address: { '@type': 'PostalAddress', addressLocality: 'Leh', addressRegion: 'Ladakh', postalCode: '194101', addressCountry: 'IN' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <JsonLd data={orgLd} />
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
