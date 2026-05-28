import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DiningCard } from "@/components/dining/DiningCard";
import { diningPlaces } from "@/data/dining";
import type { Locale } from "@/types/content";

type DiningShowcaseProps = {
  locale: Locale;
};

const content = {
  tr: {
    eyebrow: "Yeme-İçme",
    title: "Bu akşam ne yesek?",
    description:
      "CityMall’de kahveden hızlı öğüne, restoranlardan tatlı molasına kadar seçenekleri keşfedin.",
    cta: "Tüm Restoranları Gör",
  },
  en: {
    eyebrow: "Dining",
    title: "What should we eat tonight?",
    description:
      "Explore CityMall dining options, from coffee and quick meals to restaurants and dessert breaks.",
    cta: "View All Restaurants",
  },
};

export function DiningShowcase({ locale }: DiningShowcaseProps) {
  const copy = content[locale];

  const featuredDining = diningPlaces
    .filter((place) => place.featured)
    .slice(0, 4);

  const diningItems =
    featuredDining.length >= 4 ? featuredDining : diningPlaces.slice(0, 4);

  return (
    <section className="border-y border-border-default bg-surface-muted/45 py-16 md:py-20">
      <div className="container">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              {copy.eyebrow}
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.title}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
              {copy.description}
            </p>
          </div>

          <Link
            href={`/${locale}/dining`}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
          >
            {copy.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4">
          {diningItems.map((place) => (
            <div
              key={place.id}
              className="min-w-[280px] snap-start md:min-w-0"
            >
              <DiningCard place={place} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}