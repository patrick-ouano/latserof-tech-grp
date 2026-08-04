/**
 * Privacy-enhanced YouTube embed.
 *
 * Uses youtube-nocookie.com and lazy-loads the iframe so a systems page
 * with two demos does not pull YouTube until the frames approach the
 * viewport. Title is required — empty iframe titles fail a11y checks.
 */
export function YouTubeEmbed({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title: string;
}) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-card border border-hairline bg-ink">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
