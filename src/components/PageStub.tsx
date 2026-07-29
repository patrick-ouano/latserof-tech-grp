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
    <main className="mx-auto flex min-h-screen max-w-[1280px] flex-col justify-center px-6 py-24 md:px-10 xl:px-[52px]">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-0.5 w-[34px] bg-gold" aria-hidden="true" />
        <span className="font-mono text-[13px] text-gold uppercase">
          {eyebrow}
        </span>
      </div>
      <h1 className="font-heading text-4xl font-black tracking-[-0.02em] text-white md:text-5xl">
        {title}
      </h1>
      <p className="mt-7 max-w-[520px] text-[19px] leading-relaxed text-paper-dim">
        {note}
      </p>
    </main>
  );
}
