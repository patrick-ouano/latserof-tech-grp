import type { Metadata } from "next";
import Image from "next/image";

import { BrandStrip } from "@/components/BrandStrip";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CTA_HREF, CTA_LABEL, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Licensed and insured low-voltage contractor in Kissimmee, FL — designing, wiring and servicing systems in-house across ${site.serviceArea}.`,
  alternates: { canonical: "/about" },
};

/* Every fact on this page comes from src/lib/site.ts. Nothing here claims a
   founding year, a headcount, an install count, a certification or an award
   — none of those have been confirmed by the client. */
const FACTS = [
  {
    label: "WORKSHOP",
    lines: [
      site.address.street,
      `${site.address.city}, ${site.address.state} ${site.address.zip}`,
    ],
  },
  { label: "HOURS", lines: [site.hours.display, site.hours.note] },
  { label: "SERVICE AREA", lines: [site.serviceArea] },
  { label: "TRADE", lines: ["Licensed & insured", "low-voltage contractor"] },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            The same crew,{" "}
            <span className="text-gradient-gold">start to finish</span>.
          </>
        }
        lede="Latserof Technologies is a licensed, insured low-voltage contractor working out of Kissimmee. We design the system, pull the cable, mount the hardware and support it afterwards — all in-house. Design services available upon request."
        photo={{
          src: "/images/header-about.webp",
          alt: "A technician on a ladder wiring a projector mount into an open ceiling, tools on the ladder tray",
        }}
      >
        <div className="flex flex-wrap gap-[14px]">
          <Button href={CTA_HREF}>{CTA_LABEL}</Button>
          <Button href={site.phoneHref} variant="ghost">
            Call {site.phoneDisplay}
          </Button>
        </div>
      </PageHeader>

      <Section id="owner" title="Who you deal with" meta="No account managers">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-hairline bg-surface-2">
              <Image
                src="/images/about-owner.webp"
                alt={`${site.owner.name} in a Latserof shirt in front of a video wall he installed`}
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover object-[center_20%]"
              />
            </div>
          </Reveal>

          <Reveal index={1}>
            <p className="font-heading text-h3 font-extrabold text-paper">
              {site.owner.name}
            </p>
            <p className="mt-2 font-mono text-[12px] leading-relaxed font-bold text-gold uppercase">
              {site.owner.title}
            </p>
            <p className="mt-6 max-w-[54ch] font-body text-copy text-body-dim">
              The person who walks your rooms is the person who designs the
              system and stands behind it. On a job this size that matters
              more than an org chart — there is nobody for a detail to get
              lost between.
            </p>
            <p className="mt-5 max-w-[54ch] font-body text-copy text-muted">
              And yes — Latserof is Forestal spelled backwards.
            </p>

            <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[12px] leading-none font-bold text-gold">
                    {fact.label}
                  </dt>
                  <dd className="mt-3 font-body text-meta leading-[1.7] text-body-dim">
                    {fact.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section id="process" title="How we work" meta="Start to finish">
        <ProcessSteps />
      </Section>

      <Container className="pb-20">
        <BrandStrip />
      </Container>

      <CtaBand />
    </>
  );
}
