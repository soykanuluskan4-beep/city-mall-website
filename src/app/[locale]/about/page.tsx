import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPageClient } from "@/components/corporate/AboutPageClient";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type AboutPageProps = {
  params: {
    locale: string;
  };
};

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    return {};
  }

  return createPageMetadata({
    locale,
    path: "/about",
    title:
      locale === "tr"
        ? "Hakkımızda | CityMall Cyprus"
        : "About Us | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus’un hikayesini, vizyonunu, ziyaretçi deneyimini ve kurumsal yaklaşımını keşfedin."
        : "Discover the story, vision, visitor experience and corporate approach of CityMall Cyprus.",
  });
}

export default function AboutPage({ params }: AboutPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <AboutPageClient locale={locale} />;
}