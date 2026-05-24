import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { stores } from "@/data/stores";
import { getLocalizedText } from "@/lib/locale";
import type { Locale } from "@/types/content";

type StoresPageProps = {
  params: {
    locale: string;
  };
};

const pageContent = {
  tr: {
    eyebrow: "Mağazalar",
    title: "CityMall Cyprus mağazalarını keşfet.",
    description:
      "Moda, teknoloji, ev yaşamı, güzellik, spor ve çocuk kategorilerinde konsept mağaza seçkisi.",
    allStores: "Tüm Mağazalar",
    featuredStores: "Öne Çıkan Mağazalar",
    category: "Kategori",
    floor: "Kat",
    backHome: "Ana sayfaya dön",
    categories: {
      fashion: "Moda",
      electronics: "Elektronik",
      home: "Ev & Yaşam",
      beauty: "Güzellik",
      sports: "Spor",
      books: "Kitap",
      services: "Hizmetler",
      kids: "Çocuk",
      other: "Diğer",
    },
    floors: {
      ground: "Zemin Kat",
      first: "1. Kat",
      second: "2. Kat",
      "food-court": "Yeme-İçme Katı",
      cinema: "Sinema Katı",
    },
  },
  en: {
    eyebrow: "Stores",
    title: "Discover CityMall Cyprus stores.",
    description:
      "A concept store selection across fashion, technology, home, beauty, sports and kids categories.",
    allStores: "All Stores",
    featuredStores: "Featured Stores",
    category: "Category",
    floor: "Floor",
    backHome: "Back to home",
    categories: {
      fashion: "Fashion",
      electronics: "Electronics",
      home: "Home & Living",
      beauty: "Beauty",
      sports: "Sports",
      books: "Books",
      services: "Services",
      kids: "Kids",
      other: "Other",
    },
    floors: {
      ground: "Ground Floor",
      first: "1st Floor",
      second: "2nd Floor",
      "food-court": "Food Court",
      cinema: "Cinema Floor",
    },
  },
};

export default function StoresPage({ params }: StoresPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];
  const featuredStores = stores.filter((store) => store.featured);

  return (
    <main className="bg-surface-default">
      <section className="border-b border-border-default bg-surface-muted">
        <div className="container py-16 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-text-muted">
            {content.eyebrow}
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
                {content.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
                {content.description}
              </p>
            </div>

            <div className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card">
              <p className="text-sm font-semibold text-text-primary">
                {content.featuredStores}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {featuredStores.map((store) => (
                  <span
                    key={store.id}
                    className="rounded-full bg-surface-subtle px-3 py-2 text-sm text-text-secondary"
                  >
                    {getLocalizedText(store.name, locale)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              {stores.length} {content.allStores}
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-text-primary">
              {content.allStores}
            </h2>
          </div>

          <Link
            href={`/${locale}`}
            className="rounded-full border border-border-default px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
          >
            {content.backHome}
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stores.map((store) => (
            <StoreCard
              key={store.id}
              locale={locale}
              store={store}
              categoryLabel={content.categories[store.category]}
              floorLabel={content.floors[store.floor]}
              categoryText={content.category}
              floorText={content.floor}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

type StoreCardProps = {
  locale: Locale;
  store: (typeof stores)[number];
  categoryLabel: string;
  floorLabel: string;
  categoryText: string;
  floorText: string;
};

function StoreCard({
  locale,
  store,
  categoryLabel,
  floorLabel,
  categoryText,
  floorText,
}: StoreCardProps) {
  return (
    <article className="group rounded-2xl border border-border-default bg-surface-default p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elevated">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            {categoryLabel}
          </p>

          <h3 className="mt-4 text-2xl font-semibold text-text-primary">
            {getLocalizedText(store.name, locale)}
          </h3>
        </div>

        {store.featured ? (
          <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground">
            Featured
          </span>
        ) : null}
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-text-secondary">
        {getLocalizedText(store.description, locale)}
      </p>

      <div className="mt-6 grid gap-3 border-t border-border-default pt-5 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-text-muted">{categoryText}</span>
          <span className="font-medium text-text-primary">{categoryLabel}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-text-muted">{floorText}</span>
          <span className="font-medium text-text-primary">{floorLabel}</span>
        </div>
      </div>
    </article>
  );
}