import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareersPageClient } from "@/components/corporate/CareersPageClient";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type CareersPageProps = {
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
    path: "/careers",
    title:
      locale === "tr"
        ? "Kariyer | CityMall Cyprus"
        : "Careers | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus kariyer fırsatlarını, çalışma alanlarını ve genel başvuru formunu inceleyin."
        : "Explore CityMall Cyprus career opportunities, work areas and general application form.",
  });
}

export default function CareersPage({ params }: CareersPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <CareersPageClient locale={locale} />;
}