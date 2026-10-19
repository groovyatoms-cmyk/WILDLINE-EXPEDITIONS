import type { Metadata } from 'next'
import LegalPage from '@/components/sections/LegalPage'
import { legal } from '@/data/legal'

type Props = { params: Promise<{ legal: string }> }

export const dynamicParams = false

export const generateStaticParams = () => Object.keys(legal).map((legal) => ({ legal }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { legal: key } = await params
  return { title: legal[key as keyof typeof legal]?.title }
}

export default async function Page({ params }: Props) {
  const { legal: key } = await params
  return <LegalPage docKey={key as keyof typeof legal} />
}
