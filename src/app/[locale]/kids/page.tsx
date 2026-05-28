import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { KidsPageClient } from "@/components/kids/KidsPageClient";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type KidsPageProps = {
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
    path: "/kids",
    title:
      locale === "tr"
        ? "Çocuk & Eğlence | CityMall Cyprus"
        : "Kids & Entertainment | CityMall Cyprus",
    description:
      locale === "tr"
        ? "FunLab, çocuk mağazaları, aile etkinlikleri ve çocuklu ziyaret bilgilerini keşfedin."
        : "Explore FunLab, kids stores, family events and family visit information.",
  });
}

export default function KidsPage({ params }: KidsPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <KidsPageClient locale={locale} />;
}