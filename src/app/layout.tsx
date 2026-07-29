import type { Metadata } from "next";
import { Archivo, Barlow, Space_Mono } from "next/font/google";
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
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${barlow.variable} ${spaceMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-ink font-body text-paper antialiased">
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
      </body>
    </html>
  );
}
