import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { Faq, type QA } from "@/components/Faq";
import { PageHeader } from "@/components/PageHeader";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { CTA_HREF, disciplines, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Residential",
  description:
    "Home theater, whole-house audio, lighting control, networking and surveillance for Central Florida homes.",
  alternates: { canonical: "/residential" },
};

/* Draft copy — every answer below restates a fact already established in
   src/lib/site.ts or in approved homepage copy. Nothing here claims a
   capability, a price, a timescale or a credential the client has not
   already stated. Logged in QUESTIONS-FOR-THOMAS.md. */
const FAQ: QA[] = [
  {
    q: "Do you publish pricing?",
    a: "No. Every system is specified for the room it goes in, so a price list would be guesswork on both sides. The walkthrough is free and it is what produces a real number.",
  },
  {
    q: "Will you work on a system somebody else installed?",
    a: "Yes. New construction, renovation, or a system that needs rescuing — all three are normal here.",
  },
  {
    q: "Do you service what you install?",
    a: `Yes, with the same crew that installed it. ${site.hours.display}, and service calls by appointment.`,
  },
  {
    q: "How far do you travel?",
    a: `${site.serviceArea} and greater Orlando. The workshop is in ${site.address.city}.`,
  },
  {
    q: "We're still building. When should we call you?",
    a: "Before the walls close. Cabling is the one part of this that is genuinely hard to add later, and it is the layer everything else depends on.",
  },
];

export default function ResidentialPage() {
  return (
    <>
      <PageHeader
        eyebrow="Residential"
        title={
          <>
            Every room on{" "}
            <span className="text-gradient-gold">one standard</span>.
          </>
        }
        lede="Cinema, audio, lighting, networking and cameras through the whole house — designed together so there is one app, one keypad standard, and one number to call when something needs attention."
      >
        <div className="flex flex-wrap gap-[14px]">
          <Button href={CTA_HREF}>Book a walkthrough</Button>
          <Button href={site.phoneHref} variant="ghost">
            Call {site.phoneDisplay}
          </Button>
        </div>
      </PageHeader>

      <Section
        id="home-systems"
        title="In the home"
        meta="The four disciplines, indoors"
      >
        <ul className="grid gap-4 md:grid-cols-2 xl:gap-5">
          {disciplines.map((d, i) => (
            <Reveal as="li" key={d.slug} index={i} className="min-w-0">
              <Spotlight className="group relative h-full overflow-hidden rounded-card border border-hairline bg-surface-1 p-7 transition-colors duration-500 ease-out-expo hover:border-hairline-strong xl:p-9">
                <span className="font-mono text-[15px] leading-none font-bold text-gold">
                  {d.number}
                </span>
                <h3 className="mt-5 font-heading text-h3 font-extrabold text-paper">
                  {d.title}
                </h3>
                <p className="mt-4 max-w-[52ch] font-body text-copy text-body-dim">
                  {d.residential}
                </p>
                <Link
                  href={`/systems#${d.slug}`}
                  className="link-wipe mt-6 inline-block font-heading text-[14px] font-extrabold text-gold"
                >
                  What that includes
                </Link>
              </Spotlight>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="process" title="How a job runs" meta="Start to finish">
        <ProcessSteps />
      </Section>

      <Section id="straight" title="Straight answers" meta="Before you ask">
        {/* Saying plainly what the company is not heads off the two
            questions a low-voltage integrator gets from people who found
            them expecting a retail electronics store. */}
        <Reveal className="mb-12">
          <div className="border-gradient rounded-card bg-surface-2 p-8 xl:p-10">
            <p className="max-w-[62ch] font-body text-lede text-paper-dim">
              We are a licensed low-voltage contractor, not a retail
              electronics store. There is no showroom to browse, no boxes to
              buy off us, and no package deals — we design a system for a
              specific set of rooms and then install and support it.
            </p>
          </div>
        </Reveal>

        <Faq items={FAQ} />
      </Section>

      <CtaBand />
    </>
  );
}
