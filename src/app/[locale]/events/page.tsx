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

export default function EventsPage({ params }: EventsPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];
  const featuredEvents = events.filter((event) => event.featured);

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
              {content.featuredEvents}
            </p>

            <div className="mt-4 grid gap-3">
              {featuredEvents.map((event) => (
                <article
                  key={event.id}
                  className="rounded-xl border border-border-default bg-surface-muted p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                      {formatDateTime(event.date, locale)}
                    </p>

                    <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground">
                      {content.statuses[event.status]}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-semibold text-text-primary">
                    {getLocalizedText(event.title, locale)}
                  </h2>

                  <p className="mt-2 text-sm text-text-secondary">
                    {getLocalizedText(event.location, locale)}
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
              {events.length} {content.allEvents}
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-text-primary">
              {content.allEvents}
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
          {events.map((event) => (
            <article
              key={event.id}
              className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {formatDateTime(event.date, locale)}
                </p>

                <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-semibold text-text-secondary">
                  {content.statuses[event.status]}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-text-primary">
                {getLocalizedText(event.title, locale)}
              </h3>

              <p className="mt-4 line-clamp-4 text-sm leading-6 text-text-secondary">
                {getLocalizedText(event.description, locale)}
              </p>

              <div className="mt-6 grid gap-3 border-t border-border-default pt-5 text-sm">
                <div className="grid gap-1">
                  <span className="text-text-muted">{content.date}</span>
                  <span className="font-medium text-text-primary">
                    {formatDateTime(event.date, locale)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-text-muted">{content.location}</span>
                  <span className="font-medium text-text-primary">
                    {getLocalizedText(event.location, locale)}
                  </span>
                </div>

                {event.audience ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-text-muted">{content.audience}</span>
                    <span className="font-medium text-text-primary">
                      {getLocalizedText(event.audience, locale)}
                    </span>
                  </div>
                ) : null}

                <div className="flex items-center justify-between gap-4">
                  <span className="text-text-muted">{content.status}</span>
                  <span className="font-medium text-text-primary">
                    {content.statuses[event.status]}
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