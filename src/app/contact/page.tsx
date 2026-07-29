import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a walkthrough",
  description:
    "Free walkthroughs anywhere in Central Florida — new construction, renovation, or a system that needs rescuing.",
};

/**
 * Destination for every CTA on the site: "Book a walkthrough", "Get a system
 * quote", and the gold CTA band button (see CTA_HREF in src/lib/site.ts).
 *
 * Not part of the approved design — the handoff covers the homepage only and
 * explicitly leaves the form to be specified. Built from the homepage's
 * tokens and component patterns rather than inventing a new language, per
 * the project's design rules.
 */
export default function ContactPage() {
  return (
    <Container className="py-16 xl:py-24">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,340px)] lg:gap-20">
        <div>
          <p className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-[34px] shrink-0 bg-gold" aria-hidden="true" />
            <span className="font-heading text-[13px] leading-none font-bold tracking-[0.22em] text-gold">
              BOOK A WALKTHROUGH
            </span>
          </p>

          <h1 className="max-w-[16ch] font-heading text-[36px] leading-[1.06] font-black tracking-[-0.02em] text-white md:text-[44px] xl:text-[52px]">
            Tell us the rooms.
          </h1>

          <p className="mt-7 max-w-[54ch] font-body text-[17px] leading-[1.65] text-paper-dim md:text-[19px]">
            Walkthroughs are free anywhere in Central Florida — new
            construction, renovation or a system that needs rescuing. Tell us
            roughly what you&rsquo;re after and we&rsquo;ll come and look.
          </p>

          <div className="mt-12">
            <QuoteForm />
          </div>
        </div>

        <aside className="lg:pt-2">
          <div className="border-t border-hairline pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <h2 className="font-mono text-[13px] leading-none font-bold text-gold">
              PREFER TO CALL
            </h2>
            <a
              href={site.phoneHref}
              className="mt-4 block font-heading text-[26px] leading-none font-extrabold text-paper transition-colors duration-150 hover:text-gold"
            >
              {site.phoneDisplay}
            </a>

            <h2 className="mt-10 font-mono text-[13px] leading-none font-bold text-gold">
              HOURS
            </h2>
            <p className="mt-4 font-body text-[16px] leading-[1.7] text-body-dim">
              {site.hours.display}
              <br />
              {site.hours.note}
            </p>

            <h2 className="mt-10 font-mono text-[13px] leading-none font-bold text-gold">
              WORKSHOP
            </h2>
            <address className="mt-4 font-body text-[16px] leading-[1.7] text-body-dim not-italic">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </address>

            <h2 className="mt-10 font-mono text-[13px] leading-none font-bold text-gold">
              SERVICE AREA
            </h2>
            <p className="mt-4 font-body text-[16px] leading-[1.7] text-body-dim">
              {site.serviceArea} and greater Orlando.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
