import Link from "next/link";
import { notFound } from "next/navigation";
import { campaigns } from "@/data/campaigns";
import { locales } from "@/i18n/routing";
import { getLocalizedText } from "@/lib/locale";
import type { Locale } from "@/types/content";

type CampaignsPageProps = {
  params: {
    locale: string;
  };
};

const pageContent = {
  tr: {
    eyebrow: "Kampanyalar",
    title: "CityMall Cyprus kampanyalarını keşfet.",
    description:
      "Sezon fırsatları, yeme-içme avantajları ve aile odaklı kampanyalarla alışveriş deneyiminizi planlayın.",
    allCampaigns: "Tüm Kampanyalar",
    featuredCampaigns: "Öne Çıkan Kampanyalar",
    store: "Mağaza",
    status: "Durum",
    dateRange: "Tarih Aralığı",
    backHome: "Ana sayfaya dön",
    detailSoon: "Kampanya detayı yakında",
    note:
      "Bu kampanyalar demo içeriktir. Gerçek kampanya koşulları ve tarihleri müşteri tarafından sağlanabilir.",
    statuses: {
      active: "Aktif",
      upcoming: "Yakında",
      expired: "Sona Erdi",
    },
  },
  en: {
    eyebrow: "Campaigns",
    title: "Discover CityMall Cyprus campaigns.",
    description:
      "Plan your shopping experience with seasonal offers, dining advantages and family-focused campaigns.",
    allCampaigns: "All Campaigns",
    featuredCampaigns: "Featured Campaigns",
    store: "Store",
    status: "Status",
    dateRange: "Date Range",
    backHome: "Back to home",
    detailSoon: "Campaign detail coming soon",
    note:
      "These campaigns use demo content. Real campaign terms and dates can be provided by the client.",
    statuses: {
      active: "Active",
      upcoming: "Upcoming",
      expired: "Expired",
    },
  },
};

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function CampaignsPage({ params }: CampaignsPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];
  const featuredCampaigns = campaigns.filter((campaign) => campaign.featured);

  return (
    <main className="bg-surface-default">
      <section className="border-b border-border-default bg-[radial-gradient(circle_at_top_right,rgba(17,24,39,0.10),transparent_34%),linear-gradient(180deg,#f9fafb_0%,#ffffff_100%)]">
        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-text-muted">
              {content.eyebrow}
            </p>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
              {content.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
              {content.description}
            </p>

            <p className="mt-6 max-w-2xl text-sm leading-6 text-text-muted">
              {content.note}
            </p>
          </div>

          <div className="rounded-3xl border border-border-default bg-surface-default p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-text-primary">
                {content.featuredCampaigns}
              </p>

              <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
                {featuredCampaigns.length}
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {featuredCampaigns.map((campaign) => (
                <article
                  key={campaign.id}
                  className="rounded-2xl border border-border-default bg-surface-muted p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                      {campaign.badge
                        ? getLocalizedText(campaign.badge, locale)
                        : content.statuses[campaign.status]}
                    </p>

                    <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground">
                      {content.statuses[campaign.status]}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-semibold text-text-primary">
                    {getLocalizedText(campaign.title, locale)}
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-text-muted">
                    {formatDate(campaign.startDate, locale)} —{" "}
                    {formatDate(campaign.endDate, locale)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              {campaigns.length} {content.allCampaigns}
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-text-primary">
              {content.allCampaigns}
            </h2>
          </div>

          <Link
            href={`/${locale}`}
            className="rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:bg-surface-muted"
          >
            {content.backHome}
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              locale={locale}
              campaign={campaign}
              storeText={content.store}
              statusText={content.status}
              dateRangeText={content.dateRange}
              detailSoonText={content.detailSoon}
              statusLabel={content.statuses[campaign.status]}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

type CampaignCardProps = {
  locale: Locale;
  campaign: (typeof campaigns)[number];
  storeText: string;
  statusText: string;
  dateRangeText: string;
  detailSoonText: string;
  statusLabel: string;
};

function CampaignCard({
  locale,
  campaign,
  storeText,
  statusText,
  dateRangeText,
  detailSoonText,
  statusLabel,
}: CampaignCardProps) {
  const title = getLocalizedText(campaign.title, locale);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border-default bg-surface-default shadow-card transition hover:-translate-y-1 hover:shadow-elevated">
      <div className="bg-[radial-gradient(circle_at_top_right,rgba(17,24,39,0.16),transparent_35%),linear-gradient(135deg,#f9fafb_0%,#e5e7eb_100%)] p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-default text-lg font-semibold text-text-primary shadow-card">
            {title.slice(0, 1)}
          </div>

          <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground shadow-card">
            {statusLabel}
          </span>
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          {campaign.badge ? getLocalizedText(campaign.badge, locale) : statusLabel}
        </p>

        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
          {title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="line-clamp-4 text-sm leading-6 text-text-secondary">
          {getLocalizedText(campaign.description, locale)}
        </p>

        <div className="mt-6 grid gap-3 border-t border-border-default pt-5 text-sm">
          {campaign.storeName ? (
            <div className="flex items-center justify-between gap-4">
              <span className="text-text-muted">{storeText}</span>
              <span className="font-medium text-text-primary">
                {getLocalizedText(campaign.storeName, locale)}
              </span>
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-4">
            <span className="text-text-muted">{statusText}</span>
            <span className="font-medium text-text-primary">{statusLabel}</span>
          </div>

          <div className="grid gap-1">
            <span className="text-text-muted">{dateRangeText}</span>
            <span className="font-medium text-text-primary">
              {formatDate(campaign.startDate, locale)} —{" "}
              {formatDate(campaign.endDate, locale)}
            </span>
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