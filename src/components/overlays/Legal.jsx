import { useState } from 'react'
import { legal } from '@/data/legal.js'
import Panel from '@/components/ui/Panel.jsx'

export default function Legal() {
  const [key, setKey] = useState(null)
  const doc = key && legal[key]

  return (
    <>
      {Object.entries(legal).map(([k, d]) => (
        <button key={k} className="mono legal-link" onClick={() => setKey(k)} aria-haspopup="dialog">{d.title}</button>
      ))}
      <Panel open={!!doc} onClose={() => setKey(null)} label={doc?.title} className="legal-panel">
        {doc && (
          <article>
            <h3 className="display">{doc.title}</h3>
            {doc.sections.map(([h, p]) => (
              <section key={h}><h4 className="mono">{h.toUpperCase()}</h4><p>{p}</p></section>
            ))}
          </article>
        )}
      </Panel>
    </>
  )
}
