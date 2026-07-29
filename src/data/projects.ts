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
    category: "SURVEILLANCE",
    title: "16-camera retail system",
    location: "Kissimmee, FL",
    image: null,
    alt: "",
  },
];
