/**
 * Export web-ready photography from photos-source/ into public/images/.
 *
 *   npm run photos
 *
 * photos-source/ holds multi-megabyte camera originals (and HEICs) and is
 * gitignored. This script is the only thing that should ever move an image
 * from there into the repo, so the mapping from "camera file nobody can
 * identify" to "named asset the site uses" lives here in one readable place.
 *
 * Adding a project later means adding one entry to EXPORTS and re-running.
 * Output is committed; photos-source/ is not.
 *
 * HEIC sources: reference the `-converted.jpg` sibling, not the .heic itself.
 * sharp's libheif rejects iPhone HDR HEICs ("references in iref box exceeds
 * the security limits"), so run `py scripts/convert-heic.py` first.
 */

import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "photos-source");
const OUT = path.join(ROOT, "public", "images");

/**
 * `position` controls which part survives the crop. Portrait rack shots and
 * ultra-wide room shots both lose a lot when squared off, so this matters.
 * See sharp's resize position options.
 */
const EXPORTS = [
  {
    src: "PXL_20231222_193946370.jpeg",
    out: "hero-cinema-theater.webp",
    width: 2400,
    height: 1350, // 16:9, matches the source; CSS crops it per breakpoint
    position: "centre",
    note: "Hero. Modern theater, blue LED cove lighting. Dec 2023, newest work.",
  },
  {
    src: "IMG_1142-converted.jpg",
    out: "project-residential-cinema.webp",
    width: 1600,
    height: 1067, // 3:2 - project cards render at roughly 1.5:1
    position: "centre",
    note: "Residential card. Roman-columned theater, red recliners, star ceiling.",
  },
  {
    src: "A3D15F9C-B36E-4E2D-B10B-E515BB27E759-converted.jpg",
    out: "project-commercial-av-rack.webp",
    width: 1600,
    height: 1067,
    position: "centre",
    note: "Commercial card. MXnet AV-over-IP rack with test monitors. Portrait source, centre-cropped.",
  },
  // No surveillance entry: there is no camera/NVR photo in the collection.
  // ProjectGrid renders a placeholder plate for any project without an image.
  // See PHOTO_MANIFEST.md.
];

if (!existsSync(SRC)) {
  console.error(`No photos-source/ at ${SRC}`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

let failed = 0;

for (const item of EXPORTS) {
  const from = path.join(SRC, item.src);
  const to = path.join(OUT, item.out);

  if (!existsSync(from)) {
    console.error(`  MISSING  ${item.src}`);
    failed += 1;
    continue;
  }

  try {
    const info = await sharp(from)
      .rotate() // honour EXIF orientation before cropping
      .resize(item.width, item.height, {
        fit: "cover",
        position: item.position,
      })
      .webp({ quality: 82 })
      .toFile(to);

    const kb = (info.size / 1024).toFixed(0);
    console.log(`  ${item.out}  ${info.width}x${info.height}  ${kb} KB`);
  } catch (err) {
    console.error(`  FAILED   ${item.src}: ${err.message}`);
    failed += 1;
  }
}

console.log(
  failed
    ? `\n${failed} export(s) failed.`
    : `\n${EXPORTS.length} image(s) written to public/images/`,
);
process.exit(failed ? 1 : 0);
