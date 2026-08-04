import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { Reveal } from "@/components/motion/Reveal";
import { controlLineDemos } from "@/data/line-demos";

/**
 * Short manufacturer demos under Control & lighting.
 *
 * Sits inside /systems#control after the discipline body — a capability
 * nod for lines Latserof specifies, explicitly labeled so they cannot be
 * mistaken for Latserof project footage.
 */
export function LineDemos() {
  return (
    <Reveal variant="fade" className="mt-14">
      <h3 className="mb-3 font-mono text-[12px] leading-none font-bold text-gold">
        MANUFACTURER DEMOS
      </h3>
      <p className="mb-8 max-w-[58ch] font-body text-copy text-body-dim">
        Lines we specify for scenes and motorised shades — short demos from
        the manufacturers, not our install footage.
      </p>

      <ul className="grid gap-8 md:grid-cols-2">
        {controlLineDemos.map((demo, i) => {
          const caption = `${demo.brand} — ${demo.title}`;
          return (
            <Reveal as="li" key={demo.youtubeId} index={i} className="min-w-0">
              <figure>
                <YouTubeEmbed youtubeId={demo.youtubeId} title={caption} />
                <figcaption className="mt-4">
                  <p className="font-mono text-[11px] leading-none font-bold tracking-[0.06em] text-gold">
                    {demo.brand.toUpperCase()}
                  </p>
                  <p className="mt-2 font-body text-[15px] text-paper-dim">
                    {demo.title}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </ul>
    </Reveal>
  );
}
