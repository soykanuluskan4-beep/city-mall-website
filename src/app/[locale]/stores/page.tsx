import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { StoresExplorer } from "@/components/stores/StoresExplorer";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type StoresPageProps = {
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
    path: "/stores",
    title:
      locale === "tr"
        ? "Mağazalar | CityMall Cyprus"
        : "Stores | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus mağazalarını arayın, kategoriye, kata ve duruma göre filtreleyin."
        : "Search CityMall Cyprus stores and filter by category, floor and status.",
  });
}

export default function StoresPage({ params }: StoresPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <StoresExplorer locale={locale} />;
}