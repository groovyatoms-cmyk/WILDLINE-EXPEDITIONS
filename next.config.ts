import type { NextConfig } from 'next'

// Headers for every page. No CSP yet: Next's inline scripts need nonces first (shortcut: add a nonce-based CSP before taking payments).
const SECURITY = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Frame files never change under the same name between releases, so let browsers and the CDN keep them for a day
  // (the film re-fetches frames as the playhead moves, and revalidating each one would double the requests).
  async headers() {
    return [
      { source: '/:path*', headers: SECURITY },
      { source: '/frames/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }] },
    ]
  },
}

export default nextConfig
