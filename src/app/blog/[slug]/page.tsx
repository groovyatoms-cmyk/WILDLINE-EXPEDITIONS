import type { Metadata } from 'next'
import BlogArticle from '@/components/blog/BlogArticle'
import JsonLd from '@/components/ui/JsonLd'
import { POSTS, post } from '@/data/blog'
import { site } from '@/data/site'
import { abs, pageMeta } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = post(slug)
  return p ? pageMeta(p.title, p.description, `/blog/${slug}`, `/${p.cover}`) : {}
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const p = post(slug)
  if (!p) return null
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      image: abs(`/${p.cover}`),
      datePublished: p.date,
      author: { '@type': 'Organization', name: site.fullName },
      publisher: { '@type': 'Organization', name: site.fullName, logo: { '@type': 'ImageObject', url: abs('/icon.svg') } },
      mainEntityOfPage: abs(`/blog/${slug}`),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
        { '@type': 'ListItem', position: 2, name: 'Field notes', item: abs('/blog') },
        { '@type': 'ListItem', position: 3, name: p.title, item: abs(`/blog/${slug}`) },
      ],
    },
  ]
  return (
    <div className="page">
      <JsonLd data={ld} />
      <BlogArticle p={p} />
    </div>
  )
}
