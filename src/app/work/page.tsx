import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectGrid";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Recent low-voltage, AV and automation installations across Central Florida.",
  alternates: { canonical: "/work" },
};

/* Project detail pages (/work/[slug]) are still an open question for Thomas
   — the handoff flags them as "confirm with the client". The Project type in
   src/data/projects.ts already carries an optional slug for when they land,
   and ProjectCard already links the whole tile, so wiring them up later is a
   one-line change. */
export default function WorkPage() {
  const awaitingPhoto = projects.filter((p) => !p.image).length;

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title={
          <>
            Recent{" "}
            <span className="text-gradient-gold">installations</span>.
          </>
        }
        lede={`Rooms across ${site.serviceArea} — residential cinema, commercial AV and the racks and cabling behind both.`}
      />

      <Section
        id="installations"
        title="Selected projects"
        meta={`${projects.length} shown`}
      >
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.title} index={i % 3} className="min-w-0">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>

        {/* Honest, and deliberately visible to Thomas in review: the gap is
            real (there is not one surveillance photograph in the source
            collection) and dressing it in stock imagery would misrepresent
            the work. See PHOTO_MANIFEST.md. */}
        {awaitingPhoto > 0 && (
          <Reveal variant="fade" className="mt-10">
            <p className="max-w-[68ch] border-l-2 border-gold/40 pl-5 font-body text-meta text-muted">
              {awaitingPhoto === 1
                ? "One project above is waiting on photography."
                : `${awaitingPhoto} projects above are waiting on photography.`}{" "}
              We would rather show a gap than someone else&rsquo;s stock
              photograph. To see that work in person, ask on the walkthrough.
            </p>
          </Reveal>
        )}
      </Section>

      <CtaBand />
    </>
  );
}
