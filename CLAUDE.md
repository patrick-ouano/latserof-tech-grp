# Latserof Technologies Group — website

## Business facts (do not invent alternatives)
- Legal name: **Latserof Technologies Grp LLC**. Display brand: **Latserof Technologies**.
- Tagline: **Making Your Home Safer and Smarter**.
- Owner: Thomas John Forestal (Owner / Operations Manager, Custom Design & Engineering). Happy to appear on the site.
- Phone: **(407) 927-4434** — always link as `tel:+14079274434`.
- Quote / survey form delivery: **tj@927hifi.com** (`QUOTE_TO_EMAIL`).
- Address: 3050 Dyer Blvd, Suite 242, Kissimmee, FL 34741.
- Hours: Mon–Fri 8:00–5:00. Service calls by appointment.
- Service area: Greater Orlando, Central Florida and Tampa.
- Business type: licensed low-voltage / custom AV & automation integrator. Industry partners with **21st Century Distribution** and **SnapAV** — dealer lines from those catalogs (Control4, Crestron, Lutron, Episode, Binary, ClareVision, Araknis, etc.). **Not** a retail electronics store — no public pricing, no e-commerce, no SKU-level product pages. No priced quotes on the site; CTAs request a **survey / walkthrough** only.
- Four core disciplines: (01) Cinema & media rooms, (02) Control & lighting, (03) Networks that hold, (04) Cameras & access.
- Design services available upon request.
- Primary CTA label: **Request for Survey** → `/contact`.
- **Two process sequences, both real, neither interchangeable.** `process` (site.ts) is the four-beat public summary — Survey → Design → Install → Service — and stays on `/residential` and `/commercial`. `deliveryProcess` is the client's own ten-step sequence (consultation, needs analysis, solution development, purchasing, staging, installation & integration, commissioning, training, support, continuous enhancement) and renders on `/about` only, via `DeliverySteps`. A unit test asserts they stay different lengths, because collapsing one into the other silently rewrites three pages.
- **Company narrative** lives in `story` (site.ts) and renders on `/about`: WHAT WE DO · OUR EXPERIENCE · A PASSIONATE APPROACH. This is Thomas's own marketing copy, supplied 2026-07-30, normalised on the way in — see the doc comment for what changed and why. Three things in it are **his to confirm, not ours to fix**: "principals and founders" is plural where the site names only him; the copy says "over 35 years" of experience in one place and "over 30 years" in another; and its city list included Stuart, FL, which is Treasure Coast and outside the stated service area (dropped, in favour of `site.serviceArea`). A test guards the brand-name and service-area normalisation so a future copy paste cannot quietly undo it.

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
- Photography: see `PHOTO_MANIFEST.md`. Shipped images are real Latserof work, exported from `photos-source/` by `npm run assets`. Surveillance photography was added 2026-07-29. Commercial *room* photos are still thin (rack shots cover the commercial card). Locations pending from Thomas.
- **Hero cinema screen.** The screen in `hero-cinema-theater.webp` was blank; `npm run assets` projects a still onto it — put the file in `photos-source/` as `screen-content.*` and the export warps it onto the measured corners (`scripts/lib/screen-composite.mjs`, `SCREEN` in `scripts/export-assets.mjs`). Absent, the step is skipped and the screen stays blank. `og-image.jpg` derives from the finished hero, so it inherits whatever is on the screen. **A Las Vegas GP night frame is composited in as of 2026-07-29 and is still unlicensed** — broadcast frames and team liveries are third-party IP, same rule as the vendor photos below, and this is the most visible image on the site. License it or replace it with Thomas's own footage before launch. See `PHOTO_MANIFEST.md`.
- Photo *framing* is data, not a manual crop: entries in `scripts/export-assets.mjs` take an optional `crop` rect (source pixels, applied pre-resize) and `flop`. The phone photos are mostly ≈1:2 portraits going into 4:3 and 4:5 slots, where gravity alone cuts the subject in half — give a rect. `flop` un-mirrors front-camera selfies, which otherwise ship reversed signage and a backwards LTG logo.
- The five vendor marketing files in `photos-source/` (Control4, Araknis, ClareVision) are third-party copyright and **must not** appear as project photography. Dealer names render as type in `BrandStrip`, never as logo files. Distributor partners: 21st Century Distribution and SnapAV.
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
- Project locations in `src/data/projects.ts` — he will provide cities later (`locationConfirmed` unset).
- A vector logo. `public/logo-badge.webp` is a raster export.
- `RESEND_API_KEY` in Vercel; `QUOTE_TO_EMAIL` defaults to `tj@927hifi.com` in `.env.example`.
- Confirm the production domain on GoDaddy (`site.url` is a placeholder hostname until DNS is pointed at Vercel).
- License number: keep whatever is currently on the site; not a priority.
- **Three questions on the narrative copy he supplied 2026-07-30** (see Business facts): is there a second principal, is it 35 years or 30, and does the service area really reach Stuart? The copy ships as written apart from the Stuart line; none of the three blocks the launch.
- **A licence for the hero cinema screen still, or a replacement.** The F1 frame currently composited onto the screen (and therefore onto `og-image.jpg`) is unlicensed press photography — see Assets. This is the one open item with legal exposure rather than cosmetic risk.

