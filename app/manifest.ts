import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TowingNo.1 | 24/7 Emergency Towing BC',
    short_name: 'TowingNo.1',
    description: 'Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#dc2626',
    // A-012: the existing square app icons (app/icon.png 128x128,
    // app/apple-icon.png 180x180) with their real sizes. /logo.png is 684x365
    // and was fetched at High priority through these entries.
    icons: [
      {
        src: '/icon.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
