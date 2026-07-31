import { expect, test } from "@playwright/test";

/**
 * The form is the site's only conversion point, so it is exercised against
 * a real build with the network stubbed at the boundary rather than mocked
 * inside the component.
 */
test.describe("quote form", () => {
  test.beforeEach(async ({ page }) => {
    // Settle the entrance animations first: they move the controls under
    // the cursor and make clicks flake. Motion itself is covered in
    // resilience.spec.ts.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/contact");
  });

  /* Scoped to the form. Next injects its own role="alert" route announcer
     into every page, so an unscoped getByRole("alert") is ambiguous. */
  const alertIn = (page: import("@playwright/test").Page) =>
    page.locator("form").getByRole("alert").first();

  test("refuses to submit an empty form and says why", async ({ page }) => {
    let posted = false;
    await page.route("**/api/quote", async (route) => {
      posted = true;
      await route.abort();
    });

    await page.getByRole("button", { name: /Request for Survey/i }).click();

    const alert = alertIn(page);
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(/tell us your name/i);
    expect(posted).toBe(false);
  });

  test("accepts a name plus one contact method", async ({ page }) => {
    await page.route("**/api/quote", (route) =>
      route.fulfill({ json: { ok: true } }),
    );

    await page.getByLabel(/^Name/).fill("Thomas Forestal");
    await page.getByLabel(/^Phone/).fill("(855) 530-4434");
    await page.getByRole("button", { name: /Request for Survey/i }).click();

    await expect(page.getByRole("status")).toContainText(/we.ve got it/i);
  });

  test("sends the selected scope with the request", async ({ page }) => {
    let body: Record<string, unknown> = {};
    await page.route("**/api/quote", async (route) => {
      body = JSON.parse(route.request().postData() ?? "{}");
      await route.fulfill({ json: { ok: true } });
    });

    await page.getByLabel(/^Name/).fill("Thomas");
    await page.getByLabel(/^Email/).fill("t@example.com");
    // Click the label, not the input: the real input is visually hidden
    // (sr-only) so it stays keyboard- and form-native, which means it is
    // off-screen and not directly clickable.
    await page.locator("label").filter({ hasText: "Networks that hold" }).click();
    await page.locator("label").filter({ hasText: /^Commercial$/ }).click();
    await page.getByRole("button", { name: /Request for Survey/i }).click();

    await expect(page.getByRole("status")).toBeVisible();
    expect(body.scope).toEqual(["Networks that hold"]);
    expect(body.propertyType).toBe("Commercial");
  });

  /**
   * The failure that matters most: if delivery is not configured, the
   * visitor must be told to phone instead of being thanked. Being thanked
   * means they stop chasing and nobody ever calls them back.
   */
  test("never thanks the visitor when delivery failed", async ({ page }) => {
    await page.route("**/api/quote", (route) =>
      route.fulfill({
        status: 503,
        json: { error: "We couldn't send that just now. Please call us on (855) 530-4434." },
      }),
    );

    await page.getByLabel(/^Name/).fill("Thomas");
    await page.getByLabel(/^Phone/).fill("8555304434");
    await page.getByRole("button", { name: /Request for Survey/i }).click();

    await expect(alertIn(page)).toContainText(/855/);
    await expect(page.getByRole("status")).toHaveCount(0);
  });

  test("is fully operable from the keyboard", async ({ page }) => {
    await page.getByLabel(/^Name/).focus();
    await page.keyboard.type("Thomas");

    // Chips are real inputs behind their styling, so Space toggles them.
    await page.getByRole("checkbox", { name: "Cinema & media rooms" }).focus();
    await page.keyboard.press("Space");
    await expect(
      page.getByRole("checkbox", { name: "Cinema & media rooms" }),
    ).toBeChecked();
  });
});

