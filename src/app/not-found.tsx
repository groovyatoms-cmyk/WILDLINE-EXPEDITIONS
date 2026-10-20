import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } }

export default function NotFound() {
  return (
    <div className="page">
      <Section id="not-found" className="guide" title="Off the map">
        <p className="careers-intro">This road does not go anywhere. The page may have moved or the link may be wrong.</p>
        <div className="cta">
          <Button variant="rust" href="/">
            Back to base camp
          </Button>
          <Button href="/expeditions">See expeditions</Button>
        </div>
      </Section>
    </div>
  )
}
