import type { MetadataRoute } from "next";

import { CTA_HREF, navLinks, site } from "@/lib/site";

/**
 * Derived from the nav rather than hand-listed, so a new page cannot be
 * added to the site and silently left out of the sitemap.
 *
 * This matters more here than it normally would: the company has no
 * existing web presence at all — no site, no Google Business Profile, no
 * directory listings (see PHOTO_MANIFEST.md). There is no established
 * crawl path into any of these pages except the one we hand over.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${site.url}/`, priority: 1, changeFrequency: "monthly" as const },
    // The quote form is the site's single conversion point.
    { url: `${site.url}${CTA_HREF}`, priority: 0.9, changeFrequency: "yearly" as const },
    ...navLinks.map((link) => ({
      url: `${site.url}${link.href}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ].map((entry) => ({ ...entry, lastModified }));
}
