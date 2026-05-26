/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
  Store as StoreIcon,
} from "lucide-react";
import { locales } from "@/i18n/routing";
import { campaigns } from "@/data/campaigns";
import { stores } from "@/data/stores";
import { CampaignCountdown } from "@/components/campaigns/CampaignCountdown";
import { getLocalizedText } from "@/lib/locale";
import { createPageMetadata } from "@/lib/metadata";
import type { Campaign, Locale, Store } from "@/types/content";

type CampaignDetailPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

const content = {
  tr: {
    back: "Kampanyalara Dön",
    details: "Kampanya Detayları",
    participatingStores: "Katılan Mağazalar",
    participatingStoresDescription:
      "Bu kampanya aşağıdaki seçili mağazalarda geçerlidir.",
    otherCampaigns: "Diğer Kampanyalar",
    allCampaigns: "Tüm Kampanyalar",
    storesPage: "Mağazalar Sayfasına Git",
    validIn: "mağazada geçerli",
    startDate: "Başlangıç",
    endDate: "Bitiş",
    countdown: "Kalan Süre",
    statusLabels: {
      active: "Aktif",
      upcoming: "Yakında",
      expired: "Biten",
    },
    categoryLabels: {
      fashion: "Moda",
      food: "Yiyecek",
      electronics: "Elektronik",
      kids: "Çocuk",
      family: "Aile",
      cinema: "Sinema",
      general: "Genel",
    },
    floorLabels: {
      ground: "Zemin Kat",
      first: "1. Kat",
      second: "2. Kat",
    },
  },
  en: {
    back: "Back to Campaigns",
    details: "Campaign Details",
    participatingStores: "Participating Stores",
    participatingStoresDescription:
      "This campaign is valid at the selected stores below.",
    otherCampaigns: "Other Campaigns",
    allCampaigns: "All Campaigns",
    storesPage: "Go to Stores",
    validIn: "stores participating",
    startDate: "Starts",
    endDate: "Ends",
    countdown: "Countdown",
    statusLabels: {
      active: "Active",
      upcoming: "Coming Soon",
      expired: "Expired",
    },
    categoryLabels: {
      fashion: "Fashion",
      food: "Food",
      electronics: "Electronics",
      kids: "Kids",
      family: "Family",
      cinema: "Cinema",
      general: "General",
    },
    floorLabels: {
      ground: "Ground Floor",
      first: "1st Floor",
      second: "2nd Floor",
    },
  },
};

const statusStyles: Record<string, string> = {
  active: "bg-emerald-500 text-white",
  upcoming: "bg-amber-500 text-white",
  expired: "bg-text-muted text-white",
};

const categoryStyles: Record<string, string> = {
  fashion: "bg-pink-50 text-pink-700",
  food: "bg-orange-50 text-orange-700",
  electronics: "bg-blue-50 text-blue-700",
  kids: "bg-yellow-50 text-yellow-700",
  family: "bg-emerald-50 text-emerald-700",
  cinema: "bg-violet-50 text-violet-700",
  general: "bg-surface-default text-text-primary",
};

function findCampaign(slug: string) {
  return campaigns.find((campaign) => campaign.slug === slug);
}

