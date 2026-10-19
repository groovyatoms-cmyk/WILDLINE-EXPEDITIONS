import type { Metadata } from 'next'
import ExpeditionDetail from '@/components/sections/ExpeditionDetail'
import JsonLd from '@/components/JsonLd'
import { site, tripDetails, tripSlug, trips } from '@/data/site'
import { abs, pageMeta } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export const generateStaticParams = () => trips.map((t) => ({ slug: tripSlug(t) }))

const find = (slug: string) => trips.find((x) => tripSlug(x) === slug)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const t = find(slug)
  if (!t) return {}
  const d = tripDetails[slug]
  return pageMeta(
    t.name,
    `${t.name}: ${t.days} days, up to ${t.alt}, ${t.season}, from ${t.price}. ${d?.overview ?? t.alt_text}`.slice(0, 300),
    `/expeditions/${slug}`,
    `/expeditions/${slug}/opengraph-image`,
  )
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const t = find(slug)
  const d = tripDetails[slug]
  const ld = t && [
    {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: t.name,
      description: d?.overview ?? t.alt_text,
      url: abs(`/expeditions/${slug}`),
      image: abs(`/${t.still}`),
      touristType: 'Drivers, photographers and first-timers',
      itinerary: d && { '@type': 'ItemList', itemListElement: d.route.map((name, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Place', name } })) },
      provider: { '@id': abs('/#org') },
      offers: { '@type': 'Offer', priceCurrency: 'INR', price: t.price.replace(/[^\d]/g, ''), availability: 'https://schema.org/InStock', url: abs('/join') },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: site.name, item: abs('/') },
        { '@type': 'ListItem', position: 2, name: 'Expeditions', item: abs('/expeditions') },
        { '@type': 'ListItem', position: 3, name: t.name, item: abs(`/expeditions/${slug}`) },
      ],
    },
  ]
  return (
    <div className="page">
      {ld?.map((data, i) => <JsonLd key={i} data={data} />)}
      <ExpeditionDetail slug={slug} />
    </div>
  )
}
