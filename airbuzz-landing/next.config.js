/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    autoPrerender: false,
  },
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    disableOptimizedLoading: true, // Disable some dev optimizations
  },
  images: {
    domains: ["www.airbuzzintl.com", "www.airbuzzexpress.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/Docs/Landing/**",
      },
      {
        protocol: "https",
        hostname: "www.airbuzzexpress.com",
        pathname: "/Docs/Landing/**",
      },
      {
        protocol: "https",
        hostname: "www.airbuzzintl.com",
        pathname: "/Docs/Landing/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

module.exports = nextConfig;
