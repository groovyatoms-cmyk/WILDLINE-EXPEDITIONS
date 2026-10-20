// Placeholder for a section that is still loading: the real section's heading and block heights, shimmering, so the page below does not jump.
export default function SectionSkeleton({ id, height, blocks = 3 }: { id: string; height: number; blocks?: number }) {
  return (
    <section id={id} className="section section-skeleton" style={{ minHeight: height }} aria-busy="true" aria-label="Loading">
      <div className="skeleton-head shimmer" />
      <div className="skeleton-grid" style={{ gridTemplateColumns: `repeat(${blocks}, minmax(0, 1fr))` }}>
        {Array.from({ length: blocks }, (_, i) => (
          <div key={i} className="skeleton-block shimmer" />
        ))}
      </div>
    </section>
  )
}
