import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/Container";

/**
 * The opening band on every page except the homepage, which has its own
 * hero.
 *
 * With a `photo` it becomes two columns at >=1024px, mirroring the homepage
 * hero: text left, photograph right, and no text over the image at any
 * width. Without one it is a single full-width column.
 *
 * Entrance is CSS-only (`animate-enter` plus a per-element delay) to match
 * the hero — no hydration wait, nothing to fail. Reduced motion flattens
 * both duration and delay globally.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  photo,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Describe the installation, not the file. Alt is required with a src. */
  photo?: { src: string; alt: string };
  /** Buttons or supporting content below the lede. */
  children?: ReactNode;
}) {
  const text = (
    <>
      <p className="animate-enter mb-7 flex items-center gap-3">
        <span
          className="h-px w-[38px] shrink-0 bg-gradient-to-r from-gold to-gold-deep"
          aria-hidden="true"
        />
        <span className="font-heading text-[12px] leading-none font-bold tracking-[0.24em] text-gold uppercase">
          {eyebrow}
        </span>
      </p>

      <h1
        className="animate-enter max-w-[18ch] font-heading text-h1 font-black text-paper"
        style={{ animationDelay: "90ms" }}
      >
        {title}
      </h1>

      {lede && (
        <p
          className="animate-enter mt-7 max-w-[60ch] font-body text-lede text-paper-dim"
          style={{ animationDelay: "200ms" }}
        >
          {lede}
        </p>
      )}

      {children && (
        <div className="animate-enter mt-10" style={{ animationDelay: "300ms" }}>
          {children}
        </div>
      )}
    </>
  );

  if (!photo) {
    return (
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="mesh-glow" aria-hidden="true" />
        <Container className="relative py-16 md:py-20 xl:py-28">{text}</Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div className="mesh-glow" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[1280px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* Photo first in the DOM so it stacks above the text on small
            screens without order utilities; reordered at lg.

            Above 1280 the negative right margin pulls the photo onto the
            viewport edge — without it a wide monitor shows dead black beside
            the image. The offset is exactly half the overflow. */}
        <div className="relative min-h-[280px] overflow-hidden md:min-h-[360px] lg:order-2 lg:min-h-[520px] xl:mr-[calc((1280px-100vw)/2)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="parallax object-cover brightness-[.82]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/15 lg:to-transparent"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-14 md:px-10 md:py-16 lg:order-1 xl:px-[52px] xl:py-24">
          {text}
        </div>
      </div>
    </section>
  );
}
