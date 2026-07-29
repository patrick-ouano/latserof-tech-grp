import type { ReactNode } from "react";

/**
 * Route-change entrance.
 *
 * A template re-mounts on every navigation (a layout does not), which makes
 * it the one place an App Router page transition can live without any
 * client JavaScript — the animation is a CSS class that simply replays each
 * time this node is recreated.
 *
 * This is deliberately not React's <ViewTransition>: that component ships
 * only in React's experimental channel, and this project is on stable
 * 19.2.4, where it is not exported. Motion should not put the app on a
 * pre-release React.
 *
 * Reduced motion collapses the animation globally in globals.css.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
