/**
 * Export web-ready assets into public/. Photography and the brand mark.
 *
 *   npm run assets
 *
 * photos-source/ holds multi-megabyte camera originals (and HEICs) and is
 * gitignored. This script is the only thing that should move an image from
 * there into the repo, so the mapping from "camera file nobody can identify"
 * to "named asset the site uses" lives here in one readable place.
 *
 * Adding a project later means adding one entry to PHOTOS and re-running.
 * Output is committed; the sources are not.
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
const PUBLIC = path.join(ROOT, "public");

/**
 * `position` controls which part survives the crop. Portrait rack shots and
 * ultra-wide room shots both lose a lot when squared off, so this matters.
 */
const PHOTOS = [
  {
    src: "PXL_20231222_193946370.jpeg",
    out: "hero-cinema-theater.webp",
    width: 2400,
    height: 1350, // 16:9, matches the source; CSS crops it per breakpoint
    position: "centre",
  },
  {
    src: "IMG_1142-converted.jpg",
    out: "project-residential-cinema.webp",
    width: 1600,
    height: 1067, // 3:2, project cards render at roughly 1.5:1
    position: "centre",
  },
  {
    src: "A3D15F9C-B36E-4E2D-B10B-E515BB27E759-converted.jpg",
    out: "project-commercial-av-rack.webp",
    width: 1600,
    height: 1067,
    position: "centre",
  },
  // No surveillance entry: there is no camera/NVR photo in the collection.
  // ProjectGrid renders a placeholder plate for any project without an image.

  // --- Page header bands -------------------------------------------------
  // One landscape shot per page, sitting beside the heading rather than
  // under it. Chosen so each page opens on work that matches its subject.
  {
    // Modern loft landing — bright and current, and the only interior in the
    // set that reads "house" rather than "cinema".
    src: "7EC124A9-9139-493A-9BA9-5DC06D03D07F-converted.jpg",
    out: "header-residential.webp",
    width: 1600,
    height: 1200,
    position: "centre",
  },
  {
    // Two racks with shelves labelled ROUTER / ACCESS POINTS / NETWORK
    // SWITCH. The source is 3213x5712, so a landscape crop keeps only the
    // middle band — which is where the labelling is.
    src: "990503C8-784A-48B4-80EB-336A8A0856DE-converted.jpg",
    out: "header-commercial.webp",
    width: 1600,
    height: 1200,
    position: "centre",
  },
  {
    // Two techs mounting a display. The only "we do the work" frame in the
    // set, which is exactly what an About page wants.
    src: "FBF2DD95-7975-4942-BCED-EDBF3BF87D15-converted.jpg",
    out: "header-about.webp",
    width: 1600,
    height: 1200,
    position: "centre",
  },

  // --- /systems, one per discipline --------------------------------------
  // Cameras & access has no entry on purpose: there is not one camera, NVR
  // or monitor across all 38 source photos. That section renders an honest
  // note instead of a borrowed vendor render.
  {
    src: "IMG_4002-converted.jpg",
    out: "system-cinema.webp",
    width: 1400,
    height: 1050,
    position: "centre",
  },
  {
    // Blue LED cove lighting — the one frame that actually shows lighting
    // being controlled, rather than a keypad we do not have a photo of.
    src: "PXL_20231222_194002088.jpeg",
    out: "system-control.webp",
    width: 1400,
    height: 1050,
    position: "centre",
  },
  {
    // Patch-panel detail, green and red cabling. Reads as "structured
    // cabling" more legibly than another rack elevation does.
    src: "20120907_135926.jpg",
    out: "system-networks.webp",
    width: 1400,
    height: 1050,
    position: "centre",
  },

  // --- Additional /work cards --------------------------------------------
  // One frame per ROOM, never two angles of the same job on two cards — see
  // the room groups in PHOTO_MANIFEST.md.
  {
    src: "PXL_20231222_193801294.jpeg",
    out: "project-modern-theater.webp",
    width: 1600,
    height: 1067,
    position: "centre",
  },
  {
    // Already a 21:9 crop, so squaring it off loses a lot; 3:2 is as tall as
    // this one can go.
    src: "4922FD94-6B4C-44D9-8644-5E679091530F.JPG",
    out: "project-tiered-theater.webp",
    width: 1600,
    height: 1067,
    position: "centre",
  },
  {
    src: "B442C482-F1D7-444E-8DC8-2BC3AB64465D.JPG",
    out: "project-goldplaster-theater.webp",
    width: 1600,
    height: 1067,
    position: "centre",
  },
  {
    src: "20170921_151033.jpg",
    out: "project-attic-theater.webp",
    width: 1600,
    height: 1067,
    position: "centre",
  },
  {
    // Triad + Control4, clean and well-labelled. A different pair of racks
    // from the header shot above.
    src: "20180906_134352.jpg",
    out: "project-control4-rack.webp",
    width: 1600,
    height: 1067,
    position: "centre",
  },
];