function getCampaignStatus(startDate: string, endDate: string) {
  const now = new Date();
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T23:59:59`);

  if (now < start) {
    return "upcoming";
  }

  if (now > end) {
    return "expired";
  }

  return "active";
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function getCampaignStoreList(campaign: Campaign) {
  const slugs = campaign.participatingStores ?? [];

  return slugs
    .map((slug) => stores.find((store) => store.slug === slug))
    .filter(Boolean) as Store[];
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    campaigns.map((campaign) => ({
      locale,
      slug: campaign.slug,
    }))
  );
}

export function generateMetadata({
  params,
}: CampaignDetailPageProps): Metadata {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    return {};
  }

  const campaign = findCampaign(params.slug);

  if (!campaign) {
    return {};
  }

  return createPageMetadata({
    locale,
    path: `/campaigns/${campaign.slug}`,
    title: `${getLocalizedText(campaign.title, locale)} | CityMall Cyprus`,
    description: getLocalizedText(campaign.description, locale),
  });
}

export default function CampaignDetailPage({
  params,
}: CampaignDetailPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const campaign = findCampaign(params.slug);

  if (!campaign) {
    notFound();
  }

  const copy = content[locale];
  const title = getLocalizedText(campaign.title, locale);
  const description = getLocalizedText(campaign.description, locale);
  const detailDescription = campaign.detailDescription
    ? getLocalizedText(campaign.detailDescription, locale)
    : description;

  const category = campaign.category ?? "general";
  const categoryLabel =
    copy.categoryLabels[category as keyof typeof copy.categoryLabels] ??
    (campaign.badge ? getLocalizedText(campaign.badge, locale) : category);

  const status = getCampaignStatus(campaign.startDate, campaign.endDate);
  const storeCount =
    campaign.storeCount ?? campaign.participatingStores?.length ?? 0;

  const participatingStores = getCampaignStoreList(campaign);
  const otherCampaigns = campaigns
    .filter((item) => item.slug !== campaign.slug)
    .slice(0, 3);

  return (
    <main className="bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <img
          src={campaign.image}
          alt={title}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,24,39,0.35)_0%,rgba(17,24,39,0.64)_45%,rgba(17,24,39,0.95)_100%)]" />

        <div className="container py-12 md:py-20">
          <Link
            href={`/${locale}/campaigns`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {copy.back}
          </Link>

          <div className="mt-16 max-w-5xl md:mt-24">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  categoryStyles[category] ?? categoryStyles.general
                }`}
              >
                {categoryLabel}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  statusStyles[status] ?? statusStyles.active
                }`}
              >
                {copy.statusLabels[status]}
              </span>
            </div>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              {title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82 md:text-xl">
              {description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/60">
                  {copy.startDate}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {formatDate(campaign.startDate, locale)}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/60">
                  {copy.endDate}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {formatDate(campaign.endDate, locale)}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/60">
  {copy.countdown}
</p>
                <p className="mt-2 text-lg font-semibold">
                  <CampaignCountdown
                    startDate={campaign.startDate}
                    endDate={campaign.endDate}
                    locale={locale}
                  />
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/60">
                  {locale === "tr" ? "Mağaza" : "Stores"}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {storeCount} {copy.validIn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="h-fit rounded-[2rem] border border-border-default bg-surface-muted p-6 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
                {copy.details}
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-1 h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {copy.endDate}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {formatDate(campaign.endDate, locale)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <StoreIcon className="mt-1 h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {storeCount} {copy.validIn}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      <CampaignCountdown
                        startDate={campaign.startDate}
                        endDate={campaign.endDate}
                        locale={locale}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div>
              <article className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card md:p-8">
                <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
                  {copy.details}
                </h2>

                <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
                  {detailDescription}
                </p>
              </article>

              <section className="mt-8 rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card md:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
                      {copy.participatingStores}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                      {copy.participatingStoresDescription}
                    </p>
                  </div>

                  <Link
                    href={`/${locale}/stores`}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface-muted px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
                  >
                    {copy.storesPage}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {participatingStores.map((store) => {
                    const storeName = getLocalizedText(store.name, locale);
                    const storeCategory = store.category;
                    const floorLabel =
                      copy.floorLabels[
                        store.floor as keyof typeof copy.floorLabels
                      ] ?? store.floor;

                    return (
                      <Link
                        key={store.id}
                        href={`/${locale}/stores`}
                        className="rounded-3xl border border-border-default bg-surface-muted p-5 transition hover:-translate-y-0.5 hover:bg-surface-subtle hover:shadow-card"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="rounded-full bg-surface-default px-3 py-1 text-xs font-semibold text-text-muted shadow-card">
                            {storeCategory}
                          </span>

                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted">
                            <MapPin className="h-3.5 w-3.5" />
                            {floorLabel}
                          </span>
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-text-primary">
                          {storeName}
                        </h3>
                      </Link>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.otherCampaigns}
            </h2>

            <Link
              href={`/${locale}/campaigns`}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
            >
              {copy.allCampaigns}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {otherCampaigns.map((item) => {
              const itemTitle = getLocalizedText(item.title, locale);
              const itemDescription = getLocalizedText(item.description, locale);

              return (
                <Link
                  key={item.id}
                  href={`/${locale}/campaigns/${item.slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-border-default bg-surface-default shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={itemTitle}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-text-primary/20" />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-text-primary">
                      {itemTitle}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-secondary">
                      {itemDescription}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}