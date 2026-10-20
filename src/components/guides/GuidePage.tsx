import { Check } from 'lucide-react'
import type { Guide } from '@/data/guides'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

// A preparation guide as a page: intro, then one card per group.
export default function GuidePage({ g }: { g: Guide }) {
  return (
    <Section id={g.path.slice(1)} className="guide" title={g.title}>
      <p className="careers-intro">{g.intro}</p>
      <div className="guide-grid">
        {g.groups.map(([title, items]) => (
          <div key={title} className="guide-card">
            <h2 className="display">{title}</h2>
            <ul>
              {items.map((x) => (
                <li key={x}>
                  <Check size={16} strokeWidth={2} aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="cta">
        <Button variant="rust" href="/contact">
          Ask the crew
        </Button>
        <Button href="/faq">Read the FAQ</Button>
      </div>
    </Section>
  )
}
