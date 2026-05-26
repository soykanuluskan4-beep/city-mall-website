"use client";

import { CalendarDays, List, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { EventsCalendar } from "@/components/events/EventsCalendar";
import { events } from "@/data/events";
import type { Event, Locale } from "@/types/content";


type EventsExplorerProps = {
  locale: Locale;
};

type CategoryFilter =
  | "all"
  | "music"
  | "kids"
  | "fashion"
  | "sports"
  | "food"
  | "family"
  | "cinema"
  | "general";

type DateFilter = "all" | "week" | "month" | "future";

const content = {
  tr: {
    eyebrow: "Etkinlikler",
    title: "CityMall Cyprus etkinliklerini keşfet.",
    description:
      "Çocuk atölyeleri, canlı müzik, aile etkinlikleri, moda, spor ve yeme-içme deneyimlerini takip edin.",
    categoryTitle: "Kategori",
    dateTitle: "Tarih",
    totalEvents: "etkinlik",
    listedEvents: "etkinlik listeleniyor",
    listView: "Liste",
    calendarView: "Takvim",
    noResultsTitle: "Etkinlik bulunamadı",
    noResultsText: "Filtreleri değiştirerek tekrar deneyin.",
    resetFilters: "Filtreleri Sıfırla",
    categoryLabels: {
      all: "Tümü",
      music: "Müzik",
      kids: "Çocuk",
      fashion: "Moda",
      sports: "Spor",
      food: "Yemek",
      family: "Aile",
      cinema: "Sinema",
      general: "Genel",
    },
    dateLabels: {
      all: "Tümü",
      week: "Bu Hafta",
      month: "Bu Ay",
      future: "Gelecek",
    },
  },
  en: {
    eyebrow: "Events",
    title: "Discover CityMall Cyprus events.",
    description:
      "Follow kids workshops, live music, family events, fashion, sports and dining experiences.",
    categoryTitle: "Category",
    dateTitle: "Date",
    totalEvents: "events",
    listedEvents: "events listed",
    listView: "List",
    calendarView: "Calendar",
    noResultsTitle: "No events found",
    noResultsText: "Try changing your filters.",
    resetFilters: "Reset Filters",
    categoryLabels: {
      all: "All",
      music: "Music",
      kids: "Kids",
      fashion: "Fashion",
      sports: "Sports",
      food: "Food",
      family: "Family",
      cinema: "Cinema",
      general: "General",
    },
    dateLabels: {
      all: "All",
      week: "This Week",
      month: "This Month",
      future: "Upcoming",
    },
  },
};

const categoryFilters: CategoryFilter[] = [
  "all",
  "music",
  "kids",
  "fashion",
  "sports",
  "food",
  "family",
  "cinema",
  "general",
];

const dateFilters: DateFilter[] = ["all", "week", "month", "future"];

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function endOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}

function startOfWeek(date: Date) {
  const next = startOfDay(date);
  const day = next.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  next.setDate(next.getDate() + diff);
  return next;
}

function endOfWeek(date: Date) {
  const next = startOfWeek(date);
  next.setDate(next.getDate() + 6);
  return endOfDay(next);
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return endOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

function sortEvents(eventList: Event[]) {
  return [...eventList].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

function matchesDateFilter(event: Event, filter: DateFilter) {
  if (filter === "all") {
    return true;
  }

  const now = new Date();
  const eventDate = new Date(event.date);

  if (filter === "week") {
    return eventDate >= startOfWeek(now) && eventDate <= endOfWeek(now);
  }

  if (filter === "month") {
    return eventDate >= startOfMonth(now) && eventDate <= endOfMonth(now);
  }

  return eventDate >= startOfDay(now);
}

export function EventsExplorer({ locale }: EventsExplorerProps) {
  const copy = content[locale];
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const filtersActive = categoryFilter !== "all" || dateFilter !== "all";

  const filteredEvents = useMemo(() => {
    return sortEvents(events).filter((event) => {
      const matchesCategory =
        categoryFilter === "all" || event.category === categoryFilter;

      const matchesDate = matchesDateFilter(event, dateFilter);

      return matchesCategory && matchesDate;
    });
  }, [categoryFilter, dateFilter]);

  function resetFilters() {
    setCategoryFilter("all");
    setDateFilter("all");
  }

  return (
    <main className="bg-surface-default">
      <section className="border-b border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
                {copy.eyebrow}
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
                {copy.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-text-secondary md:text-lg">
                {copy.description}
              </p>
            </div>

            <div className="w-fit rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card">
              {events.length} {copy.totalEvents}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border-default bg-surface-default py-8">
        <div className="container">
          <div className="w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-surface-default p-4 shadow-card md:p-5">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays
                  className="h-5 w-5 text-text-muted"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold text-text-primary">
                  {filteredEvents.length}{" "}
                  {filtersActive ? copy.listedEvents : copy.totalEvents}
                </p>
              </div>

              <div className="flex w-fit rounded-full border border-border-default bg-surface-muted p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    viewMode === "list"
                      ? "bg-surface-default text-text-primary shadow-card"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  <List className="h-4 w-4" aria-hidden="true" />
                  {copy.listView}
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("calendar")}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    viewMode === "calendar"
                      ? "bg-surface-default text-text-primary shadow-card"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {copy.calendarView}
                </button>
              </div>
            </div>

            <div className="grid min-w-0 gap-5 lg:grid-cols-2">
              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {copy.categoryTitle}
                </p>

                <div className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
                  {categoryFilters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setCategoryFilter(filter)}
                      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        categoryFilter === filter
                          ? "border-brand-primary bg-brand-primary text-brand-foreground"
                          : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                      }`}
                    >
                      {copy.categoryLabels[filter]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {copy.dateTitle}
                </p>

                <div className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
                  {dateFilters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setDateFilter(filter)}
                      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        dateFilter === filter
                          ? "border-brand-primary bg-brand-primary text-brand-foreground"
                          : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                      }`}
                    >
                      {copy.dateLabels[filter]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filtersActive ? (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-full border border-border-default bg-surface-muted px-4 py-2 text-sm font-semibold text-text-secondary transition hover:bg-surface-subtle hover:text-text-primary"
              >
                {copy.resetFilters}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          {viewMode === "calendar" ? (
  <EventsCalendar events={filteredEvents} locale={locale} />
) : filteredEvents.length ? (
            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-border-default bg-surface-muted p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-default text-text-muted shadow-card">
                <SearchX className="h-6 w-6" aria-hidden="true" />
              </div>

              <h2 className="mt-5 text-2xl font-semibold text-text-primary">
                {copy.noResultsTitle}
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-text-muted">
                {copy.noResultsText}
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {copy.resetFilters}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}