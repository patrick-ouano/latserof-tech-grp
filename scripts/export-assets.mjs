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

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { warpOntoQuad } from "./lib/screen-composite.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "photos-source");
const OUT = path.join(ROOT, "public", "images");
const PUBLIC = path.join(ROOT, "public");
const APP = path.join(ROOT, "src", "app");

/**
 * `position` controls which part survives the crop. Portrait rack shots and
 * ultra-wide room shots both lose a lot when squared off, so this matters.
 *
 * `crop` overrides it with an explicit `{ left, top, width, height }` rect in
 * source pixels, applied before the resize. `position` can only pick an edge
 * or the centre, which is not enough for the phone photos in this set: a
 * camera pole shot 1867x3840 has its subject a third of the way down a 1:2
 * frame, and *every* gravity a 4:3 slot allows slices a camera in half. Give
 * a rect and the subject is framed rather than approximated. Measure it
 * against the source's post-`rotate()` dimensions.
 *
 * `flop` mirrors horizontally. Only for front-camera selfies, where the phone
 * saved the preview rather than the true image: signage and embroidered logos
 * come out reversed, and un-mirroring restores what was actually there.
 */
const PHOTOS = [
  {
    // Blue-LED cinema & wet bar angle — same room as the previous hero
    // (…193946370), shot from a step further back so the riser and cove
    // lighting read more clearly. Corners remeasured 2026-07-31.
    src: "PXL_20231222_193801294.jpeg",
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
    // A 4x3 video wall going up in an office, with a tech on the ladder
    // still working on it. Replaced the rack elevation here on 2026-07-29:
    // racks read "equipment", and this page has to read "commercial
    // building". It is also the conference-room-class interior the manifest
    // had listed as missing.
    //
    // Source is 3840x1775, so the 4:3 crop is width-bound. Framed from the
    // left edge of the wall to the right edge of the tech; that clips one
    // panel column at the frame edge, which on a repeating grid reads as
    // the wall continuing rather than as a mistake, whereas clipping the
    // person would just look wrong.
    src: "C189AAEA-17F6-43B4-B230-08E504E2826D.jpg",
    out: "header-commercial.webp",
    width: 1600,
    height: 1200,
    crop: { left: 560, top: 0, width: 2366, height: 1775 },
    position: "centre",
  },
  {
    // Two technicians fitting a display mount: one sets the bracket with a
    // level and drill while the other assists. This replaced the ladder shot
    // on 2026-07-30 because it shows the crew and the precision of the work,
    // sits naturally in the dark palette, and carries no visible
    // subcontractor branding.
    //
    // Source is portrait. The measured 4:3 crop keeps both technicians, the
    // level, drill, bracket and recessed wiring box while dropping empty
    // floor and the less useful bottom of the moving blanket.
    src: "FBF2DD95-7975-4942-BCED-EDBF3BF87D15-converted.jpg",
    out: "header-about-team.webp",
    width: 1600,
    height: 1200,
    crop: { left: 0, top: 260, width: 3024, height: 2268 },
    position: "centre",
  },
  {
    // Thomas in a branded blue LTG shirt in front of a finished 4×4 video
    // wall. Fifth frame in this slot (2026-07-31). The rack selfie it
    // replaces put his face large but read as a phone snap with a Hurley
    // cap; this one shows finished commercial work behind him and the
    // embroidered logo on his chest. Front-camera preview — `flop` so the
    // TNT / DIRECTV signage and his logo read the right way round. New
    // filename busts the Next image-optimizer cache.
    //
    // He is slightly backlit by the panels; still the strongest "owner of
    // a commercial AV company" frame in the set. Source is 1836×3264. The
    // 4:5 crop keeps him from belt to crown with the wall filling the
    // background.
    src: "20191017_125656.jpg",
    out: "about-owner-videowall.webp",
    width: 1200,
    height: 1500,
    crop: { left: 240, top: 480, width: 1440, height: 1800 },
    flop: true,
    position: "centre",
  },
  {
    // /about "OUR EXPERIENCE" — night exterior of a home with architectural
    // and landscape lighting. Replaces the blue-cove theater still
    // (2026-07-31): that frame was from the same shoot as the homepage hero,
    // so the page felt like it was repeating the same room. This one is
    // finished work that does not compete with the hero, and it reads as
    // control & lighting rather than another cinema interior.
    // Same source as project-residential-lighting.webp; dedicated filename
    // so the About slot can change without touching the Work card.
    src: "C454E4AC-9CAE-4F7C-90F6-439668485FFA.jpg",
    out: "about-experience-lighting.webp",
    width: 1400,
    height: 933,
    position: "centre",
  },
  {
    // /about "A PASSIONATE APPROACH" — tech on a ladder dressing cable behind
    // a wall-mount above a stone fireplace. Replaces the finished theater
    // still so the block shows someone working, matching the precision copy.
    // Portrait source; 3:2 crop keeps the tech, bracket, level line and tools
    // on the mantel while dropping empty floor and the bed edge.
    src: "45ED02D9-CD86-4582-A604-6354AD39E864-converted.jpg",
    out: "about-passionate-install.webp",
    width: 1400,
    height: 933,
    crop: { left: 0, top: 680, width: 3213, height: 2142 },
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
    // Four bullet cameras on one pole head, palm fronds across the top of the
    // frame. Took over the /systems discipline slot on 2026-07-30 when
    // 20190719 moved to the homepage project card — see the entry below.
    //
    // This is the *illustration* slot, so a tight cluster against sky is the
    // right job for it: the discipline is cameras / access control and this is four
    // cameras, unobstructed, nothing severed. Its weakness as a portfolio
    // photograph — no ground, no building, no sense of the property — is
    // exactly what stops mattering at illustration size.
    //
    // Crop is the full source width at 4:3, centring the cluster with the
    // pole running out of the bottom edge. Any higher and the frond eats the
    // top cameras; any lower and the cluster rides the top of the frame.
    src: "20180413_123834.jpg",
    out: "system-cameras.webp",
    width: 1400,
    height: 1050,
    crop: { left: 0, top: 600, width: 1867, height: 1400 },
    position: "centre",
  },
  {
    // Third replacement for this card, and the reason is the same each time:
    // the two earlier sources were fragments. The CAM 6 close-up (6D3F0035)
    // was one housing shot against stone, and the palm-frond pole (20180413,
    // now on /systems above) was a camera cluster against bare sky with
    // nothing under it — so at card size both read as a photo that had been
    // cut out of something rather than composed.
    //
    // 20190719 is the one camera frame in the set that is actually a
    // *photograph of an installation*: four cameras on the pole head, hard
    // midday sun, tile roof and magnolia behind for scale, the house wall and
    // brick gate carrying the bottom of the frame. Nothing is severed and
    // nothing is floating.
    //
    // Exported 4:3 rather than the 3:2 the other project cards use, because
    // ProjectGrid's slot *is* 4:3 (`aspect-[4/3]`, object-cover): a 3:2 file
    // gets 89px taken off each side at render time, which is invisible on a
    // wide cinema interior and not invisible on a pole with cameras 200px
    // from the frame edge. At 4:3 the rect below is exactly what ships.
    //
    // The rect stops just above the lockable enclosure at the foot of the
    // pole. A 4:3 landscape crop of a 1867x3840 portrait tops out at 1400px
    // tall, which cannot hold both the camera head and the whole enclosure —
    // so the frame ends on the house wall instead of cutting the enclosure in
    // half, which would repeat the mistake this entry keeps fixing.
    src: "20190719_113348.jpg",
    out: "project-surveillance-cameras.webp",
    width: 1600,
    height: 1200,
    crop: { left: 0, top: 560, width: 1867, height: 1400 },
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
    // Swapped with the hero source 2026-07-31 so the homepage hero and this
    // /work card are two angles of the same room, not the same frame twice.
    src: "PXL_20231222_193946370.jpeg",
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
    // Dual-rack build: labelled networking, patch cables, Control4.
    // Exported at 4:3 to match ProjectCard's aspect-[4/3]. Shifted down
    // from the source top so the rack columns fill the card instead of
    // the monitors and ceiling that sit above them.
    src: "990503C8-784A-48B4-80EB-336A8A0856DE-converted.jpg",
    out: "project-dual-racks.webp",
    width: 1600,
    height: 1200,
    crop: { left: 0, top: 1900, width: 3213, height: 2410 },
    position: "centre",
  },
];

