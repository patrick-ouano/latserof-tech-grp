import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTA_HREF, navLinks, site } from "@/lib/site";
import Link from "next/link";

/**
 * A dead link on a lead-generation site is a lost call, so this page does
 * two things a bare "404" does not: it offers the phone number, and it
 * lists everywhere else worth going.
 */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="mesh-glow" aria-hidden="true" />

      <Container className="relative flex min-h-[62vh] flex-col justify-center py-24">
        <p className="mb-7 font-mono text-[12px] leading-none font-bold text-gold">
          404
        </p>
        <h1 className="max-w-[16ch] font-heading text-h1 font-black text-paper">
          That page isn&rsquo;t here.
        </h1>
        <p className="mt-7 max-w-[52ch] font-body text-lede text-paper-dim">
          The link may be old, or we may have moved it. Everything on the site
          is one click away below — or just call and ask.
        </p>

        <div className="mt-10 flex flex-wrap gap-[14px]">
          <Button href={CTA_HREF}>Book a walkthrough</Button>
          <Button href={site.phoneHref} variant="ghost">
            Call {site.phoneDisplay}
          </Button>
        </div>

        <nav aria-label="Site" className="mt-14">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <Link
                href="/"
                className="link-wipe font-heading text-[15px] font-semibold text-nav transition-colors hover:text-paper"
              >
                Home
              </Link>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-wipe font-heading text-[15px] font-semibold text-nav transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
