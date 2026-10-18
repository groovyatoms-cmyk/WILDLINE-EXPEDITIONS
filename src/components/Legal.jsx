import { useState } from 'react'
import { motion } from 'framer-motion'
import { legal } from '../data/legal.js'

export default function Legal() {
  const [key, setKey] = useState(null)
  const doc = key && legal[key]

  return (
    <>
      {Object.entries(legal).map(([k, d]) => (
        <button key={k} className="mono legal-link" onClick={() => setKey(k)} aria-haspopup="dialog">{d.title}</button>
      ))}
      <motion.div className={`panel-scrim${doc ? ' open' : ''}`} onClick={() => setKey(null)} initial={false} animate={{ opacity: doc ? 1 : 0 }} />
      <motion.aside className="panel legal-panel" role="dialog" aria-label={doc?.title} aria-hidden={!doc} {...(doc ? {} : { inert: '' })}
        initial={false} animate={{ x: doc ? 0 : '110%' }} transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}>
        <button className="mono panel-close" onClick={() => setKey(null)}>CLOSE ✕</button>
        {doc && (
          <article>
            <h3 className="display">{doc.title}</h3>
            {doc.sections.map(([h, p]) => (
              <section key={h}><h4 className="mono">{h.toUpperCase()}</h4><p>{p}</p></section>
            ))}
          </article>
        )}
      </motion.aside>
    </>
  )
}
