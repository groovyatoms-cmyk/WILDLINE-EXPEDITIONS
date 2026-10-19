import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Frame files never change under the same name between releases, so let browsers and the CDN keep them for a day
  // (the film re-fetches frames as the playhead moves, and revalidating each one would double the requests).
  async headers() {
    return [{ source: '/frames/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }] }]
  },
}

export default nextConfig
