# Latserof Technologies Group — website

## Business facts (do not invent alternatives)
- Legal name: **Latserof Technologies Grp Inc.** Display brand: **Latserof Technologies**.
  - ⚠️ The design handoff predates this and writes the legal name as "Latserof Tech Grp LLC" in two places — the footer lockup (`LATSEROF TECH GRP`) and the legal line (`© 2026 Latserof Tech Grp LLC · Licensed & insured low-voltage contractor`). **Both are wrong; it's an Inc., not an LLC.** Use `site.legalName` when building the footer and ignore the handoff on this one point. The corrected lockup is longer, so check it still fits the footer column.
- Owner: Thomas John Forestal (Owner / Operations Manager, Custom Design & Engineering).
- Phone: **(407) 927-4434** — always link as `tel:+14079274434`.
- Address: 3050 Dyer Blvd, Suite 242, Kissimmee, FL 34741.
- Hours: Mon–Fri 8:00–5:00. Service calls by appointment.
- Service area: Central Florida / greater Orlando.
- Business type: licensed low-voltage / custom AV & automation integrator (Crestron, Control4, Lutron dealer). **Not** a retail electronics store — no public pricing, no e-commerce, no SKU-level product pages.
- Four core disciplines: (01) Cinema & media rooms, (02) Control & lighting, (03) Networks that hold, (04) Cameras & access.

