"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Accessibility,
  BadgeCheck,
  BatteryCharging,
  Car,
  CreditCard,
  Gift,
  HeartPulse,
  Info,
  MapPin,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wifi,
} from "lucide-react";
import { mallServices } from "@/data/services";
import { getLocalizedText } from "@/lib/locale";
import type {
  Locale,
  MallService,
  ServiceCategory,
  ServiceStatus,
} from "@/types/content";

type ServicesExplorerProps = {
  locale: Locale;
};

type CategoryFilter = "all" | ServiceCategory;

const categoryFilters: CategoryFilter[] = [
  "all",
  "comfort",
  "family",
  "accessibility",
  "safety",
  "finance",
  "parking",
  "guest-services",
];

const content = {
  tr: {
    eyebrow: "Hizmetler",
    title: "CityMall Cyprus ziyaretinizi kolaylaştıran hizmetler.",
    description:
      "Wi-Fi, danışma, erişilebilirlik, kayıp eşya, otopark ve diğer ziyaretçi hizmetlerini tek sayfada keşfedin.",
    searchPlaceholder: "Hizmet ara...",
    filterTitle: "Kategori",
    totalServices: "hizmet",
    listedServices: "hizmet listeleniyor",
    noResultsTitle: "Hizmet bulunamadı",
    noResultsText: "Arama veya filtreleri değiştirerek tekrar deneyin.",
    resetFilters: "Filtreleri Sıfırla",
    location: "Konum",
    status: "Durum",
    categoryLabels: {
      all: "Tümü",
      comfort: "Konfor",
      family: "Aile",
      accessibility: "Erişilebilirlik",
      safety: "Güvenlik",
      finance: "Finans",
      parking: "Otopark",
      "guest-services": "Danışma",
    },
    statusLabels: {
      available: "Mevcut",
      "ask-info": "Bilgi Alın",
      seasonal: "Dönemsel",
    },
    statusDescriptions: {
      available: "Bu hizmet ziyaretçiler için genel hizmetler arasında listelenmiştir.",
      "ask-info":
        "Güncel uygunluk ve detaylar için müşteri hizmetleri noktasından bilgi alınmalıdır.",
      seasonal:
        "Bu hizmet kampanya, dönem veya özel günlere göre değişiklik gösterebilir.",
    },
    ctaTitle: "Aradığınız hizmeti bulamadınız mı?",
    ctaText:
      "Müşteri hizmetleri ve danışma noktası, ziyaretiniz sırasında ihtiyacınız olan yönlendirmeyi sağlayabilir.",
    ctaContact: "İletişime Geç",
    ctaMap: "Haritayı Gör",
  },
  en: {
    eyebrow: "Services",
    title: "Services that make your CityMall Cyprus visit easier.",
    description:
      "Explore Wi-Fi, information desk, accessibility, lost & found, parking and other visitor services in one place.",
    searchPlaceholder: "Search services...",
    filterTitle: "Category",
    totalServices: "services",
    listedServices: "services listed",
    noResultsTitle: "No services found",
    noResultsText: "Try changing your search or filters.",
    resetFilters: "Reset Filters",
    location: "Location",
    status: "Status",
    categoryLabels: {
      all: "All",
      comfort: "Comfort",
      family: "Family",
      accessibility: "Accessibility",
      safety: "Safety",
      finance: "Finance",
      parking: "Parking",
      "guest-services": "Guest Services",
    },
    statusLabels: {
      available: "Available",
      "ask-info": "Ask Info",
      seasonal: "Seasonal",
    },
    statusDescriptions: {
      available: "This service is listed among general visitor services.",
      "ask-info":
        "Please ask the guest services desk for current availability and details.",
      seasonal:
        "This service may vary depending on campaigns, seasons or special days.",
    },
    ctaTitle: "Couldn’t find the service you need?",
    ctaText:
      "Guest services and information points can guide you during your visit.",
    ctaContact: "Contact Us",
    ctaMap: "View Map",
  },
};

const serviceIconMap = {
  "free-wifi": Wifi,
  "baby-stroller": UserRound,
  "accessible-access": Accessibility,
  "wheelchair-support": Accessibility,
  "lost-and-found": Search,
  atm: CreditCard,
  "currency-exchange": CreditCard,
  "storage-lockers": Package,
  "gift-wrapping": Gift,
  "first-aid": HeartPulse,
  "guest-services-desk": Info,
  "valet-parking": Car,
  "prayer-room": Sparkles,
  "ev-charging": BatteryCharging,
};

const categoryIconMap = {
  comfort: Sparkles,
  family: UserRound,
  accessibility: Accessibility,
  safety: ShieldCheck,
  finance: CreditCard,
  parking: Car,
  "guest-services": Info,
};

