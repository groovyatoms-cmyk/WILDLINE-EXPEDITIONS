import type { Metadata } from 'next'
import LegalPage from '@/components/sections/LegalPage'
import { legal } from '@/data/legal'
import { pageMeta } from '@/lib/seo'

type Props = { params: Promise<{ legal: string }> }

export const dynamicParams = false

export const generateStaticParams = () => Object.keys(legal).map((legal) => ({ legal }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { legal: key } = await params
  const doc = legal[key as keyof typeof legal]
  return doc ? pageMeta(doc.title, `${doc.title} for WILDLINE Expeditions: ${doc.sections.map(([h]) => h).join(', ')}.`, doc.path) : {}
}

export default async function Page({ params }: Props) {
  const { legal: key } = await params
  return <LegalPage docKey={key as keyof typeof legal} />
}
