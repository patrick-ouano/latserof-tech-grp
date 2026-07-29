import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://127.0.0.1:${PORT}`;

/**
 * A second server, running `next dev`.
 *
 * React only reports hydration mismatches in development — a production
 * build stays silent and simply re-renders. So the one mode that can catch
 * "server HTML didn't match the client" is the one mode the rest of this
 * suite deliberately does not use.
 */
const DEV_PORT = 3101;
const devBaseURL = `http://127.0.0.1:${DEV_PORT}`;

/**
 * End-to-end tests.
 *
 * Runs against a production build, not `next dev`: this suite checks
 * prerendered markup, static generation and no-JavaScript behaviour, none of
 * which the dev server represents faithfully.
 *
 * Port 3100 so a dev server on 3000 can stay running alongside it.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",

  // Two servers run at once (a production build for most projects, a dev
  // server for the hydration project), so give a contended machine room
  // rather than trading real failures for flakes.
  timeout: 45_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      testIgnore: /hydration\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      testIgnore: /hydration\.spec\.ts/,
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "hydration",
      testMatch: /hydration\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], baseURL: devBaseURL },
    },
  ],

  webServer: [
    {
      command: `npm run build && npx next start --port ${PORT}`,
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
    },
    {
      command: `npx next dev --port ${DEV_PORT}`,
      url: devBaseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
