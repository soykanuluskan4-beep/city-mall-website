import Link from "next/link";
import { notFound } from "next/navigation";
import { diningPlaces } from "@/data/dining";
import { locales } from "@/i18n/routing";
import { getLocalizedText } from "@/lib/locale";
import type { Locale } from "@/types/content";

type DiningPageProps = {
  params: {
    locale: string;
  };
};

const pageContent = {
  tr: {
    eyebrow: "Yeme-İçme",
    title: "Kahve molasından aile yemeklerine kadar lezzet durakları.",
    description:
      "CityMall Cyprus konsept yeme-içme alanında kafe, restoran, fast food ve tatlı seçeneklerini keşfedin.",
    allDining: "Tüm Yeme-İçme Noktaları",
    featuredDining: "Öne Çıkan Lezzetler",
    category: "Kategori",
    cuisine: "Mutfak",
    floor: "Konum",
    backHome: "Ana sayfaya dön",
    foodCourt: "Yeme-İçme Katı",
    categories: {
      restaurant: "Restoran",
      cafe: "Kafe",
      "fast-food": "Fast Food",
      dessert: "Tatlı",
      coffee: "Kahve",
      other: "Diğer",
    },
  },
  en: {
    eyebrow: "Dining",
    title: "Taste stops from coffee breaks to family meals.",
    description:
      "Explore cafe, restaurant, fast food and dessert options in the CityMall Cyprus concept dining area.",
    allDining: "All Dining Places",
    featuredDining: "Featured Flavors",
    category: "Category",
    cuisine: "Cuisine",
    floor: "Location",
    backHome: "Back to home",
    foodCourt: "Food Court",
    categories: {
      restaurant: "Restaurant",
      cafe: "Cafe",
      "fast-food": "Fast Food",
      dessert: "Dessert",
      coffee: "Coffee",
      other: "Other",
    },
  },
};

export default function DiningPage({ params }: DiningPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];
  const featuredDining = diningPlaces.filter((place) => place.featured);

  return (
    <main className="bg-surface-default">
      <section className="border-b border-border-default bg-brand-primary text-brand-foreground">
        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              {content.eyebrow}
            </p>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              {content.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              {content.description}
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-overlay backdrop-blur">
            <p className="text-sm font-semibold text-white">
              {content.featuredDining}
            </p>

            <div className="mt-4 grid gap-3">
              {featuredDining.map((place) => (
                <article
                  key={place.id}
                  className="rounded-xl border border-white/10 bg-white/10 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                    {place.cuisine
                      ? getLocalizedText(place.cuisine, locale)
                      : content.categories[place.category]}
                  </p>

                  <h2 className="mt-2 text-lg font-semibold">
                    {getLocalizedText(place.name, locale)}
                  </h2>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              {diningPlaces.length} {content.allDining}
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-text-primary">
              {content.allDining}
            </h2>
          </div>

          <Link
            href={`/${locale}`}
            className="rounded-full border border-border-default px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
          >
            {content.backHome}
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {diningPlaces.map((place) => (
            <DiningCard
              key={place.id}
              locale={locale}
              place={place}
              categoryLabel={content.categories[place.category]}
              categoryText={content.category}
              cuisineText={content.cuisine}
              floorText={content.floor}
              foodCourtText={content.foodCourt}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

type DiningCardProps = {
  locale: Locale;
  place: (typeof diningPlaces)[number];
  categoryLabel: string;
  categoryText: string;
  cuisineText: string;
  floorText: string;
  foodCourtText: string;
};

function DiningCard({
  locale,
  place,
  categoryLabel,
  categoryText,
  cuisineText,
  floorText,
  foodCourtText,
}: DiningCardProps) {
  return (
    <article className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elevated">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
        {categoryLabel}
      </p>

      <h3 className="mt-4 text-2xl font-semibold text-text-primary">
        {getLocalizedText(place.name, locale)}
      </h3>

      <p className="mt-4 line-clamp-4 text-sm leading-6 text-text-secondary">
        {getLocalizedText(place.description, locale)}
      </p>

      <div className="mt-6 grid gap-3 border-t border-border-default pt-5 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-text-muted">{categoryText}</span>
          <span className="font-medium text-text-primary">{categoryLabel}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-text-muted">{cuisineText}</span>
          <span className="font-medium text-text-primary">
            {place.cuisine
              ? getLocalizedText(place.cuisine, locale)
              : categoryLabel}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-text-muted">{floorText}</span>
          <span className="font-medium text-text-primary">{foodCourtText}</span>
        </div>
      </div>
    </article>
  );
}