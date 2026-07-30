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
   * Confirmed by Thomas 2026-07-29: LLC (an earlier note saying Inc. was wrong).
   */
  legalName: "Latserof Technologies Grp LLC",
  /** Display brand — use in nav, titles, and body copy. */
  brand: "Latserof Technologies",

  /** Brand tagline — hero H1 and metadata. Confirmed by Thomas 2026-07-29. */
  tagline: "Making Your Home Safer and Smarter",

  /**
   * Deploy target. Domain is on GoDaddy; confirm the final hostname before
   * launch and update here + in Vercel.
   */
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

  /** Display string for humans. Prefer this over inventing a shorter region. */
  serviceArea: "Greater Orlando, Central Florida and Tampa",

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
    // Outdoor camera install — added with the 2026-07-29 photo delivery.
    image: "/images/system-cameras.webp",
    imageAlt:
      "Four outdoor bullet cameras on a single property-entrance pole, aimed to cover every approach",
    residential: "Cameras and door access you can check from anywhere, recorded locally rather than rented back to you.",
    commercial: "Entry control and surveillance for schools, restaurants, businesses and premises with staff, stock or restricted areas.",
  },
] as const;

export type Discipline = (typeof disciplines)[number];

/**
 * Dealer / partner lines.
 *
 * Thomas is an industry partner with 21st Century Distribution and SnapAV —
 * the names below are lines commonly specified from those catalogs (plus
 * Crestron). Rendered as type, never as logo files: manufacturer marks are
 * their trademarks, and marketing-rights questions stay out of the markup.
 *
 * Distributor names themselves live in `distributors` and can be cited in
 * copy without implying a logo license.
 */
export const brands = [
  "Control4",
  "Crestron",
  "Lutron",
  "Episode",
  "Binary",
  "ClareVision",
  "Araknis",
  "WattBox",
] as const;

/** Distribution partners confirmed by Thomas 2026-07-29. */
export const distributors = [
  { name: "21st Century Distribution", href: "https://21stcenturydist.com/" },
  { name: "SnapAV", href: "https://www.snapav.com/shop/en/snapav/home" },
] as const;

/**
 * How a job runs, start to finish. DRAFT — derived from approved copy
 * ("Walkthroughs are free anywhere in Central Florida"; "designed, wired and
 * supported by the same crew that installed it") rather than invented.
 */
export const process = [
  {
    number: "01",
    title: "Survey",
    body: `We come and look at the rooms. Free across ${site.serviceArea}, whether it is new construction, a renovation or a system that needs rescuing.`,
  },
  {
    number: "02",
    title: "Design",
    body: "Layout, equipment and cabling specified for the actual room — not a package picked off a shelf and made to fit. Full design services are available upon request.",
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
 * The full delivery sequence, as a job actually runs.
 *
 * The step *names* are the client's own (supplied 2026-07-30); the one-line
 * bodies are DRAFT, written from approved copy and facts already in this
 * file — dealer purchasing through `distributors`, "the same crew that
 * installed it", "service calls by appointment".
 *
 * This is the long form, and it does not replace `process` above. That one
 * is the four-beat public summary and stays on /residential and /commercial,
 * where a visitor wants reassurance rather than a project plan. Only /about
 * has room for ten steps.
 */
export const deliveryProcess = [
  {
    number: "01",
    title: "Project consultation",
    body: "We come and listen: what the rooms are for, who uses them, and what has to work on the first day.",
  },
  {
    number: "02",
    title: "Needs analysis",
    body: "What the system has to do, room by room, settled before any hardware is named.",
  },
  {
    number: "03",
    title: "Solution development",
    body: "Layout, equipment and cabling specified for the actual room. Full design services available upon request.",
  },
  {
    number: "04",
    title: "Purchasing",
    body: "Ordered as dealer lines through our distribution partners, not bought off a shelf and made to fit.",
  },
  {
    number: "05",
    title: "Staging",
    body: "Racks built, addressed and configured on the bench, so what arrives on site is already a working system.",
  },
  {
    number: "06",
    title: "Installation & integration",
    body: "Wired, mounted, racked and labelled by the same crew that designed it.",
  },
  {
    number: "07",
    title: "Commissioning",
    body: "Calibrated and tested as one system — not a shelf of parts that happen to be plugged into each other.",
  },
  {
    number: "08",
    title: "Training",
    body: "Handed over in person, to everyone who uses it, until nobody is guessing which button does what.",
  },
  {
    number: "09",
    title: "Support",
    body: "Service afterwards from the people who installed it. Service calls by appointment.",
  },
  {
    number: "10",
    title: "Continuous enhancement",
    body: "Systems grow. Rooms, sources and features get added to what is already there instead of starting over.",
  },
] as const;

/**
 * Company narrative — the client's own marketing copy, supplied 2026-07-30.
 *
 * Lightly normalised so it cannot contradict facts stated elsewhere in this
 * file. Three changes, all worth knowing about:
 *   - "LTG Technologies" and "Latserof Technologies Group" both appeared in
 *     the source copy; both render as `site.brand`.
 *   - The city list (Orange County, Tampa, Stuart) is replaced by
 *     `site.serviceArea`. Stuart is on the Treasure Coast, well outside the
 *     stated area, and an SEO city run is not what this page is for.
 *   - "principals and founders each have over 35 years" is kept plural as
 *     written, and the "over 30 years" in the third block is kept too. Only
 *     Thomas is named anywhere on this site, so if there is no second
 *     principal — or if the two spans should agree — that is his correction
 *     to make, not ours to guess at.
 */
export const story = [
  {
    label: "WHAT WE DO",
    paragraphs: [
      `${site.brand} is a full-service smart home automation and commercial custom electronics design and integration company serving ${site.serviceArea}. Our total home control solutions make your property safe, elegant, fun and easy to use.`,
      "Businesses get increased productivity, a better environment for employees and customers, and control simple enough that nobody needs a manual. Our team is made up of world-class experts in every field, whose first priority is the best products and service for our clients.",
    ],
  },
  {
    label: "OUR EXPERIENCE",
    paragraphs: [
      "A great company is made up of great people — people who approach each day with energy, integrity and an unwavering commitment to excellence. Our principals and founders each have over 35 years of experience designing and installing advanced home entertainment systems, and are committed to instilling those values in every member of the team.",
      "From lighting, AV and shade control, to a home surveillance system, to total home control and everything in between, we have you covered. Whether it is a small theater or a complete home automation project, you can be sure of outstanding personal and professional service.",
    ],
  },
  {
    label: "A PASSIONATE APPROACH",
    paragraphs: [
      "We do what we truly love to do. Every project is approached with unwavering passion and an intense sense of integrity for doing things right, so the finished system exceeds expectations rather than merely meeting a spec.",
      "Our team can transform a home or an office space into a musical and visual world. It is how we have done business for over 30 years, and it is why our clients trust us to do things right — and we are not about to let them down.",
    ],
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
 * Where every call-to-action resolves. All primary CTAs use CTA_LABEL and
 * point here — survey / walkthrough request, not a priced quote.
 */
export const CTA_HREF = "/contact";

/** Primary CTA label site-wide. Confirmed by Thomas 2026-07-29. */
export const CTA_LABEL = "Request for Survey";
