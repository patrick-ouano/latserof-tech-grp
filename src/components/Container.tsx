import type { ReactNode } from "react";

/**
 * The 1280px content canvas with the responsive gutter.
 *
 * Gutter per the handoff's responsive spec: 52px at >=1280, 40px from 768,
 * 24px below that. Dark bands run full-bleed; only their contents are
 * constrained, which is why this is a separate component from the section.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 xl:px-[52px] ${className}`}
    >
      {children}
    </div>
  );
}
