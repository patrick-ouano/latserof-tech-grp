import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { CTA_HREF, CTA_LABEL, navLinks, site } from "@/lib/site";

/**
 * Footer + legal line.
 *
 * The emblem repeats here and is decorative, so alt="" keeps screen readers
 * from announcing the brand twice. Legal name comes from site.legalName
 * (LLC) — never inline a stale handoff string.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-hairline bg-surface-1">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] xl:py-20">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-start gap-5">
            <Image
              src="/logo-badge.webp"
              alt=""
              width={88}
              height={88}
              className="h-[72px] w-[72px] shrink-0"
            />
            <div>
              <p className="font-heading text-[17px] leading-none font-extrabold tracking-[0.14em] text-paper">
                LATSEROF TECHNOLOGIES
              </p>
              <p className="mt-3 max-w-[34ch] font-body text-meta text-muted-deep">
                {site.descriptor}
              </p>
            </div>
          </div>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2
            id="footer-explore"
            className="mb-4 font-mono text-[12px] leading-none font-bold text-gold"
          >
            EXPLORE
          </h2>
          <ul className="space-y-2.5 font-body text-meta text-body-dim">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={CTA_HREF}
                className="transition-colors duration-200 hover:text-gold"
              >
                {CTA_LABEL}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="font-body text-meta text-body-dim">
          <h2 className="mb-4 font-mono text-[12px] leading-none font-bold text-gold">
            CONTACT
          </h2>
          <a
            href={site.phoneHref}
            className="font-semibold text-paper transition-colors duration-200 hover:text-gold"
          >
            {site.phoneDisplay}
          </a>
          <address className="mt-2.5 leading-[1.7] not-italic">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
        </div>

        <div className="font-body text-meta text-body-dim">
          <h2 className="mb-4 font-mono text-[12px] leading-none font-bold text-gold">
            HOURS
          </h2>
          <p>{site.hours.display}</p>
          <p className="mt-1 text-muted">{site.hours.note}</p>
          <p className="mt-5 text-muted">
            Serving {site.serviceArea}.
          </p>
        </div>
      </Container>

      <Container>
        <hr className="hairline-gradient" />
        {/* Built as one template string: JSX drops the whitespace between an
            expression and an adjacent text node here, which silently ate the
            space before the separator. */}
        <p className="py-8 font-body text-[14px] text-legal">
          {`© ${year} ${site.legalName} · Licensed & insured low-voltage contractor`}
        </p>
      </Container>
    </footer>
  );
}
