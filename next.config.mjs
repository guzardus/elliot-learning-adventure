/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'dist',
  basePath: '/elliot-learning-adventure',
  assetPrefix: '/elliot-learning-adventure/',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
