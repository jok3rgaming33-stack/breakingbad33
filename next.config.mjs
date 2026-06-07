/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],     // Permet d'utiliser quality={85} sans warning
  },
}

export default nextConfig