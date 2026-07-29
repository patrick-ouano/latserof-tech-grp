import { expect, test } from "@playwright/test";

const PAGES = [
  "/",
  "/residential",
  "/commercial",
  "/systems",
  "/work",
  "/about",
  "/contact",
];

/**
 * Hydration and runtime console health.
 *
 * This exists because of a real regression: the capability script in
 * layout.tsx writes `js`/`sda` onto <html> before React hydrates — which is
 * the whole point of it, since setting those after paint caused content to
 * flash — and React then flagged the resulting className mismatch on every
 * single page load.
 *
 * Nothing in the build, the types, the unit tests or the rest of the E2E
 * suite noticed. It was only visible in a browser console, which is exactly
 * the class of bug worth automating.
 *
 * Runs against `next dev` (the "hydration" project in playwright.config.ts),
 * because React reports mismatches in development only — a production build
 * stays silent and just re-renders.
 */

/**
 * Expected noise, not defects:
 *  - @vercel/analytics requests /_vercel/insights/script.js, which only
 *    exists on Vercel. layout.tsx documents it as a no-op elsewhere.
 *  - the dev server's own HMR/websocket chatter.
 */
const EXPECTED = [
  /_vercel\/insights/i,
  /favicon/i,
  /webpack|hmr|hot-update|websocket/i,
];

/**
 * The capability classes, asserted directly rather than by waiting for
 * React to complain.
 *
 * The server cannot know these — they describe the browser — so the server
 * HTML and the live DOM disagree about <html class> by design, and <html>
 * carries suppressHydrationWarning to say so. That makes React's warning an
 * unreliable signal, so the invariant is checked head-on instead:
 *
 *   - the classes really are applied (the anti-flash guarantee), and
 *   - they are the ONLY difference, so nothing else has quietly started
 *     mutating <html> before hydration under cover of the suppression.
 */
test("only the capability classes differ between server and client", async ({
  page,
}) => {
  const response = await page.goto("/");
  const html = await response!.text();
  const server = (html.match(/<html[^>]*class="([^"]*)"/) ?? [])[1] ?? "";

  // The capability script is inline in <body>, so it has run by `load`.
  await page.waitForLoadState("load");
  const client = (await page.locator("html").getAttribute("class")) ?? "";

  const added = client
    .split(/\s+/)
    .filter((c) => c && !server.split(/\s+/).includes(c));
  const removed = server
    .split(/\s+/)
    .filter((c) => c && !client.split(/\s+/).includes(c));

  expect(added.sort()).toEqual(["js", "sda"]);
  expect(removed).toEqual([]);
});
for (const path of PAGES) {
  test(`${path} hydrates with a clean console`, async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto(path);
    await page.waitForLoadState("load");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Hydration runs just after load and there is no event for "React has
    // finished and would have logged by now", so this settles for it.
    await page.waitForTimeout(1000);

    const hydration = errors.filter((e) =>
      /hydrat|did not match|server rendered HTML/i.test(e),
    );
    expect(hydration, `hydration errors on ${path}`).toEqual([]);

    const unexpected = errors.filter((e) => !EXPECTED.some((r) => r.test(e)));
    expect(unexpected, `console errors on ${path}`).toEqual([]);
  });
}
