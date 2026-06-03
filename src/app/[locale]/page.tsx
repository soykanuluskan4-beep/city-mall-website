import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { ExploreCityMall } from "@/components/redesign/ExploreCityMall";
import { LiveEventsCarousel } from "@/components/redesign/LiveEventsCarousel";
import { PlanVisitBento } from "@/components/redesign/PlanVisitBento";
import { PreviewHeroGrid } from "@/components/redesign/PreviewHeroGrid";
import { PreviewVideoHero } from "@/components/redesign/PreviewVideoHero";
import { StoresBrandCarousel } from "@/components/redesign/StoresBrandCarousel";
import { createPageMetadata } from "@/lib/metadata";
import {
  JsonLd,
  createOrganizationSchema,
  createShoppingMallSchema,
} from "@/lib/schema";
import type { Locale } from "@/types/content";

type HomePageProps = {
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
    path: "",
    title:
      locale === "tr"
        ? "CityMall Cyprus | Gazimağusa'nın buluşma noktası"
        : "CityMall Cyprus | Famagusta's meeting point",
    description:
      locale === "tr"
        ? "CityMall Cyprus sitesinde mağazalar, yeme-içme seçenekleri, kampanyalar, etkinlikler, sinema ve ziyaret bilgilerini keşfedin."
        : "Discover stores, dining options, campaigns, events, cinema and visitor information on the CityMall Cyprus website.",
  });
}

export default function HomePage({ params }: HomePageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const organizationSchema = createOrganizationSchema(locale);
  const shoppingMallSchema = createShoppingMallSchema(locale);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f3] text-text-primary">
      <JsonLd data={organizationSchema} />
      <JsonLd data={shoppingMallSchema} />

      <PreviewVideoHero locale={locale} />
      <PreviewHeroGrid locale={locale} />
      <PlanVisitBento locale={locale} />
      <LiveEventsCarousel locale={locale} />
      <StoresBrandCarousel locale={locale} />
      <ExploreCityMall locale={locale} />
    </main>
  );
}