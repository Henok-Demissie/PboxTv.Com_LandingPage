/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Avoid build failing due to ESLint CLI flag incompatibilities (Next 14 + ESLint 9)
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
