/**
 * Recent installations.
 *
 * Modeled as data rather than hardcoded JSX because Thomas will add new
 * projects over time — adding one should mean adding an object here, not
 * editing a component.
 *
 * Assets are produced by `npm run photos` (see scripts/export-photos.mjs),
 * which is the only path from photos-source/ into the repo.
 */
export type Project = {
  /** Space Mono label above the title. Uppercase, no extra tracking. */
  category: string;
  title: string;
  /**
   * City. PROVISIONAL until Thomas confirms which job each room was —
   * see QUESTIONS-FOR-THOMAS.md. Set `locationConfirmed` once he has.
   */
  location: string;
  locationConfirmed?: boolean;
  /**
   * Path under public/. `null` means no photograph exists yet; the card
   * renders an honest placeholder plate rather than borrowing stock imagery.
   */
  image: string | null;
  /** Alt text. Describe the installation, not the file. */
  alt?: string;
  /** Set only once project detail pages are confirmed in scope. */
  slug?: string;
};

/**
 * Projects in the given categories, newest-listed first.
 *
 * Lets /residential and /commercial show their own work without either page
 * hardcoding a list that would drift the moment Thomas adds a job.
 */
export function projectsIn(
  categories: readonly string[],
  limit?: number,
): Project[] {
  const found = projects.filter((p) => categories.includes(p.category));
  return limit ? found.slice(0, limit) : found;
}

export const projects: Project[] = [
  {
    category: "RESIDENTIAL",
    title: "Great-room cinema & audio",
    location: "Windermere, FL",
    image: "/images/project-residential-cinema.webp",
    alt: "Private cinema room with tiered red leather recliners, columned walls and a painted star ceiling",
  },
  {
    category: "COMMERCIAL",
    title: "Boardroom AV & conferencing",
    location: "Orlando, FL",
    image: "/images/project-commercial-av-rack.webp",
    alt: "Rack-mounted AV-over-IP distribution system with dual reference monitors",
  },
  {
    // No surveillance photograph exists in the source collection — not one
    // camera, NVR or monitor across all 38 files. Rather than dress the card
    // in a vendor's stock photo, it renders a placeholder that says so.
    //
    // Kept THIRD deliberately: the homepage shows the first three, and the
    // approved handoff specifies those as RESIDENTIAL / COMMERCIAL /
    // SURVEILLANCE. Reordering this entry silently drops a card the client
    // signed off on — and hides the photo gap from the person who can fix it.
    category: "SURVEILLANCE",
    title: "16-camera retail system",
    location: "Kissimmee, FL",
    image: null,
    alt: "",
  },
  {
    category: "RESIDENTIAL",
    title: "Blue-LED cinema & wet bar",
    // "Central Florida" rather than a city: the three entries above take
    // their cities from the design handoff, but nobody has confirmed which
    // job each room actually was. Naming a city we cannot stand behind is
    // worse than naming the region we can. See QUESTIONS-FOR-THOMAS.md.
    location: "Central Florida",
    image: "/images/project-modern-theater.webp",
    alt: "Cinema room with charcoal walls, blue LED cove lighting, black quilted recliners with lit bases and a wet bar at the rear",
  },
  {
    category: "RESIDENTIAL",
    title: "Tiered theater, damask acoustics",
    location: "Central Florida",
    image: "/images/project-tiered-theater.webp",
    alt: "Stepped cinema room with red and gold damask acoustic panels, mahogany trim and black recliners",
  },
  {
    category: "RESIDENTIAL",
    title: "Gold-plaster cinema",
    location: "Central Florida",
    image: "/images/project-goldplaster-theater.webp",
    alt: "Cinema room with gold plaster walls, film-reel patterned carpet and tiered seating",
  },
  {
    category: "RESIDENTIAL",
    title: "Barrel-vault attic theater",
    location: "Central Florida",
    image: "/images/project-attic-theater.webp",
    alt: "Attic cinema room with a curved barrel-vaulted ceiling and tan leather recliners",
  },
  {
    category: "NETWORKING",
    title: "Rack build & structured cabling",
    location: "Central Florida",
    image: "/images/project-control4-rack.webp",
    alt: "Equipment rack with labelled Triad amplification and Control4 automation hardware",
  },
];
