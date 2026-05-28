import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { getLocalizedText } from "@/lib/locale";
import type { Event, Locale } from "@/types/content";

type EventsCalendarProps = {
  events: Event[];
  locale: Locale;
};

const weekDays = {
  tr: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

const content = {
  tr: {
    empty: "Seçili filtrelere uygun takvim etkinliği bulunamadı.",
    time: "Saat",
    location: "Konum",
    calendar: "Etkinlik Takvimi",
    eventCount: "etkinlik",
  },
  en: {
    empty: "No calendar events match the selected filters.",
    time: "Time",
    location: "Location",
    calendar: "Event Calendar",
    eventCount: "events",
  },
};

const categoryStyles: Record<string, string> = {
  music: "bg-violet-50 text-violet-700 border-violet-100",
  kids: "bg-yellow-50 text-yellow-700 border-yellow-100",
  fashion: "bg-pink-50 text-pink-700 border-pink-100",
  sports: "bg-emerald-50 text-emerald-700 border-emerald-100",
  food: "bg-orange-50 text-orange-700 border-orange-100",
  family: "bg-blue-50 text-blue-700 border-blue-100",
  cinema: "bg-slate-100 text-slate-700 border-slate-200",
  general: "bg-surface-default text-text-primary border-border-default",
};

function getCalendarMonth(events: Event[]) {
  if (!events.length) {
    return new Date();
  }

  const sorted = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return new Date(sorted[0].date);
}

function getMonthLabel(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function getDayKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getEventDayKey(event: Event) {
  return getDayKey(new Date(event.date));
}

function getMondayBasedStartOffset(date: Date) {
  const day = date.getDay();

  return day === 0 ? 6 : day - 1;
}

function buildCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = getMondayBasedStartOffset(firstDay);

  const emptyDays = Array.from({ length: startOffset }, (_, index) => ({
    key: `empty-${index}`,
    date: null as Date | null,
  }));

  const monthDays = Array.from({ length: daysInMonth }, (_, index) => ({
    key: `day-${index + 1}`,
    date: new Date(year, month, index + 1),
  }));

  return [...emptyDays, ...monthDays];
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

export function EventsCalendar({ events, locale }: EventsCalendarProps) {
  const copy = content[locale];
  const monthDate = getCalendarMonth(events);
  const calendarDays = buildCalendarDays(monthDate);

  const eventsByDay = events.reduce<Record<string, Event[]>>((acc, event) => {
    const key = getEventDayKey(event);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(event);

    return acc;
  }, {});

  Object.keys(eventsByDay).forEach((key) => {
    eventsByDay[key].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  });

  if (!events.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border-default bg-surface-muted p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-default text-text-muted shadow-card">
          <CalendarDays className="h-6 w-6" aria-hidden="true" />
        </div>

        <p className="mt-5 text-sm font-semibold text-text-muted">
          {copy.empty}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-border-default bg-surface-default p-4 shadow-card md:p-5">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
            {copy.calendar}
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            {getMonthLabel(monthDate, locale)}
          </h2>
        </div>

        <p className="text-sm font-semibold text-text-muted">
          {events.length} {copy.eventCount}
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-7 gap-2">
            {weekDays[locale].map((day) => (
              <div
                key={day}
                className="rounded-2xl bg-surface-muted px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-text-muted"
              >
                {day}
              </div>
            ))}

            {calendarDays.map((calendarDay) => {
              if (!calendarDay.date) {
                return (
                  <div
                    key={calendarDay.key}
                    className="min-h-[150px] rounded-2xl border border-dashed border-border-default bg-surface-muted/40"
                  />
                );
              }

              const key = getDayKey(calendarDay.date);
              const dayEvents = eventsByDay[key] ?? [];

              return (
                <div
                  key={calendarDay.key}
                  className={`min-h-[150px] rounded-2xl border p-3 ${
                    dayEvents.length
                      ? "border-border-default bg-surface-default shadow-card"
                      : "border-border-default bg-surface-muted/45"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-sm font-semibold text-text-primary">
                      {calendarDay.date.getDate()}
                    </span>

                    {dayEvents.length ? (
                      <span className="rounded-full bg-brand-primary px-2 py-1 text-[10px] font-semibold text-brand-foreground">
                        {dayEvents.length}
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    {dayEvents.map((event) => {
                      const title = getLocalizedText(event.title, locale);
                      const location = getLocalizedText(event.location, locale);
                      const category = event.category ?? "general";

                      return (
                        <Link
                          key={event.id}
                          href={`/${locale}/events/${event.slug}`}
                          className={`block rounded-xl border p-2 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
                            categoryStyles[category] ?? categoryStyles.general
                          }`}
                        >
                          <p className="line-clamp-2 text-xs font-semibold leading-5">
                            {title}
                          </p>

                          <div className="mt-2 grid gap-1 text-[11px] font-medium opacity-80">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              {formatTime(event)}
                            </span>

                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3 w-3" aria-hidden="true" />
                              {location}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}