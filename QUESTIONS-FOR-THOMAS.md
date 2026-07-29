# Questions for Thomas — Latserof website

Ordered by what blocks launch.

---

## 1. Blocking

### Photos

- [ ] **Two shots missing entirely.** Across all 38 project photos there is no commercial room and no camera install:
	- [ ] One **commercial** job — boardroom, conference room, office AV, anything non-residential
	- [ ] One **camera / NVR / surveillance** install
	- Phone photos are fine. The Dec 2023 theater set was shot on a Pixel and is the best material we have.
- [ ] **Locations** — city is enough (e.g. "Windermere, FL"). Several photos are the same job from different angles, so this is per **room**, not per photo:
	- [ ] Modern theater — charcoal walls, blue LED cove lighting, black quilted recliners *(Dec 2023)*
	- [ ] Roman theater — gold columns, red recliners, painted star ceiling
	- [ ] Tiered theater — red/gold damask wall panels, mahogany trim
	- [ ] Dark mahogany cinema — striped drapes, wall sconces
	- [ ] Attic theater — curved beams, tan leather recliners
	- [ ] Gold plaster theater — film-reel carpet
	- [ ] Theater with wet bar — arched projector niche
	- [ ] Theater with framed Gladiator poster
	- [ ] Media room — mustard/yellow sofas, red carpet
	- [ ] Modern loft landing — wall-mounted TV, glass railing
	- [ ] 2-channel listening room — large floorstanding speakers, tube amps
	- [ ] The MXnet rack with test monitors *(currently on the Commercial card)*
- [ ] **Bigger original of `Foerstal 676.JPG`?** It's the only commercial interior in the collection but it's 480×320 — too small to use.
- [ ] **Happy to appear on the site?** Five photos have him in frame. One would work well on an About page — his call.

### Business details

- [ ] **Licence number.** The site says "Licensed & insured low-voltage contractor." Florida low-voltage contractors are licensed through the ECLB and the number is normally shown in advertising. Confirm whether it needs displaying — cheap now, annoying to retrofit.
- [ ] **Domain** — registered at GoDaddy. Need:
	- [ ] The exact domain name
	- [ ] Either GoDaddy login, or he adds two DNS records we send him. *(Deploying to Vercel — the domain stays at GoDaddy, only the DNS points elsewhere. Nothing transfers, nothing is at risk.)*
- [ ] **Where should quote form submissions go?** Which email address, and does he want a copy sent anywhere else.
- [ ] **Service area** — which counties/cities specifically, for the search-engine data.

### Logo

- [ ] **A real vector of the emblem** — SVG or EPS, still outstanding.
	- The file supplied as `Latserof Tech Grp Logo Vector.svg` is **not a vector**. It's a single 2160px JPEG wrapped in an `<svg>` tag — zero drawn paths — which is why it's 1.6MB, larger than the PNG it was meant to replace. It's also a *photograph of the physical embroidered patch lying on white fabric*, with the wordmark included and no transparency, so it can't sit on the site's black background.
	- Whoever produced the embroidery digitising file will have the real artwork. Ask for **.svg, .eps or .ai** — and specifically for artwork with a transparent background, not a photo of the patch.
	- Not urgent: the badge is now served at 31KB (down from 979KB) and looks correct at every size the site uses. The vector only matters if the mark ever needs to appear large — vehicle livery, signage, print.

---

## 2. Worth asking, not blocking

- [ ] **Google Business Profile** — does one exist? I couldn't find one, or any listing, review or website. For a local contractor this is often worth more traffic than the website itself. If it doesn't exist, it should.
- [ ] **Dealer marketing rights** for the Control4 / Araknis / ClareVision material he sent. Most dealer programs allow it, but confirm before any of it goes on the site. *(It's vendor stock photography, so it can't be used as project photos regardless — only as a "brands we carry" section.)*
- [ ] **Project detail pages** — should clicking a project open a full case study, or are the cards just images? Decides whether we build extra pages.
- [ ] **Any jobs he does NOT want shown?** Some clients don't want their homes published, even unnamed.
- [ ] **Testimonials** — any happy clients who'd give a sentence? Even two or three would strengthen the page a lot.
- [ ] **Insurance certificate / affiliations** — anything else worth showing as a trust signal.

---

## 3. Draft copy to sign off

**Every page is now built and written.** The copy on the five new pages is
**draft and needs his eye.** It was written deliberately conservatively: every
line either restates approved homepage copy or a fact already on file above.

Nothing on the site claims a founding year, a crew size, an install count, a
licence number, a certification, an award or a testimonial — because none of
those have been confirmed. That is why the pages read a little lean. Most of
the questions below would let us fix that.

- [ ] **Read all five pages** — /residential, /commercial, /systems, /work, /about.
- [ ] **"What that includes" lists** on /systems — four bullet lists derived from his own discipline descriptions. Are they accurate and complete? (`disciplines[].includes` in `src/lib/site.ts`)
- [ ] **The four process steps** — Walkthrough → Design → Install → Service. Is that how a job actually runs?
- [ ] **/about is thin, deliberately.** To fill it out: how long in business, how it started, size of crew, what genuinely separates them from other Orlando integrators.
- [ ] **"And yes — Latserof is Forestal spelled backwards."** Currently on /about. Charming and true, but it's his name — happy to keep it, or cut it?
- [ ] **The "we are not a retail store" panel** on /residential. It's an honest differentiator and heads off the wrong kind of enquiry, but confirm the tone is right.
- [ ] **Pricing posture** — the brief says no public pricing, and /residential answers "Do you publish pricing?" with "no, the walkthrough produces a real number." Confirm he doesn't even want "projects typically start around $X", which does filter out time-wasters.
- [ ] **Homepage rework** — the homepage no longer looks like the flat 2a mockup he signed off. Same colours and type, but with depth, rounded cards, glow and motion. **He needs to see and approve this.**

---

## Answered

- [x] **Legal name** — ~~Latserof Tech Grp LLC~~ → **Latserof Technologies Grp Inc.** Already corrected in the code. *(The design handoff still has the old LLC name in the footer; that's been overridden.)*
- [x] **Domain exists** — registered at GoDaddy. Still need the name and DNS access.
- [x] **Dealer brands** — Crestron, Control4 and Lutron confirmed correct as written in the brief. No change needed.
- [x] **Visual privacy** — added to the homepage as a partner offering with Corio Design, linking to [coriodesign.com/visualprivacy](https://www.coriodesign.com/visualprivacy). Placed after the four disciplines rather than as a fifth one, so it doesn't contradict the "Four disciplines, one contractor" line. *Worth confirming with him: is the copy right, and should Corio be named?*

## On file

- Phone: **(407) 927-4434**
- Address: **3050 Dyer Blvd, Suite 242, Kissimmee, FL 34741**
- Hours: **Mon–Fri 8:00–5:00**, service calls by appointment
- Owner: Thomas John Forestal, Owner / Operations Manager, Custom Design & Engineering