/**
 * Content projected onto the cinema screen in the hero photo.
 *
 * The screen in `hero-cinema-theater.webp` is genuinely blank, so showing
 * something on it is a perspective warp onto the four measured corners — see
 * scripts/lib/screen-composite.mjs for the maths.
 *
 * ⚠️ RIGHTS. Whatever goes here is published on a commercial site, so it must
 * be footage Latserof is licensed to use. Motorsport broadcast frames, team
 * liveries and championship logos are none of them free to reuse, and this
 * repo already refuses vendor marketing photos for the same reason (see
 * PHOTO_MANIFEST.md). Confirm the licence before shipping a frame here.
 *
 * The composite is skipped, not failed, when the file is absent: the hero
 * with a blank screen is a perfectly good photo, and a missing optional
 * still should not break `npm run assets` for everyone else.
 */
const SCREEN = {
  base: "hero-cinema-theater.webp",
  /** Drop the still in photos-source/ under this basename. */
  content: "screen-content",
  extensions: [".jpg", ".jpeg", ".png", ".webp"],
  /**
   * Screen corners, TL TR BR BL, in the 2400x1350 exported hero.
   *
   * Remeasured 2026-07-31 against PXL_20231222_193801294 (pure 16:9
   * downscale, no crop). Gradient edge-fit from a mid-screen seed — a flat
   * luminance threshold drifts on the dim upper-left corner.
   */
  corners: [
    [271.7, 212.1],
    [1083.8, 341.9],
    [1075.5, 693.3],
    [304.3, 736.5],
  ],
  /**
   * How much of the screen's own lighting to keep. Lower = more of the
   * projector hotspot and the dim upper-left corner show through the
   * projected image, which is what stops it reading as a flat paste.
   */
  lightFloor: 0.58,
  supersample: 3,
};

