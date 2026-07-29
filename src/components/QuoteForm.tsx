"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/Button";
import {
  EMPTY_QUOTE,
  PROPERTY_TYPES,
  SCOPE_OPTIONS,
  hasErrors,
  validateQuote,
  type FieldErrors,
  type QuoteRequest,
} from "@/lib/quote";
import { CTA_LABEL, site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const label = "block font-heading text-[13px] font-bold tracking-[0.12em] text-paper uppercase";
const field =
  "w-full rounded-btn border border-hairline-strong bg-surface-2 px-4 py-3.5 font-body text-[17px] text-paper " +
  "placeholder:text-muted-deep transition-colors duration-200 hover:border-stroke " +
  "focus:border-gold focus:outline-none";
const fieldInvalid = "border-gold";

export function QuoteForm() {
  const [values, setValues] = useState<QuoteRequest>(EMPTY_QUOTE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof QuoteRequest>(key: K, value: QuoteRequest[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((e) => {
      if (!e[key] && !(key === "phone" || key === "email")) return e;
      const next = { ...e };
      delete next[key];
      if (key === "phone" || key === "email") delete next.contact;
      return next;
    });
  };

  const toggleScope = (option: string) =>
    setValues((v) => ({
      ...v,
      scope: v.scope.includes(option)
        ? v.scope.filter((s) => s !== option)
        : [...v.scope, option],
    }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const found = validateQuote(values);
    setErrors(found);
    if (hasErrors(found)) {
      // Move focus to the summary so screen readers and keyboard users are
      // told what went wrong instead of silently landing nowhere.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      if (!res.ok) {
        setServerError(data.error ?? `Something went wrong. Please call ${site.phoneDisplay}.`);
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setServerError(`Something went wrong. Please call ${site.phoneDisplay}.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="border-gradient rounded-card bg-surface-2 p-8 md:p-10"
      >
        <h2 className="font-heading text-h3 font-extrabold text-paper">
          Thanks — we&rsquo;ve got it.
        </h2>
        <p className="mt-3 max-w-[52ch] font-body text-[17px] leading-[1.65] text-body-dim">
          We&rsquo;ll be in touch within one business day to arrange the
          survey. If it&rsquo;s urgent, call{" "}
          <a href={site.phoneHref} className="font-semibold text-gold hover:text-paper">
            {site.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v);

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[720px]">
      {/* Error summary. tabIndex so we can move focus here on failure. */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        role={errorList.length ? "alert" : undefined}
        className={errorList.length ? "mb-8 border-l-2 border-gold pl-4" : "sr-only"}
      >
        {errorList.length > 0 && (
          <>
            <p className="font-heading text-[15px] font-extrabold text-gold">
              Please check {errorList.length} {errorList.length === 1 ? "field" : "fields"}:
            </p>
            <ul className="mt-2 space-y-1 font-body text-[15px] text-body-dim">
              {errorList.map(([key, msg]) => (
                <li key={key}>{msg}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          value={values.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="city"
          label="City"
          value={values.city}
          onChange={(v) => set("city", v)}
          placeholder="Windermere"
          autoComplete="address-level2"
        />
        <Field
          id="phone"
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={(v) => set("phone", v)}
          error={errors.phone}
          placeholder="(407) 555-0134"
          autoComplete="tel"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      {errors.contact && (
        <p className="mt-3 font-body text-[15px] text-gold">{errors.contact}</p>
      )}
      <p className="mt-3 font-body text-[15px] text-muted">
        We need your name plus a phone number or an email — whichever you prefer.
      </p>

      <fieldset className="mt-10">
        <legend className={label}>Property type</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {PROPERTY_TYPES.map((type) => (
            <Chip
              key={type}
              name="propertyType"
              type="radio"
              checked={values.propertyType === type}
              onChange={() => set("propertyType", type)}
            >
              {type}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className={label}>What do you need?</legend>
        <p className="mt-2 font-body text-[15px] text-muted">Choose as many as apply.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {SCOPE_OPTIONS.map((option) => (
            <Chip
              key={option}
              name="scope"
              type="checkbox"
              checked={values.scope.includes(option)}
              onChange={() => toggleScope(option)}
            >
              {option}
            </Chip>
          ))}
        </div>
      </fieldset>

      <div className="mt-10">
        <label htmlFor="message" className={label}>
          Tell us about the space
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          placeholder="Which rooms, new build or existing, anything already installed…"
          className={`mt-3 ${field} ${errors.message ? fieldInvalid : ""}`}
        />
        {errors.message && (
          <p className="mt-2 font-body text-[15px] text-gold">{errors.message}</p>
        )}
      </div>

      {/* Honeypot — visually and programmatically hidden from real users. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Button variant="gold" size="md" asSubmit disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : CTA_LABEL}
        </Button>
        <p className="font-body text-[15px] text-muted">
          Or call{" "}
          <a href={site.phoneHref} className="font-semibold text-paper hover:text-gold">
            {site.phoneDisplay}
          </a>
        </p>
      </div>

      {serverError && (
        <p role="alert" className="mt-6 border-l-2 border-gold pl-4 font-body text-[16px] text-gold">
          {serverError}
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label: labelText,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: keyof QuoteRequest & string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className={label}>
        {labelText}
        {required && <span className="text-gold"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-3 ${field} ${error ? fieldInvalid : ""}`}
      />
      {error && (
        <p id={errorId} className="mt-2 font-body text-[15px] text-gold">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Selection chip. A real input stays in the DOM (visually hidden, not
 * display:none) so keyboard navigation, focus and form semantics all behave
 * natively — the styling is driven off :checked and :focus-visible.
 */
function Chip({
  name,
  type,
  checked,
  onChange,
  children,
}: {
  name: string;
  type: "radio" | "checkbox";
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={
        "cursor-pointer rounded-pill border px-4 py-2.5 font-body text-[16px] transition duration-300 ease-out-expo " +
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold " +
        (checked
          ? "border-gold bg-gradient-to-b from-gold-bright to-gold text-ink shadow-glow-sm"
          : "border-stroke text-body-dim hover:border-gold hover:bg-surface-2 hover:text-gold")
      }
    >
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {children}
    </label>
  );
}