## Responsive
The fixed breakpoint type ladder is gone — the `clamp()` scale in `@theme` covers 375–1440px continuously, so nothing snaps and the awkward in-between widths are handled. Layout breakpoints still apply:
- ≥1280px: centered 1280px content, 52px gutter, full-bleed dark bands.
- 1024–1279px: fluid, 40px gutter.
- 768–1023px: hero stacks (photo above text), card grids → 2-col.
- <768px: single column, 24px gutter, hamburger drawer (solid black, gold links). Body copy never below 16px.

## Testing & CI
- **Vitest** (`tests/`, jsdom) for validation rules, data invariants, components and the quote route. **Playwright** (`e2e/`) against a *production build* on port 3100 — it checks prerendered markup, no-JS behaviour and reduced motion, none of which `next dev` represents faithfully.
- `npm test` · `npm run test:e2e`. Both must pass before a commit that touches `src/`.
- In Playwright, emulate reduced motion with `page.emulateMedia()`, **not** `test.use({ reducedMotion })` — the latter silently does not apply here and the test passes against the animated build, proving nothing.
- Scope `getByRole("alert")` to the form: Next injects its own `role="alert"` route announcer into every page.
- The scope/property chips are `sr-only` inputs (keeps them keyboard- and form-native), so Playwright cannot click them directly — click the wrapping `<label>`.
- **`npx next typegen` must run before `tsc --noEmit` on a clean checkout.** `LayoutProps`/`PageProps` are globals Next *generates* into `.next/types`, and `next-env.d.ts` is generated too — both are gitignored, so they exist locally and not in CI. Without it, CI fails with `Cannot find name 'LayoutProps'`, which looks like a code error and is not one.
- `<html>` carries `suppressHydrationWarning` because the capability script writes `js`/`sda` onto it before React hydrates. That is intentional and the server cannot know those values. It suppresses that element's own attributes only, one level deep. `e2e/hydration.spec.ts` asserts `js`/`sda` are the *only* difference, so nothing else can start mutating `<html>` under cover of the suppression.
- The `hydration` Playwright project runs against `next dev` on port 3101, because **React reports hydration mismatches in development only** — a production build stays silent and re-renders. The rest of the suite uses the production build on 3100.
- Don't use `waitForLoadState("networkidle")`: two servers run during the suite and the network never reliably goes quiet. Wait on a real element instead.
- ⚠️ **`reuseExistingServer` means a green suite can prove nothing.** It is on locally (off in CI), so if anything is already listening on 3100 the suite skips `npm run build` entirely and tests whatever that process built — possibly hours ago, without the change under test. Check the build actually contains your change (`grep` the new copy in `.next/server/app/<route>.html`) before believing a local pass, and kill 3100/3101 when in doubt.
- A long-lived reused server on 3100 can also wedge the **image optimizer**: one `/_next/image` variant starts hanging forever while every other variant of the same file is fine, and `page.goto`'s `load` never fires, so the failure surfaces as a navigation timeout on a page that visibly rendered. It is process state, not a bad image — sharp re-encodes the file in ~50ms and a restarted server serves it instantly. Restart the server before investigating the photo.
- CI (`.github/workflows/ci.yml`) runs typecheck, lint, unit, build and e2e. **It does not deploy** — Vercel's Git integration does that on its own, and a deploy step would race with it. The `build` job asserts every page route still prerenders; `/api/quote` is the only permitted dynamic route.
- Security headers live in `next.config.ts`, not `vercel.json`, so they apply to `next start` and can be asserted in `e2e/headers.spec.ts`. There is deliberately no CSP: `layout.tsx` ships a required inline script, so a real CSP needs a per-request nonce and that would end static prerendering.

## Working conventions for this project
- This is a learning project for Claude Code — prefer Plan mode for anything multi-file (new pages, restructuring), default/manual approval for smaller edits.
- Commit incrementally with descriptive messages rather than one giant commit.
