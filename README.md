# Latserof Technologies — website

Marketing site for **Latserof Technologies Grp Inc.**, a licensed low-voltage /
AV integrator in Kissimmee, FL serving Central Florida.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · deployed on Vercel.
Statically generated; the only server-rendered route is the quote handler.

```
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Script | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Unit + component tests (Vitest) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | Coverage report |
| `npm run test:e2e` | End-to-end tests (Playwright) |
| `npm run assets` | Re-export photography and the brand mark into `public/` |

## Testing

Two layers, deliberately split by what each can actually prove.

**Vitest** (`tests/`) — jsdom. Validation rules, data invariants, component
behaviour, and the quote API route. Fast enough to run on every save.

**Playwright** (`e2e/`) — runs against a *production build*, not `next dev`,
because it checks prerendered markup, static generation and no-JavaScript
behaviour, none of which the dev server represents faithfully. It starts its
own server on port 3100, so a dev server on 3000 can keep running alongside it.

```
npm test                       # unit
npm run test:e2e               # e2e (builds first — takes a few minutes)
npx playwright test --ui       # e2e interactively
```

The E2E suite covers the things that break silently and look fine to whoever
shipped them:

- every route returns 200 with exactly one `h1` and **its own** canonical
- the site works with **JavaScript disabled** — no scroll-revealed content is
  left invisible, and the FAQ still opens
- **`prefers-reduced-motion`** leaves nothing hidden or mid-animation
- no page scrolls sideways at 360 / 768 / 1024 / 1440px
- heading levels never skip, every image has `alt`, focus rings survive
- the quote form never claims success when delivery failed
- structured data points at files that actually exist

> Reduced motion is emulated with `page.emulateMedia()`, not
> `test.use({ reducedMotion })` — the latter silently does not take effect in
> this setup, and the tests would pass against the animated build while
> proving nothing.

## CI/CD

**Vercel deploys. GitHub Actions gates.**

Once the repo is imported, Vercel's Git integration builds and deploys every
push and pull request on its own. `.github/workflows/ci.yml` deliberately does
**not** deploy — that would duplicate and race with it. What it does is tell
you the deploy is bad: Vercel will happily ship a preview whose types are
broken and whose tests fail.

Three jobs run on every push and PR:

| Job | Checks |
|---|---|
| `quality` | `tsc --noEmit`, ESLint, Vitest |
| `build` | Production build, **and asserts every page route still prerenders** |
| `e2e` | Playwright, report uploaded as an artifact |

The prerender assertion is there because a page that quietly turns dynamic
still builds, still passes every other check, and silently costs a function
invocation on every request. `/api/quote` is the one allowed exception.

### Importing to Vercel

1. **Vercel → Add New → Project → Import Git Repository**, pick this repo.
2. Framework preset auto-detects as Next.js. Leave build and output settings
   alone — `vercel.json` pins the framework and the `iad1` region (US East,
   closest to Central Florida).
3. Add the environment variables below under **Settings → Environment
   Variables**, for Production *and* Preview.
4. Deploy. Then add the custom domain under **Settings → Domains** — the
   domain stays registered at GoDaddy, only its DNS points at Vercel.
5. In GitHub, **Settings → Branches → protect `main`** and mark `quality`,
   `build` and `e2e` as required status checks. Without this the workflow
   reports failures but nothing stops a red commit reaching production.

### Environment variables

See `.env.example`. Copy it to `.env.local` for local work.

| Variable | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | **Yes, in production** | From resend.com |
| `QUOTE_TO_EMAIL` | **Yes, in production** | Where quote requests land |
| `QUOTE_FROM_EMAIL` | No | Must be on a Resend-verified domain |

Without the first two the quote route **returns 503 rather than pretending to
succeed**, and the form tells the visitor to phone instead. That is deliberate:
silently accepting a form and dropping the lead is the worst possible failure
for this site — the visitor believes they made contact and nobody calls back.
In development it logs the submission to the server console instead.

## Photography

Camera originals live in `photos-source/` and are **gitignored**.
`npm run assets` is the only path from there into the repo — the mapping from
"file nobody can identify" to "named asset the site uses" lives in
`scripts/export-assets.mjs`. See `PHOTO_MANIFEST.md`.

Two gaps are unfilled and deliberately visible: there is no commercial *room*
photo, and **zero** camera/NVR photos across all 38 source frames. Those slots
render an honest "photography pending" plate. The vendor marketing files in
`photos-source/` must not fill them — a Control4 press shot is not evidence of
a Latserof install.

## Before launch

See `QUESTIONS-FOR-THOMAS.md`. The blocking items are the two missing photo
subjects, the domain, the Resend credentials, and sign-off on the reworked
homepage and the draft copy.

## Docs

- `CLAUDE.md` — design system, business facts, conventions
- `PHOTO_MANIFEST.md` — every source photo, described
- `QUESTIONS-FOR-THOMAS.md` — open questions, ordered by what blocks launch
