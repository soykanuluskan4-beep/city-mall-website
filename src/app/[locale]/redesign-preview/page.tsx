import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RedesignPreviewClient } from "@/components/redesign/RedesignPreviewClient";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type RedesignPreviewPageProps = {
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
    path: "/redesign-preview",
    title:
      locale === "tr"
        ? "Cinematic Redesign Preview | CityMall Cyprus"
        : "Cinematic Redesign Preview | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus için hazırlanan cinematic redesign önizleme sayfası."
        : "A cinematic redesign preview page prepared for CityMall Cyprus.",
  });
}

export default function RedesignPreviewPage({
  params,
}: RedesignPreviewPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <RedesignPreviewClient locale={locale} />;
}