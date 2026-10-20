'use client'

import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { POSTS, readMinutes, type Post } from '@/data/blog'
import { trips, tripSlug } from '@/data/site'
import { openEnquire } from '@/lib/enquire'
import { usePrefs } from '@/lib/prefs'
import Button from '@/components/ui/Button'
import ShimmerImg from '@/components/ui/ShimmerImg'
import BlogCard from '@/components/blog/BlogCard'

// One post: a reading-progress line, the cover, the text, then the route it leads to and two more notes.
export default function BlogArticle({ p }: { p: Post }) {
  const { money } = usePrefs()
  const bar = useRef<HTMLSpanElement>(null)
  const body = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const tick = () => {
      const el = body.current
      if (!el || !bar.current) return
      const r = el.getBoundingClientRect()
      const k = Math.min(1, Math.max(0, (innerHeight * 0.4 - r.top) / Math.max(1, r.height)))
      bar.current.style.transform = `scaleX(${k.toFixed(3)})`
    }
    tick()
    addEventListener('scroll', tick, { passive: true })
    addEventListener('resize', tick)
    return () => {
      removeEventListener('scroll', tick)
      removeEventListener('resize', tick)
    }
  }, [])
  const t = p.trip ? trips.find((x) => tripSlug(x) === p.trip) : undefined
  const more = POSTS.filter((x) => x.slug !== p.slug).slice(0, 2)
  return (
    <article className="section post">
      <span className="read-bar" aria-hidden="true">
        <span ref={bar} />
      </span>
      <a className="post-back mono" href="/blog">
        <ArrowLeft size={16} aria-hidden="true" /> All field notes
      </a>
      <header className="post-head">
        <p className="mono bcard-meta">
          <b>{p.tag}</b>
          <i aria-hidden="true">·</i>
          {readMinutes(p)} min read
        </p>
        <h1 className="display">{p.title}</h1>
        <p className="post-lede">{p.description}</p>
      </header>
      <ShimmerImg className="post-cover" ratio="21 / 9" src={`/${p.cover}`} alt="" />
      <div ref={body} className="post-body">
        {p.blocks.map((b, i) =>
          b.t === 'h2' ? (
            <h2 key={i} className="display">
              {b.text}
            </h2>
          ) : b.t === 'quote' ? (
            <blockquote key={i}>{b.text}</blockquote>
          ) : b.t === 'ul' ? (
            <ul key={i}>
              {b.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          ) : (
            <p key={i}>{b.text}</p>
          ),
        )}
      </div>
      <aside className="post-cta">
        <h2 className="display">{t ? `Ready for the ${t.name.replace(' Expedition', '')} route?` : 'Planning a trip?'}</h2>
        <p>
          {t
            ? `${t.days} days, up to ${t.alt}, ${t.season}, from ${money(t.price)}.`
            : 'Tell us where and when, and we will point you to the routes that fit.'}
        </p>
        <div className="cta">
          {t && (
            <Button variant="rust" href={`/expeditions/${p.trip}`}>
              See the expedition <ArrowRight size={16} aria-hidden="true" />
            </Button>
          )}
          <Button variant={t ? 'line' : 'rust'} onClick={openEnquire} aria-haspopup="dialog">
            Enquire
          </Button>
        </div>
      </aside>
      <section className="post-more" aria-label="More field notes">
        <h2 className="display">More field notes</h2>
        <ul className="blog-grid">
          {more.map((x) => (
            <li key={x.slug}>
              <BlogCard p={x} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
