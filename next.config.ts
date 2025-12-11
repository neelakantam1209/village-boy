// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  
  // ------------------------------------------------------------------------
  // 💡 FIX FOR EXTERNAL LIBRARY COMPATIBILITY (RECHARTS)
  // This forces Next.js to correctly transpile the library's source code.
  transpilePackages: ['recharts'],
  // ------------------------------------------------------------------------
  
  typescript: {
    // Note: It is highly recommended to fix build errors rather than ignoring them.
    // However, if you ignore them here, the build may pass but the error may still exist.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;