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
        source: "/dashboard/update-attendance",
        destination: "/dashboard/operations/attendance",
        permanent: true,
      },
      {
        source: "/dashboard/update-attendance/:id",
        destination: "/dashboard/operations/attendance/:id",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;