/**
 * Open Graph card. Local trades get shared over WhatsApp and Facebook
 * constantly; without this a shared link renders as bare text.
 * 1200x630 is the size every platform crops from.
 *
 * Derived from the *exported* hero, not the camera original, so whatever is
 * on the screen in the hero is also on the shared card. 1200x630 is a wider
 * ratio than 16:9, so this still crops top and bottom.
 */
const OG = {
  from: "hero-cinema-theater.webp",
  out: "og-image.jpg", // jpg: a couple of scrapers still refuse WebP
  width: 1200,
  height: 630,
};

/**
 * The brand mark.
 *
 * Source is brand/logo-badge.png: a 700px PNG with a clean alpha cutout of
 * the emblem. 256px covers the largest use (88px in the footer) at 2x with
 * headroom, and WebP takes it from ~979KB to ~31KB. A real vector from
 * Thomas is still outstanding before launch.
 */
const LOGO_SRC = path.join(ROOT, "brand", "logo-badge.png");

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

/**
 * Warp SCREEN.content onto the blank cinema screen in the exported hero.
 *
 * Runs after the photography pass, so it edits the WebP that pass just
 * wrote. Returns a status string for the log; never throws for a missing
 * source, because the still is optional.
 */
async function compositeScreen() {
  const found = SCREEN.extensions
    .map((ext) => path.join(SRC, SCREEN.content + ext))
    .find((p) => existsSync(p));

  if (!found) {
    return `no ${SCREEN.content}.* in photos-source/ — screen left blank`;
  }

  const basePath = path.join(OUT, SCREEN.base);
  if (!existsSync(basePath)) {
    throw new Error(`${SCREEN.base} was not exported, nothing to composite onto`);
  }

  // Read through a Buffer, not a path: this writes back to the same file, and
  // libvips keeps the input open long enough to make an in-place write fail
  // on Windows with "unable to open for write".
  const base = await sharp(readFileSync(basePath))
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Pre-resize the still to roughly the screen's on-screen width times the
  // supersample rate. Warping a 4000px original down to an 880px quad one
  // bilinear tap at a time aliases badly; this makes the sampling ~1:1.
  const [tl, tr, br, bl] = SCREEN.corners;
  const edge = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const target =
    Math.ceil(Math.max(edge(tl, tr), edge(bl, br)) * SCREEN.supersample);

  const content = await sharp(found)
    .rotate()
    // Screens are 16:9; cover-fit so the still fills it rather than
    // letterboxing black bars onto a cinema screen, which would look broken.
    .resize(target, Math.round((target * 9) / 16), {
      fit: "cover",
      position: "centre",
    })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const overlay = warpOntoQuad(
    {
      data: content.data,
      width: content.info.width,
      height: content.info.height,
      channels: content.info.channels,
    },
    SCREEN.corners,
    {
      data: base.data,
      width: base.info.width,
      height: base.info.height,
      channels: base.info.channels,
    },
    { supersample: SCREEN.supersample, lightFloor: SCREEN.lightFloor },
  );

  const info = await sharp(base.data, {
    raw: {
      width: base.info.width,
      height: base.info.height,
      channels: base.info.channels,
    },
  })
    .composite([
      {
        input: overlay.data,
        raw: { width: overlay.width, height: overlay.height, channels: 4 },
        top: 0,
        left: 0,
      },
    ])
    .webp({ quality: 82 })
    .toFile(basePath);

  report(`${SCREEN.base} (screen)`, info);
  return `projected ${path.basename(found)}`;
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
      let pipeline = sharp(from).rotate();
      // Before the resize: `crop` is measured in source pixels.
      if (item.crop) pipeline = pipeline.extract(item.crop);
      if (item.flop) pipeline = pipeline.flop();

      const info = await pipeline
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

  console.log("\nscreen composite");
  try {
    console.log(`  ${await compositeScreen()}`);
  } catch (err) {
    console.error(`  FAILED   screen composite: ${err.message}`);
    failed += 1;
  }

  // After the composite, so the shared card shows the same screen as the hero.
  console.log("\nopen graph");
  try {
    const info = await sharp(path.join(OUT, OG.from))
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
    console.error("  MISSING  brand/logo-badge.png, skipping");
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
