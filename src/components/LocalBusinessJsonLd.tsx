import { site } from "@/lib/site";

/**
 * LocalBusiness structured data.
 *
 * This matters more than usual here: the company currently has no website,
 * no Google Business Profile and no directory listings, so this is the first
 * machine-readable description of the business that will exist anywhere.
 *
 * Everything is read from site.ts — never retype a business fact.
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.brand,
    legalName: site.legalName,
    description: site.descriptor,
    url: site.url,
    // E.164, derived from the tel: href rather than the display string.
    // Search engines want a dialable number with a country code; "(407)
    // 927-4434" is for humans.
    telephone: site.phoneHref.replace("tel:", ""),
    // Was /logo-badge.png, which 404s — the badge ships as WebP. Structured
    // data pointing at a missing image is worse than omitting it.
    logo: `${site.url}/logo-badge.webp`,
    image: `${site.url}/images/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    areaServed: {
      "@type": "GeoCircle",
      description: `${site.serviceArea} / greater Orlando`,
      geoMidpoint: {
        "@type": "GeoCoordinates",
        // Kissimmee, FL — approximate, from the business address.
        latitude: 28.2919,
        longitude: -81.4076,
      },
      geoRadius: "80000",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    knowsAbout: [
      "Home theater design and installation",
      "Whole-house audio",
      "Lighting control and automation",
      "Structured cabling and networking",
      "Surveillance and access control",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is static and author-controlled; no user input reaches it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
