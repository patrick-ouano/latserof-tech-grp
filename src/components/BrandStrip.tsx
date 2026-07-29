import { Reveal } from "@/components/motion/Reveal";
import { brands } from "@/lib/site";

/**
 * The dealer lines, set as type rather than as logo files.
 *
 * Deliberate: dealer marketing rights for the vendor assets sitting in
 * photos-source/ are still an open question with Thomas (see
 * PHOTO_MANIFEST.md), and a manufacturer's logo is their trademark, not
 * ours to place. Names in Archivo say the same thing and carry no such
 * question.
 */
export function BrandStrip() {
  return (
    <Reveal variant="fade">
      <div className="flex flex-col gap-6 rounded-card border border-hairline bg-surface-1 px-7 py-7 sm:flex-row sm:items-center sm:gap-10 xl:px-9">
        <p className="shrink-0 font-mono text-[12px] leading-none font-bold text-gold">
          AUTHORISED DEALER
        </p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {brands.map((brand) => (
            <li
              key={brand}
              className="font-heading text-[19px] leading-none font-extrabold tracking-[0.02em] text-paper-dim"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
