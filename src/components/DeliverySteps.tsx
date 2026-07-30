import { Reveal } from "@/components/motion/Reveal";
import { deliveryProcess } from "@/lib/site";

/**
 * The ten-step delivery sequence. /about only — see the note on
 * `deliveryProcess` in site.ts for why this and ProcessSteps both exist.
 *
 * Two columns rather than ProcessSteps' four: at ten items a four-across
 * grid gives each step ~14ch of body, and the connecting rule that makes
 * four steps read as one run would wrap into three disconnected rows.
 *
 * The stagger runs per column, not per item. Reveal's own note is that a
 * group past ~4 starts to read as lag, and ten of them cumulatively would.
 */
export function DeliverySteps() {
  return (
    <ol className="grid gap-x-12 gap-y-8 md:grid-cols-2">
      {deliveryProcess.map((step, i) => (
        <Reveal
          as="li"
          key={step.number}
          index={i % 2}
          className="flex min-w-0 gap-5"
        >
          <span className="mt-[3px] inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-gold/35 bg-surface-2 font-mono text-[12px] leading-none font-bold text-gold">
            {step.number}
          </span>
          <div className="min-w-0">
            <h3 className="font-heading text-copy font-extrabold text-paper">
              {step.title}
            </h3>
            <p className="mt-2 max-w-[44ch] font-body text-meta text-body-dim">
              {step.body}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
