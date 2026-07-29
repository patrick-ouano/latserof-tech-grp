import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";

export const metadata: Metadata = {
  title: "About",
  description:
    "Licensed and insured low-voltage contractor in Kissimmee, FL — designing, wiring and servicing systems in-house.",
};

export default function AboutPage() {
  return (
    <PageStub
      eyebrow="About"
      title="The crew"
      note="Not yet designed. Business facts live in src/lib/site.ts — read them from there, do not retype them."
    />
  );
}
