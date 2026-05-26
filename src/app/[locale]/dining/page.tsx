import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiningExplorer } from "@/components/dining/DiningExplorer";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type DiningPageProps = {
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
    path: "/dining",
    title:
      locale === "tr"
        ? "Yeme-İçme | CityMall Cyprus"
        : "Dining | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus yeme-içme mekanlarını mutfak tipi, konum ve fiyat aralığına göre keşfedin."
        : "Explore CityMall Cyprus dining places by cuisine, location and price range.",
  });
}

export default function DiningPage({ params }: DiningPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <DiningExplorer locale={locale} />;
}