import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { disciplines } from "@/lib/site";

/**
 * "What we build" — the four disciplines.
 *
 * Was a four-row list; now a 2x2 of cards, each linking through to its
 * section on /systems. The list read as a table of contents, which is fine
 * when it is the only content on the page and wrong now that the disciplines
 * have somewhere to go.
 *
 * Copy is final per the handoff and comes from `disciplines` — never retype
 * it into the markup.
 */
export function ServiceList() {
  return (
    <section aria-labelledby="services-heading">
      <Container className="pt-16 pb-4 xl:pt-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 pb-9">
          <h2
            id="services-heading"
            className="font-heading text-h2 font-extrabold text-paper"
          >
            What we build
          </h2>
          <p className="font-body text-meta text-muted">
            Four disciplines, one contractor
          </p>
        </Reveal>

        <hr className="hairline-gradient" />

        <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:gap-5">
          {disciplines.map((d, i) => (
            <Reveal as="li" key={d.slug} index={i} className="min-w-0">
              <Spotlight className="group relative h-full overflow-hidden rounded-card border border-hairline bg-surface-1 transition-colors duration-500 ease-out-expo hover:border-hairline-strong">
                {/* Gold wash that lifts in from the bottom on hover. Sits
                    under the content, above the card fill. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gold/[0.07] to-transparent opacity-0 transition-opacity duration-500 ease-out-expo group-hover:opacity-100"
                />

                <Link
                  href={`/systems#${d.slug}`}
                  className="relative flex h-full flex-col p-7 xl:p-9"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-[15px] leading-none font-bold text-gold">
                      {d.number}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 origin-left scale-x-0 bg-gradient-to-r from-gold/60 to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-x-100 motion-reduce:scale-x-100"
                    />
                  </span>

                  <h3 className="mt-6 font-heading text-h3 font-extrabold text-paper transition-colors duration-300 group-hover:text-gold-bright">
                    {d.title}
                  </h3>

                  {/* Capped at 62ch: past ~75 characters the eye loses its
                      place on the return sweep, and it is worse on a dark
                      ground. */}
                  <p className="mt-4 max-w-[62ch] font-body text-copy text-body-dim">
                    {d.body}
                  </p>

                  <span className="mt-7 inline-flex items-center gap-2 font-heading text-[14px] font-extrabold text-muted transition-colors duration-300 group-hover:text-gold">
                    Detail
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1 motion-reduce:transform-none"
                    >
                      <path
                        d="M1 8h13M9 3l5 5-5 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </span>
                </Link>
              </Spotlight>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
