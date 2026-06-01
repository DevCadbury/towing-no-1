/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  skipTrailingSlashRedirect: false,
  async redirects() {
    return [
      // Redirect non-www to www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'towingno1.com',
          },
        ],
        destination: 'https://www.towingno1.com/:path*',
        permanent: true,
      },
      // Redirect old domain variants
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'towing-no-1.com',
          },
        ],
        destination: 'https://www.towingno1.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.towing-no-1.com',
          },
        ],
        destination: 'https://www.towingno1.com/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
