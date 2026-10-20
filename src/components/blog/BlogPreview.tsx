'use client'

import { POSTS } from '@/data/blog'
import Section from '@/components/ui/Section'
import PosterCarousel from '@/components/ui/PosterCarousel'
import BlogCard from '@/components/blog/BlogCard'

// Home: every field note in a swipeable carousel. The heading opens the whole blog.
export default function BlogPreview({ to }: { to: string }) {
  return (
    <Section id="blog" className="blog" title="From the road" to={to} heading="h2">
      <PosterCarousel label="Field notes">
        {POSTS.map((p) => (
          <li key={p.slug}>
            <BlogCard p={p} />
          </li>
        ))}
      </PosterCarousel>
    </Section>
  )
}
