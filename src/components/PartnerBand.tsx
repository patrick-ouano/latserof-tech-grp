import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { partners } from "@/lib/site";

/**
 * Visual privacy, delivered with Corio Design.
 *
 * Sits below the four disciplines rather than among them: the section above
 * commits to "Four disciplines, one contractor", so this is framed as an
 * adjacent capability with a named partner instead of a fifth row. It also
 * skews commercial, which the four disciplines do not.
 *
 * The link leaves the site, so it is marked as external both visually (the
 * arrow) and for assistive tech (the "opens in a new tab" note).
 */
export function PartnerBand() {
  const p = partners.visualPrivacy;

  return (
    <section aria-labelledby="privacy-heading">
      <Container className="pt-8">
        <Reveal variant="blur">
          <Spotlight className="border-gradient relative overflow-hidden rounded-lg bg-surface-2 p-8 md:p-12 xl:p-14">
            <div className="mesh-glow opacity-60" aria-hidden="true" />

            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-14">
              <div className="max-w-[720px]">
                <p className="mb-5 inline-flex items-center gap-2 rounded-pill border border-hairline-strong bg-ink/50 px-3 py-1.5 font-mono text-[11px] leading-none font-bold text-gold">
                  WITH {p.name.toUpperCase()}
                </p>
                <h2
                  id="privacy-heading"
                  className="font-heading text-h2 font-extrabold text-paper"
                >
                  {p.title}
                </h2>
                <p className="mt-5 font-body text-copy text-body-dim">{p.body}</p>
              </div>

              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 self-start font-heading text-[15px] font-extrabold text-gold transition-colors duration-300 hover:text-gold-bright lg:self-end"
              >
                {p.linkLabel}
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-pill border border-gold/40 transition-all duration-500 ease-out-expo group-hover:border-gold group-hover:bg-gold/10">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="transition-transform duration-500 ease-out-expo group-hover:translate-x-[3px] motion-reduce:transform-none"
                  >
                    <path
                      d="M1 8h13M9 3l5 5-5 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </Spotlight>
        </Reveal>
      </Container>
    </section>
  );
}
