"use client";

import { Filter, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { getCampaignStatus } from "@/components/campaigns/CampaignCountdown";
import { campaigns } from "@/data/campaigns";
import type { Campaign, Locale } from "@/types/content";

type CampaignsExplorerProps = {
  locale: Locale;
};

type CategoryFilter =
  | "all"
  | "fashion"
  | "food"
  | "electronics"
  | "kids"
  | "family"
  | "cinema"
  | "general";

type StatusFilter = "all" | "active" | "upcoming" | "expired";

const content = {
  tr: {
    eyebrow: "Kampanyalar",
    title: "CityMall Cyprus kampanyalarını keşfet.",
    description:
      "Mağazalar, yeme-içme alanları, sinema ve aile deneyimleri için güncel kampanyaları inceleyin.",
    categoryTitle: "Kategori",
    statusTitle: "Durum",
    totalCampaigns: "kampanya",
    listedCampaigns: "kampanya listeleniyor",
    noResultsTitle: "Kampanya bulunamadı",
    noResultsText: "Filtreleri değiştirerek tekrar deneyin.",
    resetFilters: "Filtreleri Sıfırla",
    categoryLabels: {
      all: "Tümü",
      fashion: "Moda",
      food: "Yiyecek",
      electronics: "Elektronik",
      kids: "Çocuk",
      family: "Aile",
      cinema: "Sinema",
      general: "Genel",
    },
    statusLabels: {
      all: "Tümü",
      active: "Aktif",
      upcoming: "Yakında",
      expired: "Biten",
    },
  },
  en: {
    eyebrow: "Campaigns",
    title: "Discover CityMall Cyprus campaigns.",
    description:
      "Explore current campaigns for stores, dining areas, cinema and family experiences.",
    categoryTitle: "Category",
    statusTitle: "Status",
    totalCampaigns: "campaigns",
    listedCampaigns: "campaigns listed",
    noResultsTitle: "No campaigns found",
    noResultsText: "Try changing your filters.",
    resetFilters: "Reset Filters",
    categoryLabels: {
      all: "All",
      fashion: "Fashion",
      food: "Food",
      electronics: "Electronics",
      kids: "Kids",
      family: "Family",
      cinema: "Cinema",
      general: "General",
    },
    statusLabels: {
      all: "All",
      active: "Active",
      upcoming: "Coming Soon",
      expired: "Expired",
    },
  },
};

const categoryFilters: CategoryFilter[] = [
  "all",
  "fashion",
  "food",
  "electronics",
  "kids",
  "family",
  "cinema",
  "general",
];

const statusFilters: StatusFilter[] = ["all", "active", "upcoming", "expired"];

function sortCampaigns(campaignList: Campaign[]) {
  return [...campaignList].sort(
    (a, b) =>
      new Date(`${a.endDate}T12:00:00`).getTime() -
      new Date(`${b.endDate}T12:00:00`).getTime()
  );
}

export function CampaignsExplorer({ locale }: CampaignsExplorerProps) {
  const copy = content[locale];
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtersActive = categoryFilter !== "all" || statusFilter !== "all";

  const filteredCampaigns = useMemo(() => {
    return sortCampaigns(campaigns).filter((campaign) => {
      const computedStatus = getCampaignStatus(
        campaign.startDate,
        campaign.endDate
      );

      const matchesCategory =
        categoryFilter === "all" || campaign.category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" || computedStatus === statusFilter;

      return matchesCategory && matchesStatus;
    });
  }, [categoryFilter, statusFilter]);

  function resetFilters() {
    setCategoryFilter("all");
    setStatusFilter("all");
  }

  return (
    <main className="bg-surface-default">
      <section className="border-b border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
                {copy.eyebrow}
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
                {copy.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-text-secondary md:text-lg">
                {copy.description}
              </p>
            </div>

            <div className="w-fit rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card">
              {campaigns.length} {copy.totalCampaigns}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border-default bg-surface-default py-8">
        <div className="container">
          <div className="w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-surface-default p-4 shadow-card md:p-5">
            <div className="mb-5 flex items-center gap-2">
              <Filter className="h-5 w-5 text-text-muted" aria-hidden="true" />
              <p className="text-sm font-semibold text-text-primary">
                {filteredCampaigns.length}{" "}
                {filtersActive ? copy.listedCampaigns : copy.totalCampaigns}
              </p>

              {filtersActive ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-auto rounded-full border border-border-default bg-surface-muted px-3 py-1.5 text-xs font-semibold text-text-secondary transition hover:bg-surface-subtle hover:text-text-primary"
                >
                  {copy.resetFilters}
                </button>
              ) : null}
            </div>

            <div className="grid min-w-0 gap-5 lg:grid-cols-2">
              <div className="min-w-0">
  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
    {copy.categoryTitle}
  </p>

  <div className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
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

              <div className="min-w-0">
  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
    {copy.statusTitle}
  </p>

  <div className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
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
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          {filteredCampaigns.length ? (
            <div className="grid min-w-0 gap-5 lg:grid-cols-2">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  locale={locale}
                />
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