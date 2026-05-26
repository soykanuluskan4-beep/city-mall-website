"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { campaigns } from "@/data/campaigns";
import { diningPlaces } from "@/data/dining";
import { events } from "@/data/events";
import { movies } from "@/data/movies";
import { stores } from "@/data/stores";
import type { Locale } from "@/types/content";

type SearchOverlayProps = {
  locale: Locale;
  isOpen: boolean;
  onClose: () => void;
};

type SearchFilter = "all" | "store" | "dining" | "campaign" | "event" | "movie";

type SearchResult = {
  id: string;
  filter: Exclude<SearchFilter, "all">;
  type: string;
  title: string;
  description: string;
  href: string;
  keywords: string;
};

type SearchRecord = Record<string, unknown>;
type LocalizedValue = Partial<Record<Locale, string>>;

const content = {
  tr: {
    title: "Sitede ara",
    description: "Mağaza, restoran, kampanya, etkinlik veya film arayın.",
    placeholder: "Mağaza, kampanya, etkinlik ara...",
    close: "Kapat",
    empty: "Sonuç bulunamadı",
    result: "sonuç",
    filters: {
      all: "Tümü",
      store: "Mağazalar",
      dining: "Yeme-İçme",
      campaign: "Kampanyalar",
      event: "Etkinlikler",
      movie: "Sinema",
    },
    categories: {
      store: "Mağaza",
      dining: "Yeme-İçme",
      campaign: "Kampanya",
      event: "Etkinlik",
      movie: "Sinema",
    },
  },
  en: {
    title: "Search the site",
    description: "Search stores, restaurants, campaigns, events or movies.",
    placeholder: "Search stores, campaigns, events...",
    close: "Close",
    empty: "No results found",
    result: "results",
    filters: {
      all: "All",
      store: "Stores",
      dining: "Dining",
      campaign: "Campaigns",
      event: "Events",
      movie: "Cinema",
    },
    categories: {
      store: "Store",
      dining: "Dining",
      campaign: "Campaign",
      event: "Event",
      movie: "Cinema",
    },
  },
};

const filterOrder: SearchFilter[] = [
  "all",
  "store",
  "dining",
  "campaign",
  "event",
  "movie",
];

function getLocalizedValue(value: unknown, locale: Locale) {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    const localized = value as LocalizedValue;
    return localized[locale] ?? localized.tr ?? localized.en ?? "";
  }

  return "";
}

function getPlainValue(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  return "";
}

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR").trim();
}

function buildSearchResults(locale: Locale): SearchResult[] {
  const labels = content[locale].categories;

  const storeResults = stores.map((store) => {
    const record = store as unknown as SearchRecord;
    const title = getLocalizedValue(record.name, locale);
    const description = getLocalizedValue(record.description, locale);
    const category = getPlainValue(record.category);

    return {
      id: `store-${getPlainValue(record.id)}`,
      filter: "store" as const,
      type: labels.store,
      title,
      description,
      href: `/${locale}/stores`,
      keywords: [title, description, category].join(" "),
    };
  });

  const diningResults = diningPlaces.map((place) => {
    const record = place as unknown as SearchRecord;
    const title = getLocalizedValue(record.name, locale);
    const description = getLocalizedValue(record.description, locale);
    const category = getPlainValue(record.category);
    const cuisine = getLocalizedValue(record.cuisine, locale);

    return {
      id: `dining-${getPlainValue(record.id)}`,
      filter: "dining" as const,
      type: labels.dining,
      title,
      description,
      href: `/${locale}/dining`,
      keywords: [title, description, category, cuisine].join(" "),
    };
  });

  const campaignResults = campaigns.map((campaign) => {
    const record = campaign as unknown as SearchRecord;
    const title = getLocalizedValue(record.title, locale);
    const description = getLocalizedValue(record.description, locale);
    const badge = getLocalizedValue(record.badge, locale);
    const storeName = getLocalizedValue(record.storeName, locale);

    return {
      id: `campaign-${getPlainValue(record.id)}`,
      filter: "campaign" as const,
      type: labels.campaign,
      title,
      description,
      href: `/${locale}/campaigns`,
      keywords: [title, description, badge, storeName].join(" "),
    };
  });

  const eventResults = events.map((event) => {
    const record = event as unknown as SearchRecord;
    const title = getLocalizedValue(record.title, locale);
    const description = getLocalizedValue(record.description, locale);
    const location = getLocalizedValue(record.location, locale);

    return {
      id: `event-${getPlainValue(record.id)}`,
      filter: "event" as const,
      type: labels.event,
      title,
      description,
      href: `/${locale}/events`,
      keywords: [title, description, location].join(" "),
    };
  });

  const movieResults = movies.map((movie) => {
    const record = movie as unknown as SearchRecord;
    const title = getLocalizedValue(record.title, locale);
    const description = getLocalizedValue(record.description, locale);
    const genre = getLocalizedValue(record.genre, locale);

    return {
      id: `movie-${getPlainValue(record.id)}`,
      filter: "movie" as const,
      type: labels.movie,
      title,
      description,
      href: `/${locale}/cinema`,
      keywords: [title, description, genre].join(" "),
    };
  });

  return [
    ...storeResults,
    ...diningResults,
    ...campaignResults,
    ...eventResults,
    ...movieResults,
  ].filter((item) => item.title);
}

