import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * Declared here rather than in vercel.json so they also apply to
 * `next start` and to the Playwright suite — a header that only exists in
 * production is a header nobody ever tests.
 *
 * Deliberately no Content-Security-Policy yet. layout.tsx ships one inline
 * script (the capability detection that has to run before first paint), so
 * a useful CSP needs a per-request nonce, which in turn means the pages
 * stop being statically prerendered. That is a real trade against a site
 * whose entire deployment model is static generation, and not one to make
 * silently.
 */
const securityHeaders = [
  // Stop the browser second-guessing declared content types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Full URL same-origin, only the origin cross-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No framing: there is no legitimate reason to embed a contractor's quote
  // form in someone else's page.
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
