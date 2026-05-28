"use client";

/* eslint-disable @next/next/no-img-element */

import { Filter, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { DiningCard } from "@/components/dining/DiningCard";
import { diningPlaces } from "@/data/dining";
import type { DiningPlace, Floor, Locale } from "@/types/content";

type DiningExplorerProps = {
  locale: Locale;
};

type CuisineFilter =
  | "all"
  | "turkish"
  | "italian"
  | "fast-food"
  | "cafe"
  | "dessert"
  | "world"
  | "snack";

type FloorFilter = "all" | Floor;

type PlaceTypeFilter = "all" | "fast-food" | "cafe" | "restaurant" | "snack";

const content = {
  tr: {
    eyebrow: "Yeme-İçme",
    title: "CityMall’de lezzet molanı seç.",
    description:
      "Kahve molasından hızlı öğüne, restoranlardan atıştırmalıklara kadar tüm yeme-içme noktalarını filtreleyin.",
    cuisineTitle: "Mutfak",
    floorTitle: "Kat",
    typeTitle: "Mekan Tipi",
    totalPlaces: "mekan",
    listedPlaces: "mekan listeleniyor",
    noResultsTitle: "Uygun mekan bulunamadı",
    noResultsText: "Mutfak, kat veya mekan tipi filtresini değiştirerek tekrar deneyebilirsin.",
    resetFilters: "Filtreleri Temizle",
    cuisineLabels: {
      all: "Tümü",
      turkish: "Türk Mutfağı",
      italian: "İtalyan",
      "fast-food": "Fast Food",
      cafe: "Cafe",
      dessert: "Tatlı",
      world: "Dünya Mutfağı",
      snack: "Atıştırmalık",
    },
    floorLabels: {
      all: "Tümü",
      basement: "-1. Kat",
      ground: "Zemin Kat",
      first: "1. Kat",
      second: "2. Kat",
      "food-court": "Food Court",
      cinema: "Sinema Katı",
    },
    typeLabels: {
      all: "Tümü",
      "fast-food": "Fast Food",
      cafe: "Cafe",
      restaurant: "Restoran",
      snack: "Atıştırmalık",
    },
  },
  en: {
    eyebrow: "Dining",
    title: "Choose your dining break at CityMall.",
    description:
      "Filter every dining spot, from coffee breaks and quick meals to restaurants and snacks.",
    cuisineTitle: "Cuisine",
    floorTitle: "Floor",
    typeTitle: "Place Type",
    totalPlaces: "places",
    listedPlaces: "places listed",
    noResultsTitle: "No matching dining place found",
    noResultsText: "Try changing the cuisine, floor or place type filter.",
    resetFilters: "Clear Filters",
    cuisineLabels: {
      all: "All",
      turkish: "Turkish Cuisine",
      italian: "Italian",
      "fast-food": "Fast Food",
      cafe: "Cafe",
      dessert: "Dessert",
      world: "World Cuisine",
      snack: "Snacks",
    },
    floorLabels: {
      all: "All",
      basement: "Basement Floor",
      ground: "Ground Floor",
      first: "1st Floor",
      second: "2nd Floor",
      "food-court": "Food Court",
      cinema: "Cinema Floor",
    },
    typeLabels: {
      all: "All",
      "fast-food": "Fast Food",
      cafe: "Cafe",
      restaurant: "Restaurant",
      snack: "Snacks",
    },
  },
};

const cuisineFilters: CuisineFilter[] = [
  "all",
  "turkish",
  "italian",
  "fast-food",
  "cafe",
  "dessert",
  "world",
  "snack",
];

const floorFilters: FloorFilter[] = ["all", "basement", "ground", "second"];

const placeTypeFilters: PlaceTypeFilter[] = [
  "all",
  "fast-food",
  "cafe",
  "restaurant",
  "snack",
];

function sortDiningPlaces(places: DiningPlace[]) {
  return [...places].sort((a, b) => {
    if (a.featured && !b.featured) {
      return -1;
    }

    if (!a.featured && b.featured) {
      return 1;
    }

    return a.slug.localeCompare(b.slug);
  });
}

function getCuisineTags(place: DiningPlace) {
  return place.cuisineTags ?? (place.cuisineType ? [place.cuisineType] : []);
}

function matchesCuisineFilter(place: DiningPlace, filter: CuisineFilter) {
  if (filter === "all") {
    return true;
  }

  return getCuisineTags(place).includes(filter) || place.cuisineType === filter;
}

function matchesPlaceTypeFilter(place: DiningPlace, filter: PlaceTypeFilter) {
  if (filter === "all") {
    return true;
  }

  if (filter === "cafe") {
    return place.category === "cafe" || place.category === "coffee";
  }

  if (filter === "snack") {
    return place.category === "other" || place.cuisineType === "snack";
  }

  return place.category === filter;
}

export function DiningExplorer({ locale }: DiningExplorerProps) {
  const copy = content[locale];

  const [cuisineFilter, setCuisineFilter] = useState<CuisineFilter>("all");
  const [floorFilter, setFloorFilter] = useState<FloorFilter>("all");
  const [placeTypeFilter, setPlaceTypeFilter] =
    useState<PlaceTypeFilter>("all");

  const filtersActive =
    cuisineFilter !== "all" ||
    floorFilter !== "all" ||
    placeTypeFilter !== "all";

  const filteredPlaces = useMemo(() => {
    return sortDiningPlaces(diningPlaces).filter((place) => {
      const matchesCuisine = matchesCuisineFilter(place, cuisineFilter);
      const matchesFloor =
        floorFilter === "all" || place.floor === floorFilter;
      const matchesPlaceType = matchesPlaceTypeFilter(place, placeTypeFilter);

      return matchesCuisine && matchesFloor && matchesPlaceType;
    });
  }, [cuisineFilter, floorFilter, placeTypeFilter]);

  function resetFilters() {
    setCuisineFilter("all");
    setFloorFilter("all");
    setPlaceTypeFilter("all");
  }

  return (
    <main className="overflow-x-hidden bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=85"
          alt={copy.eyebrow}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,24,39,0.28)_0%,rgba(17,24,39,0.68)_50%,rgba(17,24,39,0.96)_100%)]" />

        <div className="container py-16 md:py-24">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 break-words text-5xl font-semibold tracking-tight md:text-7xl">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78 md:text-xl">
              {copy.description}
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-2xl font-semibold">
                  {diningPlaces.length}
                </p>
                <p className="mt-1 text-sm font-semibold text-white/62">
                  {copy.totalPlaces}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-2xl font-semibold">7</p>
                <p className="mt-1 text-sm font-semibold text-white/62">
                  {copy.cuisineTitle}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-2xl font-semibold">
                  {locale === "tr" ? "3 Kat" : "3 Floors"}
                </p>
                <p className="mt-1 text-sm font-semibold text-white/62">
                  {locale === "tr"
                    ? "Zemin • 2. Kat • -1. Kat"
                    : "Ground • 2nd • Basement"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border-default bg-surface-default py-8">
        <div className="container">
          <div className="w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-surface-default p-4 shadow-card md:p-5">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <Filter
                  className="h-5 w-5 text-text-muted"
                  aria-hidden="true"
                />

                <p className="text-sm font-semibold text-text-primary">
                  {filteredPlaces.length}{" "}
                  {filtersActive ? copy.listedPlaces : copy.totalPlaces}
                </p>
              </div>

              {filtersActive ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-fit rounded-full border border-border-default bg-surface-muted px-4 py-2 text-sm font-semibold text-text-secondary transition hover:bg-surface-subtle hover:text-text-primary"
                >
                  {copy.resetFilters}
                </button>
              ) : null}
            </div>

            <div className="grid min-w-0 gap-5 xl:grid-cols-3">
              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {copy.cuisineTitle}
                </p>

                <div className="w-full max-w-full overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
                  <div className="flex w-max gap-2 px-1">
                    {cuisineFilters.map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setCuisineFilter(filter)}
                        className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          cuisineFilter === filter
                            ? "border-brand-primary bg-brand-primary text-brand-foreground"
                            : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                        }`}
                      >
                        {copy.cuisineLabels[filter]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {copy.floorTitle}
                </p>

                <div className="w-full max-w-full overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
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
                  {copy.typeTitle}
                </p>

                <div className="w-full max-w-full overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
                  <div className="flex w-max gap-2 px-1">
                    {placeTypeFilters.map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setPlaceTypeFilter(filter)}
                        className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          placeTypeFilter === filter
                            ? "border-brand-primary bg-brand-primary text-brand-foreground"
                            : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                        }`}
                      >
                        {copy.typeLabels[filter]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          {filteredPlaces.length ? (
            <div className="grid min-w-0 gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {filteredPlaces.map((place) => (
                <DiningCard key={place.id} place={place} locale={locale} />
              ))}
            </div>
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