/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";
import { getLocalizedText } from "@/lib/locale";
import type { Event, Locale } from "@/types/content";

type EventCardProps = {
  event: Event;
  locale: Locale;
};

const content = {
  tr: {
    details: "Etkinlik Detaylarını Gör",
    time: "Saat",
    categoryLabels: {
      music: "Müzik",
      kids: "Çocuk",
      fashion: "Moda",
      sports: "Spor",
      food: "Yeme-İçme",
      family: "Aile",
      cinema: "Sinema",
      general: "Genel",
    },
  },
  en: {
    details: "View Event Details",
    time: "Time",
    categoryLabels: {
      music: "Music",
      kids: "Kids",
      fashion: "Fashion",
      sports: "Sports",
      food: "Dining",
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
  general: "bg-surface-muted text-text-primary",
};

function formatDay(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "2-digit",
  }).format(new Date(date));
}

function formatMonth(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    month: "short",
  }).format(new Date(date));
}

function formatWeekday(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    weekday: "long",
  }).format(new Date(date));
}

export function EventCard({ event, locale }: EventCardProps) {
  const copy = content[locale];
  const title = getLocalizedText(event.title, locale);
  const description = getLocalizedText(event.description, locale);
  const location = getLocalizedText(event.location, locale);
  const audience = event.audience ? getLocalizedText(event.audience, locale) : "";
  const category = event.category ?? "general";
  const categoryLabel =
    copy.categoryLabels[category as keyof typeof copy.categoryLabels] ??
    category;

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-border-default bg-surface-default shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-elevated">
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.image}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.05)_0%,rgba(17,24,39,0.55)_100%)]" />

        <div className="absolute left-4 top-4 rounded-2xl bg-white p-4 text-center shadow-card">
          <p className="text-3xl font-semibold leading-none text-text-primary">
            {formatDay(event.date, locale)}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
            {formatMonth(event.date, locale)}
          </p>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
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
      </div>

      <div className="p-5">
        <p className="text-sm font-semibold text-text-muted">
          {formatWeekday(event.date, locale)}
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
          {title}
        </h2>

        <p className="mt-3 line-clamp-2 min-h-[48px] text-sm leading-6 text-text-secondary">
          {description}
        </p>

        <div className="mt-5 grid gap-2 text-sm font-semibold text-text-secondary">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-text-muted" aria-hidden="true" />
            <span>
              {event.startTime}
              {event.endTime ? ` - ${event.endTime}` : ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-text-muted" aria-hidden="true" />
            <span>{location}</span>
          </div>

          {audience ? (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-text-muted" aria-hidden="true" />
              <span>{audience}</span>
            </div>
          ) : null}
        </div>

        <Link
          href={`/${locale}/events/${event.slug}`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
        >
          {copy.details}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}