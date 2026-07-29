import { describe, expect, it } from "vitest";

import {
  EMPTY_QUOTE,
  SCOPE_OPTIONS,
  formatQuoteEmail,
  hasErrors,
  validateQuote,
  type QuoteRequest,
} from "@/lib/quote";
import { disciplines } from "@/lib/site";

const quote = (over: Partial<QuoteRequest> = {}): QuoteRequest => ({
  ...EMPTY_QUOTE,
  ...over,
});

/**
 * These rules run in two places — the form and the API route — so they are
 * tested once, here, against the shared module rather than through either
 * caller.
 *
 * The stakes are asymmetric and the tests are written to match: wrongly
 * accepting a lead costs nothing, wrongly rejecting one loses a customer.
 */
describe("validateQuote", () => {
  it("requires a name", () => {
    expect(validateQuote(quote({ phone: "4079274434" })).name).toBeDefined();
    expect(
      validateQuote(quote({ name: "Thomas", phone: "4079274434" })).name,
    ).toBeUndefined();
  });

  it("treats whitespace as an absent name", () => {
    expect(validateQuote(quote({ name: "   ", phone: "4079274434" })).name)
      .toBeDefined();
  });

  it("requires a phone number or an email, not both", () => {
    expect(validateQuote(quote({ name: "Thomas" })).contact).toBeDefined();
    expect(
      hasErrors(validateQuote(quote({ name: "Thomas", phone: "4079274434" }))),
    ).toBe(false);
    expect(
      hasErrors(validateQuote(quote({ name: "Thomas", email: "t@example.com" }))),
    ).toBe(false);
  });

  // Rejecting a real number because of its punctuation is the single
  // easiest way for this form to lose a lead.
  it.each([
    "4079274434",
    "(407) 927-4434",
    "407-927-4434",
    "407.927.4434",
    "+1 407 927 4434",
    " 407 927 4434 ",
  ])("accepts %s as a phone number", (phone) => {
    expect(validateQuote(quote({ name: "T", phone })).phone).toBeUndefined();
  });

  it("rejects a phone number with too few digits", () => {
    expect(validateQuote(quote({ name: "T", phone: "40792744" })).phone)
      .toBeDefined();
  });

  it.each([
    "t@example.com",
    "thomas.forestal@sub.example.co.uk",
    "t+quotes@example.io",
  ])("accepts %s as an email", (email) => {
    expect(validateQuote(quote({ name: "T", email })).email).toBeUndefined();
  });

  it.each(["not-an-email", "t@example", "t @example.com", "@example.com"])(
    "rejects %s as an email",
    (email) => {
      expect(validateQuote(quote({ name: "T", email })).email).toBeDefined();
    },
  );

  it("flags an unreachable contact when both fields are present but malformed", () => {
    const errors = validateQuote(
      quote({ name: "T", phone: "123", email: "nope" }),
    );
    expect(errors.contact).toBeDefined();
  });

  // One good channel is enough — a typo'd email must not block a valid phone.
  it("accepts a valid phone alongside a malformed email", () => {
    const errors = validateQuote(
      quote({ name: "T", phone: "4079274434", email: "nope" }),
    );
    expect(errors.email).toBeDefined();
    expect(errors.contact).toBeUndefined();
  });

  it("caps the message length", () => {
    expect(
      validateQuote(quote({ name: "T", phone: "4079274434", message: "x".repeat(4001) }))
        .message,
    ).toBeDefined();
    expect(
      validateQuote(quote({ name: "T", phone: "4079274434", message: "x".repeat(4000) }))
        .message,
    ).toBeUndefined();
  });
});

describe("SCOPE_OPTIONS", () => {
  // The form's checkboxes and the four disciplines must not drift apart —
  // a scope option that names no real discipline is a dead lead category.
  it("mirrors the four disciplines exactly", () => {
    expect(SCOPE_OPTIONS).toEqual(disciplines.map((d) => d.title));
  });
});

describe("formatQuoteEmail", () => {
  it("renders every field, with a dash for the empty ones", () => {
    const body = formatQuoteEmail(
      quote({ name: "Thomas", phone: "4079274434" }),
    );
    expect(body).toContain("Name:      Thomas");
    expect(body).toContain("Phone:     4079274434");
    expect(body).toContain("Email:     -");
    expect(body).toContain("(none)");
  });

  it("joins multiple scope selections", () => {
    const body = formatQuoteEmail(
      quote({ name: "T", scope: ["Cinema & media rooms", "Networks that hold"] }),
    );
    expect(body).toContain("Cinema & media rooms, Networks that hold");
  });
});
