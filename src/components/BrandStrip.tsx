import { Reveal } from "@/components/motion/Reveal";
import { brands } from "@/lib/site";

/**
 * Dealer lines as type — never logo files (trademark / rights).
 *
 * Auto-fill grid so the card stays evenly occupied at every width instead
 * of collapsing into two sparse columns with a dead right half.
 */
export function BrandStrip() {
  return (
    <Reveal variant="fade">
      <div className="rounded-card border border-hairline bg-surface-1 px-6 py-7 sm:px-8 sm:py-8 xl:px-10 xl:py-9">
        <div className="mb-6 flex items-center gap-4 sm:mb-7">
          <p className="shrink-0 font-mono text-[11px] leading-none font-bold tracking-[0.2em] text-gold sm:text-[12px]">
            SYSTEMS WE BUILD WITH
          </p>
          <span className="h-px min-w-8 flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <ul className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-x-3 gap-y-4 sm:grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] sm:gap-x-5 sm:gap-y-5">
          {brands.map((brand) => (
            <li
              key={brand}
              className="border-b border-hairline/60 pb-3 font-heading text-[15px] leading-none font-bold tracking-[0.03em] text-paper/90 sm:text-[16px]"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
