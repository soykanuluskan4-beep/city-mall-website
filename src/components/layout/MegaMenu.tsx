import Link from "next/link";
import { stores } from "@/data/stores";
import { getLocalizedText } from "@/lib/locale";
import type { Locale } from "@/types/content";

type MegaMenuProps = {
  locale: Locale;
  onNavigate?: () => void;
};

const categoryContent = {
  tr: {
    title: "Kategoriler",
    featured: "Öne Çıkan Mağazalar",
    viewAll: "Tüm Mağazaları Gör →",
    categories: [
      "Moda",
      "Elektronik",
      "Güzellik",
      "Spor",
      "Ev & Yaşam",
      "Çocuk",
    ],
  },
  en: {
    title: "Categories",
    featured: "Featured Stores",
    viewAll: "View All Stores →",
    categories: [
      "Fashion",
      "Electronics",
      "Beauty",
      "Sports",
      "Home & Living",
      "Kids",
    ],
  },
};

export function MegaMenu({ locale, onNavigate }: MegaMenuProps) {
  const content = categoryContent[locale];
  const featuredStores = stores.filter((store) => store.featured).slice(0, 3);

  return (
    <div className="absolute left-1/2 top-full z-[70] hidden w-[min(980px,calc(100vw-2rem))] -translate-x-1/2 pt-4 lg:block">
      <div className="grid gap-8 rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-overlay lg:grid-cols-[0.8fr_1.2fr]">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
            {content.title}
          </p>

          <div className="mt-5 grid gap-2">
            {content.categories.map((category) => (
              <Link
                key={category}
                href={`/${locale}/stores`}
                onClick={onNavigate}
                className="rounded-2xl bg-surface-muted px-4 py-3 text-sm font-semibold text-text-secondary transition hover:bg-surface-subtle hover:text-text-primary"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
              {content.featured}
            </p>

            <Link
              href={`/${locale}/stores`}
              onClick={onNavigate}
              className="text-sm font-semibold text-text-primary transition hover:opacity-70"
            >
              {content.viewAll}
            </Link>
          </div>

          <div className="mt-5 grid gap-3">
            {featuredStores.map((store) => {
              const storeName = getLocalizedText(store.name, locale);
              const description = getLocalizedText(store.description, locale);

              return (
                <Link
                  key={store.id}
                  href={`/${locale}/stores`}
                  onClick={onNavigate}
                  className="group grid gap-4 rounded-3xl border border-border-default bg-surface-muted p-4 transition hover:-translate-y-0.5 hover:bg-surface-subtle hover:shadow-card sm:grid-cols-[56px_1fr]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-default text-lg font-semibold text-text-primary shadow-card">
                    {storeName.slice(0, 1)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-text-primary">
                        {storeName}
                      </h3>

                      <span className="rounded-full bg-surface-default px-3 py-1 text-xs font-semibold text-text-muted shadow-card">
                        {store.category}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-secondary">
                      {description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}