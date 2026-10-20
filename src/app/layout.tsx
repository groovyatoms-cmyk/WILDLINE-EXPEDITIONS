import type { Metadata, Viewport } from 'next'
import Shell from '@/components/layout/Shell'
import JsonLd from '@/components/ui/JsonLd'
import { site } from '@/data/site'
import { abs, siteUrl } from '@/lib/seo'
import { Inter, Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Self-hosted by next/font: no render-blocking request to Google Fonts.
// One variable family: the optical-size axis gives tight display cuts at large sizes and open text cuts at small ones.
// Display: Bricolage Grotesque (variable width + optical size) for headlines and numerals; Inter for reading text.
const display = Inter_Tight({ subsets: ['latin'], display: 'swap', variable: '--font-display', weight: ['700', '800'] })
const serif = Instrument_Serif({ subsets: ['latin'], display: 'swap', variable: '--font-serif', weight: '400', style: 'italic' })
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono', weight: ['400', '500'] })
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-body', axes: ['opsz'] })

const title = '4x4 Expeditions India — Guided Off-Road Convoys | Wildline'
const description =
  'Small, guided 4x4 convoys through Ladakh, Spiti, Uttarakhand and Arunachal. Eight vehicles, one pace, everyone comes back. Reserve a seat.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | Wildline Expeditions' },
  description,
  applicationName: site.fullName,
  keywords: [
    '4x4 expeditions',
    'Ladakh road trip',
    'Spiti expedition',
    'guided convoy India',
    'Himalaya 4x4 tour',
    'Rajasthan desert safari',
    'Kutch',
    'Sikkim',
    'Arunachal',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: { type: 'website', siteName: site.fullName, title, description, url: '/', locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title, description },
}

export const viewport: Viewport = { themeColor: '#0a0a0b' }

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
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>{/* Dark only: the site has no theme switch. */}</head>
      <body>
        <JsonLd data={orgLd} />
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
