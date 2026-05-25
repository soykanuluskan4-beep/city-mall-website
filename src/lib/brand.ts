import type { Locale } from "@/types/content";

export const brand = {
  name: "CityMall Cyprus",
  location: {
    tr: "Gazimağusa",
    en: "Famagusta",
  },
  voice: {
    tr: "Gazimağusa'nın buluşma noktası.",
    en: "Famagusta's meeting point.",
  },
  description: {
    tr: "Alışveriş, yeme-içme, sinema, etkinlik ve ziyaret bilgilerini modern bir AVM deneyimiyle bir araya getiren CityMall Cyprus konsept sitesi.",
    en: "A CityMall Cyprus concept website bringing shopping, dining, cinema, events and visitor information together through a modern mall experience.",
  },
  disclaimer: {
    tr: "Bu site CityMall Cyprus'un resmi sitesi değildir. Portföy ve konsept demonstrasyonu amacıyla hazırlanmıştır.",
    en: "This site is not the official website of CityMall Cyprus. It was created for portfolio and concept demonstration purposes.",
  },
} as const;

export function getBrandVoice(locale: Locale) {
  return brand.voice[locale];
}

export function getBrandDescription(locale: Locale) {
  return brand.description[locale];
}

export function getBrandDisclaimer(locale: Locale) {
  return brand.disclaimer[locale];
}