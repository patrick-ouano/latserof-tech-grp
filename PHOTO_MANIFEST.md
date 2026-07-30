# Photo manifest — Latserof Tech Grp source photos

Raw folder: `photos-source/` (68 entries, gitignored — HEICs are counted twice
because each has a `-converted.jpg` sibling). Reviewed 2026-07-29 — every file
below has been opened and described. **Locations are still unknown** and need
confirming with Thomas; they're the one thing that can't be read off the pixels.

All but 5 are Latserof's own project photos. Those 5 are vendor marketing
collateral — see "Vendor marketing assets" below; they must not be used as
project photography.

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

## Surveillance — camera installs

All shot on a phone in portrait, most at 1867×3840 (≈1:2). That ratio is the
thing to watch: the site's discipline slot is **4:3**, and a plain centre or
edge gravity on a 1:2 frame slices whatever is on the pole. Use an explicit
`crop` rect in `scripts/export-assets.mjs` for every one of these.

| File | Dim | Notes |
|---|---|---|
| `20190719_113348` | 1867×3840 | ★ **Best camera shot.** Four bullet cameras on one property-entrance pole, lockable enclosure below, tile roof + magnolia behind, hard midday sun. Was `system-cameras.webp`; **promoted to `project-surveillance-cameras.webp` 2026-07-30** — the homepage card needed the one frame here that is a composed photograph rather than a detail |
| `20180413_123834` | 1867×3840 | Four-camera cluster on a tall pole, palm fronds overhead, condo block and gated "DO NOT ENTER" entry behind. Reads multi-family / HOA, and unmistakably Florida. Was `project-surveillance-cameras.webp` for a few hours on 2026-07-30; **now `system-cameras.webp`** |
| `20180925_164549` | 1867×3840 | Same pole and property as `20190719`, later and cloudier light. **Same job — do not use both** |
| `23C5DD64` | 2160×2880 | Two cameras plus a third housing on a pole. Was `system-cameras.webp` until 2026-07-29; the 4:3 crop cut the upper camera in half. Superseded |
| `6D3F0035` | 2160×3840 | Close detail of a camera labelled CAM 6 on stacked stone. Was `project-surveillance-cameras.webp` until 2026-07-30 — the 3:2 slot sheared the camera head off, and one housing is a thin illustration of a card titled "multi-camera". **Unused — usable as a detail shot if a slot ever wants one** |

### The surveillance card took three attempts — read this before a fourth

`project-surveillance-cameras.webp` was changed on 2026-07-29, then twice on
2026-07-30. Every rejection was the same complaint in different words: the photo
looked **cut out**. Worth naming the cause, because it is a property of the
source set and not of any one crop.

Five of the six camera photos are 1:2 phone portraits aimed *up* at a pole. Point
a phone up and you get the subject and sky and nothing else — no ground, no
building, no horizon. Crop that to a landscape slot and the result has no bottom
edge that means anything: the pole leaves the frame, the sky fills half the
picture, and it reads as a fragment however carefully the rect is measured. Two
attempts were spent moving the rect around, which could not fix it.

`20190719` is the exception — shot from further back, so the house wall, brick
gate and hedge close the bottom of the frame. That is why it is now on the card,
and it is why the remaining alternatives are not upgrades: they are all the same
upward phone shot.

Two things follow:
1. **The card is as good as this set allows.** Improving it needs a new
   photograph, not a new crop — a camera install shot from 20–30ft back at
   eye level, with the building in it. Cheap to ask Thomas for.
2. **Check the aspect the slot actually renders.** `ProjectGrid` is
   `aspect-[4/3]` with `object-cover`, and the project entries in
   `export-assets.mjs` export 3:2 — so every other project card silently loses
   89px off each side at render time. Harmless on a wide cinema interior,
   not harmless on a pole. This entry exports 4:3 so the measured rect is what
   ships; the others were left alone rather than re-cropped unasked.

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
| `20160525_162737` | 1944×2592 | Same racks as `162549`, **Thomas in frame** — branded LTG shirt, standing beside the rack. Now `about-owner.webp` (2026-07-30). Dark and a little noisy, but not a selfie and correctly lit for the ink palette. Crop must stop short of the right edge: a bystander's hand is in it |
| `20170128_192202` | 1458×2592 | Rack, **Thomas selfie** |
| `F6CEE2EE` | 2316×3088 | **Thomas selfie**, racks labelled GREAT ROOM / HD MATRIX / OASIS |

