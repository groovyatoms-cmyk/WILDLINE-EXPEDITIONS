import type { Metadata } from 'next'
import { site } from '@/data/site'

// Set NEXT_PUBLIC_SITE_URL to the real domain in Vercel; every canonical, sitemap and OG URL derives from it.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wide-beta.vercel.app').replace(/\/$/, '')

export const abs = (path = '/') => `${siteUrl}${path}`

// Per-page metadata: title, description, canonical and social tags all from one call.
export function pageMeta(title: string, description: string, path: string, image = '/opengraph-image'): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.fullName}`, description, url: path, type: 'website', images: [image] },
    twitter: { card: 'summary_large_image', title: `${title} | ${site.fullName}`, description, images: [image] },
  }
}

// Serialises structured data safely for a <script type="application/ld+json"> tag: "<" becomes <.
export const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')
