import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";

export const metadata: Metadata = {
  title: "Commercial",
  description:
    "Boardroom AV, conferencing, structured cabling, access control and surveillance for Central Florida businesses.",
};

export default function CommercialPage() {
  return (
    <PageStub
      eyebrow="Commercial"
      title="Businesses"
      note="Not yet designed. Extend the homepage tokens and component patterns rather than inventing a new visual language."
    />
  );
}
