import type { MetadataRoute } from "next";
import { ARTISTS } from "@/data/artists";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/proyectos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const artistEntries: MetadataRoute.Sitemap = ARTISTS.map((artist) => ({
    url: `${baseUrl}/artists/${artist.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...artistEntries];
}
