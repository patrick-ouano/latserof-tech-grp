import type { Metadata } from "next";
import Image from "next/image";

import { BrandStrip } from "@/components/BrandStrip";
import { CheckList } from "@/components/CheckList";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/motion/Reveal";
import { disciplines } from "@/lib/site";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "The four disciplines: cinema and media rooms, control and lighting, networks that hold, cameras and access.",
  alternates: { canonical: "/systems" },
};

/**
 * The four disciplines in full.
 *
 * Each section's id is the discipline's own slug, so the homepage cards can
 * deep-link straight to one (/systems#cinema). Section's `scroll-mt`, plus
 * `scroll-padding-top` on html, keeps those landings clear of the sticky
 * header.
 *
 * Titles and body copy come from `disciplines` — approved homepage copy,
 * never retyped. The "includes" lists are draft; see the note on that
 * export in src/lib/site.ts.
 */
export default function SystemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Systems"
        title={
          <>
            Four disciplines,{" "}
            <span className="text-gradient-gold">one contractor</span>.
          </>
        }
        lede="One crew designs the room, pulls the cable, hangs the cameras and programs the keypads. Nothing gets handed between trades, so nothing falls between them."
      >
        <nav aria-label="Jump to a discipline">
          <ul className="flex flex-wrap gap-2">
            {disciplines.map((d) => (
              <li key={d.slug}>
                <a
                  href={`#${d.slug}`}
                  className="glass inline-flex items-center gap-2 rounded-pill px-4 py-2 font-body text-[15px] text-body-dim transition-colors duration-200 hover:text-gold"
                >
                  <span className="font-mono text-[12px] font-bold text-gold">
                    {d.number}
                  </span>
                  {d.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {disciplines.map((d) => (
        <Section
          key={d.slug}
          id={d.slug}
          title={d.title}
          meta={<span className="font-mono text-gold">{d.number}</span>}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-14">
            <Reveal>
              <p className="max-w-[54ch] font-body text-lede text-paper-dim">
                {d.body}
              </p>

              <h3 className="mt-9 mb-5 font-mono text-[12px] leading-none font-bold text-gold">
                WHAT THAT INCLUDES
              </h3>
              <CheckList items={d.includes} />
            </Reveal>

            <Reveal index={1} variant="blur">
              {d.image ? (
                <figure className="relative aspect-[4/3] overflow-hidden rounded-card border border-hairline">
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                </figure>
              ) : (
                /* Honest gap rather than a vendor render. Visible to Thomas
                   in review, which is the point — he is the only person who
                   can close it. */
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-card border border-dashed border-stroke bg-surface-2 px-6 text-center">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="text-stroke"
                  >
                    <path
                      d="M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <p className="font-mono text-[11px] leading-relaxed tracking-[0.08em] text-muted-deep">
                    PHOTOGRAPHY PENDING
                  </p>
                  <p className="max-w-[34ch] font-body text-[15px] text-muted">
                    We would rather show a gap than someone else&rsquo;s stock
                    photo. Ask to see this work on the survey.
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </Section>
      ))}

      <Container className="pb-20">
        <BrandStrip />
      </Container>

      <CtaBand />
    </>
  );
}
