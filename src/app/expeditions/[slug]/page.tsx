import type { Metadata } from 'next'
import ExpeditionDetail from '@/components/sections/ExpeditionDetail'
import { tripSlug, trips } from '@/data/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export const generateStaticParams = () => trips.map((t) => ({ slug: tripSlug(t) }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const t = trips.find((x) => tripSlug(x) === slug)
  return { title: t?.name ?? 'Expedition' }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <div className="page"><ExpeditionDetail slug={slug} /></div>
}
