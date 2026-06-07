"use client";

import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { campaigns } from "@/data/campaigns";
import { diningPlaces } from "@/data/dining";
import { events } from "@/data/events";
import { movies } from "@/data/movies";
import { stores } from "@/data/stores";
import type { Locale } from "@/types/content";

type SearchOverlayProps = {
  locale: Locale;
  onClose: () => void;
  isOpen?: boolean;
  open?: boolean;
  isSearchOpen?: boolean;
};

type SearchKind = "store" | "dining" | "campaign" | "event" | "movie";

type SearchResult = {
  id: string;
  kind: SearchKind;
  label: string;
  title: string;
  description: string;
  href: string;
  searchableText: string;
};

const content = {
  tr: {
    placeholder: "Ne arıyorsunuz?",
    example: "Örn: Puma, Burger King, Filmler",
    noResults: "Sonuç bulunamadı",
    labels: {
      store: "Mağaza",
      dining: "Yeme & İçme",
      campaign: "Kampanya",
      event: "Etkinlik",
      movie: "Sinema",
    },
  },
  en: {
    placeholder: "What are you looking for?",
    example: "e.g: Puma, Burger King, Movies",
    noResults: "No results found",
    labels: {
      store: "Store",
      dining: "Dining",
      campaign: "Campaign",
      event: "Event",
      movie: "Movie",
    },
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getLocalizedValue(value: unknown, locale: Locale) {
  if (typeof value === "string") {
    return value;
  }

  if (!isRecord(value)) {
    return "";
  }

  const localizedValue = value[locale] ?? value.tr ?? value.en;

  return typeof localizedValue === "string" ? localizedValue : "";
}

function getStringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function normalizeText(value: string, locale: Locale) {
  return value
    .toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getKindSearchKeywords(kind: SearchKind, locale: Locale) {
  const keywords = {
    tr: {
      store: "mağaza mağazalar alışveriş marka markalar store stores shopping shop shops",
      dining:
        "yeme içme restoran restoranlar cafe kafe yemek food dining burger kahve coffee restaurant restaurants",
      campaign:
        "kampanya kampanyalar fırsat fırsatlar indirim indirimler promotion promotions campaign campaigns offer offers discount discounts",
      event:
        "etkinlik etkinlikler aktivite aktiviteler program festival events event what happening live",
      movie:
        "film filmler sinema cinemall seans seanslar vizyon movie movies cinema showtime showtimes",
    },
    en: {
      store:
        "store stores shopping mall shop shops mağaza mağazalar marka markalar alışveriş",
      dining:
        "dining food restaurant restaurants cafe coffee yeme içme restoran yemek burger kahve",
      campaign:
        "campaign campaigns promotion promotions offer offers discount discounts kampanya kampanyalar fırsat fırsatlar indirim indirimler",
      event:
        "event events activities activity program festival etkinlik etkinlikler aktivite aktiviteler",
      movie:
        "movie movies cinema cinemall showtime showtimes film filmler sinema seans seanslar",
    },
  };

  return keywords[locale][kind];
}

function createResult({
  item,
  kind,
  label,
  locale,
  href,
  fallbackId,
}: {
  item: unknown;
  kind: SearchKind;
  label: string;
  locale: Locale;
  href: string;
  fallbackId: string;
}): SearchResult | null {
  if (!isRecord(item)) {
    return null;
  }

  const id = getStringValue(item.id) || fallbackId;

  const title =
    getLocalizedValue(item.name, locale) ||
    getLocalizedValue(item.title, locale) ||
    getStringValue(item.slug) ||
    label;

  const description =
    getLocalizedValue(item.description, locale) ||
    getLocalizedValue(item.summary, locale) ||
    getLocalizedValue(item.subtitle, locale) ||
    getLocalizedValue(item.category, locale) ||
    "";

  const slug = getStringValue(item.slug);

  const searchableText = [
    title,
    description,
    slug,
    label,
    getKindSearchKeywords(kind, locale),
    getStringValue(item.category),
    getStringValue(item.floor),
    getLocalizedValue(item.cuisine, locale),
    getLocalizedValue(item.location, locale),
  ]
    .filter(Boolean)
    .join(" ");

  return {
    id,
    kind,
    label,
    title,
    description,
    href,
    searchableText,
  };
}

function createSearchResults(locale: Locale): SearchResult[] {
  const copy = content[locale];

  const storeResults = (stores as readonly unknown[])
    .map((item, index) =>
      createResult({
        item,
        kind: "store",
        label: copy.labels.store,
        locale,
        href: `/${locale}/stores`,
        fallbackId: `store-${index}`,
      })
    )
    .filter((item): item is SearchResult => Boolean(item));

  const diningResults = (diningPlaces as readonly unknown[])
    .map((item, index) =>
      createResult({
        item,
        kind: "dining",
        label: copy.labels.dining,
        locale,
        href: `/${locale}/dining`,
        fallbackId: `dining-${index}`,
      })
    )
    .filter((item): item is SearchResult => Boolean(item));

  const campaignResults = (campaigns as readonly unknown[])
    .map((item, index) =>
      createResult({
        item,
        kind: "campaign",
        label: copy.labels.campaign,
        locale,
        href: `/${locale}/campaigns`,
        fallbackId: `campaign-${index}`,
      })
    )
    .filter((item): item is SearchResult => Boolean(item));

  const eventResults = (events as readonly unknown[])
    .map((item, index) =>
      createResult({
        item,
        kind: "event",
        label: copy.labels.event,
        locale,
        href: `/${locale}/events`,
        fallbackId: `event-${index}`,
      })
    )
    .filter((item): item is SearchResult => Boolean(item));

  const movieResults = (movies as readonly unknown[])
    .map((item, index) =>
      createResult({
        item,
        kind: "movie",
        label: copy.labels.movie,
        locale,
        href: `/${locale}/cinema`,
        fallbackId: `movie-${index}`,
      })
    )
    .filter((item): item is SearchResult => Boolean(item));

  return [
    ...storeResults,
    ...diningResults,
    ...campaignResults,
    ...eventResults,
    ...movieResults,
  ];
}

export function SearchOverlay({
  locale,
  onClose,
  isOpen,
  open,
  isSearchOpen,
}: SearchOverlayProps) {
  const active = isOpen ?? open ?? isSearchOpen ?? true;
  const copy = content[locale];
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");

  const searchIndex = useMemo(() => createSearchResults(locale), [locale]);

  const results = useMemo(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return [];
    }

    const normalizedQuery = normalizeText(trimmedQuery, locale);

    return searchIndex
      .filter((item) =>
        normalizeText(item.searchableText, locale).includes(normalizedQuery)
      )
      .slice(0, 7);
  }, [locale, query, searchIndex]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, onClose]);

  useEffect(() => {
    if (!active) {
      setQuery("");
    }
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[120] overflow-y-auto bg-[rgba(10,10,10,0.82)] text-white backdrop-blur-[16px] backdrop-saturate-150 [animation:searchOverlayFade_250ms_ease-out_both]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={copy.placeholder}
    >
      <style>{`
        @keyframes searchOverlayFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes searchPanelRise {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes searchResultFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <button
        type="button"
        onClick={onClose}
        className="fixed right-5 top-5 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/18 bg-white/[0.04] text-white transition duration-300 hover:bg-white/[0.08] hover:text-white/70 md:right-8 md:top-8 md:h-16 md:w-16"
        aria-label="Close search"
      >
        <X className="h-7 w-7 md:h-8 md:w-8" aria-hidden="true" />
      </button>

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[12%] top-[18%] h-40 w-40 rounded-full bg-[#E8312A]/18 blur-3xl" />
        <div className="absolute right-[12%] top-[26%] h-52 w-52 rounded-full bg-[#0072BC]/16 blur-3xl" />
        <div className="absolute bottom-[18%] left-[42%] h-44 w-44 rounded-full bg-[#FFD100]/12 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-28 [animation:searchPanelRise_300ms_cubic-bezier(0.22,1,0.36,1)_both] md:px-10">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="group/search relative"
        >
          <div className="relative border-b border-white/30 transition duration-300 focus-within:border-white/90">
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.placeholder}
              className="w-full bg-transparent py-5 pr-16 text-4xl font-semibold tracking-tight text-white outline-none placeholder:text-white/42 md:py-7 md:text-6xl"
              type="search"
              autoComplete="off"
              spellCheck={false}
            />

            <Search
              className="absolute right-0 top-1/2 h-9 w-9 -translate-y-1/2 text-white/55 transition duration-300 group-focus-within/search:text-white md:h-11 md:w-11"
              aria-hidden="true"
            />
          </div>

          <p className="mt-4 text-sm italic leading-6 text-white/40 md:text-base">
            {copy.example}
          </p>
        </form>

        <div className="mt-10">
          {query.trim() && results.length === 0 ? (
            <p className="py-12 text-center text-lg font-medium text-white/50">
              {copy.noResults}
            </p>
          ) : null}

          {results.length > 0 ? (
            <div className="overflow-hidden border-y border-white/10">
              {results.map((result, index) => (
                <Link
                  key={`${result.kind}-${result.id}`}
                  href={result.href}
                  onClick={onClose}
                  className="group/result grid grid-cols-[82px_1fr_auto] items-center gap-4 border-t border-white/10 px-1 py-5 opacity-0 transition duration-300 first:border-t-0 hover:bg-white/[0.06] md:grid-cols-[130px_1fr_auto] md:px-4 md:py-6 [animation:searchResultFade_320ms_ease-out_forwards]"
                  style={{
                    animationDelay: `${index * 45}ms`,
                  }}
                >
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/36 md:text-xs">
                    {result.label}
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-2xl font-semibold tracking-tight text-white md:text-3xl">
                      {result.title}
                    </span>

                    {result.description ? (
                      <span className="mt-1 hidden max-w-2xl truncate text-sm text-white/38 md:block">
                        {result.description}
                      </span>
                    ) : null}
                  </span>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/64 transition duration-300 group-hover/result:border-white/35 group-hover/result:bg-white/10 group-hover/result:text-white">
                    <ArrowRight
                      className="h-5 w-5 transition duration-300 group-hover/result:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SearchOverlay;