export function SearchOverlay({ locale, isOpen, onClose }: SearchOverlayProps) {
  const copy = content[locale];
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<SearchFilter>("all");

  const allResults = useMemo(() => buildSearchResults(locale), [locale]);

  const filteredResults = useMemo(() => {
  const normalizedQuery = normalize(query);

  return allResults
    .filter((item) => {
      const matchesQuery =
        !normalizedQuery || normalize(item.keywords).includes(normalizedQuery);

      const matchesFilter =
        activeFilter === "all" || item.filter === activeFilter;

      return matchesQuery && matchesFilter;
    })
    .sort((a, b) => a.title.localeCompare(b.title, locale))
    .slice(0, 12);
}, [activeFilter, allResults, locale, query]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    const focusTimeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      window.clearTimeout(focusTimeout);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setActiveFilter("all");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-text-primary/40 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={copy.title}
    >
      <div
        className="mx-auto flex h-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-border-default bg-surface-default shadow-overlay"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="border-b border-border-default p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
                {copy.title}
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-text-primary md:text-3xl">
                {copy.description}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface-muted text-text-primary transition hover:bg-surface-subtle"
              aria-label={copy.close}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border-default bg-surface-muted px-4 py-3">
            <Search
              className="h-5 w-5 shrink-0 text-text-muted"
              aria-hidden="true"
            />

            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.placeholder}
              className="w-full bg-transparent text-base font-medium text-text-primary outline-none placeholder:text-text-muted"
            />
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {filterOrder.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "border-brand-primary bg-brand-primary text-brand-foreground shadow-card"
                      : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                  }`}
                >
                  {copy.filters[filter]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 md:p-6">
          {filteredResults.length ? (
  <div>
    <p className="mb-4 text-sm font-medium text-text-muted">
      {filteredResults.length} {copy.result}
    </p>

    <div className="grid gap-3">
      {filteredResults.map((result) => (
        <Link
          key={result.id}
          href={result.href}
          onClick={onClose}
          className="group rounded-3xl border border-border-default bg-surface-muted p-5 transition hover:-translate-y-0.5 hover:bg-surface-subtle hover:shadow-card"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-surface-default px-3 py-1 text-xs font-semibold text-text-muted shadow-card">
              {result.type}
            </span>

            <h3 className="text-lg font-semibold text-text-primary">
              {result.title}
            </h3>
          </div>

          {result.description ? (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-text-secondary">
              {result.description}
            </p>
          ) : null}
        </Link>
      ))}
    </div>
  </div>
) : (
  <div className="flex min-h-60 items-center justify-center rounded-3xl border border-dashed border-border-default bg-surface-muted p-8 text-center">
    <p className="text-sm font-medium text-text-muted">
      {copy.empty}
    </p>
  </div>
)}
        </div>
      </div>
    </div>
  );
}