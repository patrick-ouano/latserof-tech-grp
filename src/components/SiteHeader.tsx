"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTA_HREF, navLinks, site } from "@/lib/site";

/**
 * Sticky header. Stays solid ink when stuck, no transparency, per the
 * handoff.
 *
 * Below 768px the nav collapses to a full-height drawer (solid black, gold
 * links) and the gold CTA collapses to a phone icon button.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Lock the page behind the drawer, and let Escape close it.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-ink">
      <Container className="flex items-center justify-between py-5">
        <Link
          href="/"
          className="flex items-center gap-4"
          aria-label={`${site.brand} home`}
        >
          <Image
            src="/logo-badge.webp"
            alt="Latserof Tech Grp"
            width={54}
            height={54}
            priority
            className="h-[54px] w-[54px] shrink-0"
          />
          <span className="grid gap-[5px]">
            <span className="font-heading text-[16px] leading-none font-extrabold tracking-[0.16em] text-paper">
              LATSEROF
            </span>
            <span className="font-heading text-[10px] leading-none font-semibold tracking-[0.30em] text-gold">
              TECHNOLOGIES
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-[34px] lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-[14px] font-semibold text-nav transition-colors duration-[120ms] hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Full CTA from 768px; phone icon below that, per the spec.
              Visibility lives on this wrapper, not on the Button: Button's
              base classes already set `inline-flex`, and a competing
              `hidden` on the same element resolves by stylesheet order
              rather than class order, so it would never hide. */}
          <div className="hidden md:block">
            <Button href={CTA_HREF} size="sm">
              Book a walkthrough
            </Button>
          </div>
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phoneDisplay}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn bg-gold text-ink transition-colors duration-150 hover:bg-gold-hover md:hidden"
          >
            <PhoneIcon />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center text-paper lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer: solid black, gold links, full height */}
      <div
        id="mobile-nav"
        hidden={!open}
        // 95px = 54px emblem + 20px padding top/bottom + 1px border.
        className="fixed inset-x-0 top-[95px] bottom-0 z-40 overflow-y-auto bg-ink lg:hidden"
      >
        <nav aria-label="Mobile" className="flex h-full flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-hairline px-6 py-5 font-heading text-[18px] font-semibold text-gold"
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 py-8">
            <Button
              href={CTA_HREF}
              size="md"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Book a walkthrough
            </Button>
            <a
              href={site.phoneHref}
              className="mt-6 block font-body text-[17px] text-muted"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 6h18M3 12h18M3 18h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}
