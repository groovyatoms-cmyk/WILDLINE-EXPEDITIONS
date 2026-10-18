import { crew } from '../data/site.js'

export default function Crew() {
  return (
    <section id="crew" className="section crew" aria-labelledby="crew-h">
      <h2 id="crew-h" className="display crew-head">{crew.headline}</h2>
      <dl className="mono specs">
        {crew.specs.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </section>
  )
}
