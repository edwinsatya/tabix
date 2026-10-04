import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Dock } from "@/components/layout/dock";
import { Nav } from "@/components/layout/nav";
import { Preloader } from "@/components/layout/preloader";
import { AtmosphereProvider } from "@/components/providers/atmosphere";
import { Cursor } from "@/components/ui/cursor";
import { Grain } from "@/components/ui/grain";
import { RakingLight } from "@/components/ui/raking-light";
import { site } from "@/content/site";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const serif = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060709",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-motion="drift"
      className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-full bg-ink-950">
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="eyebrow fixed left-4 top-4 z-[100] -translate-y-24 bg-bone-100 px-4 py-3 text-ink-950 transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <AtmosphereProvider>
          <Preloader />
          <Nav />
          <main id="main">{children}</main>
          <Dock />
          <RakingLight />
          <Grain />
          <Cursor />
        </AtmosphereProvider>
      </body>
    </html>
  );
}
