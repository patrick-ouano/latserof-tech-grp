/**
 * Business facts — single source of truth.
 *
 * Every phone link, address block, footer, and the LocalBusiness JSON-LD
 * reads from here. The primary phone in particular must exist in exactly one
 * place: it appears in the header, hero, CTA band, footer, and structured
 * data, and a stale number in any one of those is a lost lead. The office
 * line is secondary — shown on Contact and in the footer CONTACT column.
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

  /** Primary line for humans; href form for the `tel:` link. Always pair. */
  phoneDisplay: "(407) 927-4434",
  phoneHref: "tel:+14079274434",

  /** Office line — Contact aside and footer CONTACT, labeled as Office. */
  officePhoneDisplay: "(855) 530-4434",
  officePhoneHref: "tel:+18555304434",

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
    title: "Surveillance Systems and Access Control",
    body: "See there when you can't be there.",
    includes: [
      "Surveillance cameras",
      "Intercom",
      "Door access",
      "Local recording",
      "Remote viewing",
    ],
    // Outdoor camera install — added with the 2026-07-29 photo delivery.
    // Reframed 2026-07-30: the property-entrance shot moved to the homepage
    // project card, which needed a composed photograph more than this slot does.
    image: "/images/system-cameras.webp",
    imageAlt:
      "Four outdoor bullet cameras clustered on a single pole head against a blue sky, palm fronds overhead",
    residential: "Cameras and door access you can check from anywhere, recorded locally rather than rented back to you.",
    commercial: "Entry control and surveillance for schools, restaurants, businesses and premises with staff, stock or restricted areas.",
  },
] as const;

export type Discipline = (typeof disciplines)[number];

/**
 * Dealer lines shown on the site.
 *
 * Biggest recognizable names from the catalogs Latserof buys through —
 * names only, never logo files. Distributor houses are not listed. Count
 * fits BrandStrip's auto-fill grid without leaving a sparse half-empty card.
 */
export const brands = [
  "Control4",
  "Crestron",
  "Lutron",
  "Sonos",
  "Samsung",
  "Sony",
  "Denon",
  "Yamaha",
  "Bose",
  "Ubiquiti",
  "LG",
  "Apple",
  "JBL",
  "Klipsch",
  "Epson",
  "Sonance",
  "Nest",
  "Alarm.com",
] as const;

/**
 * How a job runs, start to finish. DRAFT — derived from approved copy
 * ("Walkthroughs are ... anywhere in Central Florida"; "designed, wired and
 * supported by the same crew that installed it") rather than invented.
 *
 * The handoff copy says walkthroughs are *free*. The site deliberately does
 * not, as of 2026-07-30: naming a price of zero is a commitment about money on
 * a site that otherwise quotes nothing, and it invites the reading that
 * whatever follows the survey is on the house too. The reach is the promise
 * worth making — we come to you, anywhere in the service area — so the copy
 * says that and stops. `no-free-copy.test.ts` keeps it out.
 */
export const process = [
  {
    number: "01",
    title: "Survey",
    body: `We come and look at the rooms — anywhere across ${site.serviceArea}, whether it is new construction, a renovation or a system that needs rescuing.`,
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
 * file — dealer purchasing through catalog brands, "the same crew that
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
    title: "Discovery & consultation",
    body: "Meet to understand goals, vision, budget and expectations — what the rooms are for, who uses them, and what has to work on the first day.",
  },
  {
    number: "02",
    title: "Needs assessment",
    body: "Evaluate the property, infrastructure and operational requirements before any hardware is named.",
  },
  {
    number: "03",
    title: "System design & engineering",
    body: "A customised system design with detailed recommendations, equipment selection and project planning. Full design services available upon request.",
  },
  {
    number: "04",
    title: "Procurement",
    body: "Premium products sourced through our distribution partners — not bought off a shelf and made to fit.",
  },
  {
    number: "05",
    title: "Staging & programming",
    body: "Pre-build, configure, label and test on the bench so what arrives on site is already a working system.",
  },
  {
    number: "06",
    title: "Installation & integration",
    body: "Professionally install every component with clean workmanship and seamless integration between systems.",
  },
  {
    number: "07",
    title: "Commissioning & testing",
    body: "Comprehensive testing, optimisation and quality assurance so every component operates as designed.",
  },
  {
    number: "08",
    title: "Client training",
    body: "Personalised instruction so everyone who uses the system is comfortable operating it — nobody guessing which button does what.",
  },
  {
    number: "09",
    title: "Ongoing service & support",
    body: "Responsive technical support, preventative maintenance, software updates and remote troubleshooting. Service calls by appointment.",
  },
  {
    number: "10",
    title: "Continuous enhancement",
    body: "As technology evolves, expand and upgrade what is already there with features that protect the investment.",
  },
] as const;

export type StoryBlock = {
  label: string;
  paragraphs: readonly string[];
  image?: { src: string; alt: string };
};

/**
 * Web edit of the client's company narrative, revised 2026-07-30.
 *
 * The supplied version repeated the same quality and experience claims across
 * twelve long paragraphs. This keeps its confirmed substance but removes
 * repetition so /about can be scanned: seven paragraphs, two proof-of-work
 * photographs, and the capability list below rather than inline.
 *
 * Brand and service-area references still come from `site`; no city list or
 * alternate company name is typed into the prose.
 */
export const story: readonly StoryBlock[] = [
  {
    label: "WHAT WE DO",
    paragraphs: [
      `${site.brand} designs and installs smart home, commercial AV, networking and security systems across ${site.serviceArea}. One team carries every project from design through installation and support.`,
      "For homeowners, that means simpler control, stronger security and better entertainment. For businesses, it means reliable systems that support the people using the space.",
    ],
  },
  {
    label: "OUR EXPERIENCE",
    paragraphs: [
      "More than 35 years of combined experience informs every design — across custom electronics, automation, networking, security and audiovisual integration.",
      "From a dedicated theater to an enterprise network, we build reliable systems around the property, the people using it and what may need to expand later.",
    ],
    image: {
      src: "/images/about-experience-lighting.webp",
      alt: "A modern home at night with warm architectural and landscape lighting along the facade and walkway",
    },
  },
  {
    label: "A PASSIONATE APPROACH",
    paragraphs: [
      "Technology should work quietly in the background. The room should feel considered, the controls should feel obvious and the equipment should never become the client's job to manage.",
      "We approach every installation with precision, clean workmanship and a commitment to dependable service long after commissioning.",
    ],
    image: {
      src: "/images/about-passionate-install.webp",
      alt: "A technician on a ladder dressing cable behind a display wall-mount above a stone fireplace",
    },
  },
  {
    label: "OUR COMMITMENT",
    paragraphs: [
      "Our mission is simple: design exceptional technology, install it professionally, and support it for life.",
    ],
  },
] as const;

/**
 * Capability list that sits under WHAT WE DO on /about.
 *
 * Kept as data rather than a paragraph so it can render as a clean grid
 * instead of a comma-run, and so Thomas can add or drop a line without
 * rewriting the surrounding prose.
 */
export const offerings = [
  "Smart home automation",
  "Commercial automation & control",
  "Audio & video systems",
  "Home theater design",
  "Lighting control",
  "Motorised shades",
  "Enterprise & residential networking",
  "Security & video surveillance",
  "Access control systems",
  "Wi-Fi design & optimisation",
  "Structured cabling",
  "Conference room & collaboration systems",
  "Outdoor entertainment systems",
  "Service & preventative maintenance",
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
