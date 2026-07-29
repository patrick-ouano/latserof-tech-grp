import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";

export const metadata: Metadata = {
  title: "Residential",
  description:
    "Home theater, whole-house audio, lighting control, networking and surveillance for Central Florida homes.",
};

export default function ResidentialPage() {
  return (
    <PageStub
      eyebrow="Residential"
      title="Homes"
      note="Not yet designed. Extend the homepage tokens and component patterns rather than inventing a new visual language."
    />
  );
}
