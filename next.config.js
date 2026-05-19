/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/signin",
        permanent: false,
      },
      {
        source: "/dashboard/operations/attendance",
        destination: "/dashboard/update-attendance",
        permanent: true,
      },
      {
        source: "/dashboard/operations/attendance/:id",
        destination: "/dashboard/update-attendance/:id",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;