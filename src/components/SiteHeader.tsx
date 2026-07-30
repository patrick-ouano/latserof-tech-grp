"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTA_HREF, CTA_LABEL, navLinks, site } from "@/lib/site";

/**
 * Sticky header.
 *
 * Clear at the top of the page, settling into frosted glass as you scroll —
 * driven entirely by a CSS scroll timeline (`.header-shell` in globals.css),
 * so there is no scroll listener and no re-render per frame. Where scroll
 * timelines are unsupported it is simply solid ink from the start.
 *
 * Below 1024px the nav collapses to a drawer and the gold CTA collapses to a
 * phone icon button.
 */
export function SiteHeader() {
  const pathname = usePathname();

  /**
   * The drawer is open for one route only.
   *
   * Storing *where* it was opened rather than a bare boolean means any
   * navigation closes it for free — including browser back/forward, which
   * an onClick handler never sees. It also avoids closing it from an
   * effect, which would be a setState cascade on every route change.
   */
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const close = () => setOpenAt(null);

  // Lock the page behind the drawer, and let Escape close it.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={
        "header-shell sticky top-0 z-50 transition-colors duration-300 " +
        // The shell is translucent at the top of the page; with the drawer
        // open that would show the page scrolling behind the nav.
        (open ? "!border-hairline !bg-ink" : "")
      }
    >
      {/* Reading progress. Decorative: where scroll timelines are
          unsupported it stays at zero width and simply never appears. */}
      <div
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-gold-deep via-gold to-gold-bright"
      />

      <Container className="flex items-center justify-between py-4 xl:py-5">
        <Link
          href="/"
          className="group flex items-center gap-4"
          aria-label={`${site.brand} home`}
        >
          <Image
            src="/logo-badge.webp"
            alt={site.brand}
            width={54}
            height={54}
            priority
            className="h-[46px] w-[46px] shrink-0 transition-transform duration-500 ease-out-expo group-hover:scale-[1.06] motion-reduce:transform-none xl:h-[54px] xl:w-[54px]"
          />
          <span className="grid gap-[5px]">
            <span className="font-heading text-[16px] leading-none font-extrabold tracking-[0.16em] text-paper">
              LATSEROF
            </span>
            {/* 11px, not 10. At 10px with 0.30em tracking the descender-free
                caps were at the legibility floor on a low-density display;
                the tracking comes back a notch so the lockup stays the same
                width under LATSEROF rather than growing past it. */}
            <span className="font-heading text-[11px] leading-none font-semibold tracking-[0.26em] text-gold">
              TECHNOLOGIES
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  "link-wipe font-heading text-[14px] font-semibold transition-colors duration-200 hover:text-paper " +
                  (active ? "text-paper" : "text-nav")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Full CTA from 768px; phone icon below that.
              Visibility lives on this wrapper, not on the Button: Button's
              base classes already set `inline-flex`, and a competing
              `hidden` on the same element resolves by stylesheet order
              rather than class order, so it would never hide. */}
          <div className="hidden md:block">
            <Button href={CTA_HREF} size="sm">
              {CTA_LABEL}
            </Button>
          </div>
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phoneDisplay}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn bg-gradient-to-b from-gold-bright to-gold text-ink transition duration-300 ease-out-expo hover:shadow-glow-sm md:hidden"
          >
            <PhoneIcon />
          </a>

          <button
            type="button"
            onClick={() => setOpenAt(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn text-paper transition-colors duration-200 hover:text-gold lg:hidden"
          >
            <MenuGlyph open={open} />
          </button>
        </div>
      </Container>

      {/* Mobile drawer.
          Positioned off the header itself (`top-full`) and sized against it
          (`100dvh - 100%`), so it stays correct whatever the header's height
          resolves to. It previously hardcoded a 95px offset, which silently
          broke the moment the header's padding changed.

          Kept mounted so it can animate; `inert` takes it out of the tab
          order and the accessibility tree while closed. */}
      <div
        id="mobile-nav"
        inert={!open}
        className={
          "absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-t border-hairline bg-ink transition duration-300 ease-out-expo lg:hidden " +
          (open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0")
        }
      >
        <nav aria-label="Mobile" className="flex min-h-full flex-col">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              className={
                "border-b border-hairline px-6 py-5 font-heading text-[18px] font-semibold text-gold transition-all duration-500 ease-out-expo " +
                (open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0")
              }
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 py-8">
            <Button
              href={CTA_HREF}
              size="md"
              className="w-full"
              onClick={close}
            >
              {CTA_LABEL}
            </Button>
            <a
              href={site.phoneHref}
              className="mt-6 block font-body text-[17px] text-muted transition-colors hover:text-gold"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

/**
 * Hamburger that morphs into a close glyph — the bars rotate into the cross
 * rather than swapping icons, which is the detail that makes the toggle feel
 * built rather than assembled.
 */
function MenuGlyph({ open }: { open: boolean }) {
  const bar =
    "absolute left-0 h-[2px] w-[22px] bg-current transition-all duration-300 ease-out-expo";
  return (
    <span aria-hidden="true" className="relative block h-[16px] w-[22px]">
      <span className={`${bar} ${open ? "top-[7px] rotate-45" : "top-0"}`} />
      <span className={`${bar} top-[7px] ${open ? "opacity-0" : "opacity-100"}`} />
      <span
        className={`${bar} ${open ? "top-[7px] -rotate-45" : "top-[14px]"}`}
      />
    </span>
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
