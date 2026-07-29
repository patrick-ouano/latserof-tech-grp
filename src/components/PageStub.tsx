import { Container } from "@/components/Container";

/**
 * Temporary placeholder for pages that have not been designed yet.
 *
 * Only the homepage has an approved design (Direction 2a). Every other page
 * renders this until it gets a design pass. Delete this component once the
 * last stub is replaced — it is scaffolding, not a site component.
 */
export function PageStub({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note: string;
}) {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20 xl:py-28">
      <p className="mb-6 flex items-center gap-3">
        <span className="h-[2px] w-[34px] shrink-0 bg-gold" aria-hidden="true" />
        <span className="font-mono text-[13px] leading-none font-bold text-gold uppercase">
          {eyebrow}
        </span>
      </p>
      <h1 className="font-heading text-[36px] leading-[1.04] font-black tracking-[-0.02em] text-white md:text-[44px] xl:text-[52px]">
        {title}
      </h1>
      <p className="mt-7 max-w-[520px] font-body text-[17px] leading-[1.65] text-paper-dim md:text-[19px]">
        {note}
      </p>
    </Container>
  );
}
