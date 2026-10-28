/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Emits a minimal self-contained server (.next/standalone) so the Docker
  // image ships only what it needs instead of the whole node_modules folder.
  output: 'standalone',
};

export default nextConfig;
