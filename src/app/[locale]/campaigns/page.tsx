import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { CampaignsExplorer } from "@/components/campaigns/CampaignsExplorer";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type CampaignsPageProps = {
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
    path: "/campaigns",
    title:
      locale === "tr"
        ? "Kampanyalar | CityMall Cyprus"
        : "Campaigns | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus kampanyalarını kategoriye ve duruma göre filtreleyin."
        : "Filter CityMall Cyprus campaigns by category and status.",
  });
}

export default function CampaignsPage({ params }: CampaignsPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <CampaignsExplorer locale={locale} />;
}