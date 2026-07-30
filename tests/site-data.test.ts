import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { projects, projectsIn } from "@/data/projects";
// `process` is aliased: site.ts exports one, and it would shadow Node's
// global that the filesystem assertions below rely on.
import {
  CTA_HREF,
  brands,
  deliveryProcess,
  disciplines,
  navLinks,
  offerings,
  process as processSteps,
  site,
  story,
} from "@/lib/site";

const ROOT = process.cwd();

/**
 * Data invariants.
 *
 * These are the failures that do not throw, do not break the build, and do
 * not look wrong in review — a phone link whose digits drift from the
 * number printed beside it, a nav entry pointing at a route nobody created,
 * a duplicate anchor that silently swallows a deep link. Cheap to assert,
 * genuinely expensive to ship.
 */
describe("business facts", () => {
  it("keeps the tel: href and the displayed number in sync", () => {
    const displayed = site.phoneDisplay.replace(/\D/g, "");
    const dialled = site.phoneHref.replace(/\D/g, "");
    expect(site.phoneHref.startsWith("tel:+")).toBe(true);
    // The href carries a country code the display string does not.
    expect(dialled).toBe(`1${displayed}`);
  });

  it("is an LLC, as confirmed by Thomas", () => {
    expect(site.legalName).toContain("LLC");
    expect(site.legalName).not.toContain("Inc.");
  });

  it("has an absolute site url with no trailing slash", () => {
    expect(site.url).toMatch(/^https:\/\//);
    expect(site.url.endsWith("/")).toBe(false);
  });
});

describe("disciplines", () => {
  it("has exactly four — the homepage copy commits to it", () => {
    // "Four disciplines, one contractor" is approved copy. A fifth entry
    // would make the page contradict itself.
    expect(disciplines).toHaveLength(4);
  });

  it("uses unique slugs, so /systems anchors cannot collide", () => {
    const slugs = disciplines.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("numbers them 01–04 in order", () => {
    expect(disciplines.map((d) => d.number)).toEqual(["01", "02", "03", "04"]);
  });

  it("gives every discipline copy for both audiences and a non-empty includes list", () => {
    for (const d of disciplines) {
      expect(d.title.length).toBeGreaterThan(0);
      expect(d.body.length).toBeGreaterThan(0);
      expect(d.residential.length).toBeGreaterThan(0);
      expect(d.commercial.length).toBeGreaterThan(0);
      expect(d.includes.length).toBeGreaterThan(0);
    }
  });

  it("pairs every image with alt text, and every missing image with none", () => {
    for (const d of disciplines) {
      // Read `image` at its wider type on purpose. All four disciplines have
      // a photo now, so TS narrows it to `string` and calls the else branch
      // `never` — but the invariant under test is "photo and alt text travel
      // together", which has to keep holding the day a photo is pulled.
      const image: string | null = d.image;
      if (image) {
        expect(image.startsWith("/images/")).toBe(true);
        expect(d.imageAlt.length).toBeGreaterThan(0);
      } else {
        expect(d.imageAlt).toBe("");
      }
    }
  });
});

describe("navigation", () => {
  it("points every nav link at a route that exists", () => {
    for (const link of navLinks) {
      const page = path.join(ROOT, "src", "app", link.href.slice(1), "page.tsx");
      expect(existsSync(page), `missing page for ${link.href}`).toBe(true);
    }
  });

  it("points every CTA at a route that exists", () => {
    const page = path.join(ROOT, "src", "app", CTA_HREF.slice(1), "page.tsx");
    expect(existsSync(page)).toBe(true);
  });

  it("uses unique hrefs", () => {
    const hrefs = navLinks.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("process and brands", () => {
  it("numbers the process steps in order", () => {
    expect(processSteps.map((s) => s.number)).toEqual(["01", "02", "03", "04"]);
  });

  it("numbers the ten delivery steps in order, with copy on each", () => {
    expect(deliveryProcess).toHaveLength(10);
    expect(deliveryProcess.map((s) => s.number)).toEqual([
      "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
    ]);
    for (const step of deliveryProcess) {
      expect(step.title.length).toBeGreaterThan(0);
      expect(step.body.length).toBeGreaterThan(0);
    }
  });

  it("keeps the four-beat summary and the long form as separate sequences", () => {
    // /residential and /commercial render `process`; /about renders
    // `deliveryProcess`. Collapsing one into the other would silently change
    // three pages at once.
    expect(processSteps.length).not.toBe(deliveryProcess.length);
  });

  it("lists the dealer lines and distributor partners", () => {
    expect(brands.length).toBeGreaterThanOrEqual(3);
    expect(brands).toContain("Control4");
    expect(brands).toContain("Crestron");
    expect(brands).toContain("Lutron");
  });
});

describe("story", () => {
  it("gives every block a label and real paragraphs", () => {
    expect(story.length).toBeGreaterThan(0);
    const labels = story.map((b) => b.label);
    expect(new Set(labels).size).toBe(labels.length);
    for (const block of story) {
      expect(block.paragraphs.length).toBeGreaterThan(0);
      for (const p of block.paragraphs) expect(p.length).toBeGreaterThan(40);
    }
  });

  /**
   * The source copy called the company three different things and listed a
   * city outside the service area. Both were normalised on the way in, and
   * both are the kind of thing that creeps back the next time copy is pasted.
   */
  it("names the company one way, and claims no service area we do not state", () => {
    const prose = story.flatMap((b) => b.paragraphs).join(" ");
    expect(prose).toContain(site.brand);
    expect(prose).not.toContain("LTG Technologies");
    expect(prose).not.toContain("Latserof Technologies Group");
    expect(prose).not.toContain("Stuart");
    expect(prose).not.toContain("Orange County");
  });

  it("keeps the capability list as data, not a paragraph", () => {
    expect(offerings.length).toBeGreaterThan(8);
    for (const item of offerings) {
      expect(item.length).toBeGreaterThan(3);
    }
  });
});

describe("projects", () => {
  it("gives every project a category, title and location", () => {
    for (const p of projects) {
      expect(p.category.length).toBeGreaterThan(0);
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.location.length).toBeGreaterThan(0);
    }
  });

  it("uses unique titles — ProjectGrid keys on them", () => {
    const titles = projects.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("gives every photographed project real alt text", () => {
    for (const p of projects.filter((x) => x.image)) {
      expect(p.alt?.length, `${p.title} has no alt text`).toBeGreaterThan(0);
    }
  });

  it("ships every referenced image file", () => {
    for (const p of projects.filter((x) => x.image)) {
      const file = path.join(ROOT, "public", p.image!);
      expect(existsSync(file), `missing ${p.image}`).toBe(true);
    }
  });

  /**
   * The homepage renders the first three cards and the approved handoff
   * specifies them as RESIDENTIAL / COMMERCIAL / SURVEILLANCE. Appending a
   * project to the middle of this array silently drops a card the client
   * signed off on — and hides the photography gap from the one person who
   * can close it.
   */
  it("keeps the handoff's three categories in the homepage slots", () => {
    expect(projects.slice(0, 3).map((p) => p.category)).toEqual([
      "RESIDENTIAL",
      "COMMERCIAL",
      "SURVEILLANCE",
    ]);
  });

  it("filters by category, and caps when asked", () => {
    expect(projectsIn(["COMMERCIAL"]).every((p) => p.category === "COMMERCIAL"))
      .toBe(true);
    expect(projectsIn(["RESIDENTIAL"], 2)).toHaveLength(2);
    expect(projectsIn(["NOPE"])).toHaveLength(0);
  });
});
