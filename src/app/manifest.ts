import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WILDLINE EXPEDITIONS',
    short_name: 'WILDLINE',
    description: 'Guided 4x4 convoy expeditions through Ladakh, Spiti and the Thar Desert.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0D10',
    theme_color: '#0B0D10',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
