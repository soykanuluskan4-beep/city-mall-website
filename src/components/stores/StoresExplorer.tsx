"use client";

import { Clock3, MapPin, Search, SearchX, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { stores } from "@/data/stores";
import { getLocalizedText } from "@/lib/locale";
import type { Locale, Store } from "@/types/content";

type StoresExplorerProps = {
  locale: Locale;
};

type CategoryFilter =
  | "all"
  | "fashion"
  | "electronics"
  | "beauty"
  | "sports"
  | "home"
  | "kids"
  | "books";

type StoreCategory = Exclude<CategoryFilter, "all">;
type FloorFilter = "all" | "basement" | "ground" | "first" | "second";
type StoreFloor = Exclude<FloorFilter, "all">;
type StatusFilter = "all" | "new" | "comingSoon";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const content = {
  tr: {
    eyebrow: "Mağazalar",
    title: "CityMall mağazalarını keşfet.",
    description:
      "Markaları arayın, kategoriye göre filtreleyin ve alışveriş rotanızı kolayca planlayın.",
    searchPlaceholder: "Mağaza, marka veya kategori ara...",
    categoryTitle: "Kategori",
    floorTitle: "Kat",
    statusTitle: "Durum",
    totalStores: "mağaza",
    listedStores: "mağaza listeleniyor",
    results: "sonuç",
    newThisMonth: "Yeni Açılanlar",
    comingSoon: "Yakında CityMall’de",
    noResultsTitle: "Aradığın mağaza bulunamadı",
    noResultsText: "Farklı bir arama deneyebilir veya filtreleri sıfırlayabilirsin.",
    resetFilters: "Filtreleri Temizle",
    categoryLabels: {
      all: "Tümü",
      fashion: "Moda",
      electronics: "Elektronik",
      beauty: "Güzellik",
      sports: "Spor",
      home: "Ev & Yaşam",
      kids: "Çocuk",
      books: "Kitap & Kırtasiye",
    },
    floorLabels: {
  all: "Tümü",
  basement: "-1. Kat",
  ground: "Zemin Kat",
  first: "1. Kat",
  second: "2. Kat",
},
    statusLabels: {
      all: "Tümü",
      new: "Yeni Açılanlar",
      comingSoon: "Yakında",
    },
    badges: {
      new: "Yeni",
      comingSoon: "Yakında",
    },
  },
  en: {
    eyebrow: "Stores",
    title: "Explore CityMall stores.",
    description:
      "Search brands, filter by category and plan your shopping route with ease.",
    searchPlaceholder: "Search store, brand or category...",
    categoryTitle: "Category",
    floorTitle: "Floor",
    statusTitle: "Status",
    totalStores: "stores",
    listedStores: "stores listed",
    results: "results",
    newThisMonth: "Newly Opened",
    comingSoon: "Coming Soon to CityMall",
    noResultsTitle: "No matching stores found",
    noResultsText: "Try another search or clear your filters.",
    resetFilters: "Clear Filters",
    categoryLabels: {
      all: "All",
      fashion: "Fashion",
      electronics: "Electronics",
      beauty: "Beauty",
      sports: "Sports",
      home: "Home & Living",
      kids: "Kids",
      books: "Books & Stationery",
    },
    floorLabels: {
  all: "All",
  basement: "Basement Floor",
  ground: "Ground Floor",
  first: "1st Floor",
  second: "2nd Floor",
},
    statusLabels: {
      all: "All",
      new: "Newly Opened",
      comingSoon: "Coming Soon",
    },
    badges: {
      new: "New",
      comingSoon: "Coming Soon",
    },
  },
};

const categoryFilters: CategoryFilter[] = [
  "all",
  "fashion",
  "electronics",
  "beauty",
  "sports",
  "home",
  "kids",
  "books",
];

const floorFilters: FloorFilter[] = [
  "all",
  "basement",
  "ground",
  "first",
  "second",
];
const statusFilters: StatusFilter[] = ["all", "new", "comingSoon"];

const categoryBadgeStyles: Record<string, string> = {
  fashion: "bg-[#f7efe7] text-[#6f4b2f]",
  electronics: "bg-[#e8eef6] text-[#284764]",
  beauty: "bg-[#f8e9ef] text-[#7a3850]",
  sports: "bg-[#e8f3ed] text-[#2d6047]",
  home: "bg-[#f2ede3] text-[#654f34]",
  kids: "bg-[#fff3d8] text-[#7a5a12]",
  books: "bg-[#eee9fb] text-[#51406f]",
};

const categoryAccentStyles: Record<string, string> = {
  fashion: "bg-[#d9b99e]",
  electronics: "bg-[#9db6d3]",
  beauty: "bg-[#dfadc1]",
  sports: "bg-[#9fcbb2]",
  home: "bg-[#c8b89d]",
  kids: "bg-[#e7c66f]",
  books: "bg-[#b8a6df]",
};

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getLetter(value: string) {
  const normalized = normalizeText(value).toUpperCase();
  const first = normalized[0] ?? "#";

  return alphabet.includes(first) ? first : "#";
}

function getStoreName(store: Store, locale: Locale) {
  return getLocalizedText(store.name, locale);
}

function getStoreSearchText(store: Store, locale: Locale) {
  return normalizeText(
    [
      getLocalizedText(store.name, locale),
      getLocalizedText(store.description, locale),
      store.category,
      store.floor,
    ].join(" ")
  );
}

function sortStoresByName(storeList: Store[], locale: Locale) {
  return [...storeList].sort((a, b) =>
    getStoreName(a, locale).localeCompare(getStoreName(b, locale), locale)
  );
}

function rankStore(store: Store, locale: Locale, query: string) {
  if (!query) {
    return 0;
  }

  const name = normalizeText(getStoreName(store, locale));
  const searchText = getStoreSearchText(store, locale);

  if (name === query) {
    return 0;
  }

  if (name.startsWith(query)) {
    return 1;
  }

  if (name.includes(query)) {
    return 2;
  }

  if (searchText.includes(query)) {
    return 3;
  }

  return 4;
}

function hasActiveFilters(
  query: string,
  categoryFilter: CategoryFilter,
  floorFilter: FloorFilter,
  statusFilter: StatusFilter
) {
  return (
    query.trim() !== "" ||
    categoryFilter !== "all" ||
    floorFilter !== "all" ||
    statusFilter !== "all"
  );
}

function StoreCard({ store, locale }: { store: Store; locale: Locale }) {
  const copy = content[locale];
  const name = getLocalizedText(store.name, locale);
  const description = getLocalizedText(store.description, locale);

  const categoryLabel =
    copy.categoryLabels[store.category as StoreCategory] ?? store.category;

  const floorLabel = copy.floorLabels[store.floor as StoreFloor] ?? store.floor;

  const badgeClass =
    categoryBadgeStyles[store.category] ?? "bg-surface-muted text-text-primary";

  const accentClass = categoryAccentStyles[store.category] ?? "bg-border-default";

  return (
    <article className="group w-full max-w-full min-w-0 overflow-hidden rounded-[1.5rem] border border-border-default bg-surface-default shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-elevated">
      <div className={`h-2 w-full ${accentClass}`} />

      <div className="min-w-0 p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
          >
            {categoryLabel}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-secondary">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {floorLabel}
          </span>

          {store.isNew ? (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {copy.badges.new}
            </span>
          ) : null}

          {store.isComingSoon ? (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              {copy.badges.comingSoon}
            </span>
          ) : null}
        </div>

        <h3 className="break-words text-2xl font-semibold tracking-tight text-text-primary">
          {name}
        </h3>

        <p className="mt-3 line-clamp-2 min-h-[48px] break-words text-sm leading-6 text-text-secondary">
          {description}
        </p>
      </div>
    </article>
  );
}

function HighlightCard({
  store,
  locale,
  variant,
}: {
  store: Store;
  locale: Locale;
  variant: "new" | "comingSoon";
}) {
  const copy = content[locale];
  const name = getLocalizedText(store.name, locale);

  const categoryLabel =
    copy.categoryLabels[store.category as StoreCategory] ?? store.category;

  const floorLabel = copy.floorLabels[store.floor as StoreFloor] ?? store.floor;

  return (
    <article className="w-[240px] shrink-0 rounded-[1.5rem] border border-border-default bg-surface-default p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated md:w-full md:min-w-0">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            variant === "new"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {variant === "new" ? copy.badges.new : copy.badges.comingSoon}
        </span>

        <span className="text-xs font-semibold text-text-muted">
          {floorLabel}
        </span>
      </div>

      <h3 className="mt-5 break-words text-lg font-semibold text-text-primary">
        {name}
      </h3>

      <p className="mt-1 text-sm text-text-muted">{categoryLabel}</p>
    </article>
  );
}

export function StoresExplorer({ locale }: StoresExplorerProps) {
  const copy = content[locale];

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [floorFilter, setFloorFilter] = useState<FloorFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const newStores = useMemo(
    () => sortStoresByName(stores.filter((store) => store.isNew), locale),
    [locale]
  );

  const comingSoonStores = useMemo(
    () => sortStoresByName(stores.filter((store) => store.isComingSoon), locale),
    [locale]
  );

  const isSearching = query.trim() !== "";

  const filtersActive = hasActiveFilters(
    query,
    categoryFilter,
    floorFilter,
    statusFilter
  );

  const filteredStores = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    return sortStoresByName(stores, locale)
      .filter((store) => {
        const name = normalizeText(getStoreName(store, locale));
        const searchText = getStoreSearchText(store, locale);

        const matchesQuery =
          !normalizedQuery ||
          name.startsWith(normalizedQuery) ||
          name.includes(normalizedQuery) ||
          (normalizedQuery.length >= 2 && searchText.includes(normalizedQuery));

        const matchesCategory =
          categoryFilter === "all" || store.category === categoryFilter;

        const matchesFloor =
          floorFilter === "all" || store.floor === floorFilter;

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "new" && store.isNew) ||
          (statusFilter === "comingSoon" && store.isComingSoon);

        return matchesQuery && matchesCategory && matchesFloor && matchesStatus;
      })
      .sort((a, b) => {
        const rankA = rankStore(a, locale, normalizedQuery);
        const rankB = rankStore(b, locale, normalizedQuery);

        if (rankA !== rankB) {
          return rankA - rankB;
        }

        return getStoreName(a, locale).localeCompare(
          getStoreName(b, locale),
          locale
        );
      });
  }, [categoryFilter, floorFilter, locale, query, statusFilter]);

  const availableLetters = useMemo(() => {
    return new Set(
      filteredStores.map((store) =>
        getLetter(getLocalizedText(store.name, locale))
      )
    );
  }, [filteredStores, locale]);

  const groupedStores = useMemo(() => {
    return alphabet
      .map((letter) => ({
        letter,
        stores: filteredStores.filter(
          (store) => getLetter(getLocalizedText(store.name, locale)) === letter
        ),
      }))
      .filter((group) => group.stores.length > 0);
  }, [filteredStores, locale]);

  function scrollToLetter(letter: string) {
    const element = document.getElementById(`stores-letter-${letter}`);

    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function resetFilters() {
    setQuery("");
    setCategoryFilter("all");
    setFloorFilter("all");
    setStatusFilter("all");
  }

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-surface-default">
      <section className="w-full max-w-full border-b border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
                {copy.eyebrow}
              </p>

              <h1 className="mt-5 max-w-5xl break-words text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
                {copy.title}
              </h1>

              <p className="mt-5 max-w-3xl break-words text-base leading-8 text-text-secondary md:text-lg">
                {copy.description}
              </p>
            </div>

            <div className="w-fit shrink-0 rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card">
              {stores.length} {copy.totalStores}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-full border-b border-border-default bg-surface-default py-8">
        <div className="container">
          <div className="grid min-w-0 gap-5 lg:grid-cols-2">
            <div className="w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-surface-muted p-5">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                <h2 className="text-xl font-semibold text-text-primary">
                  {copy.newThisMonth}
                </h2>
              </div>

              <div className="w-full max-w-full overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] md:overflow-visible">
                <div className="flex w-max gap-3 md:grid md:w-full md:grid-cols-2">
                  {newStores.slice(0, 4).map((store) => (
                    <HighlightCard
                      key={store.id}
                      store={store}
                      locale={locale}
                      variant="new"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-surface-muted p-5">
              <div className="mb-4 flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-amber-600" />
                <h2 className="text-xl font-semibold text-text-primary">
                  {copy.comingSoon}
                </h2>
              </div>

              <div className="w-full max-w-full overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] md:overflow-visible">
                <div className="flex w-max gap-3 md:grid md:w-full md:grid-cols-2">
                  {comingSoonStores.slice(0, 4).map((store) => (
                    <HighlightCard
                      key={store.id}
                      store={store}
                      locale={locale}
                      variant="comingSoon"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-full border-b border-border-default bg-surface-default py-8">
        <div className="container">
          <div className="w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-surface-default p-4 shadow-card md:p-5">
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-border-default bg-surface-muted px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-base font-medium text-text-primary outline-none placeholder:text-text-muted"
              />
            </div>

            <div className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[1.4fr_0.8fr_0.8fr]">
              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {copy.categoryTitle}
                </p>

                <div className="w-full max-w-full overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
                  <div className="flex w-max gap-2 px-1">
                    {categoryFilters.map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setCategoryFilter(filter)}
                        className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          categoryFilter === filter
                            ? "border-brand-primary bg-brand-primary text-brand-foreground"
                            : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                        }`}
                      >
                        {copy.categoryLabels[filter]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {copy.floorTitle}
                </p>

                <div className="w-full max-w-full overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
                  <div className="flex w-max gap-2 px-1">
                    {floorFilters.map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setFloorFilter(filter)}
                        className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          floorFilter === filter
                            ? "border-brand-primary bg-brand-primary text-brand-foreground"
                            : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                        }`}
                      >
                        {copy.floorLabels[filter]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {copy.statusTitle}
                </p>

                <div className="w-full max-w-full overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
                  <div className="flex w-max gap-2 px-1">
                    {statusFilters.map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setStatusFilter(filter)}
                        className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          statusFilter === filter
                            ? "border-brand-primary bg-brand-primary text-brand-foreground"
                            : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                        }`}
                      >
                        {copy.statusLabels[filter]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex min-w-0 flex-col gap-4 border-t border-border-default pt-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold text-text-secondary">
                  {filteredStores.length}{" "}
                  {isSearching
                    ? copy.results
                    : filtersActive
                      ? copy.listedStores
                      : copy.totalStores}
                </p>

                {filtersActive ? (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="rounded-full border border-border-default bg-surface-muted px-3 py-1.5 text-xs font-semibold text-text-secondary transition hover:bg-surface-subtle hover:text-text-primary"
                  >
                    {copy.resetFilters}
                  </button>
                ) : null}
              </div>

              <div className="w-full max-w-full overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] lg:w-auto">
                <div className="flex w-max gap-1">
                  {alphabet.map((letter) => {
                    const isAvailable = availableLetters.has(letter);

                    return (
                      <button
                        key={letter}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => scrollToLetter(letter)}
                        className={`h-8 w-8 shrink-0 rounded-full text-xs font-semibold transition ${
                          isAvailable
                            ? "bg-surface-muted text-text-primary hover:bg-brand-primary hover:text-brand-foreground"
                            : "cursor-not-allowed bg-surface-muted text-text-muted/35"
                        }`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-full py-10 md:py-14">
        <div className="container">
          {filteredStores.length ? (
            isSearching ? (
              <div className="grid w-full max-w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredStores.map((store) => (
                  <StoreCard key={store.id} store={store} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="w-full max-w-full min-w-0 space-y-12">
                {groupedStores.map((group) => (
                  <div
                    key={group.letter}
                    id={`stores-letter-${group.letter}`}
                    className="w-full max-w-full min-w-0 scroll-mt-28"
                  >
                    <div className="mb-5 flex min-w-0 items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-text-primary text-lg font-semibold text-white">
                        {group.letter}
                      </div>

                      <div className="h-px min-w-0 flex-1 bg-border-default" />
                    </div>

                    <div className="grid w-full max-w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                      {group.stores.map((store) => (
                        <StoreCard
                          key={store.id}
                          store={store}
                          locale={locale}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-border-default bg-surface-muted p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-default text-text-muted shadow-card">
                <SearchX className="h-6 w-6" aria-hidden="true" />
              </div>

              <h2 className="mt-5 text-2xl font-semibold text-text-primary">
                {copy.noResultsTitle}
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-text-muted">
                {copy.noResultsText}
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {copy.resetFilters}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}