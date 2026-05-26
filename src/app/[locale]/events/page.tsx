import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { EventsExplorer } from "@/components/events/EventsExplorer";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type EventsPageProps = {
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
    path: "/events",
    title:
      locale === "tr"
        ? "Etkinlikler | CityMall Cyprus"
        : "Events | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus etkinliklerini kategoriye ve tarihe göre filtreleyin."
        : "Filter CityMall Cyprus events by category and date.",
  });
}

export default function EventsPage({ params }: EventsPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <EventsExplorer locale={locale} />;
}