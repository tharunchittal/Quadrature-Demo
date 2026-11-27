import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";
import ClientLayer from "@/components/ClientLayer";
import ScrollDriver from "@/components/ScrollDriver";
import Nav from "@/components/ui/Nav";
import Frame from "@/components/ui/Frame";
import Readout from "@/components/ui/Readout";
import RevealObserver from "@/components/system/RevealObserver";
import PageTransition from "@/components/system/PageTransition";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quadrature — concept demo",
  description:
    "Concept redesign of quadrature.ai. Not affiliated with Quadrature Capital.",
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Hidden reveal states apply only once script runs, so content never depends on JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip mono" href="#content">
          Skip to content
        </a>
        <ClientLayer />
        <ScrollDriver />
        <Frame />
        <Readout />
        <RevealObserver />
        <Nav />
        {children}
        <PageTransition />
      </body>
    </html>
  );
}
