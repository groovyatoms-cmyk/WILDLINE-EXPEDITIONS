'use client'

import { crew } from '@/data/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

export default function Crew({ to }: { to?: string }) {
  return (
    <Section id="crew" className="crew" title={crew.headline} to={to}>
      <dl className="mono specs">
        {crew.specs.map(([k, v], i) => (
          <Reveal key={k} index={i}><dt>{k}</dt><dd>{v}</dd></Reveal>
        ))}
      </dl>
    </Section>
  )
}
