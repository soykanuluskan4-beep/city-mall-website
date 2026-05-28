import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { StatsSection } from "@/components/home/StatsSection";
import { VisitSummary } from "@/components/home/VisitSummary";
import { FeaturedStores } from "@/components/home/FeaturedStores";
import { CampaignSlider } from "@/components/home/CampaignSlider";
import { DiningShowcase } from "@/components/home/DiningShowcase";
import { EventsShowcase } from "@/components/home/EventsShowcase";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickAccess } from "@/components/home/QuickAccess";
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
    <main className="bg-surface-default">
      <JsonLd data={organizationSchema} />
      <JsonLd data={shoppingMallSchema} />

      <HeroSection locale={locale} />
      <QuickAccess locale={locale} />
      <CampaignSlider locale={locale} />
      <FeaturedStores locale={locale} />
      <DiningShowcase locale={locale} />
      <EventsShowcase locale={locale} />
      <StatsSection locale={locale} />
      <VisitSummary locale={locale} />
    </main>
  );
}