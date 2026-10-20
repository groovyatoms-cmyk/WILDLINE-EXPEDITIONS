'use client'

import { ArrowUpRight } from 'lucide-react'
import { readMinutes, type Post } from '@/data/blog'
import ShimmerImg from '@/components/ui/ShimmerImg'

// A post as a card: photograph, topic, title, one line, reading time. `big` is the lead card.
export default function BlogCard({ p, big = false }: { p: Post; big?: boolean }) {
  return (
    <a className={`bcard${big ? ' big' : ''}`} href={`/blog/${p.slug}`}>
      <span className="bcard-img">
        <ShimmerImg src={`/${p.cover}`} alt="" />
      </span>
      <span className="bcard-body">
        <span className="mono bcard-meta">
          <b>{p.tag}</b>
          <i aria-hidden="true">·</i>
          {readMinutes(p)} min read
        </span>
        <span className="display bcard-title">{p.title}</span>
        <span className="bcard-desc">{p.description}</span>
        <span className="bcard-go mono">
          Read the note <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </span>
    </a>
  )
}
