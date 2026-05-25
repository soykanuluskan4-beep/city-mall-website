import { brand } from "@/lib/brand";
import type { Locale } from "@/types/content";

export const siteConfig = {
  name: brand.name,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://city-mall-website.vercel.app",
  defaultLocale: "tr" as Locale,
  locales: ["tr", "en"] as const,
};

export const seoContent = {
  tr: {
    title: `${brand.name} | ${brand.voice.tr}`,
    description: brand.description.tr,
    ogTitle: brand.name,
    ogDescription: brand.voice.tr,
  },
  en: {
    title: `${brand.name} | ${brand.voice.en}`,
    description: brand.description.en,
    ogTitle: brand.name,
    ogDescription: brand.voice.en,
  },
};

export function getSeoContent(locale: Locale) {
  return seoContent[locale] ?? seoContent[siteConfig.defaultLocale];
}

export function getCanonicalUrl(locale: Locale, path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = normalizedPath === "/" ? "" : normalizedPath;

  return `${siteConfig.url}/${locale}${cleanPath}`;
}

export function getAlternateLanguages(path = "") {
  return {
    tr: getCanonicalUrl("tr", path),
    en: getCanonicalUrl("en", path),
  };
}