import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { PageShell } from "@/components/layout/PageShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Web NMD",
  description:
    "Living music video experience for the NMD collective — cinematic storytelling, motion, and merch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageShell>
          <PrimaryNav />
          {children}
        </PageShell>
      </body>
    </html>
  );
}
