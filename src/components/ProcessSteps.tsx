import { Reveal } from "@/components/motion/Reveal";
import { process } from "@/lib/site";

/**
 * Walkthrough → design → install → service.
 *
 * The connecting rule is drawn with a pseudo-element on every step but the
 * last, so the sequence reads as one run rather than four separate tiles.
 * It is hidden below lg, where the steps stack and the rule would point
 * sideways into nothing.
 */
export function ProcessSteps() {
  return (
    <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {process.map((step, i) => (
        <Reveal
          as="li"
          key={step.number}
          index={i}
          className="relative min-w-0 lg:pr-6"
        >
          <span className="flex items-center gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border border-gold/35 bg-surface-2 font-mono text-[13px] leading-none font-bold text-gold">
              {step.number}
            </span>
            {i < process.length - 1 && (
              <span
                aria-hidden="true"
                className="hidden h-px flex-1 bg-gradient-to-r from-hairline-strong to-transparent lg:block"
              />
            )}
          </span>

          <h3 className="mt-6 font-heading text-h3 font-extrabold text-paper">
            {step.title}
          </h3>
          <p className="mt-3 max-w-[46ch] font-body text-copy text-body-dim">
            {step.body}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
