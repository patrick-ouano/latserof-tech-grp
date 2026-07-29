/**
 * Recent installations.
 *
 * Modeled as data rather than hardcoded JSX because Thomas will add new
 * installs over time — adding a project should mean adding an object here,
 * not editing a component.
 *
 * NOTE: the `image` paths below point at files that do not exist yet.
 * All project photography is still to be selected and exported — see
 * PHOTO_MANIFEST.md, which lists the 19 source originals and flags which
 * are high-res enough for card use. Export to WebP/AVIF at ~800px wide and
 * drop into public/images/ before the homepage ships.
 */
export type Project = {
  /** Space Mono label above the title. Uppercase, no extra tracking. */
  category: string;
  title: string;
  location: string;
  /** Path under public/. */
  image: string;
  /** Set only once project detail pages are confirmed in scope. */
  slug?: string;
};

export const projects: Project[] = [
  {
    category: "RESIDENTIAL",
    title: "Great-room cinema & audio",
    location: "Windermere, FL",
    image: "/images/project-residential-windermere.webp",
  },
  {
    category: "COMMERCIAL",
    title: "Boardroom AV & conferencing",
    location: "Orlando, FL",
    image: "/images/project-commercial-orlando.webp",
  },
  {
    category: "SURVEILLANCE",
    title: "16-camera retail system",
    location: "Kissimmee, FL",
    image: "/images/project-surveillance-kissimmee.webp",
  },
];
