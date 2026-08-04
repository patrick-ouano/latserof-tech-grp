/**
 * Manufacturer demos for lines Latserof specifies.
 *
 * These are vendor videos, not Latserof install footage — same rule as the
 * vendor stills in photos-source/: never present them as project work.
 * Rendered under /systems#control only. Swap in Thomas's own walkthroughs
 * on /work when that folder lands.
 */
export type LineDemo = {
  /** YouTube video id (the `v=` query value). */
  youtubeId: string;
  /** Brand or product line named in the caption. */
  brand: string;
  /** Short title under the embed. */
  title: string;
};

export const controlLineDemos: readonly LineDemo[] = [
  {
    youtubeId: "Xh1Ppxn2jk0",
    brand: "Lutron",
    title: "Wood blinds with natural light optimization",
  },
  {
    youtubeId: "Y6bJ9bNdzcE",
    brand: "Lumaris",
    title: "Tape light accent lighting",
  },
];
