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

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "photos-source");
const OUT = path.join(ROOT, "public", "images");
const PUBLIC = path.join(ROOT, "public");
const APP = path.join(ROOT, "src", "app");

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
  // Surveillance photography added 2026-07-29 (see project-surveillance-
  // cameras.webp further down). The homepage still keeps SURVEILLANCE third.
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
  {
    // Thomas in a completed attic cinema — he confirmed he is happy to
    // appear on the site (2026-07-29). Portrait crop for the About column.
    src: "20170509_170045.jpg",
    out: "about-owner.webp",
    width: 1200,
    height: 1500,
    position: "centre",
  },

  // --- /systems, one per discipline --------------------------------------
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
  {
    // New 2026-07-29 delivery — outdoor bullet cameras on a conduit run.
    // Closes the surveillance photography gap.
    src: "23C5DD64-D64A-4A69-A3E1-709B57AF895E.jpg",
    out: "system-cameras.webp",
    width: 1400,
    height: 1050,
    position: "centre",
  },
  {
    // Close detail of a labelled camera (CAM 6) on stacked stone — strong
    // project-card read for the surveillance slot on the homepage.
    src: "6D3F0035-C8DC-4158-9EE6-371257F90B36.jpg",
    out: "project-surveillance-cameras.webp",
    width: 1600,
    height: 1067,
    position: "centre",
  },
  {
    // Night exterior with architectural / landscape lighting — residential
    // "safer and smarter" curb appeal without inventing a cinema frame.
    src: "C454E4AC-9CAE-4F7C-90F6-439668485FFA.jpg",
    out: "project-residential-lighting.webp",
    width: 1600,
    height: 1067,
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

/**
 * Favicons, from the same emblem.
 *
 * These sit in src/app/, not public/ — Next's App Router treats `favicon.ico`,
 * `icon.png` and `apple-icon.png` there as file conventions and emits the
 * <link> tags itself, hashed for cache-busting. Putting them in public/ would
 * ship them unhashed and untagged.
 *
 * The emblem is composited onto ink rather than left transparent. A browser
 * tab is not guaranteed to be dark — a transparent gold-on-nothing mark lands
 * on whatever the tab strip is, which for a light theme means gold on white,
 * and the brand rule is that the badge never sits on a non-black surface.
 *
 * INSET keeps the emblem off the very edge of the square; at 16px a mark that
 * bleeds to the border reads as a smudge rather than a shape.
 */
const ICON_INSET = 0.08;
const ICO_SIZES = [16, 32, 48];

/**
 * One square icon: emblem centred on ink, as a PNG buffer.
 *
 * `palette` quantises. Do that for the standalone PNGs — the mark is two
 * colours and their blend, so it is invisible there and roughly halves the
 * file. Do NOT do it for the .ico payloads: Next decodes favicon.ico at build
 * time to emit the <link> tag, and its decoder rejects a non-RGBA PNG inside
 * the container with "The PNG is not in RGBA format!". Those sizes are tiny
 * as truecolour anyway.
 */
async function iconPng(size, { palette = true } = {}) {
  const inner = Math.round(size * (1 - ICON_INSET * 2));
  const emblem = await sharp(LOGO_SRC)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0x0b, g: 0x0b, b: 0x0b, alpha: 1 }, // --color-ink
    },
  })
    .composite([{ input: emblem, gravity: "centre" }])
    .ensureAlpha() // the composite is opaque; the .ico decoder still wants RGBA
    .png({ compressionLevel: 9, palette, quality: 90 })
    .toBuffer();
}

/**
 * Pack PNGs into an .ico. Windows and every browser since IE11 accept PNG
 * payloads inside the container, so there is no BMP encoding to do here:
 * a 6-byte header, one 16-byte directory entry per size, then the PNGs.
 */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(images.length, 4);

  const directory = Buffer.alloc(16 * images.length);
  let offset = header.length + directory.length;

  images.forEach(({ size, data }, i) => {
    const at = i * 16;
    directory.writeUInt8(size >= 256 ? 0 : size, at); // 0 means 256
    directory.writeUInt8(size >= 256 ? 0 : size, at + 1);
    directory.writeUInt8(0, at + 2); // palette colours
    directory.writeUInt8(0, at + 3); // reserved
    directory.writeUInt16LE(1, at + 4); // colour planes
    directory.writeUInt16LE(32, at + 6); // bits per pixel
    directory.writeUInt32LE(data.length, at + 8);
    directory.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });

  return Buffer.concat([header, directory, ...images.map((i) => i.data)]);
}

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

    console.log("\nfavicons");
    try {
      // 192, not 512: browsers prefer the PNG over the .ico for the tab, so
      // this is fetched on every page load. There is no web manifest on this
      // site, so nothing ever asks for the 512px install icon that would
      // justify the extra ~110KB. 180 is the fixed size Apple asks for.
      for (const [name, size] of [
        ["icon.png", 192],
        ["apple-icon.png", 180],
      ]) {
        const data = await iconPng(size);
        writeFileSync(path.join(APP, name), data);
        report(name, { width: size, height: size, size: data.length });
      }

      const ico = buildIco(
        await Promise.all(
          ICO_SIZES.map(async (size) => ({
            size,
            data: await iconPng(size, { palette: false }),
          })),
        ),
      );
      writeFileSync(path.join(APP, "favicon.ico"), ico);
      report(`favicon.ico (${ICO_SIZES.join("/")})`, {
        width: ICO_SIZES.at(-1),
        height: ICO_SIZES.at(-1),
        size: ico.length,
      });
    } catch (err) {
      console.error(`  FAILED   favicons: ${err.message}`);
      failed += 1;
    }
  }

  console.log(
    failed ? `\n${failed} export(s) failed.` : "\nAll assets written.",
  );
  process.exit(failed ? 1 : 0);
}

await run();
