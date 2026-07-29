import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ServiceList } from "@/components/ServiceList";

/**
 * Homepage — Direction 2a, "Gallery Black".
 *
 * Six bands: header and footer come from the root layout; the four below are
 * the page itself. Copy throughout is final per the handoff — do not
 * paraphrase headlines.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceList />
      <ProjectGrid />
      <CtaBand />
    </>
  );
}
