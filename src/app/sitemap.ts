import type { MetadataRoute } from "next";
import { categories, services } from "@/lib/services";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL;
  if (!base) return [];
  return [
    ...new Set([
      "",
      "/about",
      "/services",
      "/gallery",
      "/contact",
      "/privacy",
      ...categories.map((c) => "/services/" + c.slug),
      ...services.map((s) => "/services/" + s.slug),
    ]),
  ].map((path) => ({ url: base + path }));
}
