import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { CTA_HREF, CTA_LABEL, site } from "@/lib/site";

/**
 * Full-bleed gold band. The one place on the site where the ground is not
 * near-black, and the only place body copy uses `on-gold-body`.
 *
 * `on-gold` flips the focus ring to ink — a gold ring on a gold ground has
 * no contrast at all (see globals.css).
 *
 * Below 768px it stacks and the button goes full width.
 */
export function CtaBand() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="on-gold relative overflow-hidden bg-gradient-to-br from-gold-bright via-gold to-gold-hover text-ink"
    >
      {/* Radial highlight, so a 240px-tall block of flat gold reads as a lit
          surface rather than a swatch. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_15%_0%,rgba(255,255,255,0.28),transparent_60%)]"
      />

      <Container className="relative flex flex-col items-start gap-9 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 xl:py-20">
        <Reveal className="max-w-[720px]">
          <h2
            id="cta-heading"
            className="font-heading text-h2 font-extrabold text-ink"
          >
            Tell us the rooms. We&rsquo;ll come and look.
          </h2>
          <p className="mt-4 font-body text-lede text-on-gold-body">
            Free on-site surveys across {site.serviceArea} — new construction,
            renovation or a system that needs rescuing. No remote quotes; the
            survey comes first.
          </p>
        </Reveal>

        <Reveal index={1} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            href={CTA_HREF}
            variant="ink"
            size="lg"
            className="w-full whitespace-nowrap sm:w-auto"
          >
            {CTA_LABEL}
          </Button>
          <Button
            href={site.phoneHref}
            variant="ghost"
            size="lg"
            className="w-full whitespace-nowrap border-ink/25 text-ink hover:border-ink hover:bg-ink/5 sm:w-auto"
          >
            Call {site.phoneDisplay}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
