/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, CalendarDays, Store } from "lucide-react";
import {
  CampaignCountdown,
  getCampaignStatus,
} from "@/components/campaigns/CampaignCountdown";
import { getLocalizedText } from "@/lib/locale";
import type { Campaign, Locale } from "@/types/content";

type CampaignCardProps = {
  campaign: Campaign;
  locale: Locale;
};

const content = {
  tr: {
    details: "Detayları Gör",
    validIn: "mağazada geçerli",
    until: "Bitiş",
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
  },
  en: {
    details: "View Details",
    validIn: "stores participating",
    until: "Ends",
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
  },
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

const statusStyles: Record<string, string> = {
  active: "bg-emerald-500 text-white",
  upcoming: "bg-amber-500 text-white",
  expired: "bg-text-muted text-white",
};

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function CampaignCard({ campaign, locale }: CampaignCardProps) {
  const copy = content[locale];
  const title = getLocalizedText(campaign.title, locale);
  const description = getLocalizedText(campaign.description, locale);
  const category = campaign.category ?? "general";
  const categoryLabel =
  copy.categoryLabels[category as keyof typeof copy.categoryLabels] ??
  (campaign.badge ? getLocalizedText(campaign.badge, locale) : category);

  const status = getCampaignStatus(campaign.startDate, campaign.endDate);
  const storeCount =
    campaign.storeCount ?? campaign.participatingStores?.length ?? 0;

  return (
    <article className="group relative min-h-[430px] w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-text-primary shadow-elevated">
      <img
        src={campaign.image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.18)_0%,rgba(17,24,39,0.54)_45%,rgba(17,24,39,0.92)_100%)]" />

      <div className="relative flex min-h-[430px] flex-col justify-between p-5 text-white md:p-6">
        <div className="flex flex-wrap items-center gap-2">
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

        <div>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>

          <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-6 text-white/78">
            {description}
          </p>

          <div className="mt-5 grid gap-2 text-sm font-semibold text-white/86">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4" aria-hidden="true" />
              <span>
                {storeCount} {copy.validIn}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <span>
                {copy.until}: {formatDate(campaign.endDate, locale)} ·{" "}
                <CampaignCountdown
                  startDate={campaign.startDate}
                  endDate={campaign.endDate}
                  locale={locale}
                />
              </span>
            </div>
          </div>

          <Link
            href={`/${locale}/campaigns/${campaign.slug}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-muted"
          >
            {copy.details}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}