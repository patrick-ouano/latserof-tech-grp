/**
 * Business facts — single source of truth.
 *
 * Every phone link, address block, footer, and the LocalBusiness JSON-LD
 * reads from here. The phone number in particular must exist in exactly one
 * place: it appears in the header, hero, CTA band, footer, and structured
 * data, and a stale number in any one of those is a lost lead.
 *
 * These values are fixed by the client. Do not invent alternatives.
 */
export const site = {
  /**
   * Legal entity name — use in the footer lockup and legal line.
   * Confirmed by Thomas 2026-07-29. Note this supersedes "Latserof Tech Grp
   * LLC", which appears in the design handoff's footer copy and is wrong:
   * the entity is an Inc., not an LLC.
   */
  legalName: "Latserof Technologies Grp Inc.",
  /** Display brand — use in nav, titles, and body copy. */
  brand: "Latserof Technologies",

  /** Deploy target. Update once the production domain is confirmed. */
  url: "https://latseroftech.com",

  owner: {
    name: "Thomas John Forestal",
    title: "Owner / Operations Manager, Custom Design & Engineering",
  },

  /** Display form for humans; href form for the `tel:` link. Always pair. */
  phoneDisplay: "(407) 927-4434",
  phoneHref: "tel:+14079274434",

  address: {
    street: "3050 Dyer Blvd, Suite 242",
    city: "Kissimmee",
    state: "FL",
    zip: "34741",
    country: "US",
  },

  hours: {
    display: "Mon–Fri 8:00–5:00",
    note: "Service calls by appointment",
  },

  serviceArea: "Central Florida",

  descriptor: "Low-voltage system design, installation and service.",
} as const;

/**
 * The four disciplines, in the order the homepage lists them. The `number`
 * is displayed in Space Mono and is part of the design, not an index —
 * keep it on the data so it can never drift from the order.
 */
export const disciplines = [
  {
    number: "01",
    slug: "cinema",
    title: "Cinema & media rooms",
    body: "Screen and seating layout, acoustic treatment, calibrated projection and surround — built to the room, not to a box on a shelf.",
  },
  {
    number: "02",
    slug: "control",
    title: "Control & lighting",
    body: "One app and one keypad standard through the house — scenes, shades, climate and music that behave the same in every room.",
  },
  {
    number: "03",
    slug: "networks",
    title: "Networks that hold",
    body: "Structured cabling, managed switching and wireless coverage surveyed room by room — the layer everything else depends on.",
  },
  {
    number: "04",
    slug: "cameras",
    title: "Cameras & access",
    body: "Surveillance, intercom and door access with local recording — reviewed and serviced by us, monitored from anywhere by you.",
  },
] as const;

/** Header nav, in order. Matches the handoff header spec. */
export const navLinks = [
  { href: "/residential", label: "Residential" },
  { href: "/commercial", label: "Commercial" },
  { href: "/systems", label: "Systems" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
] as const;

/**
 * Where every call-to-action resolves. "Book a walkthrough", "Get a system
 * quote", and the CTA-band button all point at the same destination.
 */
export const CTA_HREF = "/contact";
