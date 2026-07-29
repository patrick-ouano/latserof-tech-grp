# Latserof Technologies Group — website

## Business facts (do not invent alternatives)
- Legal name: **Latserof Tech Grp LLC**. Display brand: **Latserof Technologies**.
- Owner: Thomas John Forestal (Owner / Operations Manager, Custom Design & Engineering).
- Phone: **(407) 927-4434** — always link as `tel:+14079274434`.
- Address: 3050 Dyer Blvd, Suite 242, Kissimmee, FL 34741.
- Hours: Mon–Fri 8:00–5:00. Service calls by appointment.
- Service area: Central Florida / greater Orlando.
- Business type: licensed low-voltage / custom AV & automation integrator (Crestron, Control4, Lutron dealer). **Not** a retail electronics store — no public pricing, no e-commerce, no SKU-level product pages.
- Four core disciplines: (01) Cinema & media rooms, (02) Control & lighting, (03) Networks that hold, (04) Cameras & access.

## Design system — status
- **Homepage: fully designed** — Direction 2a, "Gallery Black." Source of truth: `design/design_handoff_latserof_homepage/README.md` (full token table + copy) and `design/design_handoff_latserof_homepage/reference/homepage-2a.html` (static HTML reference — NOT production code, just look/spacing/copy at 1280px, no responsive behavior).
- **All other pages (Residential, Commercial, Systems, Work, About, and a Contact/Quote page): not yet designed.** When building these, extend the homepage's approved tokens and component patterns rather than inventing a new visual language. If a page needs a layout the homepage doesn't cover, flag it for a quick design pass before committing to code.
- Read the handoff README in full before writing any component — it has exact copy, spacing, hover states, and accessibility notes. Copy in the reference file is final; don't paraphrase headlines.

## Non-negotiable design constraints (apply site-wide, not just homepage)
- Palette is 3 real colors only: near-black `#0B0B0B` (`ink`), gold `#C6A15B`, warm off-white `#F2EFE8` (`paper`), plus tints (see README token table). **No second accent color.**
- Type: Archivo (headings/nav/buttons), Barlow (body/meta), Space Mono (numerals + category labels only).
- Border radius: 2px on buttons, 0 everywhere else. No shadows anywhere.
- No text ever sits directly over a photo without a solid plate behind it.
- `tel:` links for every phone number. Respect `prefers-reduced-motion` on any scroll/hover animation.
- Set up Tailwind theme tokens (`ink`, `gold`, `paper`, `hairline`, etc.) once in `tailwind.config` mapped to the hex values in the README — reference by name in components, never hardcode hex inline.

## Assets
- Logo: `design/design_handoff_latserof_homepage/assets/logo-badge.png` (the emblem — gold on black, brand anchor, **never recolor/crop/place on non-black surface**) and `logo-wordmark.png` (horizontal lockup, use if a wider version is needed). These are PNG placeholders — ask Thomas for a vector (SVG/EPS) before launch.
- Photography: see `PHOTO_MANIFEST.md` for the raw source photos and which ones map to which slot. All homepage reference photos are Pexels placeholders and **must** be swapped for real project photography before launch.
- Projects data should be modeled as data (not hardcoded JSX) — `{ category, title, location, image, slug? }` — since Thomas will add new installs over time.

## Forms
No contact/quote form exists yet in any design. Needs: name, phone, email, property type (Residential/Commercial), project scope (multi-select of the 4 disciplines), city, message. Required: name + at least one of phone/email. Inline errors in gold (`#C6A15B`). Submission handler: lightweight — a Next.js API route forwarding to an email service (Resend) or a form service (Web3Forms) is enough; no database needed for this site.

## Stack & architecture
- Next.js (App Router) + TypeScript + Tailwind CSS.
- Static generation where possible, deploy target Vercel.
- No backend/database for v1 — this is a lead-gen marketing site, not an app.
- Add `LocalBusiness` JSON-LD using the business facts above.

## Responsive targets (homepage spec — apply the same breakpoint logic sitewide)
- ≥1280px: as specified in the handoff, centered content, full-bleed dark bands.
- 1024–1279px: fluid, 40px gutter, H1 → 52px.
- 768–1023px: hero stacks (photo above text), services grid → 2-col, projects → 2-col, H1 → 44px.
- <768px: single column, 24px gutter, hamburger nav (solid black, gold links), H1 → 36px. Body copy never drops below 16px.

## Working conventions for this project
- This is a learning project for Claude Code — prefer Plan mode for anything multi-file (new pages, restructuring), default/manual approval for smaller edits.
- Commit incrementally with descriptive messages rather than one giant commit.
