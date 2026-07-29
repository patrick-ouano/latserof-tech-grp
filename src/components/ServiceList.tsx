import { Container } from "@/components/Container";
import { disciplines } from "@/lib/site";

/**
 * "What we build" — the four disciplines.
 *
 * Desktop: three columns (number / title / description) on one baseline.
 * 768–1023: two columns, description dropping to its own second line.
 * <768: single column.
 *
 * Row hover fills to the gutter, which is why the row carries negative
 * margin and matching padding rather than a plain background.
 */
export function ServiceList() {
  return (
    <section aria-labelledby="services-heading">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-hairline pt-12 pb-7 xl:pt-14">
          <h2
            id="services-heading"
            className="font-heading text-[28px] leading-none font-extrabold text-paper xl:text-[34px]"
          >
            What we build
          </h2>
          <p className="font-body text-[16px] leading-none text-muted">
            Four disciplines, one contractor
          </p>
        </div>

        <ul>
          {disciplines.map((d, i) => (
            <li
              key={d.slug}
              className={
                "group -mx-6 grid grid-cols-[48px_minmax(0,1fr)] items-center gap-x-6 gap-y-2 px-6 py-7 transition-colors duration-150 hover:bg-raised md:-mx-10 md:px-10 xl:-mx-[52px] xl:grid-cols-[64px_minmax(0,300px)_minmax(0,1fr)] xl:gap-x-8 xl:px-[52px] xl:py-[30px] " +
                (i < disciplines.length - 1 ? "border-b border-hairline" : "")
              }
            >
              <span className="self-start font-mono text-[15px] leading-none font-bold text-gold transition-colors duration-150 group-hover:text-paper xl:self-auto">
                {d.number}
              </span>
              <h3 className="font-heading text-[22px] leading-[1.15] font-extrabold text-paper xl:text-[26px]">
                {d.title}
              </h3>
              {/* Starts in column 2 on the two-column layout so it sits under
                  the title rather than beside the number.

                  Capped at 68ch: the description column is ~750px wide at
                  1280, which puts these lines near 90 characters. Anything
                  much past 75 makes the eye lose its place on the return
                  sweep, and it is worse on a dark ground. */}
              <p className="col-start-2 max-w-[68ch] font-body text-[17px] leading-[1.65] text-body-dim xl:col-start-3 xl:text-[18px]">
                {d.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
