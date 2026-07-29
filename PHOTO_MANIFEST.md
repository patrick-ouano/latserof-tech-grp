# Photo manifest — Latserof Tech Grp source photos

Raw folder: `photos-source/` (38 files, gitignored). Reviewed 2026-07-29 — every
file below has been opened and described. **Locations are still unknown** and
need confirming with Thomas; they're the one thing that can't be read off the
pixels.

HEIC files convert cleanly (verified with pillow-heif). No manual conversion or
renaming is needed — the export script handles crop, resize, WebP and naming.

---

## Rooms, grouped

Several files are the same room from different angles. Grouped so nobody picks
two shots of one job for two different project cards.

### A. Modern blue-LED theater ★ best overall
`PXL_20231222_193801294` · `PXL_20231222_193822927` · `PXL_20231222_193946370` · `PXL_20231222_194002088`
4032×2268 each, Dec 2023 — the newest and most contemporary work in the set.
Charcoal/blue walls, blue LED cove lighting, black quilted leather recliners with
lit bases, acoustic panels, riser, patterned carpet, wet bar at the back.
`...193946370` is the strongest single frame (screen prominent, dark, moody).

### B. Roman/classical theater ★ most distinctive
`IMG_1138` · `IMG_1141` · `IMG_1142` — 4032×3024
Gilded Corinthian columns, red leather recliners, painted galaxy/star-field
ceiling, LED floor strips, dark quilted acoustic walls. `IMG_1142` is a
symmetrical head-on hero frame. Unmistakable — great portfolio piece.

### C. Tiered damask theater
`4922FD94` · `6F2599DD` · `C453024D` · `DFDE9183` — 2560×1184 (already 21:9 crops)
Red/gold damask acoustic panels, mahogany trim, stepped floor, black recliners.
Ultra-wide, so a square hero crop loses a lot. Fine for wide banners.

### D. Mahogany cinema
`IMG_4002` — 4032×2268. Dark wood panelling, striped drapes, wall sconces, screen.

### E. Attic / barrel-vault theater (tan leather)
`20170921_151033` · `20170922_150131` (1440×2560, clean) · `20170509_170045` (2592×1944, **Thomas in frame**)

### F. Gold-plaster theater (film-reel carpet)
`B442C482` (4128×1908, good) · `Samsung photos 1069` (1024×768, too small)

### G. Wet-bar theater (arched projector niche)
`20121204_131102` (3264×2448) · `Samsung photos 1295` (1024×768, too small)

### H. Other single rooms
- `20121201_161605` (2048×1536) — theater with framed Gladiator poster, wood panelling
- `F4B53491` (2560×1184) — media room, mustard sofas, red carpet
- `7EC124A9` (5712×3213) — modern loft landing, wall-mounted TV, glass railing. Clean, current, bright
- `012EFCFF` (5712×3213) — high-end 2-channel listening room, large floorstanders, tube amps, wood diffusers. Mid-install: tools on floor, person part-in-frame

---

## Equipment racks / networking

| File | Dim | Notes |
|---|---|---|
| `990503C8` | 3213×5712 | ★ **Best networking shot.** Two racks, shelves labelled ROUTER / ACCESS POINTS / NETWORK SWITCH, Dell monitor + laptop running Control4 Composer |
| `A3D15F9C` | 3024×4032 | ★ **Reads commercial.** MXnet AV-over-IP rack, dual Murideo test monitors, blue/green patch cabling |
| `20180906_134352` | 1440×2560 | Triad + Control4, very clean and well-labelled |
| `20191011_175946` | 1960×4032 | Two Middle Atlantic racks, ceiling UniFi AP visible. Very tall — needs cropping |
| `20160525_162549` | 3024×4032 | Two racks, Control4, Crown amp |
| `20120907_135926` | 2048×1536 | ★ Patch-panel detail, green + red cabling. Good abstract "structured cabling" texture |
| `IMG_2990` | 3213×5712 | Rack mid-install, blue/yellow structured cable bundle |
| `20130829_115446` | 1151×2048 | Control4 rack, blue LEDs |
| `20160525_162737` | 1944×2592 | Same racks as `162549`, **Thomas in frame** |
| `20170128_192202` | 1458×2592 | Rack, **Thomas selfie** |
| `F6CEE2EE` | 2316×3088 | **Thomas selfie**, racks labelled GREAT ROOM / HD MATRIX / OASIS |

## Crew at work
- `45ED02D9` (3213×5712) — tech on ladder mounting a display bracket above a stone fireplace, lakeside home. Good "we do the work" shot
- `FBF2DD95` (3024×4032) — two techs mounting a large display on a dark wood wall, moving blankets, Milwaukee tools

## Do not use
- `18204926` (4032×3024) — blurry close-up of cabling with a finger in shot. Diagnostic photo, not portfolio
- `Foerstal 676` (480×320) — screening room / auditorium with rows of seats. **The only commercial-looking interior in the set, and far too low-res to use.** Worth asking Thomas if a larger original exists

---

## Gaps that block the approved homepage

The homepage has three project cards: RESIDENTIAL, COMMERCIAL, SURVEILLANCE.

- **Residential** — covered many times over. No problem.
- **Commercial** — effectively uncovered. `A3D15F9C` (MXnet rack) is the only shot that reads commercial, and it's a rack, not a room. `Foerstal 676` is the right subject at the wrong resolution.
- **Surveillance** — **zero photos across all 38 files.** No cameras, no NVR, no monitor wall, nothing.

Ask Thomas for: one boardroom / conference-room AV install, and one camera or
NVR install. Phone photos are fine — the Dec 2023 set was shot on a Pixel and
is the best material here.

## Other open questions for Thomas
1. **Locations** for each room above (city is enough — "Windermere, FL").
2. **Legal entity name.** CLAUDE.md says *Latserof Tech Grp LLC*; his LinkedIn says *Latserof Technologies Grp Inc.* These disagree, and the footer legal line plus the `LocalBusiness` JSON-LD both need the correct one.
3. **Is he happy appearing on the site?** Five photos have him in frame. An owner-at-work shot would suit the About page well, but that's his call.
4. **Bigger original of `Foerstal 676`?**

## Online presence
Essentially none. Searches for the company name, the legal name, and the owner
returned exactly one result: [his LinkedIn profile](https://www.linkedin.com/in/thomas-john-g-forestal-9502b694)
(LinkedIn returns HTTP 999 to automated fetches, so only the search snippet was
readable — that's the source of the "Grp Inc." spelling above). No website, no
Google Business Profile, no directory listings, no reviews found.

Practical consequence: this site will be the company's first real web presence,
so the `LocalBusiness` JSON-LD and a Google Business Profile matter more than
they normally would. Nothing to migrate, no existing SEO to preserve.

(Incidentally — "Latserof" is "Forestal" spelled backwards.)

## Before importing to the repo
1. Confirm locations and the two missing subjects with Thomas.
2. Export via script — WebP, hero ~1600px wide, cards ~800px wide. Don't ship 4000px+ originals.
3. Names are generated as `hero-*.webp` / `project-<category>-<city>.webp` to match `src/data/projects.ts`.
