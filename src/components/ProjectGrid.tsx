import Image from "next/image";

import { Container } from "@/components/Container";
import { projects, type Project } from "@/data/projects";

/**
 * "Recent installations". Anchor target for the hero's "See the work".
 *
 * Three columns at >=1024, two at 768–1023, one below.
 */
export function ProjectGrid() {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-24">
      <Container className="pt-14 pb-14 xl:pt-16 xl:pb-14">
        <h2
          id="work-heading"
          className="mb-7 font-heading text-[28px] leading-none font-extrabold text-paper xl:text-[34px]"
        >
          Recent installations
        </h2>

        {/* Deliberately not scroll-revealed. These cards are the portfolio —
            the whole reason a visitor scrolls this far — and an animation
            that fails leaves them blank. The handoff lists scroll reveal as
            optional; it is not worth risking the primary content for. The
            supplementary partner band above still uses it. */}
        <ul className="grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.title} className="group min-w-0">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* Root element and the `group` class live on the Reveal <li> wrapper, so
   this renders a fragment rather than nesting another block. */
function ProjectCard({ project }: { project: Project }) {
  return (
    <>
      <div className="relative h-[250px] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.alt ?? project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[400ms] ease-[cubic-bezier(.2,.6,.2,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <PhotoPending />
        )}
      </div>

      <div className="pt-[18px]">
        <p className="mb-[9px] font-mono text-[13px] leading-none font-bold text-gold">
          {project.category}
        </p>
        <h3 className="font-heading text-[20px] leading-[1.25] font-extrabold text-paper transition-colors duration-150 group-hover:text-gold">
          {project.title}
        </h3>
        <p className="mt-[7px] font-body text-[16px] leading-[1.5] text-muted">
          {project.location}
        </p>
      </div>
    </>
  );
}

/**
 * Stands in for a project with no photograph yet.
 *
 * Deliberately honest: no stock imagery, no borrowed vendor render. It reads
 * as a gap because it is one, which is exactly what we want Thomas to see
 * when he reviews the page. Delete this component once every project has a
 * real photo.
 */
function PhotoPending() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 border border-dashed border-stroke bg-raised px-4 text-center">
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" className="text-stroke">
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
    </div>
  );
}
