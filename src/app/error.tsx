'use client'

import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="page">
      <Section id="error" className="guide" title="Convoy halted">
        <p className="careers-intro">Something went wrong on our side. Try again, or head back to base camp.</p>
        <div className="cta">
          <Button variant="rust" onClick={reset}>
            Try again
          </Button>
          <Button href="/">Back to base camp</Button>
        </div>
      </Section>
    </div>
  )
}
