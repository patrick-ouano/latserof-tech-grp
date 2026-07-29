import Image from "next/image";

import { Button } from "@/components/Button";
import { CTA_HREF } from "@/lib/site";

const TRUST = ["Licensed & insured", "Residential + commercial", "In-house service"];

/**
 * Hero band. Two columns at >=1024px; below that the photo stacks ABOVE the
 * text at 380px tall, per the responsive spec.
 *
 * No text sits over the photograph at any breakpoint — that is the single
 * hardest rule in this design direction.
 *
 * Copy is final. Do not paraphrase the headline.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="border-b border-hairline"
    >
      <div className="mx-auto grid w-full max-w-[1280px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* Photo first in the DOM so it stacks above the text on small
            screens without needing order utilities. Reordered at lg.

            Above 1280 the negative right margin pulls the photo out of the
            centred canvas and onto the viewport edge. The handoff was drawn
            at exactly 1280 where the two coincide; without this, a wide
            monitor shows dead black to the right of the image. The offset is
            exactly half the overflow, so it lands flush and never scrolls. */}
        <div className="relative min-h-[380px] overflow-hidden lg:order-2 lg:min-h-[600px] xl:mr-[calc((1280px-100vw)/2)]">
          <Image
            src="/images/hero-cinema-theater.webp"
            alt="Private cinema room with tiered seating, acoustic treatment and a projection screen"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover brightness-[.86]"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-14 md:px-10 md:py-16 lg:order-1 xl:px-[52px] xl:pt-[76px] xl:pb-[72px]">
          <p className="mb-[26px] flex items-center gap-3">
            <span className="h-[2px] w-[34px] shrink-0 bg-gold" aria-hidden="true" />
            <span className="font-heading text-[13px] leading-none font-bold tracking-[0.22em] text-gold">
              ORLANDO · CENTRAL FLORIDA
            </span>
          </p>

          <h1
            id="hero-heading"
            className="font-heading text-[36px] leading-[1.04] font-black tracking-[-0.02em] text-white text-pretty md:text-[44px] lg:text-[52px] xl:text-[62px]"
          >
            One system.
            <br />
            Every room.
            <br />
            Zero guesswork.
          </h1>

          <p className="mt-7 max-w-[520px] font-body text-[17px] leading-[1.65] text-paper-dim md:text-[19px]">
            Home theater, whole-house audio, lighting, networking and
            surveillance — designed, wired and supported by the same crew that
            installed it.
          </p>

          <div className="mt-10 flex flex-wrap gap-[14px]">
            <Button href={CTA_HREF}>Get a system quote</Button>
            <Button href="#work" variant="ghost">
              See the work
            </Button>
          </div>

          <ul className="mt-11 flex flex-wrap gap-x-[34px] gap-y-3 font-body text-[15px] text-muted">
            {TRUST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
