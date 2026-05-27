import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/corporate/LegalPage";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type TermsPageProps = {
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
    path: "/terms",
    title:
      locale === "tr"
        ? "Kullanım Koşulları | CityMall Cyprus"
        : "Terms of Use | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus web sitesi kullanım koşullarını ve sorumluluk bilgilendirmesini inceleyin."
        : "Review CityMall Cyprus website terms of use and responsibility information.",
  });
}

export default function TermsPage({ params }: TermsPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <LegalPage locale={locale} type="terms" />;
}