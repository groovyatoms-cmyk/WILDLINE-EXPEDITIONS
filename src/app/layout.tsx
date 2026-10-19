import type { Metadata, Viewport } from 'next'
import Shell from '@/components/Shell'
import './globals.css'

const title = 'WILDLINE EXPEDITIONS — Far roads. Good company.'
const description = 'Guided 4x4 convoy expeditions through Ladakh, Spiti and the Thar Desert.'

export const metadata: Metadata = {
  title: { default: title, template: '%s | WILDLINE EXPEDITIONS' },
  description,
  openGraph: { type: 'website', siteName: 'WILDLINE EXPEDITIONS', title, description },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { themeColor: '#0B0D10' }

// Apply the saved theme before first paint to avoid a dark/light flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.dataset.theme=t;document.querySelector('meta[name="theme-color"]').setAttribute('content','#F4F1EA')}}catch(e){}`

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
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
