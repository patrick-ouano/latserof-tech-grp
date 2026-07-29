import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/Button";
import { site } from "@/lib/site";

describe("Button", () => {
  it("renders a real submit button when asked", () => {
    render(<Button asSubmit>Send</Button>);
    expect(screen.getByRole("button", { name: "Send" })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("disables the submit button", () => {
    render(
      <Button asSubmit disabled>
        Sending…
      </Button>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  /**
   * next/link would try to prefetch a tel: URL as if it were a route. Every
   * phone CTA on the site goes through this branch, so it is the one worth
   * pinning down.
   */
  it("renders tel: and mailto: as plain anchors", () => {
    const { rerender } = render(<Button href={site.phoneHref}>Call</Button>);
    expect(screen.getByRole("link", { name: "Call" })).toHaveAttribute(
      "href",
      site.phoneHref,
    );

    rerender(<Button href="mailto:hi@example.com">Email</Button>);
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:hi@example.com",
    );
  });

  it("renders an internal route as a link", () => {
    render(<Button href="/contact">Book</Button>);
    expect(screen.getByRole("link", { name: "Book" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("respects reduced motion on the hover lift", () => {
    render(<Button href="/contact">Book</Button>);
    // The lift is the one piece of button motion that could induce nausea;
    // the variant class is what disables it.
    expect(screen.getByRole("link").className).toContain(
      "motion-reduce:hover:transform-none",
    );
  });

  it("applies the requested variant and size", () => {
    render(
      <Button href="/contact" variant="ghost" size="lg">
        Ghost
      </Button>,
    );
    const cls = screen.getByRole("link").className;
    expect(cls).toContain("border-stroke");
    expect(cls).toContain("text-[16px]");
  });
});
