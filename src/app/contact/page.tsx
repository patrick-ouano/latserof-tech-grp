import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";

export const metadata: Metadata = {
  title: "Book a walkthrough",
  description:
    "Free walkthroughs anywhere in Central Florida — new construction, renovation, or a system that needs rescuing.",
};

/* Destination for every CTA on the site: "Book a walkthrough", "Get a system
   quote", and the gold CTA band button (see CTA_HREF in src/lib/site.ts).

   The quote form is not designed or built yet. Per CLAUDE.md it needs: name,
   phone, email, property type, project scope (multi-select of the four
   disciplines), city, message — requiring name plus at least one of
   phone/email, with inline errors in gold. */
export default function ContactPage() {
  return (
    <PageStub
      eyebrow="Book a walkthrough"
      title="Tell us the rooms."
      note="Not yet designed. The quote form and its submission handler are still to be built."
    />
  );
}
