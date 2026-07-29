import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Recent low-voltage, AV and automation installations across Central Florida.",
};

/* Project detail pages (/work/[slug]) are an open question for Thomas —
   the handoff flags them as "confirm with the client". The Project type in
   src/data/projects.ts already carries an optional slug for when they land. */
export default function WorkPage() {
  return (
    <PageStub
      eyebrow="Work"
      title="Recent installations"
      note="Not yet designed. Projects are modeled as data in src/data/projects.ts; photography still needs selecting per PHOTO_MANIFEST.md."
    />
  );
}
