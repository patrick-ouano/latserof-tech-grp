import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "The four disciplines: cinema and media rooms, control and lighting, networks that hold, cameras and access.",
};

export default function SystemsPage() {
  return (
    <PageStub
      eyebrow="Systems"
      title="Four disciplines"
      note="Not yet designed. The four disciplines are already modeled as data in src/lib/site.ts — reuse them here."
    />
  );
}
