import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { stores } from "@/data/stores";
import { getLocalizedText } from "@/lib/locale";
import type { Locale } from "@/types/content";

type FeaturedStoresProps = {
  locale: Locale;
};

const content = {
  tr: {
    eyebrow: "Öne Çıkan Mağazalar",
    title: "CityMall alışveriş rotanı oluştur.",
    description:
      "Moda, teknoloji, güzellik, spor ve yaşam kategorilerinde öne çıkan mağazalara göz atın.",
    viewAll: "Tüm Mağazaları Keşfet",
    floorLabel: "Kat",
  },
  en: {
    eyebrow: "Featured Stores",
    title: "Plan your CityMall shopping route.",
    description:
      "Browse featured stores across fashion, technology, beauty, sports and lifestyle.",
    viewAll: "Explore All Stores",
    floorLabel: "Floor",
  },
};

const categoryLabels = {
  tr: {
    fashion: "Moda",
    electronics: "Elektronik",
    beauty: "Güzellik",
    sports: "Spor",
    home: "Ev & Yaşam",
    kids: "Çocuk",
  },
  en: {
    fashion: "Fashion",
    electronics: "Electronics",
    beauty: "Beauty",
    sports: "Sports",
    home: "Home & Living",
    kids: "Kids",
  },
};

const floorLabels = {
  tr: {
    ground: "Zemin Kat",
    first: "1. Kat",
    second: "2. Kat",
  },
  en: {
    ground: "Ground Floor",
    first: "1st Floor",
    second: "2nd Floor",
  },
};

const categoryStyles: Record<string, string> = {
  fashion: "bg-[#f7efe7]",
  electronics: "bg-[#e8eef6]",
  beauty: "bg-[#f8e9ef]",
  sports: "bg-[#e8f3ed]",
  home: "bg-[#f2ede3]",
  kids: "bg-[#fff3d8]",
};

export function FeaturedStores({ locale }: FeaturedStoresProps) {
  const copy = content[locale];
  const featuredStores = stores.filter((store) => store.featured).slice(0, 8);

  return (
    <section className="bg-surface-default py-16 md:py-20">
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
            href={`/${locale}/stores`}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
          >
            {copy.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
          {featuredStores.map((store) => {
            const name = getLocalizedText(store.name, locale);
            const description = getLocalizedText(store.description, locale);
            const categoryLabel =
              categoryLabels[locale][
                store.category as keyof (typeof categoryLabels)["tr"]
              ] ?? store.category;
            const floorLabel =
              floorLabels[locale][
                store.floor as keyof (typeof floorLabels)["tr"]
              ] ?? store.floor;
            const categoryStyle =
              categoryStyles[store.category] ?? "bg-surface-muted";

            return (
              <Link
                key={store.id}
                href={`/${locale}/stores`}
                className={`group flex min-h-[260px] min-w-[260px] snap-start flex-col justify-between rounded-[2rem] border border-border-default p-5 shadow-card transition hover:-translate-y-1 hover:shadow-elevated md:min-w-0 ${categoryStyle}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-text-secondary shadow-card">
                      {categoryLabel}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-text-muted shadow-card">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {floorLabel}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold tracking-tight text-text-primary">
                    {name}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
                    {description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-4 text-sm font-semibold text-text-primary">
                  <span>{copy.viewAll}</span>
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}