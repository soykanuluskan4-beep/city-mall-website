/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Plus,
  Users,
} from "lucide-react";
import { locales } from "@/i18n/routing";
import { events } from "@/data/events";
import { EventCard } from "@/components/events/EventCard";
import { getLocalizedText } from "@/lib/locale";
import { createPageMetadata } from "@/lib/metadata";
import type { Event, Locale } from "@/types/content";

type EventDetailPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

const content = {
  tr: {
    back: "Etkinliklere Dön",
    details: "Etkinlik Detayları",
    date: "Tarih",
    time: "Saat",
    duration: "Süre",
    location: "Konum",
    audience: "Hedef Kitle",
    addToCalendar: "Takvime Ekle",
    relatedEvents: "İlgili Etkinlikler",
    allEvents: "Tüm Etkinlikler",
    categoryLabels: {
      music: "Müzik",
      kids: "Çocuk",
      fashion: "Moda",
      sports: "Spor",
      food: "Yemek",
      family: "Aile",
      cinema: "Sinema",
      general: "Genel",
    },
  },
  en: {
    back: "Back to Events",
    details: "Event Details",
    date: "Date",
    time: "Time",
    duration: "Duration",
    location: "Location",
    audience: "Audience",
    addToCalendar: "Add to Calendar",
    relatedEvents: "Related Events",
    allEvents: "All Events",
    categoryLabels: {
      music: "Music",
      kids: "Kids",
      fashion: "Fashion",
      sports: "Sports",
      food: "Food",
      family: "Family",
      cinema: "Cinema",
      general: "General",
    },
  },
};

const categoryStyles: Record<string, string> = {
  music: "bg-violet-50 text-violet-700",
  kids: "bg-yellow-50 text-yellow-700",
  fashion: "bg-pink-50 text-pink-700",
  sports: "bg-emerald-50 text-emerald-700",
  food: "bg-orange-50 text-orange-700",
  family: "bg-blue-50 text-blue-700",
  cinema: "bg-slate-100 text-slate-700",
  general: "bg-surface-default text-text-primary",
};

function findEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
}

function formatTime(event: Event) {
  if (event.startTime && event.endTime) {
    return `${event.startTime} - ${event.endTime}`;
  }

  if (event.startTime) {
    return event.startTime;
  }

  return new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(event.date));
}

function toGoogleDate(value: string) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}00`;
}

function getGoogleCalendarUrl(event: Event, locale: Locale) {
  const title = getLocalizedText(event.title, locale);
  const description = getLocalizedText(
    event.detailDescription ?? event.description,
    locale
  );
  const location = getLocalizedText(event.location, locale);

  const start = toGoogleDate(event.date);
  const end = toGoogleDate(event.endDate ?? event.date);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    details: description,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function getRelatedEvents(currentEvent: Event) {
  const sameCategory = events.filter(
    (event) =>
      event.slug !== currentEvent.slug &&
      event.category === currentEvent.category
  );

  const otherEvents = events.filter(
    (event) =>
      event.slug !== currentEvent.slug &&
      event.category !== currentEvent.category
  );

  return [...sameCategory, ...otherEvents].slice(0, 3);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    events.map((event) => ({
      locale,
      slug: event.slug,
    }))
  );
}

export function generateMetadata({
  params,
}: EventDetailPageProps): Metadata {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    return {};
  }

  const event = findEvent(params.slug);

  if (!event) {
    return {};
  }

  return createPageMetadata({
    locale,
    path: `/events/${event.slug}`,
    title: `${getLocalizedText(event.title, locale)} | CityMall Cyprus`,
    description: getLocalizedText(event.description, locale),
  });
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const event = findEvent(params.slug);

  if (!event) {
    notFound();
  }

  const copy = content[locale];
  const title = getLocalizedText(event.title, locale);
  const description = getLocalizedText(event.description, locale);
  const detailDescription = getLocalizedText(
    event.detailDescription ?? event.description,
    locale
  );
  const location = getLocalizedText(event.location, locale);
  const audience = event.audience ? getLocalizedText(event.audience, locale) : "";
  const duration = event.duration ? getLocalizedText(event.duration, locale) : "";
  const category = event.category ?? "general";
  const categoryLabel =
    copy.categoryLabels[category as keyof typeof copy.categoryLabels] ??
    category;
  const relatedEvents = getRelatedEvents(event);
  const calendarUrl = getGoogleCalendarUrl(event, locale);

  return (
    <main className="bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <img
          src={event.image}
          alt={title}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,24,39,0.35)_0%,rgba(17,24,39,0.68)_48%,rgba(17,24,39,0.96)_100%)]" />

        <div className="container py-12 md:py-20">
          <Link
            href={`/${locale}/events`}
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

              {audience ? (
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-text-primary">
                  {audience}
                </span>
              ) : null}
            </div>

            <h1 className="text-4xl font-semibold tracking-tight md:text-7xl">
              {title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82 md:text-xl">
              {description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/60">
                  {copy.date}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {formatDate(event.date, locale)}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/60">
                  {copy.time}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {formatTime(event)}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/60">
                  {copy.duration}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {duration || "-"}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/60">
                  {copy.location}
                </p>
                <p className="mt-2 text-lg font-semibold">{location}</p>
              </div>
            </div>

            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-muted"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              {copy.addToCalendar}
            </a>
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

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-1 h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {copy.date}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {formatDate(event.date, locale)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {copy.time}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {formatTime(event)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {copy.location}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {location}
                    </p>
                  </div>
                </div>

                {audience ? (
                  <div className="flex items-start gap-3">
                    <Users className="mt-1 h-5 w-5 text-text-muted" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {copy.audience}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        {audience}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </aside>

            <article className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card md:p-8">
              <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
                {copy.details}
              </h2>

              <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
                {detailDescription}
              </p>

              <a
                href={calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                {copy.addToCalendar}
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.relatedEvents}
            </h2>

            <Link
              href={`/${locale}/events`}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
            >
              {copy.allEvents}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {relatedEvents.map((relatedEvent) => (
              <EventCard
                key={relatedEvent.id}
                event={relatedEvent}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}