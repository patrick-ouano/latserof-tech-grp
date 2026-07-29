"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type Ref } from "react";

export type RevealVariant = "rise" | "fade" | "blur" | "wipe";

/**
 * Scroll reveal.
 *
 * Built defensively, because the failure mode of a reveal animation is that
 * content stays invisible forever. Three independent layers, each safe
 * alone (the CSS lives under "Scroll reveal" in globals.css):
 *
 *   1. No JavaScript      — nothing is ever hidden. The `js` class that does
 *                           the hiding is only ever set by script.
 *   2. `animation-timeline: view()` — pure CSS, revealed by the browser with
 *                           no JS involvement at all. This component then
 *                           does nothing; there is nothing to go wrong.
 *   3. Neither            — IntersectionObserver, plus: anything already on
 *                           screen at mount is shown immediately without
 *                           animating, and a 1.2s failsafe reveals
 *                           everything regardless of the observer.
 *
 * Reduced motion is handled globally in globals.css and overrides all three.
 */
export function Reveal({
  children,
  className = "",
  variant = "rise",
  delay,
  index = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** rise (default) · fade · blur · wipe (clip, for display headings) */
  variant?: RevealVariant;
  /** ms. Overrides the delay derived from `index`. */
  delay?: number;
  /**
   * Position within a group. Drives the stagger on both paths — a time
   * delay on the observer path, a scroll-range offset on the CSS one.
   * Keep groups to ~4; past that a stagger starts to feel like lag.
   */
  index?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Layer 2 is driving. Observing as well would fight it.
    if (document.documentElement.classList.contains("sda")) return;

    const reveal = () => el.setAttribute("data-revealed", "");

    // Already on screen, or no observer support: show it now, unanimated.
    const box = el.getBoundingClientRect();
    const onScreen = box.top < window.innerHeight && box.bottom > 0;
    if (onScreen || typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal();
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);

    // Failsafe. Content is never worth losing to a missed animation.
    const failsafe = window.setTimeout(reveal, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const ms = delay ?? index * 90;

  return (
    <Tag
      ref={ref as Ref<never>}
      data-reveal={variant}
      style={
        {
          "--reveal-delay": ms ? `${ms}ms` : undefined,
          "--reveal-index": index || undefined,
        } as React.CSSProperties
      }
      className={className}
    >
      {children}
    </Tag>
  );
}
