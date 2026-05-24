import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

const routes = [
  "",
  "/stores",
  "/dining",
  "/campaigns",
  "/events",
  "/cinema",
  "/kids",
  "/hours",
  "/map",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return siteConfig.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
    }))
  );
}