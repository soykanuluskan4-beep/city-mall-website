import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CinemaExplorer } from "@/components/cinema/CinemaExplorer";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type CinemaPageProps = {
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
    path: "/cinema",
    title: "Cinemall | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus Cinemall film seansları, vizyondaki filmler ve yakında vizyona girecek yapımlar."
        : "CityMall Cyprus Cinemall showtimes, now showing movies and upcoming releases.",
  });
}

export default function CinemaPage({ params }: CinemaPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <CinemaExplorer locale={locale} />;
}