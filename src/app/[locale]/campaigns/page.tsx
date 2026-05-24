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
      <section className="border-b border-border-default bg-surface-muted">
        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.8fr] lg:items-end">
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
          </div>

          <div className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card">
            <p className="text-sm font-semibold text-text-primary">
              {content.featuredCampaigns}
            </p>

            <div className="mt-4 grid gap-3">
              {featuredCampaigns.map((campaign) => (
                <article
                  key={campaign.id}
                  className="rounded-xl border border-border-default bg-surface-muted p-4"
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
            className="rounded-full border border-border-default px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
          >
            {content.backHome}
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <article
              key={campaign.id}
              className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {campaign.badge
                    ? getLocalizedText(campaign.badge, locale)
                    : content.statuses[campaign.status]}
                </p>

                <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-semibold text-text-secondary">
                  {content.statuses[campaign.status]}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-text-primary">
                {getLocalizedText(campaign.title, locale)}
              </h3>

              <p className="mt-4 line-clamp-4 text-sm leading-6 text-text-secondary">
                {getLocalizedText(campaign.description, locale)}
              </p>

              <div className="mt-6 grid gap-3 border-t border-border-default pt-5 text-sm">
                {campaign.storeName ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-text-muted">{content.store}</span>
                    <span className="font-medium text-text-primary">
                      {getLocalizedText(campaign.storeName, locale)}
                    </span>
                  </div>
                ) : null}

                <div className="flex items-center justify-between gap-4">
                  <span className="text-text-muted">{content.status}</span>
                  <span className="font-medium text-text-primary">
                    {content.statuses[campaign.status]}
                  </span>
                </div>

                <div className="grid gap-1">
                  <span className="text-text-muted">{content.dateRange}</span>
                  <span className="font-medium text-text-primary">
                    {formatDate(campaign.startDate, locale)} —{" "}
                    {formatDate(campaign.endDate, locale)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}