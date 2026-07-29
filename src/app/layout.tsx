import type { Metadata } from "next";
import { Archivo, Barlow, Space_Mono } from "next/font/google";
import "./globals.css";
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${barlow.variable} ${spaceMono.variable} h-full`}
    >
      <body className="min-h-full bg-ink font-body text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
