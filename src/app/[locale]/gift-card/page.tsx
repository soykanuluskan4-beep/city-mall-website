import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GiftCardClient } from "@/components/gift-card/GiftCardClient";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type GiftCardPageProps = {
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
    path: "/gift-card",
    title:
      locale === "tr"
        ? "Hediye Kartı | CityMall Cyprus"
        : "Gift Card | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus hediye kartı seçeneklerini, katılımcı mağazaları ve kullanım koşullarını inceleyin."
        : "Explore CityMall Cyprus gift card options, participating stores and usage terms.",
  });
}

export default function GiftCardPage({ params }: GiftCardPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <GiftCardClient locale={locale} />;
}