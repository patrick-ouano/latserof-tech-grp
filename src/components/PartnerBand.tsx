import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
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
      <Container className="pt-12 xl:pt-14">
        <Reveal>
          <div className="border border-hairline bg-raised p-8 md:p-10 xl:p-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
              <div className="max-w-[680px]">
                <p className="mb-4 font-mono text-[13px] leading-none font-bold text-gold">
                  WITH {p.name.toUpperCase()}
                </p>
                <h2
                  id="privacy-heading"
                  className="font-heading text-[24px] leading-[1.15] font-extrabold text-paper xl:text-[28px]"
                >
                  {p.title}
                </h2>
                <p className="mt-4 font-body text-[17px] leading-[1.65] text-body-dim xl:text-[18px]">
                  {p.body}
                </p>
              </div>

              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 self-start font-heading text-[15px] font-extrabold text-gold transition-colors duration-150 hover:text-paper lg:self-end"
              >
                {p.linkLabel}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                >
                  <path
                    d="M1 8h13M9 3l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
