import type { Metadata } from "next";
import Image from "next/image";

import { BrandStrip } from "@/components/BrandStrip";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { DeliverySteps } from "@/components/DeliverySteps";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CTA_HREF, CTA_LABEL, offerings, site, story } from "@/lib/site";

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
            Design exceptional technology.{" "}
            <span className="text-gradient-gold">Install it professionally.</span>
          </>
        }
        lede={`${site.brand} is a licensed, insured low-voltage contractor working out of Kissimmee. We design the system, pull the cable, mount the hardware and support it afterwards — all in-house. Design services available upon request.`}
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
                alt={`${site.owner.name} in a Latserof shirt beside a Control4 equipment rack he built`}
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

      {/* Four blocks of the client's own narrative, plus the capability list
          under WHAT WE DO. Copy is Thomas's — see `story` and `offerings`. */}
      <Section id="story" title="About Latserof Technologies" meta="What we stand for">
        <div className="grid gap-14 lg:gap-16">
          {story.map((block, i) => (
            <Reveal
              key={block.label}
              index={i}
              className={`grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] ${
                i > 0 ? "border-t border-hairline pt-14 lg:pt-16" : ""
              }`}
            >
              <h3 className="font-mono text-meta leading-snug font-bold text-gold uppercase lg:pt-[10px]">
                {block.label}
              </h3>
              <div>
                {/* The opening paragraph of each block carries the lede size;
                    the rest step down to body. Every paragraph used to be set
                    at lede, which is a size meant for one paragraph, not
                    twelve — at that weight the four blocks read as a single
                    undifferentiated wall with nowhere for the eye to land.
                    The step-down gives each block a visible way in, and takes
                    roughly a screen and a half off the page. */}
                {block.paragraphs.map((paragraph, p) => (
                  <p
                    key={paragraph}
                    className={
                      p === 0
                        ? "max-w-[56ch] font-body text-lede text-paper-dim"
                        : "mt-5 max-w-[68ch] font-body text-copy text-body-dim"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Spans both columns, unlike the prose. It is the one element
                  in the section that reaches the full width of the rule above
                  it, which stops the whole band reading as a narrow ribbon of
                  text against an empty right half. Three columns rather than
                  two on desktop: thirteen short noun phrases in two columns
                  ran longer than the prose it belongs to. */}
              {block.label === "WHAT WE DO" && (
                <ul className="mt-4 grid gap-x-8 gap-y-3 border-t border-hairline pt-8 sm:grid-cols-2 lg:col-span-2 lg:mt-6 lg:grid-cols-3 lg:pt-10">
                  {offerings.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 font-body text-copy text-body-dim"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
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
