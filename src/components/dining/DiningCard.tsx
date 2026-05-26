/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, MapPin, Utensils } from "lucide-react";
import { getLocalizedText } from "@/lib/locale";
import type { DiningPlace, Floor, Locale } from "@/types/content";

type DiningCardProps = {
  place: DiningPlace;
  locale: Locale;
};

const content = {
  tr: {
    details: "Detaylar",
    cuisineLabels: {
      turkish: "Türk",
      italian: "İtalyan",
      "fast-food": "Fast Food",
      cafe: "Cafe",
      dessert: "Tatlı",
      coffee: "Kahve",
      healthy: "Sağlıklı",
      world: "Dünya Mutfağı",
      snack: "Atıştırmalık",

    },
    floorLabels: {
      basement: "Basement Floor",
      ground: "Zemin Kat",
      first: "1. Kat",
      second: "2. Kat",
      "food-court": "Food Court",
      cinema: "Sinema Katı",
    },
  },
  en: {
    details: "Details",
    cuisineLabels: {
      turkish: "Turkish",
      italian: "Italian",
      "fast-food": "Fast Food",
      cafe: "Cafe",
      dessert: "Dessert",
      coffee: "Coffee",
      healthy: "Healthy",
      world: "World Cuisine",
      snack: "Snacks",

    },
    floorLabels: {
      basement: "Basement Floor",
      ground: "Ground Floor",
      first: "1st Floor",
      second: "2nd Floor",
      "food-court": "Food Court",
      cinema: "Cinema Floor",
    },
  },
};

export function DiningCard({ place, locale }: DiningCardProps) {
  const copy = content[locale];
  const name = getLocalizedText(place.name, locale);
  const description = getLocalizedText(place.description, locale);
  const cuisine = place.cuisine ? getLocalizedText(place.cuisine, locale) : "";
  const cuisineLabel = place.cuisineType
    ? copy.cuisineLabels[place.cuisineType]
    : cuisine;

  const floorLabel =
    copy.floorLabels[place.floor as Floor] ?? place.floor;

  return (
    <article className="group relative min-h-[430px] w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-text-primary shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-elevated">
      <img
        src={place.coverImage ?? ""}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.08)_0%,rgba(17,24,39,0.48)_42%,rgba(17,24,39,0.92)_100%)]" />

      <div className="relative flex min-h-[430px] flex-col justify-between p-5 text-white md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {cuisineLabel ? (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-text-primary shadow-card">
              {cuisineLabel}
            </span>
          ) : null}

          
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/78">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {floorLabel}
            </span>

            {cuisine ? (
              <span className="inline-flex items-center gap-1.5">
                <Utensils className="h-4 w-4" aria-hidden="true" />
                {cuisine}
              </span>
            ) : null}
          </div>

          <h2 className="max-w-xl break-words text-3xl font-semibold tracking-tight md:text-4xl">
            {name}
          </h2>

          <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-6 text-white/78">
            {description}
          </p>

          <Link
            href={`/${locale}/dining/${place.slug}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-muted"
          >
            {copy.details}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}