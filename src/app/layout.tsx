import type { Metadata, Viewport } from "next";
import { Archivo, Barlow, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";

/* The three brand families, self-hosted by next/font — no request leaves the
   browser for Google. The design reference hotlinks fonts.googleapis.com;
   that is a prototype convenience, not something to ship.

   Weights match the handoff type table exactly. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — Home theater, smart home and commercial AV in Central Florida`,
    template: `%s — ${site.brand}`,
  },
  description:
    "Home theater, smart home and commercial AV in Central Florida. Cinema rooms, control and lighting, networking and surveillance — designed, wired and supported by the crew that installed it.",
  openGraph: {
    type: "website",
    siteName: site.brand,
    locale: "en_US",
    url: site.url,
    title: `${site.brand} — Home theater, smart home and commercial AV in Central Florida`,
    description:
      "Cinema rooms, control and lighting, networking and surveillance — designed, wired and supported by the crew that installed it.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Private cinema room installed by Latserof Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-image.jpg"],
  },
  // NOTE: no `alternates.canonical` here on purpose. A canonical set on the
  // root layout is inherited by every route, so each page was declaring
  // itself canonical to "/" — which tells search engines the five content
  // pages are duplicates of the homepage. Each page sets its own.
  //
  // Local trades get shared over WhatsApp and Messenger constantly; without
  // the OG image above, a shared link renders as bare text with no preview.
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

/**
 * Sets the two capability classes before first paint.
 *
 *   js  — JavaScript ran, so it is safe for CSS to hide scroll-reveal
 *         content. Without this class nothing is ever hidden.
 *   sda — native scroll-driven animations are supported, so reveals are
 *         handled in pure CSS and Reveal.tsx stands down.
 *
 * This has to be blocking and it has to be early: setting the class in an
 * effect meant content painted visible, snapped hidden, then animated.
 */
const CAPABILITY_SCRIPT = `try{var d=document.documentElement;d.classList.add('js');if(window.CSS&&CSS.supports&&CSS.supports('animation-timeline','view()'))d.classList.add('sda')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${barlow.variable} ${spaceMono.variable} h-full`}
      /*
       * CAPABILITY_SCRIPT below adds `js` (and `sda`) to this element before
       * React hydrates — which is the entire point of it, since setting them
       * after paint made content flash visible, snap hidden, then animate.
       *
       * That means the server HTML and the live DOM legitimately disagree
       * about this one className, and React reports it as a hydration
       * mismatch on every page load. This is the documented way to say "the
       * difference is intentional".
       *
       * It suppresses warnings for THIS element's own attributes only — one
       * level deep, not the tree — so real mismatches anywhere inside the
       * page are still reported.
       */
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-ink font-body text-paper antialiased">
        {/* First child of <body> so it executes before any [data-reveal]
            element is parsed, and therefore before any of them paint. */}
        <script dangerouslySetInnerHTML={{ __html: CAPABILITY_SCRIPT }} />
        <a
          href="#main"
          className="sr-only rounded-btn focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:font-heading focus:text-[14px] focus:font-extrabold focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <LocalBusinessJsonLd />
        {/* No-op outside Vercel, so local and preview runs stay clean.
            Cookieless and IP-anonymised, so no consent banner is required. */}
        <Analytics />
      </body>
    </html>
  );
}
