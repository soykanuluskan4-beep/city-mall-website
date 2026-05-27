import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type ServicesPageProps = {
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
    path: "/services",
    title:
      locale === "tr"
        ? "Hizmetler | CityMall Cyprus"
        : "Services | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus ziyaretçi hizmetlerini, erişilebilirlik bilgilerini, danışma noktalarını ve otopark hizmetlerini inceleyin."
        : "Explore CityMall Cyprus visitor services, accessibility information, guest services and parking services.",
  });
}

export default function ServicesPage({ params }: ServicesPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <ServicesExplorer locale={locale} />;
}