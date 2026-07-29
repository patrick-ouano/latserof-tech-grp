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
/**
 * `title` and `body` are approved homepage copy — do not paraphrase them.
 *
 * `includes`, `residential` and `commercial` are DRAFT, written for the
 * pages the handoff never covered. Every line is derived from the approved
 * body copy above it or from a business fact in this file — nothing here
 * claims a capability the client has not already stated. Logged in
 * QUESTIONS-FOR-THOMAS.md for his review.
 */
export const disciplines = [
  {
    number: "01",
    slug: "cinema",
    title: "Cinema & media rooms",
    body: "Screen and seating layout, acoustic treatment, calibrated projection and surround — built to the room, not to a box on a shelf.",
    includes: [
      "Screen and seating layout",
      "Acoustic treatment",
      "Calibrated projection",
      "Surround sound",
      "Media and great rooms",
    ],
    image: "/images/system-cinema.webp",
    imageAlt:
      "Cinema room with dark wood panelling, striped drapes, wall sconces and a projection screen",
    residential: "A dedicated cinema, or a great room that has to work for a film on Friday and the game on Sunday.",
    commercial: "Screening and presentation rooms where the picture and the seating have to be laid out together.",
  },
  {
    number: "02",
    slug: "control",
    title: "Control & lighting",
    body: "One app and one keypad standard through the house — scenes, shades, climate and music that behave the same in every room.",
    includes: [
      "One app, one keypad standard",
      "Lighting scenes",
      "Motorised shades",
      "Climate",
      "Multi-room music",
    ],
    image: "/images/system-control.webp",
    imageAlt:
      "Media room lit by blue LED cove lighting above acoustic wall panels and tiered seating",
    residential: "One standard through the house, so nobody has to remember which room works differently.",
    commercial: "Room-by-room control for meeting spaces, so the people using them do not need training.",
  },
  {
    number: "03",
    slug: "networks",
    title: "Networks that hold",
    body: "Structured cabling, managed switching and wireless coverage surveyed room by room — the layer everything else depends on.",
    includes: [
      "Structured cabling",
      "Managed switching",
      "Wireless surveyed room by room",
      "Equipment racks",
    ],
    image: "/images/system-networks.webp",
    imageAlt:
      "Patch panel terminated with colour-coded green and red network cabling",
    residential: "The layer everything else depends on — and the one thing worth doing properly before the walls close.",
    commercial: "Cabling, switching and coverage specified for the building rather than assumed from a floor plan.",
  },
  {
    number: "04",
    slug: "cameras",
    title: "Cameras & access",
    body: "Surveillance, intercom and door access with local recording — reviewed and serviced by us, monitored from anywhere by you.",
    includes: [
      "Surveillance cameras",
      "Intercom",
      "Door access",
      "Local recording",
      "Remote viewing",
    ],
    // No photograph: there is not one camera, NVR or monitor across all 38
    // source frames. /systems renders an honest note here rather than a
    // vendor's stock render. See PHOTO_MANIFEST.md.
    image: null,
    imageAlt: "",
    residential: "Cameras and door access you can check from anywhere, recorded locally rather than rented back to you.",
    commercial: "Entry control and surveillance for premises with staff, stock or restricted areas.",
  },
] as const;

export type Discipline = (typeof disciplines)[number];

/**
 * Dealer lines, per CLAUDE.md's business facts.
 *
 * Rendered as type, never as logo files: dealer marketing rights for the
 * vendor assets in photos-source/ are still an open question with Thomas
 * (see PHOTO_MANIFEST.md), and setting the names in Archivo sidesteps it
 * without misrepresenting anything.
 */
export const brands = ["Crestron", "Control4", "Lutron"] as const;

/**
 * How a job runs, start to finish. DRAFT — derived from approved copy
 * ("Walkthroughs are free anywhere in Central Florida"; "designed, wired and
 * supported by the same crew that installed it") rather than invented.
 */
export const process = [
  {
    number: "01",
    title: "Walkthrough",
    body: "We come and look at the rooms. Free anywhere in Central Florida, whether it is new construction, a renovation or a system that needs rescuing.",
  },
  {
    number: "02",
    title: "Design",
    body: "Layout, equipment and cabling specified for the actual room — not a package picked off a shelf and made to fit.",
  },
  {
    number: "03",
    title: "Install",
    body: "Wired, mounted, racked and labelled by the same crew that designed it.",
  },
  {
    number: "04",
    title: "Service",
    body: "Support afterwards from the people who installed it, so nobody is reading your system back to you off a ticket. Service calls by appointment.",
  },
] as const;

/**
 * Complementary offerings delivered with a partner rather than in-house.
 *
 * Kept separate from `disciplines` deliberately: the homepage copy commits
 * to "Four disciplines, one contractor", and quietly making it five would
 * contradict a headline the client signed off on.
 */
export const partners = {
  visualPrivacy: {
    name: "Corio Design",
    href: "https://www.coriodesign.com/visualprivacy",
    title: "Visual privacy for glass offices",
    body: "Cloaking glass that keeps screens unreadable from outside the room, and switchable film that turns a wall from clear to opaque on a switch. Built for boardrooms, medical suites and any office where the glass is the security problem.",
    linkLabel: "See visual privacy solutions",
  },
} as const;

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
