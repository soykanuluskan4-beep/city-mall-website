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
    tr: "Alışveriş, yeme-içme, sinema, etkinlik ve ziyaret bilgilerini modern bir AVM deneyimiyle bir araya getiren CityMall Cyprus sitesi.",
    en: "A CityMall Cyprus website bringing shopping, dining, cinema, events and visitor information together through a modern mall experience.",
  },
  disclaimer: {
  tr: "Güncel mağaza, etkinlik ve ziyaret bilgileri için CityMall Cyprus iletişim kanallarını kontrol edebilirsiniz.",
  en: "For current store, event and visit information, please check the CityMall Cyprus contact channels.",
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