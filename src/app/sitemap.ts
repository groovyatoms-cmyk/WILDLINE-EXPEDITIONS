import type { MetadataRoute } from 'next'
import { legal } from '@/data/legal'
import { POSTS } from '@/data/blog'
import { trips, tripSlug } from '@/data/site'
import { abs } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ['/', 1],
    ['/expeditions', 0.9],
    ['/safety', 0.8],
    ['/blog', 0.8],
    ['/about', 0.7],
    ['/team', 0.5],
    ['/careers', 0.5],
    ['/join', 0.8],
    ['/contact', 0.7],
    ['/faq', 0.6],
  ] as const
  return [
    ...pages.map(([path, priority]) => ({ url: abs(path), priority })),
    ...POSTS.map((p) => ({ url: abs(`/blog/${p.slug}`), priority: 0.7 })),
    ...trips.map((t) => ({ url: abs(`/expeditions/${tripSlug(t)}`), priority: 0.8 })),
    ...Object.values(legal).map((d) => ({ url: abs(d.path), priority: 0.2 })),
  ]
}
