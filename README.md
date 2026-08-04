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
  Marketing website for Latserof Technologies Grp LLC — a licensed low-voltage /
  custom AV and automation integrator serving Greater Orlando, Central Florida
  and Tampa.
</p>

---

## Overview

Lead-generation site for a local integrator: visitors explore disciplines and
recent installs, then request an on-site survey. No public pricing, no
e-commerce, no product catalog.

Built with Next.js App Router and static generation. The only dynamic route is
the survey form handler (`POST /api/quote`), which emails leads through Resend.

---

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/residential` | Home systems |
| `/commercial` | Schools, restaurants, businesses |
| `/systems` | Four disciplines |
| `/work` | Recent installations |
| `/about` | Company story and delivery process |
| `/contact` | Survey form and contact details |

Primary CTA: **Request for Survey**.

---

## Highlights

- Custom **Gallery Black, lit** design system (ink / gold / paper)
- Four disciplines: cinema, control & lighting, networks, surveillance & access
- Survey form with Resend delivery and fail-closed production behaviour
- Motion that degrades cleanly (CSS timelines, reduced-motion, no-JS)
- LocalBusiness JSON-LD, sitemap, and security headers
- Vitest + Playwright CI on every push; Vercel handles deploys

---

## Tech Stack

| Layer | Tools |
|-------|--------|
| App | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Hosting | Vercel |
| Email | Resend |
| Tests | Vitest, Playwright, GitHub Actions |

---

## Project Structure

```
src/app/           Routes, layout, design tokens
src/components/    Shared UI
src/data/          Projects and manufacturer demos
src/lib/           Business facts and form validation
brand/             Logo source PNGs
public/            Shipped images and logo WebP
scripts/           Asset export pipeline
tests/ · e2e/      Unit and end-to-end suites
```

Business facts (phone, address, hours, brands, copy tokens) live in
`src/lib/site.ts` — components import them rather than hardcoding.

---

## Development

```bash
npm install
cp .env.example .env.local   # add Resend keys for real form delivery
npm run dev                  # http://localhost:3000
```

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build and serve |
| `npm test` | Unit tests |
| `npm run test:e2e` | Playwright (production build) |
| `npm run assets` | Export photos and logo into `public/` |

Production form delivery needs `RESEND_API_KEY` and `QUOTE_TO_EMAIL` (see
`.env.example`). Without them the API returns 503 in production instead of
pretending a lead was sent.

---

## Credits

Built for **Latserof Technologies Grp LLC**.

Stack: [Next.js](https://nextjs.org/) · [Tailwind CSS](https://tailwindcss.com/) ·
[Vitest](https://vitest.dev/) · [Playwright](https://playwright.dev/) ·
[Resend](https://resend.com/) · [Vercel](https://vercel.com/)

---

<p align="center">
  Latserof Technologies Grp LLC · Kissimmee, FL
</p>
