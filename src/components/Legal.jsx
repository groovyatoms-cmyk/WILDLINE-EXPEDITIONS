import { useState } from 'react'
import { legal } from '../data/legal.js'

export default function Legal() {
  const [key, setKey] = useState(null)
  const doc = key && legal[key]

  return (
    <>
      {Object.entries(legal).map(([k, d]) => (
        <button key={k} className="mono legal-link" onClick={() => setKey(k)} aria-haspopup="dialog">{d.title}</button>
      ))}
      <div className={`panel-scrim${doc ? ' open' : ''}`} onClick={() => setKey(null)} />
      <aside className={`panel legal-panel${doc ? ' open' : ''}`} role="dialog" aria-label={doc?.title} aria-hidden={!doc} {...(doc ? {} : { inert: '' })}>
        <button className="mono panel-close" onClick={() => setKey(null)}>CLOSE ✕</button>
        {doc && (
          <article>
            <h3 className="display">{doc.title}</h3>
            {doc.sections.map(([h, p]) => (
              <section key={h}><h4 className="mono">{h.toUpperCase()}</h4><p>{p}</p></section>
            ))}
          </article>
        )}
      </aside>
    </>
  )
}
