import type { Metadata } from 'next'
import Expeditions from '@/components/sections/Expeditions'

export const metadata: Metadata = { title: 'Expeditions' }

export default function Page() {
  return <div className="page"><Expeditions /></div>
}
