import type { Metadata } from "next";
import Link from "next/link";

import { BrandStrip } from "@/components/BrandStrip";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { PartnerBand } from "@/components/PartnerBand";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProjectCard } from "@/components/ProjectGrid";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { projectsIn } from "@/data/projects";
import { CTA_HREF, CTA_LABEL, disciplines, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commercial",
  description:
    "Boardroom AV, conferencing, structured cabling, access control and surveillance for Central Florida businesses.",
  alternates: { canonical: "/commercial" },
};

/**
 * The commercial cut of the four disciplines.
 *
 * The Corio Design visual-privacy band lives here as well as on the
 * homepage, and arguably belongs here more: it is a glass-office product,
 * so boardrooms and medical suites are its actual audience.
 */
export default function CommercialPage() {
  return (
    <>
      <PageHeader
        eyebrow="Commercial"
        title={
          <>
            Rooms that work{" "}
            <span className="text-gradient-gold">on the first try</span>.
          </>
        }
        lede="Boardroom AV and conferencing, structured cabling, access control and surveillance — specified for the building, installed by the crew that designed it, and serviced by the same people afterwards."
        photo={{
          src: "/images/header-commercial.webp",
          alt: "Equipment racks with shelves labelled router, access points and network switch, beside a monitor running configuration software",
        }}
      >
        <div className="flex flex-wrap gap-[14px]">
          <Button href={CTA_HREF}>{CTA_LABEL}</Button>
          <Button href={site.phoneHref} variant="ghost">
            Call {site.phoneDisplay}
          </Button>
        </div>
      </PageHeader>

      <Section
        id="business-systems"
        title="On site"
        meta="The four disciplines, at work"
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
                  {d.commercial}
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

      <Section
        id="recent"
        title="Recent work"
        meta={
          <Link href="/work" className="link-wipe font-heading font-extrabold text-gold">
            See all work
          </Link>
        }
      >
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projectsIn(["COMMERCIAL", "NETWORKING", "SURVEILLANCE"], 3).map(
            (project, i) => (
              <Reveal as="li" key={project.title} index={i} className="min-w-0">
                <ProjectCard project={project} />
              </Reveal>
            ),
          )}
        </ul>
      </Section>

      <PartnerBand />

      <Section id="process" title="How a job runs" meta="Start to finish">
        <ProcessSteps />
      </Section>

      <Container className="pb-20">
        <BrandStrip />
      </Container>

      <CtaBand />
    </>
  );
}
