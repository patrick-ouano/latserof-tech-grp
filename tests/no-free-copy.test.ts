import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

/**
 * The site does not say "free".
 *
 * Four places used to: the CTA band, the contact metadata and lede, the
 * pricing FAQ, and step 01 of `process`. All four traced back to one line of
 * approved handoff copy — "Walkthroughs are free anywhere in Central Florida" —
 * and each rephrasing spread it a little further.
 *
 * It comes out because a site that publishes no prices should not publish a
 * price of zero either: it invites the reading that the work after the survey
 * is on the house, and it is the one number on the page nobody agreed to. The
 * useful half of that sentence is the reach, not the cost, and the copy now
 * says only the reach.
 *
 * Asserted rather than trusted because it is one word, it reads as a selling
 * point, and it re-entered the copy twice already.
 *
 * Comments are exempt — the reasoning above has to be allowed to name the word
 * it is banning, and `SiteHeader` uses the ordinary English idiom in a note
 * about route changes closing the drawer for free.
 */
const SRC = path.join(process.cwd(), "src");

/** Block comments, then comment-only lines. Trailing `//` is left alone so a
 *  URL in a string literal cannot swallow the rest of its line. */
function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.tsx?$/.test(entry.name) ? [full] : [];
  });
}

describe("copy", () => {
  it("never offers anything for free", () => {
    const files = sourceFiles(SRC);
    // Guard the guard: a walker that silently finds nothing would pass.
    expect(files.length).toBeGreaterThan(10);

    const offenders: string[] = [];

    for (const file of files) {
      const rel = path.relative(process.cwd(), file).replace(/\\/g, "/");
      const lines = stripComments(readFileSync(file, "utf8")).split("\n");

      lines.forEach((line, i) => {
        if (/\bfree\b/i.test(line)) {
          offenders.push(`${rel}:${i + 1}: ${line.trim()}`);
        }
      });
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});
