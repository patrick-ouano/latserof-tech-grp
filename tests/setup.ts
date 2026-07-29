import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(cleanup);

/**
 * jsdom implements neither of these, and both are load-bearing in this
 * codebase rather than incidental:
 *
 *   IntersectionObserver — Reveal's fallback path
 *   matchMedia           — the reduced-motion query
 *
 * Stubbed rather than mocked away entirely so components exercise their
 * real code paths; individual tests override the behaviour they care about.
 */
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// This file is shared with node-environment suites (the API route tests),
// where there is no window at all.
if (typeof window !== "undefined" && !window.matchMedia) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}
