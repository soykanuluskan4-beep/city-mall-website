import { notFound } from "next/navigation";
import { JsonLd, createOpeningHoursSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { openingHours } from "@/data/opening-hours";
import { locales } from "@/i18n/routing";
import { HoursExplorer } from "@/components/hours/HoursExplorer";
import type { Locale } from "@/types/content";

type HoursPageProps = {
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
    path: "/hours",
    title:
      locale === "tr"
        ? "Çalışma Saatleri & Ziyaret Planlama | CityMall Cyprus"
        : "Opening Hours & Visit Planning | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus mağazalar, restoranlar, food court ve Cinemall çalışma saatlerini inceleyin."
        : "View CityMall Cyprus store, restaurant, food court and Cinemall opening hours.",
  });
}

export default function HoursPage({ params }: HoursPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const hoursSchema = createOpeningHoursSchema(locale, openingHours.mall);

  return (
    <>
      <JsonLd data={hoursSchema} />
      <HoursExplorer locale={locale} />
    </>
  );
}