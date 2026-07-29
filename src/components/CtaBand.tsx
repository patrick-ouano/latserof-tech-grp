import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

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
            Tell us the rooms. We&rsquo;ll tell you what they need.
          </h2>
          <p className="mt-4 font-body text-lede text-on-gold-body">
            Walkthroughs are free anywhere in Central Florida — new
            construction, renovation or a system that needs rescuing.
          </p>
        </Reveal>

        <Reveal index={1} className="w-full sm:w-auto">
          <Button
            href={site.phoneHref}
            variant="ink"
            size="lg"
            className="w-full whitespace-nowrap sm:w-auto"
          >
            Call {site.phoneDisplay}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
