import Image from "next/image";

import { Container } from "@/components/Container";
import { site } from "@/lib/site";

/**
 * Footer + legal line.
 *
 * The emblem repeats here at 88px and is decorative, so alt="" keeps screen
 * readers from announcing the brand twice.
 *
 * Note the legal name: the design handoff says "Latserof Tech Grp LLC",
 * which is wrong. It is an Inc. Read it from site.legalName, never inline.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline">
      <Container className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] xl:py-[52px]">
        <div className="flex items-start gap-5">
          <Image
            src="/logo-badge.webp"
            alt=""
            width={88}
            height={88}
            className="h-[88px] w-[88px] shrink-0"
          />
          <div>
            <p className="font-heading text-[17px] leading-none font-extrabold tracking-[0.14em] text-paper">
              LATSEROF TECHNOLOGIES
            </p>
            <p className="mt-[10px] font-body text-[16px] leading-[1.6] text-muted-deep">
              {site.descriptor}
            </p>
          </div>
        </div>

        <div className="font-body text-[16px] leading-[1.7] text-body-dim">
          <h2 className="mb-[10px] font-mono text-[13px] leading-none font-bold text-gold">
            CONTACT
          </h2>
          <a
            href={site.phoneHref}
            className="font-semibold text-paper transition-colors duration-150 hover:text-gold"
          >
            {site.phoneDisplay}
          </a>
          <address className="not-italic">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
        </div>

        <div className="font-body text-[16px] leading-[1.7] text-body-dim">
          <h2 className="mb-[10px] font-mono text-[13px] leading-none font-bold text-gold">
            HOURS
          </h2>
          <p>{site.hours.display}</p>
          <p>{site.hours.note}</p>
        </div>
      </Container>

      <Container className="pb-[34px]">
        {/* Built as one template string: JSX drops the whitespace between an
            expression and an adjacent text node here, which silently ate the
            space before the separator. */}
        <p className="font-body text-[14px] text-legal">
          {`© ${year} ${site.legalName} · Licensed & insured low-voltage contractor`}
        </p>
      </Container>
    </footer>
  );
}
