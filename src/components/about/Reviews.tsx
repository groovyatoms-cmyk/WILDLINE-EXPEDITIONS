import { reviews } from '@/data/reviews'
import { site } from '@/data/site'
import JsonLd from '@/components/ui/JsonLd'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'

export default function Reviews({ to }: { to?: string }) {
  if (!reviews.length)
    // On the home page the section stays hidden; on /reviews it says so honestly.
    return to ? null : (
      <Section id="reviews" className="guide" title="Rider reviews">
        <p className="careers-intro">No reviews yet. Join a convoy and tell us how it went.</p>
        <Button variant="rust" href="/join">
          Join the next convoy
        </Button>
      </Section>
    )
  const ld = reviews.map((r) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    datePublished: r.date,
    reviewBody: r.quote,
    itemReviewed: { '@type': 'Organization', name: site.fullName },
  }))
  return (
    <Section id="reviews" className="reviews" title="From the road" to={to} heading="h2">
      <JsonLd data={ld} />
      <ul className="reviews-grid">
        {reviews.map((r) => (
          <li key={r.name + r.date}>
            <blockquote>{r.quote}</blockquote>
            <p className="mono">
              {r.name} · {r.trip}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
