// Paragraph whose words light up one after another as it scrolls into view (CSS scroll-driven animation; plain text elsewhere).
export default function ScrollWords({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  const words = text.split(' ')
  return (
    <p className="scroll-words">
      {words.map((w, i) => (
        <span key={i} data-hi={highlight.includes(w) ? '' : undefined} style={{ '--i': i, '--n': words.length } as React.CSSProperties}>
          {w}{' '}
        </span>
      ))}
    </p>
  )
}
