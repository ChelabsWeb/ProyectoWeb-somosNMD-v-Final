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

export const metadata: Metadata = {
  title: "Proyecto Web NMD",
  description: "Bienvenido a la pagina web de nmd lokitaaa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground min-h-screen antialiased`}
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
