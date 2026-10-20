import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Expeditions from '@/components/expeditions/Expeditions'

export const metadata: Metadata = pageMeta(
  'Expeditions — 4x4 convoy trips across India',
  'Guided 4x4 convoy expeditions: Ladakh, Spiti, winter Spiti, Zanskar, Nepal, Adi Kailash, Arunachal, Sikkim, Kashmir, Uttarakhand, Rajasthan, Kutch, Meghalaya and the Western Ghats. Small groups, full recovery and medical support.',
  '/expeditions',
)

export default function Page() {
  return (
    <div className="page">
      <Expeditions />
    </div>
  )
}
