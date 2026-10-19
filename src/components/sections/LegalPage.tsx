import { legal } from '@/data/legal'
import Section from '@/components/ui/Section'

// One page for privacy, terms and refund: `docKey` picks the text from data/legal.js.
export default function LegalPage({ docKey }: { docKey: keyof typeof legal }) {
  const doc = legal[docKey]
  return (
    <div className="page">
      <Section id={docKey} className="legal" title={doc.title}>
        {doc.sections.map(([heading, text]) => (
          <div key={heading} className="legal-block">
            <h3 className="mono">{heading.toUpperCase()}</h3>
            <p>{text}</p>
          </div>
        ))}
      </Section>
    </div>
  )
}
