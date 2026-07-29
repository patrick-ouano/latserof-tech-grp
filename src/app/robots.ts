import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The quote handler only answers POST; there is nothing to index and
      // no reason to spend crawl budget discovering that.
      disallow: "/api/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
