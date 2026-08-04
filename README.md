<!-- Badges -->
<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS-0B1120?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" alt="Tailwind CSS" /></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
</p>

<p align="center">
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" /></a>
  <a href="https://playwright.dev/"><img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright" /></a>
  <a href="https://resend.com/"><img src="https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white" alt="Resend" /></a>
</p>

---

<h1 align="center">Latserof Technologies</h1>

<p align="center">
  <strong>Making Your Home Safer and Smarter</strong>
</p>

<p align="center">
  Marketing site for Latserof Technologies Grp LLC — a licensed low-voltage /
  custom AV and automation integrator serving Greater Orlando, Central Florida
  and Tampa.
</p>

<!-- Optional: add a homepage screenshot once launch visuals are signed off.
<p align="center">
  <img src="./docs/homepage.png" alt="Latserof Technologies homepage" width="720" />
</p>
-->

---

## Overview

This is a lead-generation marketing site, not a storefront. Visitors browse
disciplines and recent installs, then request an on-site survey. There is no
public pricing, no e-commerce, and no SKU-level product catalog.

The site is statically generated with Next.js App Router. The only dynamic
route is `POST /api/quote`, which forwards survey requests by email through
Resend.

---

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage — hero, disciplines, selected work, process, CTA |
| `/residential` | Home systems and residential FAQ |
| `/commercial` | Schools, restaurants, businesses |
| `/systems` | Four disciplines in full, plus manufacturer demos under Control & lighting |
| `/work` | Recent installations |
| `/about` | Company story and ten-step delivery process |
| `/contact` | Survey form, phone lines, address, hours |

Primary CTA everywhere: **Request for Survey** → `/contact`.

---

## Key Features

- **Four disciplines** — Cinema & media rooms, Control & lighting, Networks that hold, Surveillance Systems and Access Control
- **Survey form** — Name plus phone or email required; scope chips mirror the four disciplines; delivered via Resend
- **Business facts in one place** — Phone, address, hours, brands, and copy tokens live in `src/lib/site.ts`
- **Gallery Black, lit** — Ink / gold / paper design system in `src/app/globals.css` (Tailwind v4 `@theme`)
- **Motion with fallbacks** — CSS scroll timelines, `Reveal` IntersectionObserver, and a no-JS path that never hides content
- **LocalBusiness JSON-LD** — Structured data for search
- **Honest photography gaps** — Missing photos show a pending plate instead of stock or vendor marketing stills

---

## Tech Stack

### App

- **Next.js 16** — App Router, static generation
- **React 19** — UI
- **TypeScript** — Typed routes and components
- **Tailwind CSS 4** — Theme tokens in CSS (`@theme`), no `tailwind.config`

### Services

- **Vercel** — Hosting and Git-connected deploys
- **Resend** — Quote / survey email delivery
- **Vercel Analytics** — Traffic

### Quality

- **Vitest** — Unit and component tests (`tests/`)
- **Playwright** — End-to-end against a production build (`e2e/`)
- **ESLint** — Next.js config
- **GitHub Actions** — Typecheck, lint, unit, build, e2e (does not deploy)

---

## Getting Started

### Prerequisites

