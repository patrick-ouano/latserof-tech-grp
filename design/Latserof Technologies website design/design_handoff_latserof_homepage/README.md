# Handoff: Latserof Technologies Group — Homepage (Direction 2a, "Gallery Black")

## Overview
Marketing homepage for **Latserof Tech Grp LLC**, a licensed low-voltage / AV integrator in Kissimmee, FL serving Central Florida. The page sells four disciplines (cinema, control & lighting, networking, cameras & access) to both residential and commercial buyers, and drives to one primary action: **book a free walkthrough / call**.

Direction 2a is the approved visual direction: near-black ground, gold accent, the embroidered emblem as the brand anchor, and **every line of copy on a solid plate — never over a photo**.

## About the Design Files
The files in `reference/` are **design references created in HTML** — a prototype showing intended look and behavior. They are **not production code to copy directly**. The markup uses inline styles only, has no responsive breakpoints, and hardcodes a 1280px canvas.

The task is to **recreate this design in the target codebase's environment** (Next.js/React, Astro, WordPress, whatever the project uses) with its established patterns, component structure, and CSS approach. If no codebase exists yet, pick the most appropriate stack for a small marketing site (a static-first framework such as Astro or Next.js with static export is a good default) and implement there.

## Fidelity
**High fidelity.** Colors, typography, and spacing below are final and should be matched exactly at the 1280px desktop width. The one thing the reference does *not* cover is responsive behavior — see **Responsive** below, which the developer should implement to spec.

---

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| `ink` | `#0B0B0B` | Page background, footer, button-on-gold fill |
| `hairline` | `#1E1C19` | 1px dividers between sections and list rows |
| `gold` | `#C6A15B` | Primary accent: buttons, eyebrows, rule marks, CTA band |
| `paper` | `#F2EFE8` | Primary text on dark |
| `paper-dim` | `#D6D1C7` | Hero subhead |
| `body-dim` | `#B5AFA5` | Service row descriptions, footer body |
| `muted` | `#9A948A` | Meta text, captions, locations |
| `muted-deep` | `#8F8A80` | Footer descriptor |
| `nav` | `#CFCAC1` | Nav links |
| `stroke` | `#4A453D` | Secondary (ghost) button border |
| `legal` | `#5E5A53` | Copyright line |
| `on-gold-body` | `#1F1A10` | Body copy inside the gold CTA band |

Total palette is 3 real colors (black, gold, warm off-white) plus tints. **Do not introduce a second accent.**

### Typography
Two families + one mono:
- **Archivo** — 400/600/800/900. All headings, nav, buttons, service titles, project titles, brand lockup.
- **Barlow** — 300/400/500/600. All body copy, meta, footer text.
- **Space Mono** — 700. Numerals (`01`–`04`) and small category labels only.

| Role | Spec |
|---|---|
| H1 hero | Archivo 900 · 62px · line-height 1.04 · letter-spacing −0.02em · `#FFFFFF` |
| Hero subhead | Barlow 400 · 19px · 1.65 · `#D6D1C7` · max-width 520px |
| Section H2 | Archivo 800 · 34px · 1.0 · `#F2EFE8` |
| Service row title | Archivo 800 · 26px · 1.15 · `#F2EFE8` |
| Service row body | Barlow 400 · 18px · 1.6 · `#B5AFA5` |
| Project title | Archivo 800 · 20px · 1.25 · `#F2EFE8` |
| Body / default | Barlow 400 · 19px · 1.6 |
| Eyebrow | Archivo 700 · 13px · letter-spacing 0.22em · uppercase · `#C6A15B` |
| Category label | Space Mono 700 · 13px · `#C6A15B` (uppercase, no extra tracking) |
| Nav link | Archivo 600 · 14px · `#CFCAC1` |
| Button label | Archivo 800 · 14–16px |
| Brand lockup line 1 | Archivo 800 · 16px · letter-spacing 0.16em |
| Brand lockup line 2 | Archivo 600 · 10px · letter-spacing 0.30em · `#C6A15B` |
| Legal | Barlow 400 · 14px · `#5E5A53` |

### Spacing & geometry
- Page canvas: **1280px**, content gutter **52px** left/right on every band.
- Section vertical rhythm: header `20px`; hero `76px / 72px`; services heading block `56px` top, `28px` bottom; service rows `30px` vertical each; projects band `64px / 56px`; CTA band `52px`; footer `52px`, legal `0 52px 34px`.
- Border radius: **2px** on buttons, **0** everywhere else. No rounded cards. No shadows anywhere in the page itself.
- Divider: `1px solid #1E1C19`.
- Images: sharp corners, no radius.

---

## Screens / Views

Single page, six bands top to bottom.