const statusStyles: Record<ServiceStatus, string> = {
  available: "border-emerald-100 bg-emerald-50 text-emerald-700",
  "ask-info": "border-amber-100 bg-amber-50 text-amber-700",
  seasonal: "border-blue-100 bg-blue-50 text-blue-700",
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

function getServiceSearchText(service: MallService, locale: Locale) {
  return normalizeText(
    [
      getLocalizedText(service.title, locale),
      getLocalizedText(service.description, locale),
      getLocalizedText(service.location, locale),
      service.category,
      service.status,
    ].join(" ")
  );
}

function getServiceIcon(service: MallService) {
  return serviceIconMap[service.slug as keyof typeof serviceIconMap] ?? Info;
}

export function ServicesExplorer({ locale }: ServicesExplorerProps) {
  const copy = content[locale];

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>("all");

  const filtersActive = query.trim() !== "" || categoryFilter !== "all";

  const filteredServices = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    return mallServices.filter((service) => {
      const matchesCategory =
        categoryFilter === "all" || service.category === categoryFilter;

      const matchesQuery =
        !normalizedQuery ||
        getServiceSearchText(service, locale).includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [categoryFilter, locale, query]);

  function resetFilters() {
    setQuery("");
    setCategoryFilter("all");
  }

  return (
    <main className="overflow-x-hidden bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_38%),linear-gradient(135deg,rgba(17,24,39,1),rgba(42,49,63,1))]" />

        <div className="container py-16 md:py-24">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 break-words text-5xl font-semibold tracking-tight md:text-7xl">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-3xl break-words text-lg leading-8 text-white/78 md:text-xl">
              {copy.description}
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-2xl font-semibold">
                  {mallServices.length}
                </p>
                <p className="mt-1 text-sm font-semibold text-white/62">
                  {copy.totalServices}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-2xl font-semibold">7</p>
                <p className="mt-1 text-sm font-semibold text-white/62">
                  {copy.filterTitle}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-2xl font-semibold">
                  {locale === "tr" ? "Danışma" : "Guest Desk"}
                </p>
                <p className="mt-1 text-sm font-semibold text-white/62">
                  {locale === "tr" ? "Bilgi ve yönlendirme" : "Info & guidance"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border-default bg-surface-default py-8">
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

            <div className="mt-5 min-w-0">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                {copy.filterTitle}
              </p>

              <div className="w-full max-w-full overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
                <div className="flex w-max gap-2 px-1">
                  {categoryFilters.map((filter) => {
                    const Icon =
                      filter === "all"
                        ? BadgeCheck
                        : categoryIconMap[filter];

                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setCategoryFilter(filter)}
                        className={`inline-flex whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          categoryFilter === filter
                            ? "border-brand-primary bg-brand-primary text-brand-foreground"
                            : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                        }`}
                      >
                        <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                        {copy.categoryLabels[filter]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border-default pt-5">
              <p className="text-sm font-semibold text-text-secondary">
                {filteredServices.length}{" "}
                {filtersActive ? copy.listedServices : copy.totalServices}
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
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          {filteredServices.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredServices.map((service) => {
                const Icon = getServiceIcon(service);
                const title = getLocalizedText(service.title, locale);
                const description = getLocalizedText(
                  service.description,
                  locale
                );
                const location = getLocalizedText(service.location, locale);

                return (
                  <article
                    key={service.id}
                    className="min-w-0 rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          statusStyles[service.status]
                        }`}
                      >
                        {copy.statusLabels[service.status]}
                      </span>
                    </div>

                    <h2 className="mt-5 break-words text-2xl font-semibold tracking-tight text-text-primary">
                      {title}
                    </h2>

                    <p className="mt-3 break-words text-sm leading-6 text-text-secondary">
                      {description}
                    </p>

                    <div className="mt-5 rounded-2xl bg-surface-muted p-4">
                      <p className="flex items-start gap-2 text-sm font-semibold text-text-primary">
                        <MapPin
                          className="mt-0.5 h-4 w-4 shrink-0 text-text-muted"
                          aria-hidden="true"
                        />
                        <span>
                          {copy.location}:{" "}
                          <span className="font-medium text-text-secondary">
                            {location}
                          </span>
                        </span>
                      </p>

                      <p className="mt-3 text-xs leading-5 text-text-muted">
                        {copy.statusDescriptions[service.status]}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-border-default bg-surface-muted p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-default text-text-muted shadow-card">
                <Search className="h-6 w-6" aria-hidden="true" />
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

      <section className="border-t border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="rounded-[2rem] border border-border-default bg-text-primary p-6 text-white shadow-elevated md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {copy.ctaTitle}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">
                  {copy.ctaText}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact`}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
                >
                  {copy.ctaContact}
                </Link>

                <Link
                  href={`/${locale}/map`}
                  className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  {copy.ctaMap}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}