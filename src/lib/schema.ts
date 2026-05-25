import { createElement } from "react";
import { brand } from "@/lib/brand";
import { getCanonicalUrl, siteConfig } from "@/lib/seo";
import type { Locale, LocalizedString, OpeningHourDay } from "@/types/content";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export function JsonLd({ data }: { data: JsonLdValue }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  });
}

function getLocalized(value: LocalizedString, locale: Locale) {
  return value[locale];
}

export function createOrganizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: getCanonicalUrl(locale),
    description: brand.description[locale],
    slogan: brand.voice[locale],
  };
}

export function createShoppingMallSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ShoppingCenter",
    name: brand.name,
    url: getCanonicalUrl(locale),
    description: brand.description[locale],
    slogan: brand.voice[locale],
    address: {
      "@type": "PostalAddress",
      addressLocality: brand.location[locale],
      addressCountry: locale === "tr" ? "KKTC" : "TRNC",
    },
  };
}

export function createItemListSchema<T extends { id: string }>(
  locale: Locale,
  path: string,
  items: T[],
  getName: (item: T) => string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getName(item),
      url: `${siteConfig.url}/${locale}${path}#${item.id}`,
    })),
  };
}

export function createOpeningHoursSchema(
  locale: Locale,
  days: OpeningHourDay[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.name,
    url: getCanonicalUrl(locale, "/hours"),
    openingHoursSpecification: days.map((day) => ({
      "@type": "OpeningHoursSpecification",
      name: getLocalized(day.label, locale),
      opens: day.open,
      closes: day.close,
    })),
  };
}

export function createLocalBusinessSchema(locale: Locale, path = "/contact") {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.name,
    url: getCanonicalUrl(locale, path),
    description: brand.description[locale],
    slogan: brand.voice[locale],
    address: {
      "@type": "PostalAddress",
      addressLocality: brand.location[locale],
      addressCountry: locale === "tr" ? "KKTC" : "TRNC",
    },
  };
}