import type { ReactNode } from "react";

import { Container } from "@/components/Container";

/**
 * The opening band on every page except the homepage, which has its own
 * hero.
 *
 * Replaces PageStub, which was scaffolding for undesigned pages.
 *
 * Entrance is CSS-only (`animate-enter` plus a per-element delay) to match
 * the homepage hero — no hydration wait, nothing to fail. Reduced motion
 * flattens both duration and delay globally.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Buttons or supporting content below the lede. */
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div className="mesh-glow" aria-hidden="true" />

      <Container className="relative py-16 md:py-20 xl:py-28">
        <p className="animate-enter mb-7 flex items-center gap-3">
          <span
            className="h-px w-[38px] shrink-0 bg-gradient-to-r from-gold to-gold-deep"
            aria-hidden="true"
          />
          <span className="font-heading text-[12px] leading-none font-bold tracking-[0.24em] text-gold uppercase">
            {eyebrow}
          </span>
        </p>

        <h1
          className="animate-enter max-w-[18ch] font-heading text-h1 font-black text-paper"
          style={{ animationDelay: "90ms" }}
        >
          {title}
        </h1>

        {lede && (
          <p
            className="animate-enter mt-7 max-w-[60ch] font-body text-lede text-paper-dim"
            style={{ animationDelay: "200ms" }}
          >
            {lede}
          </p>
        )}

        {children && (
          <div
            className="animate-enter mt-10"
            style={{ animationDelay: "300ms" }}
          >
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
