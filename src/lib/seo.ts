import type { Locale } from "@/types/content";

export const siteConfig = {
  name: "CityMall Cyprus",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  defaultLocale: "tr" as Locale,
  locales: ["tr", "en"] as const,
};

export const seoContent = {
  tr: {
    title: "CityMall Cyprus | AVM Web Sitesi Konsepti",
    description:
      "CityMall Cyprus için hazırlanmış çok dilli AVM web sitesi konsepti. Mağazalar, yeme-içme, kampanyalar, etkinlikler, sinema ve ziyaret bilgileri.",
    ogTitle: "CityMall Cyprus",
    ogDescription:
      "Alışveriş, yeme-içme, etkinlik ve eğlenceyi tek çatı altında sunan modern AVM web sitesi konsepti.",
  },
  en: {
    title: "CityMall Cyprus | Mall Website Concept",
    description:
      "A multilingual mall website concept for CityMall Cyprus, featuring stores, dining, campaigns, events, cinema and visitor information.",
    ogTitle: "CityMall Cyprus",
    ogDescription:
      "A modern mall website concept bringing shopping, dining, events and entertainment under one roof.",
  },
};

export function getSeoContent(locale: Locale) {
  return seoContent[locale] ?? seoContent[siteConfig.defaultLocale];
}