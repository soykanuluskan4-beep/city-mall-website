import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiningDetailClient } from "@/components/dining/DiningDetailClient";
import { diningPlaces } from "@/data/dining";
import { locales } from "@/i18n/routing";
import { getLocalizedText } from "@/lib/locale";
import { createPageMetadata } from "@/lib/metadata";
import type { DiningPlace, Locale } from "@/types/content";

type DiningDetailPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

function findDiningPlace(slug: string) {
  return diningPlaces.find((place) => place.slug === slug);
}

function getRelatedPlaces(currentPlace: DiningPlace) {
  const sameCuisine = diningPlaces.filter(
    (place) =>
      place.slug !== currentPlace.slug &&
      place.cuisineType === currentPlace.cuisineType
  );

  const sameCategory = diningPlaces.filter(
    (place) =>
      place.slug !== currentPlace.slug &&
      place.category === currentPlace.category &&
      place.cuisineType !== currentPlace.cuisineType
  );

  const otherPlaces = diningPlaces.filter(
    (place) =>
      place.slug !== currentPlace.slug &&
      place.cuisineType !== currentPlace.cuisineType &&
      place.category !== currentPlace.category
  );

  return [...sameCuisine, ...sameCategory, ...otherPlaces].slice(0, 3);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    diningPlaces.map((place) => ({
      locale,
      slug: place.slug,
    }))
  );
}

export function generateMetadata({
  params,
}: DiningDetailPageProps): Metadata {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    return {};
  }

  const place = findDiningPlace(params.slug);

  if (!place) {
    return {};
  }

  return createPageMetadata({
    locale,
    path: `/dining/${place.slug}`,
    title: `${getLocalizedText(place.name, locale)} | CityMall Cyprus`,
    description: getLocalizedText(place.description, locale),
  });
}

export default function DiningDetailPage({ params }: DiningDetailPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const place = findDiningPlace(params.slug);

  if (!place) {
    notFound();
  }

  const relatedPlaces = getRelatedPlaces(place);

  return (
    <DiningDetailClient
      locale={locale}
      place={place}
      relatedPlaces={relatedPlaces}
    />
  );
}