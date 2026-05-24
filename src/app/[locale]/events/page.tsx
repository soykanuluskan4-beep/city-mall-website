import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";
import { locales } from "@/i18n/routing";
import { getLocalizedText } from "@/lib/locale";
import type { Locale } from "@/types/content";

type EventsPageProps = {
  params: {
    locale: string;
  };
};

const pageContent = {
  tr: {
    eyebrow: "Etkinlikler",
    title: "CityMall Cyprus etkinlik takvimini keşfet.",
    description:
      "Çocuk atölyeleri, müzik akşamları ve aile etkinlikleriyle AVM deneyimini daha canlı hale getiren konsept program.",
    allEvents: "Tüm Etkinlikler",
    featuredEvents: "Öne Çıkan Etkinlikler",
    date: "Tarih",
    location: "Konum",
    audience: "Hedef Kitle",
    status: "Durum",
    backHome: "Ana sayfaya dön",
    detailSoon: "Etkinlik bilgisi",
    note:
      "Bu etkinlikler demo içeriktir. Gerçek etkinlik takvimi ve katılım detayları müşteri tarafından sağlanabilir.",
    statuses: {
      upcoming: "Yaklaşan",
      ongoing: "Devam Ediyor",
      past: "Geçmiş",
    },
  },
  en: {
    eyebrow: "Events",
    title: "Discover the CityMall Cyprus event calendar.",
    description:
      "A concept program that makes the mall experience more vibrant with kids workshops, music evenings and family events.",
    allEvents: "All Events",
    featuredEvents: "Featured Events",
    date: "Date",
    location: "Location",
    audience: "Audience",
    status: "Status",
    backHome: "Back to home",
    detailSoon: "Event information",
    note:
      "These events use demo content. The real event calendar and participation details can be provided by the client.",
    statuses: {
      upcoming: "Upcoming",
      ongoing: "Ongoing",
      past: "Past",
    },
  },
};

function formatDateTime(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatDay(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
  }).format(new Date(date));
}

function formatMonth(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    month: "short",
  }).format(new Date(date));
}

export default function EventsPage({ params }: EventsPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];
  const featuredEvents = events.filter((event) => event.featured);

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
                {content.featuredEvents}
              </p>

              <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
                {featuredEvents.length}
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {featuredEvents.map((event) => (
                <article
                  key={event.id}
                  className="flex gap-4 rounded-2xl border border-border-default bg-surface-muted p-4"
                >
                  <DateBadge date={event.date} locale={locale} />

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground">
                        {content.statuses[event.status]}
                      </span>

                      <span className="text-xs font-medium text-text-muted">
                        {getLocalizedText(event.location, locale)}
                      </span>
                    </div>

                    <h2 className="mt-3 text-lg font-semibold text-text-primary">
                      {getLocalizedText(event.title, locale)}
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-text-muted">
                      {formatDateTime(event.date, locale)}
                    </p>
                  </div>
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
              {events.length} {content.allEvents}
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-text-primary">
              {content.allEvents}
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
          {events.map((event) => (
            <EventCard
              key={event.id}
              locale={locale}
              event={event}
              dateText={content.date}
              locationText={content.location}
              audienceText={content.audience}
              statusText={content.status}
              detailSoonText={content.detailSoon}
              statusLabel={content.statuses[event.status]}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

type DateBadgeProps = {
  date: string;
  locale: Locale;
};

function DateBadge({ date, locale }: DateBadgeProps) {
  return (
    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-border-default bg-surface-default shadow-card">
      <span className="text-xl font-semibold leading-none text-text-primary">
        {formatDay(date, locale)}
      </span>

      <span className="mt-1 text-xs font-semibold uppercase text-text-muted">
        {formatMonth(date, locale)}
      </span>
    </div>
  );
}

type EventCardProps = {
  locale: Locale;
  event: (typeof events)[number];
  dateText: string;
  locationText: string;
  audienceText: string;
  statusText: string;
  detailSoonText: string;
  statusLabel: string;
};

function EventCard({
  locale,
  event,
  dateText,
  locationText,
  audienceText,
  statusText,
  detailSoonText,
  statusLabel,
}: EventCardProps) {
  const title = getLocalizedText(event.title, locale);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border-default bg-surface-default shadow-card transition hover:-translate-y-1 hover:shadow-elevated">
      <div className="bg-[radial-gradient(circle_at_top_right,rgba(17,24,39,0.16),transparent_35%),linear-gradient(135deg,#f9fafb_0%,#e5e7eb_100%)] p-6">
        <div className="flex items-start justify-between gap-4">
          <DateBadge date={event.date} locale={locale} />

          <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground shadow-card">
            {statusLabel}
          </span>
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          {getLocalizedText(event.location, locale)}
        </p>

        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
          {title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="line-clamp-4 text-sm leading-6 text-text-secondary">
          {getLocalizedText(event.description, locale)}
        </p>

        <div className="mt-6 grid gap-3 border-t border-border-default pt-5 text-sm">
          <div className="grid gap-1">
            <span className="text-text-muted">{dateText}</span>
            <span className="font-medium text-text-primary">
              {formatDateTime(event.date, locale)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-text-muted">{locationText}</span>
            <span className="font-medium text-text-primary">
              {getLocalizedText(event.location, locale)}
            </span>
          </div>

          {event.audience ? (
            <div className="flex items-center justify-between gap-4">
              <span className="text-text-muted">{audienceText}</span>
              <span className="font-medium text-text-primary">
                {getLocalizedText(event.audience, locale)}
              </span>
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-4">
            <span className="text-text-muted">{statusText}</span>
            <span className="font-medium text-text-primary">{statusLabel}</span>
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