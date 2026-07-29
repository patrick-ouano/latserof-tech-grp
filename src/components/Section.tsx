import type { ReactNode } from "react";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

/**
 * A titled content band, with the heading wired to the section's
 * `aria-labelledby` so every band is a properly named landmark.
 *
 * `id` doubles as the anchor target (/systems#cinema) and as the heading's
 * id, which is why it is required whenever a title is given.
 */
export function Section({
  id,
  title,
  meta,
  children,
  className = "",
}: {
  id: string;
  title: ReactNode;
  /** Quiet right-hand note, baseline-aligned with the heading. */
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-28 ${className}`}
    >
      <Container className="py-16 xl:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 pb-8">
          <h2
            id={headingId}
            className="font-heading text-h2 font-extrabold text-paper"
          >
            {title}
          </h2>
          {meta && <p className="font-body text-meta text-muted">{meta}</p>}
        </Reveal>

        <hr className="hairline-gradient mb-10" />

        {children}
      </Container>
    </section>
  );
}
