// Placeholder for a section that is still loading: the real section's heading and block heights, shimmering, so the page below does not jump.
// `height` is the real section's height on desktop, `mobile` its height on a phone (≤ 768 px); both are fixed so the swap is exact.
export default function SectionSkeleton({
  id,
  height,
  mobile = height,
  blocks = 3,
}: {
  id: string
  height: number
  mobile?: number
  blocks?: number
}) {
  return (
    <section
      id={id}
      className="section section-skeleton"
      style={{ '--h': `${height}px`, '--hm': `${mobile}px` } as React.CSSProperties}
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="skeleton-head shimmer" />
      <div className="skeleton-grid" style={{ gridTemplateColumns: `repeat(${blocks}, minmax(0, 1fr))` }}>
        {Array.from({ length: blocks }, (_, i) => (
          <div key={i} className="skeleton-block shimmer" />
        ))}
      </div>
    </section>
  )
}
