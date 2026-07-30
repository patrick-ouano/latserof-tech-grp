import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { offerings, story } from "@/lib/site";

/**
 * The company narrative on /about.
 *
 * Kept out of the route so the page remains an outline rather than a large
 * presentation component. Story copy and image metadata live with the rest
 * of the site's confirmed content in site.ts.
 */
export function AboutStory() {
  return (
    <div className="grid gap-14 lg:gap-16">
      {story.map((block, index) => (
        <Reveal
          as="article"
          key={block.label}
          index={index}
          className={`grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] ${
            index > 0 ? "border-t border-hairline pt-14 lg:pt-16" : ""
          }`}
        >
          <h3 className="font-mono text-meta leading-snug font-bold text-gold uppercase lg:pt-2">
            {block.label}
          </h3>

          <div
            className={
              block.image
                ? "grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(16rem,0.78fr)] xl:gap-10"
                : ""
            }
          >
            <div>
              {block.paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraph}
                  className={
                    paragraphIndex === 0
                      ? "max-w-[54ch] font-body text-lede text-paper-dim"
                      : "mt-5 max-w-[62ch] font-body text-copy text-body-dim"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {block.image && (
              <div className="relative aspect-[3/2] overflow-hidden rounded-card border border-hairline bg-surface-2 shadow-card">
                <Image
                  src={block.image.src}
                  alt={block.image.alt}
                  fill
                  sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {block.label === "WHAT WE DO" && (
            <ul className="mt-4 grid gap-x-8 gap-y-3 border-t border-hairline pt-8 sm:grid-cols-2 lg:col-span-2 lg:mt-6 lg:grid-cols-3 lg:pt-10">
              {offerings.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 font-body text-copy text-body-dim"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}
    </div>
  );
}