### 1. Header
- Layout: flex, `space-between`, `align-items: center`, padding `20px 52px`, bottom border `1px solid #1E1C19`.
- Left: emblem `logo-badge.png` at **54×54px**, then a 2-line lockup in a grid with `5px` gap — `LATSEROF` / `TECHNOLOGIES`.
- Center: nav, flex, `34px` gap — Residential · Commercial · Systems · Work · About.
- Right: gold button `Book a walkthrough` — bg `#C6A15B`, text `#0B0B0B`, padding `15px 26px`, radius 2px, letter-spacing 0.04em.
- Sticky on scroll is acceptable and recommended; if sticky, keep the same solid `#0B0B0B` (no transparency).

### 2. Hero
- Layout: 2-column grid `minmax(0,1.05fr) minmax(0,1fr)`. **No text over the photo.**
- Left cell: padding `76px 52px 72px`, vertically centered column.
  - Eyebrow row: 34×2px gold rule + `ORLANDO · CENTRAL FLORIDA`, `26px` bottom margin.
  - H1 (3 hard line breaks): `One system.` / `Every room.` / `Zero guesswork.`
  - Subhead (`28px` top margin): "Home theater, whole-house audio, lighting, networking and surveillance — designed, wired and supported by the same crew that installed it."
  - Button row (`40px` top margin, `14px` gap): primary gold `Get a system quote`; secondary ghost `See the work` (`1px solid #4A453D`, text `#F2EFE8`). Both padding `18px 30px`.
  - Trust row (`44px` top margin, `34px` gap, Barlow 400 15px `#9A948A`): "Licensed & insured" · "Residential + commercial" · "In-house service".
- Right cell: full-bleed photo, `object-fit: cover`, `min-height: 600px`, `filter: brightness(.86)`.

### 3. "What we build" — service list
- Heading row: H2 `What we build` left, Barlow 400 16px `#9A948A` `Four disciplines, one contractor` right, baseline-aligned, `56px 0 28px`, bottom hairline.
- Four rows, grid `64px minmax(0,300px) minmax(0,1fr)` with `32px` gap, `align-items: center`, `30px` vertical padding, hairline between rows (none after the last).

| # | Title | Body |
|---|---|---|
| 01 | Cinema & media rooms | Screen and seating layout, acoustic treatment, calibrated projection and surround — built to the room, not to a box on a shelf. |
| 02 | Control & lighting | One app and one keypad standard through the house — scenes, shades, climate and music that behave the same in every room. |
| 03 | Networks that hold | Structured cabling, managed switching and wireless coverage surveyed room by room — the layer everything else depends on. |
| 04 | Cameras & access | Surveillance, intercom and door access with local recording — reviewed and serviced by us, monitored from anywhere by you. |

### 4. "Recent installations"
- H2 with `28px` bottom margin, then 3-column grid, `22px` gap, band padding `64px 52px 56px`.
- Each card: image `100% × 250px` cover (no radius), then `18px` top padding on the text block — Space Mono category label (`9px` bottom margin), Archivo 800 20px title, Barlow 16px `#9A948A` location (`7px` top margin).

| Category | Title | Location |
|---|---|---|
| RESIDENTIAL | Great-room cinema & audio | Windermere, FL |
| COMMERCIAL | Boardroom AV & conferencing | Orlando, FL |
| SURVEILLANCE | 16-camera retail system | Kissimmee, FL |

This should be CMS-/data-driven — expect the client to add projects. Model as `{ category, title, location, image, slug? }`.

### 5. Gold CTA band
- Full-bleed `#C6A15B`, text `#0B0B0B`, padding `52px`, flex `space-between`, `40px` gap.
- Left (max-width 720px): Archivo 800 34px/1.2 letter-spacing −0.01em — "Tell us the rooms. We'll tell you what they need." Below, `12px` gap, Barlow 400 19px/1.6 `#1F1A10` — "Walkthroughs are free anywhere in Central Florida — new construction, renovation or a system that needs rescuing."
- Right: black button, padding `20px 34px`, Archivo 800 16px, `white-space: nowrap` — **Call (407) 927-4434** (`tel:` link).

### 6. Footer + legal
- Padding `52px`, grid `minmax(0,1.2fr) minmax(0,1fr) minmax(0,1fr)`, `40px` gap, `align-items: start`.
- Col 1: emblem **88×88px** + `20px` gap + `LATSEROF TECH GRP` (Archivo 800 17px, tracking 0.14em) and Barlow 16px/1.6 `#8F8A80` "Low-voltage system design, installation and service."
- Col 2 `CONTACT`: `(407) 927-4434` (`#F2EFE8`, weight 600), then `3050 Dyer Blvd, Suite 242` / `Kissimmee, FL 34741`.
- Col 3 `HOURS`: `Mon–Fri 8:00–5:00`, `Service calls by appointment`.
- Legal line: `padding: 0 52px 34px`, Barlow 14px `#5E5A53` — "© 2026 Latserof Tech Grp LLC · Licensed & insured low-voltage contractor".

