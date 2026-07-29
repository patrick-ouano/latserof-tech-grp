import { disciplines } from "@/lib/site";

/**
 * Quote request shape and validation, shared by the form and the API route.
 *
 * The same rules run in both places deliberately: client-side for immediate
 * feedback, server-side because anything can POST to the endpoint.
 */

export const PROPERTY_TYPES = ["Residential", "Commercial"] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const SCOPE_OPTIONS = disciplines.map((d) => d.title);

export type QuoteRequest = {
  name: string;
  phone: string;
  email: string;
  propertyType: PropertyType | "";
  scope: string[];
  city: string;
  message: string;
  /** Honeypot. Real users never see this field, so anything in it is a bot. */
  company?: string;
};

export type FieldErrors = Partial<Record<keyof QuoteRequest | "contact", string>>;

export const EMPTY_QUOTE: QuoteRequest = {
  name: "",
  phone: "",
  email: "",
  propertyType: "",
  scope: [],
  city: "",
  message: "",
  company: "",
};

// Deliberately permissive. Rejecting an unusual but real address loses a
// lead; a typo costs nothing because we also collect a phone number.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Digits only, so formatting like (407) 927-4434 or +1 407 927 4434 passes. */
const digitsOf = (s: string) => s.replace(/\D/g, "");

export function validateQuote(input: QuoteRequest): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name.trim()) {
    errors.name = "Please tell us your name.";
  }

  const hasPhone = digitsOf(input.phone).length >= 10;
  const hasEmail = EMAIL.test(input.email.trim());

  // Required: name plus at least one way to reach them.
  if (!input.phone.trim() && !input.email.trim()) {
    errors.contact = "Add a phone number or an email so we can reply.";
  } else {
    if (input.phone.trim() && !hasPhone) {
      errors.phone = "That doesn't look like a full phone number.";
    }
    if (input.email.trim() && !hasEmail) {
      errors.email = "That doesn't look like a valid email address.";
    }
    // Both present but both malformed leaves no reachable contact.
    if (input.phone.trim() && !hasPhone && input.email.trim() && !hasEmail) {
      errors.contact = "We need one working phone number or email address.";
    }
  }

  if (input.message.length > 4000) {
    errors.message = "That's a little long — please keep it under 4000 characters.";
  }

  return errors;
}

export const hasErrors = (e: FieldErrors) => Object.keys(e).length > 0;

/** Plain-text body for the notification email. */
export function formatQuoteEmail(q: QuoteRequest): string {
  return [
    `Name:      ${q.name}`,
    `Phone:     ${q.phone || "-"}`,
    `Email:     ${q.email || "-"}`,
    `City:      ${q.city || "-"}`,
    `Property:  ${q.propertyType || "-"}`,
    `Scope:     ${q.scope.length ? q.scope.join(", ") : "-"}`,
    "",
    "Message:",
    q.message.trim() || "(none)",
  ].join("\n");
}
