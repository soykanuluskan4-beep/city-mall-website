import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeasingPageClient } from "@/components/corporate/LeasingPageClient";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type LeasingPageProps = {
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
    path: "/leasing",
    title:
      locale === "tr"
        ? "Kiralama | CityMall Cyprus"
        : "Leasing | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus’ta mağaza, kiosk, food court veya etkinlik alanı kiralama başvurusu yapın."
        : "Apply for retail, kiosk, food court or event space leasing at CityMall Cyprus.",
  });
}

export default function LeasingPage({ params }: LeasingPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <LeasingPageClient locale={locale} />;
}