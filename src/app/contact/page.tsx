import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a walkthrough",
  description:
    "Free walkthroughs anywhere in Central Florida — new construction, renovation, or a system that needs rescuing.",
  alternates: { canonical: "/contact" },
};

const ASIDE = [
  { label: "HOURS", lines: [site.hours.display, site.hours.note] },
  {
    label: "WORKSHOP",
    lines: [
      site.address.street,
      `${site.address.city}, ${site.address.state} ${site.address.zip}`,
    ],
  },
  { label: "SERVICE AREA", lines: [`${site.serviceArea} and greater Orlando`] },
];

/**
 * Destination for every CTA on the site: "Book a walkthrough", "Get a system
 * quote", and the gold CTA-band button (see CTA_HREF in src/lib/site.ts).
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book a walkthrough"
        title={
          <>
            Tell us <span className="text-gradient-gold">the rooms</span>.
          </>
        }
        lede="Walkthroughs are free anywhere in Central Florida — new construction, renovation or a system that needs rescuing. Tell us roughly what you’re after and we’ll come and look."
      />

      <Container className="py-16 xl:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,320px)] lg:gap-20">
          <Reveal>
            <QuoteForm />
          </Reveal>

          <Reveal as="aside" index={1}>
            <div className="rounded-card border border-hairline bg-surface-1 p-8">
              <h2 className="font-mono text-[12px] leading-none font-bold text-gold">
                PREFER TO CALL
              </h2>
              <a
                href={site.phoneHref}
                className="mt-4 block font-heading text-[26px] leading-none font-extrabold text-paper transition-colors duration-200 hover:text-gold"
              >
                {site.phoneDisplay}
              </a>

              <hr className="hairline-gradient my-8" />

              <dl className="space-y-7">
                {ASIDE.map((block) => (
                  <div key={block.label}>
                    <dt className="font-mono text-[12px] leading-none font-bold text-gold">
                      {block.label}
                    </dt>
                    <dd className="mt-3 font-body text-meta leading-[1.7] text-body-dim">
                      {block.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
