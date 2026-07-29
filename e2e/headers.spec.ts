import { expect, test } from "@playwright/test";

/**
 * Headers are declared in next.config.ts rather than vercel.json precisely
 * so they can be asserted here — a header that only exists in production is
 * a header nobody ever tests.
 */
test.describe("security headers", () => {
  test("are set on page responses", async ({ request }) => {
    const headers = (await request.get("/")).headers();

    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["permissions-policy"]).toContain("camera=()");
  });

  test("are set on the quote endpoint too", async ({ request }) => {
    const res = await request.post("/api/quote", {
      data: { name: "", phone: "", email: "" },
      failOnStatusCode: false,
    });
    expect(res.status()).toBe(422);
    expect(res.headers()["x-content-type-options"]).toBe("nosniff");
  });
});
