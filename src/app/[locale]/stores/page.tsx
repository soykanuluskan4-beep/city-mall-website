import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { stores } from "@/data/stores";
import { JsonLd, createItemListSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { getLocalizedText } from "@/lib/locale";
import type { Locale } from "@/types/content";

type StoresPageProps = {
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
    path: "/stores",
    title:
      locale === "tr"
        ? "Mağazalar | CityMall Cyprus"
        : "Stores | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus mağazalarını kategori, kat ve öne çıkan seçeneklerle keşfedin."
        : "Explore CityMall Cyprus stores by category, floor and featured selections.",
  });
}

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
    featured: "Öne Çıkan",
    detailSoon: "Detay sayfası yakında",
    directoryNote:
      "Bu liste demo içeriklerle hazırlanmıştır. Gerçek mağaza bilgileri müşteri tarafından sağlandığında güncellenebilir.",
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
    featured: "Featured",
    detailSoon: "Detail page coming soon",
    directoryNote:
      "This directory is prepared with demo content. Real store information can be updated when provided by the client.",
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
  const storesSchema = createItemListSchema(
    locale,
    "/stores",
    stores,
    (store) => getLocalizedText(store.name, locale)
  );
  
  return (
  <main className="bg-surface-default">
    <JsonLd data={storesSchema} />
      <section className="border-b border-border-default bg-[linear-gradient(180deg,#f9fafb_0%,#ffffff_100%)]">
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

              <p className="mt-6 max-w-2xl text-sm leading-6 text-text-muted">
                {content.directoryNote}
              </p>
            </div>

            <div className="rounded-3xl border border-border-default bg-surface-default p-6 shadow-card">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-text-primary">
                  {content.featuredStores}
                </p>

                <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
                  {featuredStores.length}
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                {featuredStores.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-surface-muted p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {getLocalizedText(store.name, locale)}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">
                        {content.categories[store.category]}
                      </p>
                    </div>

                    <span className="rounded-full bg-surface-default px-3 py-1 text-xs font-semibold text-text-secondary shadow-card">
                      {content.floors[store.floor]}
                    </span>
                  </div>
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
            className="rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:bg-surface-muted"
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
              featuredText={content.featured}
              detailSoonText={content.detailSoon}
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
  featuredText: string;
  detailSoonText: string;
};

function StoreCard({
  locale,
  store,
  categoryLabel,
  floorLabel,
  categoryText,
  floorText,
  featuredText,
  detailSoonText,
}: StoreCardProps) {
  const storeName = getLocalizedText(store.name, locale);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border-default bg-surface-default shadow-card transition hover:-translate-y-1 hover:shadow-elevated">
      <div className="relative min-h-40 bg-[radial-gradient(circle_at_top_right,rgba(17,24,39,0.16),transparent_35%),linear-gradient(135deg,#f9fafb_0%,#e5e7eb_100%)] p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-default text-lg font-semibold text-text-primary shadow-card">
            {storeName.slice(0, 1)}
          </div>

          {store.featured ? (
            <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground shadow-card">
              {featuredText}
            </span>
          ) : null}
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            {categoryLabel}
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
            {storeName}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="line-clamp-3 text-sm leading-6 text-text-secondary">
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

        <div className="mt-auto pt-6">
          <div className="rounded-2xl border border-border-default bg-surface-muted px-4 py-3 text-center text-sm font-semibold text-text-secondary transition group-hover:bg-brand-primary group-hover:text-brand-foreground">
            {detailSoonText}
          </div>
        </div>
      </div>
    </article>
  );
}