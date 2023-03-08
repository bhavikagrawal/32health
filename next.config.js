/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.dicebear.com",
        port: "",
        pathname: "/v2/avataaars/**",
      },
    ],
  },
};

module.exports = nextConfig;