/**
 * Open Graph card. Local trades get shared over WhatsApp and Facebook
 * constantly; without this a shared link renders as bare text.
 * 1200x630 is the size every platform crops from.
 */
const OG = {
  src: "PXL_20231222_193946370.jpeg",
  out: "og-image.jpg", // jpg: a couple of scrapers still refuse WebP
  width: 1200,
  height: 630,
};

/**
 * The brand mark.
 *
 * Source is the handoff original: a 700px PNG with a clean alpha cutout of
 * the emblem. 256px covers the largest use (88px in the footer) at 2x with
 * headroom, and WebP takes it from ~979KB to ~31KB.
 *
 * NOT sourced from "Latserof Tech Grp Logo Vector.svg". Despite the name it
 * is not a vector: it is one 2160px JPEG wrapped in an <svg> element, zero
 * <path> nodes, 1.6MB. It is also a photograph of the physical embroidered
 * patch lying on white fabric, with the wordmark included and no
 * transparency, so it is a different asset entirely and unusable on a dark
 * ground. A real vector is still outstanding; see QUESTIONS-FOR-THOMAS.md.
 */
const LOGO_SRC = path.join(
  ROOT,
  "design",
  "Latserof Technologies website design",
  "design_handoff_latserof_homepage",
  "assets",
  "logo-badge.png",
);

let failed = 0;

function report(name, info) {
  const kb = (info.size / 1024).toFixed(0);
  console.log(`  ${name.padEnd(36)} ${info.width}x${info.height}  ${kb} KB`);
}

async function run() {
  if (!existsSync(SRC)) {
    console.error(`No photos-source/ at ${SRC}`);
    process.exit(1);
  }
  mkdirSync(OUT, { recursive: true });

  console.log("photography");
  for (const item of PHOTOS) {
    const from = path.join(SRC, item.src);
    if (!existsSync(from)) {
      console.error(`  MISSING  ${item.src}`);
      failed += 1;
      continue;
    }
    try {
      const info = await sharp(from)
        .rotate()
        .resize(item.width, item.height, {
          fit: "cover",
          position: item.position,
        })
        .webp({ quality: 82 })
        .toFile(path.join(OUT, item.out));
      report(item.out, info);
    } catch (err) {
      console.error(`  FAILED   ${item.src}: ${err.message}`);
      failed += 1;
    }
  }

  console.log("\nopen graph");
  try {
    const info = await sharp(path.join(SRC, OG.src))
      .rotate()
      .resize(OG.width, OG.height, { fit: "cover", position: "centre" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(OUT, OG.out));
    report(OG.out, info);
  } catch (err) {
    console.error(`  FAILED   ${OG.out}: ${err.message}`);
    failed += 1;
  }

  console.log("\nbrand mark");
  if (!existsSync(LOGO_SRC)) {
    console.error("  MISSING  handoff logo-badge.png, skipping");
    failed += 1;
  } else {
    try {
      const info = await sharp(LOGO_SRC)
        // Keep the alpha channel: the emblem must sit on the page's black,
        // not on a baked-in background of its own.
        .resize(256, 256, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .webp({ quality: 90 })
        .toFile(path.join(PUBLIC, "logo-badge.webp"));
      report("logo-badge.webp", info);
    } catch (err) {
      console.error(`  FAILED   logo-badge.webp: ${err.message}`);
      failed += 1;
    }
  }

  console.log(
    failed ? `\n${failed} export(s) failed.` : "\nAll assets written.",
  );
  process.exit(failed ? 1 : 0);
}

await run();
