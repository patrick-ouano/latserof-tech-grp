import { expect, test } from "@playwright/test";

/**
 * The guarantees that are easy to break and impossible to notice.
 *
 * Every one of these has a failure mode where the page looks completely
 * fine to whoever shipped it and is broken for somebody else.
 */

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  const PAGES = ["/", "/residential", "/commercial", "/systems", "/work", "/about"];

  for (const path of PAGES) {
    test(`${path} shows all of its content`, async ({ page }) => {
      await page.goto(path);

      // Scroll-reveal hides content only once the `js` class is set, and
      // only a script sets it. If this ever regresses, the whole page below
      // the fold is invisible to crawlers and to anyone with JS blocked.
      const hidden = await page
        .locator("[data-reveal]")
        .evaluateAll((nodes) =>
          nodes.filter((n) => getComputedStyle(n).opacity === "0").length,
        );
      expect(hidden, `${path} has invisible revealed content`).toBe(0);

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }

  test("the FAQ still opens, because it is a native <details>", async ({ page }) => {
    // Entrance animations are still CSS, and still run with JS off — they
    // make the summary a moving target for the click. The point of this
    // test is the <details> semantics, not the motion.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/residential");
    const first = page.locator("details").first();
    await expect(first.locator("p")).toBeHidden();
    await first.locator("summary").click();
    await expect(first.locator("p")).toBeVisible();
  });
});

test.describe("reduced motion", () => {
  /**
   * Emulated explicitly rather than via `test.use({ reducedMotion })`, which
   * silently does not take effect here — the media query still evaluated
   * false inside the page, so these tests would have passed against the
   * animated build and proven nothing.
   */
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("nothing is left hidden or offset", async ({ page }) => {
    await page.goto("/systems");
    await page.waitForLoadState("networkidle");

    const offenders = await page
      .locator("[data-reveal]")
      .evaluateAll((nodes) =>
        nodes
          .filter((n) => {
            const s = getComputedStyle(n);
            return s.opacity !== "1" || (s.transform !== "none" && s.transform !== "");
          })
          .map((n) => n.textContent?.slice(0, 40)),
      );
    expect(offenders).toEqual([]);
  });

  /**
   * The subtle one: collapsing animation-duration but not animation-delay
   * leaves an element parked on its hidden first keyframe under
   * `fill-mode: both` — trading a slow fade for a blank flash.
   */
  test("the staggered hero entrance is not left mid-animation", async ({ page }) => {
    await page.goto("/");
    const opacity = await page
      .locator("h1 span span")
      .first()
      .evaluate((n) => getComputedStyle(n).opacity);
    expect(opacity).toBe("1");
  });
});

test.describe("accessibility basics", () => {
  // Deterministic: these tests interact with a settled page. The animated
  // path is covered by the reduced-motion block above and by Reveal's unit
  // tests.
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("the skip link is the first thing a keyboard user reaches", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });

  test("every image carries an alt attribute", async ({ page }) => {
    for (const path of ["/", "/residential", "/systems", "/work", "/about"]) {
      await page.goto(path);
      const missing = await page
        .locator("img:not([alt])")
        .count();
      expect(missing, `${path} has an image with no alt attribute`).toBe(0);
    }
  });

  test("headings descend without skipping a level", async ({ page }) => {
    for (const path of ["/", "/residential", "/commercial", "/systems", "/about"]) {
      await page.goto(path);
      const levels = await page
        .locator("h1, h2, h3, h4")
        .evaluateAll((nodes) => nodes.map((n) => Number(n.tagName[1])));

      expect(levels[0], `${path} does not start at h1`).toBe(1);
      for (let i = 1; i < levels.length; i += 1) {
        expect(
          levels[i] - levels[i - 1],
          `${path} jumps from h${levels[i - 1]} to h${levels[i]}`,
        ).toBeLessThanOrEqual(1);
      }
    }
  });

  test("the focus ring is never removed", async ({ page }) => {
    await page.goto("/contact");
    const input = page.getByLabel(/^Name/);
    await input.focus();
    const outline = await input.evaluate((n) => getComputedStyle(n).outlineWidth);
    expect(outline).not.toBe("0px");
  });
});

test.describe("layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("no page scrolls sideways at any width", async ({ page }) => {
    for (const width of [360, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["/", "/systems", "/work", "/contact"]) {
        await page.goto(path);
        const overflows = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth + 1,
        );
        expect(overflows, `${path} overflows at ${width}px`).toBe(false);
      }
    }
  });
});
