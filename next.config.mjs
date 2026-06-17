/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    // Tree-shake large icon libraries so only used icons ship to the client.
    optimizePackageImports: ['react-icons', 'lucide-react'],
  },
}

export default nextConfig
