import { Reveal } from "@/components/motion/Reveal";
import { brands, distributors } from "@/lib/site";

/**
 * Partner lines, set as type rather than as logo files.
 *
 * Manufacturer logos are trademarks we do not have a clear license to place.
 * Names in Archivo say the same thing without that question. Distributor
 * partners are cited below the brand row.
 */
export function BrandStrip() {
  return (
    <Reveal variant="fade">
      <div className="flex flex-col gap-6 rounded-card border border-hairline bg-surface-1 px-7 py-7 xl:px-9">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <p className="shrink-0 font-mono text-[12px] leading-none font-bold text-gold">
            SYSTEMS WE BUILD WITH
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {brands.map((brand) => (
              <li
                key={brand}
                className="font-heading text-[18px] leading-none font-extrabold tracking-[0.02em] text-paper-dim"
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
        <p className="font-body text-[14px] leading-relaxed text-muted">
          Industry partner with{" "}
          {distributors.map((d, i) => (
            <span key={d.name}>
              {i > 0 ? (i === distributors.length - 1 ? " and " : ", ") : null}
              <a
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-dim underline-offset-2 transition-colors hover:text-gold hover:underline"
              >
                {d.name}
              </a>
            </span>
          ))}
          .
        </p>
      </div>
    </Reveal>
  );
}
