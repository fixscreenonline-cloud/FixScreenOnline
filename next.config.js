/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the X-Powered-By header (security + tiny perf gain)
  poweredByHeader: false,

  // Enable gzip/brotli compression
  compress: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      // Allow external profile/avatar images used in testimonials
      { protocol: "https", hostname: "i.ibb.co" },
    ],
  },

  // Security + caching headers on every route
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Aggressive cache for static assets
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache public images for 30 days
      {
        source: "/(.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