## Commercial interiors ★ gap closed 2026-07-29
- `C189AAEA` (3840×1775) — **twelve-panel video wall going up in an office.** Drop ceiling, troffer lighting, tech on an orange ladder still commissioning it, Samsung cartons on the floor. Two panels showing "Channel Scan Complete!". The one frame in the set that unmistakably reads *commercial building* rather than *equipment*, and it has a person working in it. Now `header-commercial.webp`. Slightly soft — camera shake — but usable at header size
- `20191017_125656` (1836×3264) — **Thomas in front of a finished 4×4 video wall**, branded blue LTG shirt, "T.J." on the cuff. **Mirrored** (front-camera preview): un-flop it or the signage and his own embroidered logo read backwards. Was `about-owner.webp` from 2026-07-29 to 2026-07-30 — correctly framed but shot straight into a lit video wall, so he is backlit and flat and the panels' own content competes behind his head. Superseded by `20160525_162737`. **Unused**

## Crew at work
- `45ED02D9` (3213×5712) — tech on ladder mounting a display bracket above a stone fireplace, lakeside home. Good "we do the work" shot
- `FBF2DD95` (3024×4032) — ★ **two techs fitting a display mount on a dark wood wall**, with a level, drill, recessed wiring box, moving blankets and Milwaukee tools. Now `header-about-team.webp` (2026-07-30): it shows collaboration and precision, sits naturally in the ink palette, and carries no visible subcontractor branding
- `20170422_162202` (2160×2880) — tech on a ladder wiring a projector mount into an open ceiling, cable in hand, tools on the ladder tray, dark acoustic-panelled theater. Previously `header-about.webp`; replaced because the polo reads "3digi… Automation" and the tighter single-person frame said less about Latserof's own crew. The old export name was retired as well to invalidate Next/Vercel image-optimizer caches

## Do not use
- `18204926` (4032×3024) — blurry close-up of cabling with a finger in shot. Diagnostic photo, not portfolio
- `Foerstal 676` (480×320) — screening room / auditorium with rows of seats. **The only commercial-looking interior in the set, and far too low-res to use.** Worth asking Thomas if a larger original exists

---

## Vendor marketing assets — NOT project photography

Five files added 2026-07-29 are manufacturer/distributor collateral, not
Latserof's own installs. They are third-party copyrighted material.

| File | What it is |
|---|---|
| `AN-830-AP_Interior Access point.jpg` | Araknis / Snap One lifestyle photo — poolside luxury home, ceiling AP. Desert mountains in shot; not Florida |
| `C4-VBTX39.jpg` | Control4 marketing photo — model using a T5 in-wall touchscreen |
| `ClareVision_App_Android_Stacked_View.png` | ClareVision app UI render, six camera tiles (Patio, Front Door, Channels 01–04) |
| `C4Yourself Campaign Flyer 2026.pdf` | Control4 / ADI event flyer. "© 2026 ADI Global Distribution. All Rights Reserved." |
| `13C Control4 X4 FAQ.pdf` | Control4 X4 dealer FAQ |

**These must not go on project cards.** Presenting a vendor's stock photography
as a Latserof installation would misrepresent the work — and the Araknis shot is
visibly not Florida, so it would be a conspicuous error.

Where they *can* legitimately be used, subject to confirming dealer marketing
rights with Thomas:

- A **"brands we carry"** strip — Control4, Araknis, ClareVision. Standard and
  expected for a dealer, and it lends credibility.
- The **ClareVision screenshot** illustrates the camera app experience, which
  maps directly onto the discipline-04 copy ("monitored from anywhere by you").
  Usable as a labelled product/UI illustration — never as an install photo.
- The PDFs are reference only. Nothing in them belongs on the site.

They do **not** close the surveillance gap: a vendor's app mockup is not
evidence of a Latserof camera install.

