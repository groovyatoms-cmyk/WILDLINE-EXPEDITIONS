'use client'

import { useState } from 'react'
import { POSTS } from '@/data/blog'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import BlogCard from '@/components/blog/BlogCard'

const TAGS = ['All', ...Array.from(new Set(POSTS.map((p) => p.tag)))]

// The blog index: filter by topic, lead story first.
export default function BlogIndex() {
  const [tag, setTag] = useState('All')
  const list = POSTS.filter((p) => tag === 'All' || p.tag === tag)
  return (
    <Section id="blog" className="blog" title="Field notes">
      <p className="careers-intro">
        Routes, seasons, altitude and what a convoy is really like, written from the same notes our crew works from.
      </p>
      <div className="months blog-tags" role="group" aria-label="Topic">
        {TAGS.map((t) => (
          <button key={t} type="button" aria-pressed={tag === t} onClick={() => setTag(t)}>
            {t}
          </button>
        ))}
      </div>
      <ul className="blog-grid">
        {list.map((p, i) => (
          <Reveal as="li" key={p.slug} index={i} className={i === 0 ? 'lead' : undefined}>
            <BlogCard p={p} big={i === 0} />
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
