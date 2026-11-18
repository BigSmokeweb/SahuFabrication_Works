import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const live = process.env.VERCEL_ENV === "production" && process.env.SITE_URL;
  return {
    rules: live
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
    ...(live ? { sitemap: process.env.SITE_URL + "/sitemap.xml" } : {}),
  };
}
