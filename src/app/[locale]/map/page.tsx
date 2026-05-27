import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapExplorer } from "@/components/map/MapExplorer";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type MapPageProps = {
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
    path: "/map",
    title:
      locale === "tr"
        ? "Harita & Ulaşım | CityMall Cyprus"
        : "Map & Directions | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus konumunu, yol tarifi bilgilerini, kat planını ve otopark detaylarını inceleyin."
        : "View CityMall Cyprus location, directions, floor plan and parking information.",
  });
}

export default function MapPage({ params }: MapPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <MapExplorer locale={locale} />;
}