import type { Metadata } from "next";
import Image from "next/image";

import { AboutStory } from "@/components/AboutStory";
import { BrandStrip } from "@/components/BrandStrip";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { DeliverySteps } from "@/components/DeliverySteps";
import { PageHeader } from "@/components/PageHeader";
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
            <span className="block whitespace-nowrap">
              Design it. Install it.
            </span>
            {" "}
            <span className="text-gradient-gold block whitespace-nowrap">
              Support it for life.
            </span>
          </>
        }
        lede={`A licensed, insured low-voltage contractor based in Kissimmee. One team designs, installs and supports every system across ${site.serviceArea}. Design services are available upon request.`}
        photo={{
          src: "/images/header-about-team.webp",
          alt: "Two technicians level and fasten a display mounting bracket during an installation",
        }}
      >
        <div className="flex flex-wrap gap-[14px]">
          <Button href={CTA_HREF}>{CTA_LABEL}</Button>
          <Button href={site.phoneHref} variant="ghost">
            Call {site.phoneDisplay}
          </Button>
        </div>
      </PageHeader>

      <Section id="owner" title="Who you deal with">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-hairline bg-surface-2">
              <Image
                src="/images/about-owner-videowall.webp"
                alt={`${site.owner.name} in a Latserof shirt in front of a finished commercial video wall`}
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal index={1}>
            <p className="font-heading text-h3 font-extrabold text-paper">
              {site.owner.name}
            </p>
            <p className="mt-2 font-mono text-label leading-relaxed font-bold text-gold uppercase">
              {site.owner.title}
            </p>
            <p className="mt-6 max-w-[52ch] font-body text-lede text-paper-dim">
              The person who walks your rooms is the person who designs the
              system and stands behind it. On a job this size that matters
              more than an org chart — there is nobody for a detail to get
              lost between.
            </p>
            <p className="mt-5 max-w-[52ch] font-body text-copy text-muted">
              And yes — Latserof is Forestal spelled backwards.
            </p>

            <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-label leading-none font-bold text-gold">
                    {fact.label}
                  </dt>
                  <dd className="mt-3 font-body text-copy leading-[1.7] text-body-dim">
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

      {/* Concise company narrative and proof-of-work photography. The full
          ten-step delivery detail remains in the process section below. */}
      <Section id="story" title="About Latserof Technologies" meta="What we stand for">
        <AboutStory />
      </Section>

      {/* The ten-step long form, not the four-beat summary the other pages
          carry. Someone who has read this far wants the detail. */}
      <Section id="process" title="How we work" meta="Ten steps, every project">
        <DeliverySteps />
      </Section>

      <Container className="pb-20">
        <BrandStrip />
      </Container>

      <CtaBand />
    </>
  );
}
