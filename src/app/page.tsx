import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { PartnerBand } from "@/components/PartnerBand";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ServiceList } from "@/components/ServiceList";

/**
 * Homepage — Direction 2a, "Gallery Black".
 *
 * Header and footer come from the root layout; the bands below are the page
 * itself. Copy throughout is final per the handoff — do not paraphrase
 * headlines.
 *
 * PartnerBand is the one addition to the approved design: visual privacy
 * with Corio Design. It sits after the four disciplines rather than among
 * them, because the section above commits to "Four disciplines, one
 * contractor" and a fifth row would contradict signed-off copy.
 */
// Title and description come from the root layout's defaults; only the
// canonical is page-specific. It lives here rather than in the layout
// because a canonical set on the layout is inherited by every route.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceList />
      <PartnerBand />
      <ProjectGrid />
      <CtaBand />
    </>
  );
}
