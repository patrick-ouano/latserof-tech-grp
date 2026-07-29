import Image from "next/image";

import { Button } from "@/components/Button";
import { CTA_HREF, CTA_LABEL } from "@/lib/site";

const TRUST = ["Licensed & insured", "Residential + commercial", "In-house service"];

/* Tagline confirmed by Thomas 2026-07-29. Split across two masked rows so
   the hero entrance still has a beat — do not paraphrase. */
const HEADLINE = ["Making Your Home", "Safer and Smarter."];

/**
 * Hero band. Two columns at >=1024px; below that the photo stacks ABOVE the
 * text, per the responsive spec.
 *
 * Entrance is pure CSS (`animate-enter` + a delay per element), so there is
 * no hydration wait before the page moves and nothing to fail. Reduced
 * motion flattens both the duration and the delay — see globals.css, where
 * dropping the delay matters as much as dropping the duration.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-hairline"
    >
      {/* Ambient bloom behind the text column. Decorative and
          pointer-transparent; no text contrast depends on it. */}
      <div className="mesh-glow" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[1280px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* Photo first in the DOM so it stacks above the text on small
            screens without needing order utilities. Reordered at lg.

            Above 1280 the negative right margin pulls the photo out of the
            centred canvas and onto the viewport edge. Without it, a wide
            monitor shows dead black to the right of the image. The offset is
            exactly half the overflow, so it lands flush and never scrolls. */}
        <div className="relative min-h-[320px] overflow-hidden md:min-h-[420px] lg:order-2 lg:min-h-[640px] xl:mr-[calc((1280px-100vw)/2)]">
          <Image
            src="/images/hero-cinema-theater.webp"
            alt="Private cinema room with tiered seating, acoustic treatment and a projection screen"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="parallax object-cover brightness-[.82]"
          />
          {/* Scrim, so the photo dissolves into the text column instead of
              butting against it with a hard vertical seam. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/15 lg:to-transparent"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-14 md:px-10 md:py-16 lg:order-1 xl:px-[52px] xl:py-[92px]">
          <p className="animate-enter mb-7 flex items-center gap-3">
            <span
              className="h-px w-[38px] shrink-0 bg-gradient-to-r from-gold to-gold-deep"
              aria-hidden="true"
            />
            <span className="font-heading text-[12px] leading-none font-bold tracking-[0.24em] text-gold uppercase">
              Greater Orlando · Central Florida · Tampa
            </span>
          </p>

          <h1
            id="hero-heading"
            className="font-heading text-display font-black text-paper"
          >
            {HEADLINE.map((line, i) => (
              // The mask row clips the line as it rises, so the type appears
              // to be revealed rather than moved.
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span
                  className="animate-enter block"
                  style={{ animationDelay: `${90 + i * 110}ms` }}
                >
                  {i === HEADLINE.length - 1 ? (
                    <span className="text-gradient-gold">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="animate-enter mt-8 max-w-[540px] font-body text-lede text-paper-dim"
            style={{ animationDelay: "420ms" }}
          >
            Home theater, whole-house audio, lighting, networking and
            surveillance — designed, wired and supported by the same crew that
            installed it. Design services available upon request.
          </p>

          <div
            className="animate-enter mt-10 flex flex-wrap gap-[14px]"
            style={{ animationDelay: "520ms" }}
          >
            <Button href={CTA_HREF}>{CTA_LABEL}</Button>
            <Button href="#work" variant="ghost">
              See the work
            </Button>
          </div>

          <ul
            className="animate-enter mt-12 flex flex-wrap gap-2"
            style={{ animationDelay: "620ms" }}
          >
            {TRUST.map((item) => (
              <li
                key={item}
                className="glass rounded-pill px-4 py-2 font-body text-[14px] text-body-dim"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
