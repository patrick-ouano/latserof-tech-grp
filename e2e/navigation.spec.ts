import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test("every CTA lands on the quote form", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: "Request for Survey" })
      .first()
      .click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("button", { name: /Request for Survey/i }))
      .toBeVisible();
  });

  test("a discipline card deep-links into its section on /systems", async ({
    page,
  }) => {
    test.skip(
      page.viewportSize()!.width < 1024,
      "the desktop card grid is the entry point being tested",
    );
    await page.goto("/");
    await page.getByRole("link", { name: /Cinema & media rooms/ }).first().click();
    await expect(page).toHaveURL(/\/systems#cinema$/);
    // scroll-padding-top must keep the target clear of the sticky header.
    await expect(page.locator("#cinema")).toBeInViewport();
  });

  test('"See the work" anchors to the installations band', async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "See the work" }).click();
    await expect(page.locator("#work")).toBeInViewport();
  });

  test("the header marks the current section", async ({ page }) => {
    test.skip(page.viewportSize()!.width < 1024, "desktop nav only");
    await page.goto("/work");
    await expect(
      page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Work" }),
    ).toHaveAttribute("aria-current", "page");
  });
});

test.describe("mobile drawer", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1024, "drawer is mobile-only");

  test("opens, navigates, and closes itself on arrival", async ({ page }) => {
    await page.goto("/");
    const drawer = page.locator("#mobile-nav");
    const toggle = page.getByRole("button", { name: "Open menu" });

    // Closed: inert, so its links are out of the tab order entirely.
    await expect(drawer).toHaveAttribute("inert", "");

    await toggle.click();
    await expect(drawer).not.toHaveAttribute("inert", "");
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

    await drawer.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(drawer).toHaveAttribute("inert", "");
  });

  test("closes on Escape", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.locator("#mobile-nav")).not.toHaveAttribute("inert", "");

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav")).toHaveAttribute("inert", "");
  });

  /**
   * The drawer stores the route it was opened on rather than a boolean, so
   * a history navigation closes it. An onClick handler never sees this.
   */
  test("closes when the browser navigates back", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator("#mobile-nav").getByRole("link", { name: "Systems" }).click();
    await expect(page).toHaveURL(/\/systems$/);

    await page.goBack();
    await expect(page.locator("#mobile-nav")).toHaveAttribute("inert", "");
  });
});

