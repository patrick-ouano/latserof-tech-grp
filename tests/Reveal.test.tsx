import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Reveal } from "@/components/motion/Reveal";

afterEach(() => {
  document.documentElement.className = "";
  vi.restoreAllMocks();
});

/**
 * The failure mode of a reveal animation is content that stays invisible
 * forever, so these tests are about what Reveal must NOT do rather than
 * what it animates.
 */
describe("Reveal", () => {
  it("never hides its content in the markup itself", () => {
    render(<Reveal>Recent installations</Reveal>);
    const el = screen.getByText("Recent installations");
    // Hiding is done by CSS gated on the `js` class, never inline. If it
    // were inline, a CSS failure would strand the copy.
    expect(el.style.opacity).toBe("");
    expect(el.style.display).toBe("");
  });

  it("reveals immediately when already on screen, without observing", () => {
    // jsdom gives every element a zero-size rect, which correctly reads as
    // off-screen — so an on-screen box has to be mocked explicitly.
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
      top: 100,
      bottom: 400,
    } as DOMRect);
    const observe = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );

    render(<Reveal>Above the fold</Reveal>);

    // Content in the viewport at mount must appear at once, unanimated —
    // otherwise the first screenful fades in on every navigation.
    expect(screen.getByText("Above the fold")).toHaveAttribute("data-revealed");
    expect(observe).not.toHaveBeenCalled();
  });

  it("stands down entirely when the browser drives it in CSS", () => {
    document.documentElement.classList.add("sda");
    const observe = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );

    render(<Reveal>Scroll driven</Reveal>);

    // Pure CSS handles it; observing as well would fight the animation.
    expect(observe).not.toHaveBeenCalled();
    expect(screen.getByText("Scroll driven")).not.toHaveAttribute("data-revealed");
  });

  it("observes when it is genuinely below the fold", () => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
      top: 5000,
      bottom: 5400,
    } as DOMRect);
    const observe = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );

    render(<Reveal>Below the fold</Reveal>);
    expect(observe).toHaveBeenCalledOnce();
  });

  it("reveals below-fold content anyway once the failsafe fires", () => {
    vi.useFakeTimers();
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
      top: 5000,
      bottom: 5400,
    } as DOMRect);

    render(<Reveal>Rescued</Reveal>);
    const el = screen.getByText("Rescued");
    expect(el).not.toHaveAttribute("data-revealed");

    // A missed observer must never cost us the content.
    vi.advanceTimersByTime(1200);
    expect(el).toHaveAttribute("data-revealed");
    vi.useRealTimers();
  });

  it("carries the variant and the stagger onto the element", () => {
    render(
      <Reveal variant="blur" index={2}>
        Staggered
      </Reveal>,
    );
    const el = screen.getByText("Staggered");
    expect(el).toHaveAttribute("data-reveal", "blur");
    // Time delay for the observer path, range offset for the CSS one.
    expect(el.style.getPropertyValue("--reveal-delay")).toBe("180ms");
    expect(el.style.getPropertyValue("--reveal-index")).toBe("2");
  });

  it("renders as the requested element, so list markup stays valid", () => {
    render(
      <ul>
        <Reveal as="li">An item</Reveal>
      </ul>,
    );
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });
});
