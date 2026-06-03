/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { events } from "@/data/events";
import { getLocalizedText } from "@/lib/locale";
import type { Event, Locale } from "@/types/content";

type LiveEventsCarouselProps = {
  locale: Locale;
};

type EventCardItem = {
  id: string;
  title: string;
  dateText: string;
  timeText: string;
  badge: string;
  image: string;
  href: string;
  rotation: string;
};

const content = {
  tr: {
    eyebrow: "CityMall Moments",
    titleLineOne: "Canlı Etkinlikler",
    titleLineTwo: "& Festivaller",
    subtitle: "Her hafta keşfedilecek yeni bir deneyim.",
    viewAll: "Tüm Etkinlikler",
    details: "Detayları Gör",
    fallbackBadge: "ETKİNLİK",
    kidsBadge: "ÇOCUKLAR İÇİN",
    familyBadge: "AİLE",
    fallbackTime: "Saat bilgisi yakında",
  },
  en: {
    eyebrow: "CityMall Moments",
    titleLineOne: "Live Events",
    titleLineTwo: "& Festivals",
    subtitle: "Something exciting every week.",
    viewAll: "View All Events",
    details: "View Details",
    fallbackBadge: "EVENTS",
    kidsBadge: "FOR KIDS",
    familyBadge: "FAMILY",
    fallbackTime: "Time to be announced",
  },
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=85",
];

function parseEventDate(date: string) {
  if (!date) {
    return null;
  }

  const normalizedDate = date.includes("T") ? date : `${date}T12:00:00`;
  const parsedDate = new Date(normalizedDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function getEventTimestamp(date: string) {
  const parsedDate = parseEventDate(date);

  return parsedDate ? parsedDate.getTime() : Number.MAX_SAFE_INTEGER;
}

function formatDate(date: string, locale: Locale) {
  const parsedDate = parseEventDate(date);

  if (!parsedDate) {
    return locale === "tr" ? "Tarih yakında" : "Date TBA";
  }

  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "short",
  }).format(parsedDate);
}

function formatTime(event: Event, locale: Locale) {
  const copy = content[locale];

  if (event.startTime && event.endTime) {
    return `${event.startTime} – ${event.endTime}`;
  }

  if (event.startTime) {
    return event.startTime;
  }

  return copy.fallbackTime;
}

function getBadge(event: Event, locale: Locale) {
  const copy = content[locale];
  const category = event.category?.trim();

  const audienceText = event.audience
    ? getLocalizedText(event.audience, locale).toLocaleLowerCase(
        locale === "tr" ? "tr-TR" : "en-US"
      )
    : "";

  if (
    audienceText.includes("çocuk") ||
    audienceText.includes("kids") ||
    audienceText.includes("kid")
  ) {
    return copy.kidsBadge;
  }

  if (
    audienceText.includes("aile") ||
    audienceText.includes("family") ||
    audienceText.includes("families")
  ) {
    return copy.familyBadge;
  }

  if (category) {
    return category.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US");
  }

  return copy.fallbackBadge;
}

function createEventCards(locale: Locale): EventCardItem[] {
  const sortedEvents = [...events].sort(
    (a, b) => getEventTimestamp(a.date) - getEventTimestamp(b.date)
  );

  const sourceEvents = sortedEvents.length ? sortedEvents : events;

  return sourceEvents.map((event, index) => {
    const rotationMap = [
      "-rotate-[0.8deg]",
      "rotate-[0.65deg]",
      "-rotate-[0.45deg]",
      "rotate-[0.35deg]",
      "rotate-0",
    ];

    return {
      id: event.id,
      title: getLocalizedText(event.title, locale),
      dateText: formatDate(event.date, locale),
      timeText: formatTime(event, locale),
      badge: getBadge(event, locale),
      image: event.image || fallbackImages[index % fallbackImages.length],
      href: `/${locale}/events`,
      rotation: rotationMap[index % rotationMap.length],
    };
  });
}

export function LiveEventsCarousel({ locale }: LiveEventsCarouselProps) {
  const copy = content[locale];
  const eventCards = createEventCards(locale);

  const carouselItems =
    eventCards.length >= 4
      ? eventCards
      : [...eventCards, ...eventCards, ...eventCards].slice(0, 6);

  const duplicatedItems = [...carouselItems, ...carouselItems];

  return (
    <section className="relative isolate overflow-hidden bg-[#f5f5f3] py-16 text-text-primary md:py-24">
      <style>{`
        @keyframes liveEventsMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 767px) {
          .live-events-track {
            animation-duration: 68s !important;
          }
        }

        @media (hover: hover) and (pointer: fine) {
          .live-events-carousel:hover .live-events-track {
            animation-play-state: paused;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .live-events-track,
          .live-events-card,
          .live-events-card img {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(180,126,47,0.10),transparent_30%),radial-gradient(circle_at_90%_24%,rgba(17,24,39,0.05),transparent_28%)]" />

      <div className="container relative">
        <div className="mb-12 grid gap-8 md:mb-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-text-muted">
              {copy.eyebrow}
            </p>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-tight text-text-primary md:text-6xl">
              <span className="block">{copy.titleLineOne}</span>
              <span className="block text-text-secondary">
                {copy.titleLineTwo}
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-text-secondary md:text-base">
              {copy.subtitle}
            </p>
          </div>

          <Link
            href={`/${locale}/events`}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-border-default bg-white px-6 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-muted"
          >
            {copy.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="live-events-carousel relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f5f5f3] to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f5f5f3] to-transparent md:w-40" />

        <div
          className="live-events-track flex w-max gap-6 px-6 [animation:liveEventsMarquee_46s_linear_infinite] md:gap-8 md:px-10"
          aria-label={copy.titleLineOne}
        >
          {duplicatedItems.map((event, index) => (
            <LiveEventCard
              key={`${event.id}-${index}`}
              event={event}
              detailsLabel={copy.details}
              ariaHidden={index >= carouselItems.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveEventCard({
  event,
  detailsLabel,
  ariaHidden,
}: {
  event: EventCardItem;
  detailsLabel: string;
  ariaHidden?: boolean;
}) {
  return (
    <article
      aria-hidden={ariaHidden}
      className={`live-events-card group flex h-[420px] w-[300px] shrink-0 flex-col overflow-hidden rounded-[1.55rem] bg-white text-text-primary shadow-[0_28px_90px_rgba(0,0,0,0.32)] transition duration-500 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_34px_110px_rgba(255,255,255,0.10)] md:w-[340px] ${event.rotation}`}
    >
      <div className="relative h-[220px] shrink-0 overflow-hidden bg-surface-muted">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
        />

        <span className="absolute bottom-3 right-3 rounded-md bg-[#ffe600] px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-text-primary shadow-card">
          {event.badge}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {event.dateText}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            {event.timeText}
          </span>
        </div>

        <h3 className="mt-4 line-clamp-2 text-2xl font-semibold leading-tight tracking-tight text-text-primary">
          {event.title}
        </h3>

        <div className="mt-auto pt-5">
          <Link
            href={event.href}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-text-primary/22 px-4 py-2.5 text-xs font-semibold text-text-primary transition hover:bg-text-primary hover:text-white"
          >
            {detailsLabel}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}