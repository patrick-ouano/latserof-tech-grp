import { Reveal } from "@/components/motion/Reveal";

export type QA = { q: string; a: string };

/**
 * Built on native <details>/<summary>: keyboard behaviour, the expanded
 * state and in-page find are all handled by the browser, and the answers
 * are in the DOM for crawlers whether or not they are open.
 *
 * That also means it works with JavaScript disabled, which a div-and-state
 * accordion would not.
 */
export function Faq({ items }: { items: readonly QA[] }) {
  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, i) => (
        <Reveal key={item.q} index={i} variant="fade">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-heading text-[18px] font-extrabold text-paper transition-colors duration-200 hover:text-gold [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden="true"
                className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border border-hairline-strong transition-colors duration-300 group-open:border-gold/50"
              >
                <span className="absolute h-px w-3 bg-gold" />
                <span className="absolute h-3 w-px bg-gold transition-transform duration-300 ease-out-expo group-open:rotate-90 group-open:opacity-0" />
              </span>
            </summary>
            <p className="max-w-[70ch] pb-7 font-body text-copy text-body-dim group-open:animate-enter">
              {item.a}
            </p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
