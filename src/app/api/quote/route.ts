import { NextResponse } from "next/server";

import {
  EMPTY_QUOTE,
  formatQuoteEmail,
  hasErrors,
  validateQuote,
  type QuoteRequest,
} from "@/lib/quote";
import { site } from "@/lib/site";

/**
 * Quote request handler.
 *
 * Delivery is via Resend, configured with two environment variables:
 *
 *   RESEND_API_KEY   from resend.com
 *   QUOTE_TO_EMAIL   where Thomas wants leads to land
 *
 * If those are missing in production the route returns 503 rather than
 * pretending to succeed. Silently accepting a form and dropping the lead is
 * the worst possible failure for a lead-generation site — the visitor thinks
 * they made contact and nobody ever calls them back.
 *
 * In development it logs the submission to the server console instead, so
 * the form can be exercised end to end without credentials.
 */

export const runtime = "nodejs";

function coerce(body: unknown): QuoteRequest {
  const b = (body ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  return {
    ...EMPTY_QUOTE,
    name: str(b.name),
    phone: str(b.phone),
    email: str(b.email),
    city: str(b.city),
    message: str(b.message),
    propertyType: (str(b.propertyType) as QuoteRequest["propertyType"]) || "",
    scope: Array.isArray(b.scope) ? b.scope.filter((s) => typeof s === "string") : [],
    company: str(b.company),
  };
}

export async function POST(request: Request) {
  let payload: QuoteRequest;
  try {
    payload = coerce(await request.json());
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real browser never fills this, so accept and discard rather
  // than returning an error a bot could learn from.
  if (payload.company?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateQuote(payload);
  if (hasErrors(errors)) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL ?? "quotes@latseroftech.com";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "\n[quote] RESEND_API_KEY / QUOTE_TO_EMAIL are not set — logging instead of sending.\n" +
          formatQuoteEmail(payload) +
          "\n",
      );
      return NextResponse.json({ ok: true, delivered: false });
    }
    console.error("[quote] delivery is not configured; refusing to drop a lead");
    return NextResponse.json(
      {
        error: `We couldn't send that just now. Please call us on ${site.phoneDisplay}.`,
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.brand} <${from}>`,
        to: [to],
        // So Thomas can hit reply and reach the customer directly.
        reply_to: payload.email || undefined,
        subject: `Quote request — ${payload.name}${payload.city ? `, ${payload.city}` : ""}`,
        text: formatQuoteEmail(payload),
      }),
    });

    if (!res.ok) {
      console.error("[quote] resend rejected the send:", res.status, await res.text());
      return NextResponse.json(
        {
          error: `We couldn't send that just now. Please call us on ${site.phoneDisplay}.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[quote] delivery threw:", err);
    return NextResponse.json(
      {
        error: `We couldn't send that just now. Please call us on ${site.phoneDisplay}.`,
      },
      { status: 502 },
    );
  }
}