- Node.js 22 (CI uses 22; local 20+ is usually fine)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/patrick-ouano/latserof-tech-grp.git
   cd latserof-tech-grp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Required | Notes |
   |----------|----------|-------|
   | `RESEND_API_KEY` | Yes in production | From [resend.com](https://resend.com/api-keys) |
   | `QUOTE_TO_EMAIL` | Yes in production | Defaults to `tj@927hifi.com` in the example |
   | `QUOTE_FROM_EMAIL` | No | Must be on a Resend-verified domain |

   Without the first two, the quote route returns **503** in production (and
   logs in development) instead of pretending a lead was delivered.

4. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest (unit + component) |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:coverage` | Coverage report |
| `npm run test:e2e` | Playwright (builds first; uses ports 3100 / 3101) |
| `npm run assets` | Export photography and brand mark into `public/` |

---

## Project Structure

```
latserof-tech-grp/
├── src/
│   ├── app/                 # Routes, layout, globals.css, sitemap, robots
│   ├── components/          # Shared UI (Header, Footer, forms, motion)
│   ├── data/                # projects.ts, line-demos.ts
│   └── lib/                 # site.ts (business facts), quote validation
├── e2e/                     # Playwright specs (production build)
├── tests/                   # Vitest specs (jsdom)
├── scripts/                 # export-assets.mjs and helpers
├── public/                  # logo-badge.webp, images/
├── photos-source/           # Camera originals (gitignored)
├── design/                  # Historical design handoff (copy authority)
├── PHOTO_MANIFEST.md        # Source photo inventory
├── QUESTIONS-FOR-THOMAS.md  # Open client questions
└── CLAUDE.md                # Design system and working conventions
```

---

## Testing

Two layers, split by what each can prove.

**Vitest** (`tests/`) — validation rules, data invariants, components, and the
quote API route.

**Playwright** (`e2e/`) — runs against a **production build**, not `next dev`,
so prerendered markup, static generation, and no-JavaScript behaviour are real.
Servers: production on **3100**, hydration checks against `next dev` on **3101**.

```bash
npm test
npm run test:e2e
npx playwright test --ui
```

Notes:

- Emulate reduced motion with `page.emulateMedia()`, not `test.use({ reducedMotion })`.
- Do not use `waitForLoadState("networkidle")` — two servers keep the network busy.
- On a clean checkout, run `npx next typegen` before `tsc --noEmit` (generated
  `LayoutProps` / `PageProps` live under `.next/types` and are gitignored).

---

## CI and Deploy

**Vercel deploys. GitHub Actions gates.**

`.github/workflows/ci.yml` runs on every push and PR:

| Job | Checks |
|-----|--------|
| `quality` | `next typegen`, `tsc`, ESLint, Vitest |
| `build` | Production build; asserts every page route still prerenders |
| `e2e` | Playwright; report uploaded as an artifact |

`/api/quote` is the only allowed dynamic route. CI does **not** deploy — that
stays with Vercel’s Git integration.

### Vercel setup

1. Import the GitHub repo in Vercel.
2. Leave framework defaults; `vercel.json` pins the framework and `iad1` region.
3. Add `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, and optional `QUOTE_FROM_EMAIL` for
   Production and Preview.
4. Point the GoDaddy domain DNS at Vercel when ready.
5. Protect `main` in GitHub and require the `quality`, `build`, and `e2e` checks.

---

## Photography

Originals live in `photos-source/` (gitignored). `npm run assets` is the only
path into `public/`. Mapping and crops are in `scripts/export-assets.mjs`.
See `PHOTO_MANIFEST.md`.

Vendor marketing stills must not be used as project photography. Dealer names
render as type in `BrandStrip`, never as logo files.

---

## Before Launch

See `QUESTIONS-FOR-THOMAS.md`. Blocking items include Resend credentials in
Vercel, production domain confirmation, homepage re-approval, project locations,
a vector logo, and licensing for the hero cinema screen still.

---

## Docs

| File | Contents |
|------|----------|
| `CLAUDE.md` | Business facts, design system, conventions |
| `PHOTO_MANIFEST.md` | Every source photo, described |
| `QUESTIONS-FOR-THOMAS.md` | Open client questions |
| `AGENTS.md` | Next.js 16 agent note — read bundled docs before APIs |
| `design/.../design_handoff_latserof_homepage/` | Historical handoff; copy still authoritative, styling superseded by `globals.css` |

---

## Credits

- **[Next.js](https://nextjs.org/)** — App framework
- **[Tailwind CSS](https://tailwindcss.com/)** — Styling
- **[Vitest](https://vitest.dev/)** — Unit tests
- **[Playwright](https://playwright.dev/)** — End-to-end tests
- **[Resend](https://resend.com/)** — Transactional email
- **[Vercel](https://vercel.com/)** — Hosting

---

<p align="center">
  Built for Latserof Technologies Grp LLC
</p>