## Design system — status
- **The whole site is built.** Homepage, Residential, Commercial, Systems, Work, About and Contact all ship real content, and `PageStub` has been deleted.
- The current visual language is **"Gallery Black, lit"** — an evolution of the approved Direction 2a, decided 2026-07-29. It keeps 2a's palette and typography and reworks its depth, geometry and motion. `src/app/globals.css` is the source of truth; read its `@theme` block before writing any component.
- **The design handoff is now historical.** `design/Latserof Technologies website design/design_handoff_latserof_homepage/` still holds the original token table, the exact approved copy, and `reference/homepage-2a.html`. Treat it as the authority on **copy** (still final — don't paraphrase headlines) and as *superseded* on radius, shadow, hover and type-scale. Where it and `globals.css` disagree about styling, `globals.css` wins.
- ⚠️ **Thomas signed off on 2a, not on this.** The homepage he approved looked flatter. Get the reworked homepage re-approved before launch.

## Design constraints (apply site-wide)
Still binding:
- Palette is ink `#0B0B0B` / gold `#C6A15B` / paper `#F2EFE8`, plus tints and the surface + gold ramps in `@theme`. **No second accent color** — `public/logo-badge.webp` is a gold-on-black emblem that must never be recolored, so it anchors this palette in the header and footer of every page.
- Type: Archivo (headings/nav/buttons), Barlow (body/meta), Space Mono (numerals + category labels only).
- `tel:` links for every phone number. Respect `prefers-reduced-motion` on every animation — `globals.css` enforces this globally, including animation *delays*, which matter as much as durations when fill-mode is `both`.
- Body copy never below 16px. Focus rings are never removed.
- Tailwind theme tokens are defined once in the `@theme` block in `src/app/globals.css` — this is Tailwind v4, which moved theme config out of JS and into CSS, so there is no `tailwind.config` file. Reference tokens by name (`bg-ink`, `text-gold`, `shadow-glow`, `text-h2`); never hardcode a hex inline.

Superseded by the rework (the handoff still states the old rule — ignore it):
- ~~Border radius 2px on buttons, 0 everywhere else~~ → `--radius-btn` 10px, `--radius-card` 16px, `--radius-lg` 24px, `--radius-pill`.
- ~~No shadows anywhere~~ → `--shadow-card`, `--shadow-lift`, `--shadow-glow`, `--shadow-glow-sm`.
- ~~Hover is a colour change only, no lift~~ → buttons and cards lift and glow.
- ~~Fixed 36/44/52/62px type ladder~~ → fluid `clamp()` scale (`text-display`, `text-h1`…`text-meta`).
- ~~No text over a photo~~ → still true in practice everywhere, but now a judgment call rather than a rule. If you do it, put a scrim behind the text.

### Motion
Three layers, ordered so nothing can ever strand content invisible:
1. **No JS** → nothing is ever hidden (the `js` class that hides is only set by script).
2. **Scroll-driven animations** (`animation-timeline: view()`) → pure CSS, no JS needed to reveal.
3. **Neither** → `IntersectionObserver` in `src/components/motion/Reveal.tsx`, plus a 1.2s failsafe.

The `js` / `sda` capability classes are set by a blocking script in `layout.tsx` **before first paint** — setting them in an effect causes content to paint visible, snap hidden, then animate. The header shell, hero parallax and reading-progress bar are all CSS scroll timelines; there is deliberately **no scroll listener anywhere in the site**.

## Assets
- Logo: `public/logo-badge.png` (the emblem — gold on black, brand anchor, **never recolor/crop/place on non-black surface**) and `public/logo-wordmark.png` (horizontal lockup, use if a wider version is needed). Originals live in `design/Latserof Technologies website design/design_handoff_latserof_homepage/assets/`. These are PNG placeholders — ask Thomas for a vector (SVG/EPS) before launch. The badge PNG is ~1MB, far heavier than a 54px header mark warrants; the vector solves this, otherwise re-export at 2x display size.
- Photography: see `PHOTO_MANIFEST.md`. The *reference HTML* hotlinks Pexels placeholders; the **shipped images are real Latserof work**, exported from `photos-source/` by `npm run assets`. Two gaps remain and are not solvable from the existing files: no commercial *room* photo, and **zero** surveillance photos across all 38 source frames. `/work` renders an honest "PHOTOGRAPHY PENDING" plate for the latter rather than borrowing stock — do not fill it with vendor imagery.
- The five vendor marketing files in `photos-source/` (Control4, Araknis, ClareVision) are third-party copyright and **must not** appear as project photography. Dealer names render as type in `BrandStrip`, never as logo files, until Thomas confirms marketing rights.
- Projects data should be modeled as data (not hardcoded JSX) — `{ category, title, location, image, slug? }` — since Thomas will add new installs over time.

## Forms
**Built** — `src/components/QuoteForm.tsx` + `src/app/api/quote/route.ts` (Resend; see `.env.example`). Without credentials it logs in dev and returns 503 in production rather than silently dropping a lead. Original spec, for reference: name, phone, email, property type (Residential/Commercial), project scope (multi-select of the 4 disciplines), city, message. Required: name + at least one of phone/email. Inline errors in gold (`#C6A15B`). Submission handler: lightweight — a Next.js API route forwarding to an email service (Resend) or a form service (Web3Forms) is enough; no database needed for this site.

## Stack & architecture
- Next.js (App Router) + TypeScript + Tailwind CSS.
- Static generation where possible, deploy target Vercel.
- No backend/database for v1 — this is a lead-gen marketing site, not an app.
- Add `LocalBusiness` JSON-LD using the business facts above.
- Next.js 16 / React 19 / Tailwind 4. `AGENTS.md` points at the Next 16 docs bundled in `node_modules/next/dist/docs/` — check them before using an API that may have changed in this major.

## Project structure
```
src/app/                 routes: / + residential, commercial, systems, work, about, contact
src/app/globals.css      @theme tokens + motion system — read this first
src/app/layout.tsx       next/font, site metadata, viewport, capability script
src/app/template.tsx     route-change entrance (re-mounts per navigation)
src/app/sitemap.ts       derived from navLinks — a new page cannot be omitted
src/app/robots.ts        + not-found.tsx
src/components/          shared components
src/components/motion/   Reveal (scroll reveal), Spotlight (pointer bloom)
src/lib/site.ts          business facts, disciplines, brands, process, nav, CTA_HREF
src/data/projects.ts     Project[] for "Recent installations"
public/                  logo-badge.webp, images/ (project photos)
```
- Never retype a business fact into a component — import it from `src/lib/site.ts`. Phone links use `site.phoneHref`.
- Every CTA points at `CTA_HREF`, not a literal path.
- **Canonicals are per-page.** Do not put `alternates.canonical` on the root layout — every route inherits it, which declares all five content pages duplicates of the homepage.

## Status
Site is complete and builds static. **Open before launch:**
- Thomas to re-approve the reworked homepage (he signed off on flatter 2a).
- Real photography for the commercial-room and surveillance gaps.
- Confirm the project locations in `src/data/projects.ts` (`locationConfirmed` is unset on all three) — they came from the handoff, not from him.
- A vector logo. `public/logo-badge.webp` is a raster export.
- `RESEND_API_KEY` + `QUOTE_TO_EMAIL` in Vercel, or the form returns 503.
- Confirm the production domain (`site.url` is a placeholder).

See `QUESTIONS-FOR-THOMAS.md` for the full list.

## Responsive
The fixed breakpoint type ladder is gone — the `clamp()` scale in `@theme` covers 375–1440px continuously, so nothing snaps and the awkward in-between widths are handled. Layout breakpoints still apply:
- ≥1280px: centered 1280px content, 52px gutter, full-bleed dark bands.
- 1024–1279px: fluid, 40px gutter.
- 768–1023px: hero stacks (photo above text), card grids → 2-col.
- <768px: single column, 24px gutter, hamburger drawer (solid black, gold links). Body copy never below 16px.

## Working conventions for this project
- This is a learning project for Claude Code — prefer Plan mode for anything multi-file (new pages, restructuring), default/manual approval for smaller edits.
- Commit incrementally with descriptive messages rather than one giant commit.
