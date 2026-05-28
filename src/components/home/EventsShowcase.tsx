import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EventCard } from "@/components/events/EventCard";
import { events } from "@/data/events";
import type { Locale } from "@/types/content";

type EventsShowcaseProps = {
  locale: Locale;
};

const content = {
  tr: {
    eyebrow: "Etkinlikler",
    title: "Bu hafta ne var?",
    description:
      "Çocuk atölyeleri, müzik akşamları ve aile programlarını takip edin.",
    cta: "Tüm Etkinliklere Bak",
    empty: "Yaklaşan etkinlik bulunmuyor.",
  },
  en: {
    eyebrow: "Events",
    title: "What’s on this week?",
    description:
      "Follow kids workshops, music evenings and family programs.",
    cta: "View All Events",
    empty: "No upcoming events at the moment.",
  },
};

function getUpcomingEvents() {
  const now = Date.now();

  return events
    .filter((event) => new Date(event.date).getTime() >= now)
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    .slice(0, 3);
}

export function EventsShowcase({ locale }: EventsShowcaseProps) {
  const copy = content[locale];
  const upcomingEvents = getUpcomingEvents();

  return (
    <section className="bg-surface-default py-16 md:py-20">
      <div className="container">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              {copy.eyebrow}
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.title}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
              {copy.description}
            </p>
          </div>

          <Link
            href={`/${locale}/events`}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
          >
            {copy.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {upcomingEvents.length ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-border-default bg-surface-muted p-8 text-center text-text-muted shadow-card">
            {copy.empty}
          </div>
        )}
      </div>
    </section>
  );
}