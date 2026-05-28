import type { Metadata } from "next";
import type { Locale } from "@/types/content";
import {
  getAlternateLanguages,
  getCanonicalUrl,
  getSeoContent,
  siteConfig,
} from "@/lib/seo";

type CreatePageMetadataInput = {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
};

export function createPageMetadata({
  locale,
  path = "",
  title,
  description,
  ogTitle,
  ogDescription,
}: CreatePageMetadataInput): Metadata {
  const fallbackSeo = getSeoContent(locale);
  const canonicalUrl = getCanonicalUrl(locale, path);

  const finalTitle = title ?? fallbackSeo.title;
  const finalDescription = description ?? fallbackSeo.description;
  const finalOgTitle = ogTitle ?? finalTitle;
  const finalOgDescription = ogDescription ?? finalDescription;

  return {
    metadataBase: new URL(siteConfig.url),
    title: finalTitle,
    description: finalDescription,
    applicationName: siteConfig.name,
    authors: [{ name: "CityMall Cyprus" }],
creator: "CityMall Cyprus",
publisher: "CityMall Cyprus",
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages(path),
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: finalOgTitle,
      description: finalOgDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: finalOgTitle,
      description: finalOgDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}