---

## Gaps that block the approved homepage

The homepage has three project cards: RESIDENTIAL, COMMERCIAL, SURVEILLANCE.

- **Residential** — covered many times over. No problem. New exterior lighting
  shots (`C454E4AC`, `8F842BF6`, `15E7E267`) strengthen the "safer and smarter"
  residential story.
- **Commercial** — ~~still thin on *rooms*~~ **resolved 2026-07-29.**
  `C189AAEA` is a video wall being installed in an office and now carries
  `header-commercial.webp`; `A3D15F9C` (MXnet rack) still covers the homepage
  card. A true conference/boardroom *table* photo is still absent, so the
  boardroom project card leans on rack photography.
- **Surveillance** — ~~zero photos~~ **resolved 2026-07-29**, reframed twice
  since. `20190719` carries the homepage card and `20180413` the /systems
  discipline slot as of 2026-07-30. Adequate, not strong — see "the
  surveillance card took three attempts" above for why, and for the one photo
  worth asking Thomas to take.

Locations still pending from Thomas (cities per room group).

---

## Content on the hero cinema screen

The screen in `hero-cinema-theater.webp` is genuinely blank — it is a white
rectangle seen at an angle. Thomas asked for something on it (a Formula 1 car).

`npm run assets` supports this: drop a still in `photos-source/` named
`screen-content.jpg` (`.jpeg`, `.png` and `.webp` also work) and the export
warps it onto the screen's four measured corners, then multiplies the room's
own light falloff back over it so it reads as projected rather than pasted.
The maths is in `scripts/lib/screen-composite.mjs`; the corners and blend
settings are the `SCREEN` block in `scripts/export-assets.mjs`. With no such
file the step is skipped and the screen stays blank, so the export never
breaks for want of an optional still. `og-image.jpg` is now derived from the
finished hero, so whatever is on the screen is also on the shared link card.

**A still is now in place (2026-07-29).** `screen-content.png` (1024×576) is a
night shot of the Las Vegas Grand Prix — a car under the lights with sparks
under the floor, the Sphere behind it, and Salesforce and Wynn trackside
signage. It composites well: at 1024px it lands close to 1:1 on the ~880px
screen quad, so there is no visible upscaling, and being dark and blue it
reads as projected light against the room's own blue cove lighting instead of
fighting the ink/gold palette. `og-image.jpg` picks it up automatically.

⚠️ **Still an open rights question — the technical side is done, the licence
is not.** That frame is press/broadcast motorsport photography: the image
itself, the team livery and the trackside marks all belong to somebody. This
file refuses vendor marketing photos on exactly that basis, and the screen is
the brightest object on the homepage, so it is the least discreet possible
place to borrow an image. Before launch, either license it or swap in a frame
Thomas shot himself. The swap costs nothing — drop a new
`photos-source/screen-content.*` and re-run `npm run assets`.

## Other questions
1. **Locations** for each room above (city is enough). Ask per *room group*, not per file.
2. ~~Legal entity name.~~ **Resolved: Latserof Technologies Grp LLC.**
3. ~~Happy appearing on the site?~~ **Yes** — About page uses `about-owner.webp`,
   from `20160525_162737` since 2026-07-30 (`20170509_170045` → `20191017_125656`
   → this). Three passes over the same slot is the tell: **none of the five
   frames of Thomas in this set is a deliberate photograph of him.** They are a
   selfie with half his head out of frame, two rack selfies, a backlit shot
   against a video wall, and this one, which is the best of them mainly by
   being unposed and correctly exposed. Ask him for one proper portrait — it is
   the single highest-value photo still missing from the site, and unlike the
   hero screen it costs nothing but his time.
4. **Bigger original of `Foerstal 676`?** (optional)
4b. **One camera install shot from back at eye level**, with the building in
   frame — see the surveillance section. Every camera photo in the set is a
   phone pointed straight up at a pole, which is why that card has been
   reframed three times. Second-cheapest high-value photo after the portrait.
5. License number — keep current site copy; not a priority.
6. Domain is on GoDaddy — point DNS at Vercel when ready.

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
