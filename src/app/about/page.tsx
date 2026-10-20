import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import About from '@/components/about/About'
import How from '@/components/safety/How'

export const metadata: Metadata = pageMeta(
  'About us',
  'WILDLINE runs small, guided 4x4 convoy expeditions with a lead and sweep vehicle, recovery gear, sat comms and medical support. Meet the crew behind the convoys.',
  '/about',
)

export default function Page() {
  return (
    <div className="page">
      <About />
      <How />
    </div>
  )
}
