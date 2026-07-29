import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { site } from "@/lib/site";

/**
 * Full-bleed gold band. The one place on the site where the ground is not
 * near-black, and the only place body copy uses `on-gold-body`.
 *
 * Below 768px it stacks and the button goes full width, per the spec.
 */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="bg-gold text-ink">
      <Container className="flex flex-col items-start gap-8 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:py-[52px]">
        <div className="max-w-[720px]">
          <h2
            id="cta-heading"
            className="font-heading text-[28px] leading-[1.2] font-extrabold tracking-[-0.01em] xl:text-[34px]"
          >
            Tell us the rooms. We&rsquo;ll tell you what they need.
          </h2>
          <p className="mt-3 font-body text-[17px] leading-[1.6] text-on-gold-body md:text-[19px]">
            Walkthroughs are free anywhere in Central Florida — new
            construction, renovation or a system that needs rescuing.
          </p>
        </div>

        <Button
          href={site.phoneHref}
          variant="ink"
          size="lg"
          className="w-full whitespace-nowrap sm:w-auto"
        >
          Call {site.phoneDisplay}
        </Button>
      </Container>
    </section>
  );
}
