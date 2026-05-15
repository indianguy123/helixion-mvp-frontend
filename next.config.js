/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/signin",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // We use process.env.BACKEND_URL here
        // But if it's missing, fallback to NEXT_PUBLIC_API_URL
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`
      }
    ];
  }
};

module.exports = nextConfig;