import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Beats, merch y pieza única del colectivo NMD. Catálogo curado por los 12 artistas.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop | NMD",
    description:
      "Beats, merch y pieza única del colectivo NMD. Catálogo curado por los 12 artistas.",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
