import { expect, test } from "@playwright/test";

const PAGES = [
  { path: "/", heading: /One system\./ },
  { path: "/residential", heading: /Every room on/ },
  { path: "/commercial", heading: /Rooms that work/ },
  { path: "/systems", heading: /Four disciplines/ },
  { path: "/work", heading: /Recent/ },
  { path: "/about", heading: /The same crew/ },
  { path: "/contact", heading: /Tell us/ },
];

test.describe("routes", () => {
  for (const page_ of PAGES) {
    test(`${page_.path} renders with exactly one h1`, async ({ page }) => {
      const response = await page.goto(page_.path);
      expect(response?.status()).toBe(200);

      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toContainText(page_.heading);
    });

    /**
     * A canonical on the root layout is inherited by every route, which
     * would tell search engines these pages are duplicates of the homepage.
     * That regression is invisible in the browser, so it is pinned here.
     */
    test(`${page_.path} declares its own canonical`, async ({ page }) => {
      await page.goto(page_.path);
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toBeTruthy();
      expect(new URL(canonical!).pathname).toBe(page_.path);
    });

    test(`${page_.path} offers a dialable phone number`, async ({ page }) => {
      await page.goto(page_.path);
      await expect(
        page.locator('a[href="tel:+14079274434"]').first(),
      ).toBeAttached();
    });
  }

  test("no page still shows the scaffolding stub", async ({ page }) => {
    for (const { path } of PAGES) {
      await page.goto(path);
      await expect(page.getByText("Not yet designed")).toHaveCount(0);
    }
  });

  test("serves a real 404 that still offers a way to make contact", async ({ page }) => {
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /isn.t here/,
    );
    await expect(page.locator('a[href="tel:+14079274434"]').first()).toBeAttached();
  });

  test("sitemap lists every page and robots points at it", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const { path } of PAGES) {
      expect(sitemap).toContain(path === "/" ? "<loc>" : path);
    }

    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap:");
    expect(robots).toContain("Disallow: /api/");
  });

  test("publishes LocalBusiness data that points at files which exist", async ({
    page,
    request,
  }) => {
    await page.goto("/");
    const raw = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const data = JSON.parse(raw!);

    expect(data["@type"]).toBe("LocalBusiness");
    // Search engines want a dialable number with a country code.
    expect(data.telephone).toBe("+14079274434");
    expect(data.legalName).toContain("Inc.");

    // Structured data pointing at a missing image is worse than none.
    for (const url of [data.logo, data.image]) {
      const res = await request.get(new URL(url).pathname);
      expect(res.status(), `${url} is not served`).toBe(200);
    }
  });
});
