import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PressPageClient } from "@/components/corporate/PressPageClient";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type PressPageProps = {
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
    path: "/press",
    title:
      locale === "tr"
        ? "Basın & Medya | CityMall Cyprus"
        : "Press & Media | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus basın kaynakları, logo paketi, medya iletişimi ve kurumsal duyurularını inceleyin."
        : "Explore CityMall Cyprus press resources, logo package, media contact and corporate announcements.",
  });
}

export default function PressPage({ params }: PressPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <PressPageClient locale={locale} />;
}