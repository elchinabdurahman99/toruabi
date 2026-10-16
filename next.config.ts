import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://cdn.sanity.io https://torudeabi24.ee https://www.torudeabi24.ee https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://www.google.az https://ad.doubleclick.net https://googleads.g.doubleclick.net https://www.facebook.com",
  "media-src 'self'",
  "connect-src 'self' https://cdn.sanity.io https://xbk57s09.api.sanity.io https://xbk57s09.apicdn.sanity.io https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://ad.doubleclick.net https://www.google.com",
  "frame-src https://www.googletagmanager.com https://td.doubleclick.net https://bid.g.doubleclick.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  output: "standalone",

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.torudeabi24.ee" }],
        destination: "https://torudeabi24.ee/:path*",
        permanent: true,
      },
      // Legacy WordPress / old URL redirects → current Sanity slugs
      { source: "/home-русский",                           destination: "/ru",                                             permanent: true },
      { source: "/home-russian",                           destination: "/ru",                                             permanent: true },
      { source: "/dizayn",                                 destination: "/et/teenused/sisekujundus",                       permanent: true },
      { source: "/disain",                                 destination: "/et/teenused/sisekujundus",                       permanent: true },
      { source: "/soodustus",                              destination: "/et/hinnakiri",                                   permanent: true },
      { source: "/blog",                                   destination: "/et/blogi",                                       permanent: true },
      { source: "/korteri-ja-kontoriruumide-remont",       destination: "/et/teenused/korterite-remont",                   permanent: true },
      { source: "/dlya-kvartirnykh-tovarishchestv",        destination: "/ru",                                             permanent: true },
      { source: "/for-apartment-associations",             destination: "/en/services",                                    permanent: true },
      { source: "/vannitoa-remont",                        destination: "/et/teenused/vannitoa-remont",                    permanent: true },
      { source: "/ehitustood",                             destination: "/et/teenused/ehitusprojektid",                    permanent: true },
      { source: "/elektritood",                            destination: "/et/teenused/elektriabi-24h",                     permanent: true },
      { source: "/gaasitood",                              destination: "/et/teenused/gaasitood",                          permanent: true },
      { source: "/pipe-installation-tallinn",              destination: "/en/services/pipe-works",                         permanent: true },
      { source: "/santehnik-tallinnas",                    destination: "/et/teenused/toruabi-24h",                        permanent: true },
      { source: "/avariitood",                             destination: "/et/teenused/toruabi-24h",                        permanent: true },
      { source: "/sewerage-video-inspection",              destination: "/en/services/pipe-cctv-inspection",               permanent: true },
      { source: "/boiler-installation",                    destination: "/en/services/gas-appliance-installation",         permanent: true },
      { source: "/construction-works",                     destination: "/en/services/construction-projects",              permanent: true },
      { source: "/repair-of-apartments-and-offices",       destination: "/en/services/apartment-renovation",               permanent: true },
      { source: "/plumbing-works-in-tallinn",              destination: "/en/services/pipe-works",                         permanent: true },
    ];
  },

  async headers() {
    return [
      // Security + CSP on all routes
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",         value: "DENY" },
          { key: "X-XSS-Protection",        value: "1; mode=block" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=(self)" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
      // ISR / CDN caching for HTML pages — revalidate every hour, serve stale up to 24h
      {
        source: "/(et|en|ru)(.*)",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      // Immutable static assets
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Public images, fonts, etc.
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|otf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  images: {
    // Production: Apache reverse proxy blocks /_next/image — rely on Sanity CDN WebP
    unoptimized: process.env.NODE_ENV === "production",
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "**.sanity.io", pathname: "/**" },
      { protocol: "https", hostname: "**.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "torudeabi24.ee", pathname: "/**" },
      { protocol: "https", hostname: "www.torudeabi24.ee", pathname: "/**" },
    ],
  },

  transpilePackages: [],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  htmlLimitedBots: /Twitterbot/,
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@sanity/client",
      "next-intl",
    ],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(withNextIntl(nextConfig));
