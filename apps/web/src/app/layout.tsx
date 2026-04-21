import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { PageShell } from "@/components/layout/PageShell";
import { CartProvider } from "@/context/CartContext";
import { QueryProvider } from "@/components/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "NMD — Nómades",
    template: "%s | NMD",
  },
  description:
    "NMD (Nómades) — colectivo musical uruguayo. Reservá sesiones, explorá a los artistas y descubrí la obra del colectivo.",
  keywords: [
    "NMD",
    "Nómades",
    "música uruguaya",
    "estudio de grabación",
    "colectivo musical",
    "rap uruguayo",
    "hip hop Uruguay",
  ],
  authors: [{ name: "NMD" }],
  creator: "NMD",
  publisher: "NMD",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: appUrl,
    siteName: "NMD",
    title: "NMD — Nómades",
    description:
      "Colectivo musical uruguayo. Reservá sesiones y descubrí a los artistas.",
    images: [
      {
        url: "/assets/logo/logoNMD.svg",
        width: 1200,
        height: 630,
        alt: "NMD — Nómades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NMD — Nómades",
    description:
      "Colectivo musical uruguayo. Reservá sesiones y descubrí a los artistas.",
    images: ["/assets/logo/logoNMD.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground min-h-dvh antialiased`}
      >
        <QueryProvider>
          <CartProvider>
            <PageShell>{children}</PageShell>
            <Analytics />
            <SpeedInsights />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
