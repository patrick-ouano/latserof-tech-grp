"use client";

import { useCallback, useRef, type ElementType, type ReactNode, type Ref } from "react";

/**
 * Pointer-tracked gold bloom for cards.
 *
 * Writes --mx/--my straight onto the node's style rather than through React
 * state: this fires on every mousemove, and a setState per frame would
 * re-render the card's whole subtree for a decorative gradient.
 *
 * Positions are read from the event and applied inside a rAF, so a burst of
 * moves collapses to one write per frame.
 *
 * Degrades to nothing at all: with no pointer the vars stay unset and the
 * `.spotlight` gradient in globals.css never becomes visible. Reduced
 * motion kills the opacity transition there too.
 */
export function Spotlight({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    // Coarse pointers "hover" only on tap, which would flash the bloom.
    if (e.pointerType !== "mouse") return;

    const el = ref.current;
    if (!el) return;

    const { clientX, clientY } = e;
    if (frame.current) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const box = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - box.left}px`);
      el.style.setProperty("--my", `${clientY - box.top}px`);
    });
  }, []);

  return (
    <Tag
      ref={ref as Ref<never>}
      onPointerMove={onPointerMove}
      className={`spotlight ${className}`}
    >
      {children}
    </Tag>
  );
}
