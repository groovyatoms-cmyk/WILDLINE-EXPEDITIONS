import ExpeditionDetail from '@/components/sections/ExpeditionDetail.jsx'

// Slug comes from the URL: /expeditions/<slug>
export default function ExpeditionDetailPage() {
  return <div className="page"><ExpeditionDetail slug={location.pathname.split('/')[2]} /></div>
}
