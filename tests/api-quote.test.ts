// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/quote/route";
import { EMPTY_QUOTE, type QuoteRequest } from "@/lib/quote";

const post = (body: unknown) =>
  POST(
    new Request("http://localhost/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );

const valid = (over: Partial<QuoteRequest> = {}) => ({
  ...EMPTY_QUOTE,
  name: "Thomas",
  phone: "4079274434",
  ...over,
});

beforeEach(() => {
  vi.unstubAllEnvs();
  // Silence the route's deliberate console output.
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

/**
 * The route validates independently of the form, because anything can POST
 * here — a bot, a stale tab, curl.
 */
describe("POST /api/quote", () => {
  it("rejects a malformed body", async () => {
    const res = await post("{not json");
    expect(res.status).toBe(400);
  });

  it("rejects an invalid submission with field errors", async () => {
    const res = await post({ name: "", phone: "", email: "" });
    expect(res.status).toBe(422);
    await expect(res.json()).resolves.toMatchObject({
      errors: { name: expect.any(String) },
    });
  });

  it("coerces hostile field types rather than throwing", async () => {
    // A client sending numbers, nulls and objects must get a 422, not a 500.
    const res = await post({ name: 42, phone: null, scope: [1, "ok", {}], message: [] });
    expect(res.status).toBe(422);
  });

  /**
   * Accepted and discarded, not rejected: an error response tells a bot
   * exactly which field gave it away.
   */
  it("silently accepts a honeypot submission without delivering it", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("QUOTE_TO_EMAIL", "leads@example.com");

    const res = await post(valid({ company: "definitely a bot" }));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  /**
   * The single most important behaviour in this file. Silently accepting a
   * form and dropping the lead is the worst possible failure for this site:
   * the visitor believes they made contact and nobody ever calls them back.
   */
  it("refuses to pretend it delivered when credentials are missing in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("QUOTE_TO_EMAIL", "");

    const res = await post(valid());

    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.error).toMatch(/call us/i);
    expect(body.ok).toBeUndefined();
  });

  it("logs instead of sending in development, and says it did not deliver", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("QUOTE_TO_EMAIL", "");

    const res = await post(valid());

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true, delivered: false });
  });

  it("sends through Resend when configured", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchSpy);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("QUOTE_TO_EMAIL", "leads@example.com");

    const res = await post(valid({ email: "customer@example.com", city: "Windermere" }));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true, delivered: true });

    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test");

    const sent = JSON.parse(init.body);
    expect(sent.to).toEqual(["leads@example.com"]);
    // So Thomas can hit reply and reach the customer directly.
    expect(sent.reply_to).toBe("customer@example.com");
    expect(sent.subject).toContain("Thomas");
    expect(sent.subject).toContain("Windermere");
  });

  it("reports a provider rejection as a failure, never as success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        text: async () => "unauthorised",
      }),
    );
    vi.stubEnv("RESEND_API_KEY", "re_bad");
    vi.stubEnv("QUOTE_TO_EMAIL", "leads@example.com");

    const res = await post(valid());
    expect(res.status).toBe(502);
    await expect(res.json()).resolves.toMatchObject({ error: expect.any(String) });
  });

  it("survives the delivery call throwing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("socket hang up")));
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("QUOTE_TO_EMAIL", "leads@example.com");

    const res = await post(valid());
    expect(res.status).toBe(502);
  });
});
