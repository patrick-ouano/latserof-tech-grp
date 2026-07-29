"use client";

import { useEffect, useRef, type ReactNode, type Ref } from "react";

/**
 * 12px rise + fade, 400ms, once — the handoff's scroll-reveal spec.
 *
 * Built defensively, because the failure mode of a reveal animation is that
 * content stays invisible forever. Three guarantees:
 *
 *  1. Hiding only happens once JS has run (the `js` class), so with no
 *     JavaScript nothing is ever hidden.
 *  2. Anything already on screen at mount is revealed immediately, without
 *     animating. Only content genuinely below the fold animates in.
 *  3. A failsafe reveals everything after 1.2s regardless of the observer.
 *     If IntersectionObserver is unavailable, throttled, or the element sits
 *     in a container that never scrolls, the copy still shows up.
 *
 * Reduced motion is handled in globals.css.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** ms. Use sparingly — staggering more than ~3 steps starts to feel slow. */
  delay?: number;
  /** Element to render. Use "li" inside a list so the markup stays valid. */
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.setAttribute("data-revealed", "");

    // Already on screen, or no observer support: show it now.
    const box = el.getBoundingClientRect();
    const onScreen = box.top < window.innerHeight && box.bottom > 0;
    if (onScreen || typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    document.documentElement.classList.add("js");

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

  return (
    <Tag
      ref={ref as Ref<never>}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
