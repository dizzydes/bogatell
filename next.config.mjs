/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'assets.ctfassets.net' },
      { protocol: 'https', hostname: 'downloads.ctfassets.net' },
    ],
  },
  typedRoutes: true,
  eslint: {
    // Prevent ESLint errors from failing production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;