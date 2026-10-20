import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import BlogIndex from '@/components/blog/BlogIndex'

export const metadata: Metadata = pageMeta(
  'Field Notes: 4x4 Travel in India — Wildline Blog',
  'Route guides, season calendars and altitude advice for guided 4x4 expeditions in Ladakh, Spiti, the North East and beyond.',
  '/blog',
)

export default function Page() {
  return (
    <div className="page">
      <BlogIndex />
    </div>
  )
}