---

## Interactions & Behavior
The reference is static; implement these:

- **Hover, gold button:** darken to `#B08F4C`, 150ms ease. No lift, no shadow.
- **Hover, ghost button:** border → `#C6A15B`, text → `#C6A15B`, 150ms.
- **Hover, nav link:** `#CFCAC1` → `#F2EFE8`, 120ms.
- **Hover, project card:** image `scale(1.03)` inside `overflow: hidden`, 400ms `cubic-bezier(.2,.6,.2,1)`; title → `#C6A15B`. Cards link to a project detail page (or a lightbox if detail pages are out of scope — confirm with the client).
- **Hover, service row:** background `#111`, full-bleed to the gutter; number → `#F2EFE8`. Optional, but it makes the list feel alive.
- **Focus:** visible `2px solid #C6A15B` outline with `2px` offset on all interactive elements. Do not remove outlines.
- **Scroll reveal:** if used, keep it to a 12px rise + fade, 400ms, once, and respect `prefers-reduced-motion`.
- **Phone links:** every phone number is a `tel:+14079274434`.
- **CTAs:** `Book a walkthrough`, `Get a system quote`, and the CTA-band button all resolve to the same contact/quote destination. `See the work` anchors to the installations section.

## Forms
No form appears in the reference. The quote/walkthrough destination needs one — recommended fields: name, phone, email, property type (Residential / Commercial), project scope (multi-select of the four disciplines), city, message. Validate required name + one of phone/email; show inline errors in `#C6A15B` below the field. Confirm the submission handler (email, CRM, Formspree, etc.) with the client.

## Responsive
Not covered by the reference. Target behavior:

- **≥1280px:** as specified; center the 1280px content, let dark bands run full-bleed.
- **1024–1279px:** fluid; gutter `40px`; H1 → 52px.
- **768–1023px:** hero collapses to one column, photo **above** the text, photo height `380px`. Services grid → `48px 1fr` two-column with the description on its own second line under the title. Projects → 2 columns. Footer → 2 columns. H1 → 44px.
- **<768px:** everything single column, gutter `24px`. H1 → 36px, section H2 → 28px, body 17px. Nav becomes a hamburger drawer (solid `#0B0B0B`, gold links, full height). Header CTA collapses to a phone icon button. CTA band stacks with the button full-width.
- Never let body copy drop below 16px.

## Assets
- `assets/logo-badge.png` — the embroidered emblem, gold on black. Used at 54px (header) and 88px (footer). **This is the brand anchor; do not recolor, crop, or place it on a non-black surface.** Ask the client for a vector (SVG/EPS) before launch — the PNG will soften on retina at large sizes.
- `assets/logo-wordmark.png` — horizontal wordmark version, available if a wider lockup is needed.
- **Photography in the reference is placeholder** (Pexels URLs, hotlinked). All four images must be replaced with real Latserof project photography before launch. Required shots: (1) hero — a completed cinema or media room, landscape, dark; (2) residential great-room install; (3) commercial boardroom AV; (4) surveillance/camera install. Serve as AVIF/WebP with width descriptors; hero should be `priority`/eager, the rest lazy.

## Content notes
- Company legal name: **Latserof Tech Grp LLC**. Display brand: **Latserof Technologies**.
- Phone **(407) 927-4434**; address **3050 Dyer Blvd, Suite 242, Kissimmee, FL 34741**; hours **Mon–Fri 8:00–5:00**.
- Add `LocalBusiness` JSON-LD with the above, plus service area = Central Florida.
- Title/meta description should lead with "Home theater, smart home and commercial AV in Central Florida."
- Copy is final as written — don't paraphrase headlines.

## Accessibility
- All text in this design clears 4.5:1 except the intentionally quiet `#5E5A53` legal line (decorative-weight; acceptable at 14px but bump to `#6E6A63` if the auditor flags it).
- Gold `#C6A15B` on `#0B0B0B` = ~8:1. Black on gold = ~8:1. Both safe.
- Give the emblem `alt="Latserof Tech Grp"` in the header and `alt=""` in the footer (decorative repeat).
- Section landmarks: `header`, `main`, `section` with `aria-labelledby` per band, `footer`.

## Files
- `reference/homepage-2a.html` — standalone, openable in a browser. This is the source of truth for layout and styling.
- `assets/logo-badge.png`, `assets/logo-wordmark.png` — brand marks.
- Original design canvas (all directions, for context): `Homepage Directions.dc.html` in the parent project.
