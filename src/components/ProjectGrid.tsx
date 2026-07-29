import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { projects, type Project } from "@/data/projects";

/**
 * "Recent installations". Anchor target for the hero's "See the work".
 *
 * Shows the first three; the full set lives on /work.
 */
export function ProjectGrid() {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-28">
      <Container className="pt-20 pb-20 xl:pt-24">
        <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2
            id="work-heading"
            className="font-heading text-h2 font-extrabold text-paper"
          >
            Recent installations
          </h2>
          <Link
            href="/work"
            className="link-wipe font-heading text-[14px] font-extrabold text-gold"
          >
            See all work
          </Link>
        </Reveal>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <Reveal as="li" key={project.title} index={i} className="min-w-0">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/**
 * Whole card is the link, so the target is the full tile rather than a
 * 20px-tall title. Project detail pages are still an open question with
 * Thomas, so every card resolves to /work for now — see the `slug` note in
 * src/data/projects.ts.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href="/work"
      className="group block h-full overflow-hidden rounded-card border border-hairline bg-surface-1 transition duration-500 ease-out-expo hover:-translate-y-1 hover:border-hairline-strong hover:shadow-lift motion-reduce:transform-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.alt ?? project.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06] motion-reduce:transform-none"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
            />
          </>
        ) : (
          <PhotoPending />
        )}

        <span className="glass absolute top-3 left-3 rounded-pill px-3 py-1.5 font-mono text-[11px] leading-none font-bold text-gold">
          {project.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-heading text-[20px] leading-[1.25] font-extrabold text-paper transition-colors duration-300 group-hover:text-gold-bright">
          {project.title}
        </h3>
        <p className="mt-2 font-body text-meta text-muted">{project.location}</p>
      </div>
    </Link>
  );
}

/**
 * Stands in for a project with no photograph yet.
 *
 * Deliberately honest: no stock imagery, no borrowed vendor render. It reads
 * as a gap because it is one, which is exactly what Thomas should see when
 * he reviews the page. Delete this once every project has a real photo.
 */
function PhotoPending() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-surface-2 px-4 text-center">
      <svg
        width="26"
        height="26"
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
    </div>
  );
}
