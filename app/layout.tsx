import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Cursor } from "@/components/Cursor";
import { Intro } from "@/components/Intro";

export const metadata: Metadata = {
  title: "Frago's Momentum Media — Movemos ideas. Conectamos marcas.",
  description:
    "Ecosistema creativo premium para marcas que quieren ganar momentum: branding, storytelling, posicionamiento digital y sistemas de contenido de alto nivel.",
  keywords: [
    "branding",
    "agencia creativa",
    "marketing premium",
    "storytelling",
    "content systems",
    "growth ecosystems",
    "Momentum Media",
    "Frago",
  ],
  authors: [{ name: "Frago's Momentum Media" }],
  openGraph: {
    title: "Frago's Momentum Media",
    description: "Movemos ideas. Conectamos marcas. Impulsamos crecimiento.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,400&f[]=satoshi@900,700,500,400&f[]=inter@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-momentum-void text-momentum-chalk">
        {/* Intro + Cursor live OUTSIDE the template wrapper so they aren't
            affected by per-route fade transitions. */}
        <Intro />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
