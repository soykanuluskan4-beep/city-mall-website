"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Clock, Film, Ticket } from "lucide-react";
import { getLocalizedText } from "@/lib/locale";
import type { Locale, Movie, MovieGenre } from "@/types/content";

type DailyShowtimesProps = {
  locale: Locale;
  movies: Movie[];
  selectedDate: string;
  dateOptions: string[];
  onDateChange: (date: string) => void;
  onSelectShowtime: (movie: Movie, date: string, time: string) => void;
};

const content = {
  tr: {
    eyebrow: "Günlük Seanslar",
    title: "Bugünün Cinemall programı",
    description:
      "Tarihi seçin, uygun filmleri ve seans saatlerini hızlıca görüntüleyin.",
    details: "Film Detaylarını Gör",
    ticket: "Bilet Bilgisi Al",
    noShowtimes: "Seçili gün için seans görünmüyor.",
    minutes: "dk",
    genres: {
      action: "Aksiyon",
      animation: "Animasyon",
      comedy: "Komedi",
      drama: "Drama",
      family: "Aile",
      thriller: "Gerilim",
      adventure: "Macera",
      romance: "Romantik",
      fantasy: "Fantastik",
      other: "Diğer",
    },
  },
  en: {
    eyebrow: "Daily Showtimes",
    title: "Today’s Cinemall program",
    description:
      "Choose a date and quickly view available movies and showtimes.",
    details: "View Movie Details",
    ticket: "Get Ticket Info",
    noShowtimes: "No showtimes available for the selected day.",
    minutes: "min",
    genres: {
      action: "Action",
      animation: "Animation",
      comedy: "Comedy",
      drama: "Drama",
      family: "Family",
      thriller: "Thriller",
      adventure: "Adventure",
      romance: "Romance",
      fantasy: "Fantasy",
      other: "Other",
    },
  },
};

function formatDatePill(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));
}

function getMoviesForDate(movies: Movie[], selectedDate: string) {
  return movies
    .map((movie) => ({
      movie,
      times:
        movie.showtimes.find((showtime) => showtime.date === selectedDate)
          ?.times ?? [],
    }))
    .filter((item) => item.times.length > 0);
}

export function DailyShowtimes({
  locale,
  movies,
  selectedDate,
  dateOptions,
  onDateChange,
  onSelectShowtime,
}: DailyShowtimesProps) {
  const copy = content[locale];
  const moviesForDate = getMoviesForDate(movies, selectedDate);

  return (
    <section className="border-y border-border-default bg-surface-muted/45 py-12 md:py-16">
      <div className="container">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.eyebrow}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.title}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
              {copy.description}
            </p>
          </div>

          <div className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
            {dateOptions.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => onDateChange(date)}
                className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  selectedDate === date
                    ? "border-brand-primary bg-brand-primary text-brand-foreground"
                    : "border-border-default bg-surface-default text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                }`}
              >
                {formatDatePill(date, locale)}
              </button>
            ))}
          </div>
        </div>

        {moviesForDate.length ? (
          <div className="grid gap-4">
            {moviesForDate.map(({ movie, times }) => {
              const title = getLocalizedText(movie.title, locale);
              const language = movie.language
                ? getLocalizedText(movie.language, locale)
                : "";
              const genreLabel =
                copy.genres[movie.genre as MovieGenre] ?? movie.genre;

              return (
                <article
                  key={movie.id}
                  className="grid gap-4 rounded-[2rem] border border-border-default bg-surface-default p-4 shadow-card md:grid-cols-[120px_1fr] md:p-5"
                >
                  <Link
                    href={`/${locale}/cinema/${movie.slug}`}
                    className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-text-primary md:aspect-auto md:h-full"
                  >
                    <img
                      src={movie.posterImage ?? movie.heroImage ?? ""}
                      alt={title}
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-col justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
                          {genreLabel}
                        </span>

                        {movie.ageRating ? (
                          <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground">
                            {movie.ageRating}
                          </span>
                        ) : null}

                        <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {movie.durationMinutes} {copy.minutes}
                        </span>

                        {language ? (
                          <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
                            {language}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary">
                        {title}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {times.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() =>
                              onSelectShowtime(movie, selectedDate, time)
                            }
                            className="rounded-full border border-border-default bg-surface-muted px-4 py-2 text-sm font-semibold text-text-primary transition hover:border-brand-primary hover:bg-brand-primary hover:text-brand-foreground"
                          >
                            {time}
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/${locale}/cinema/${movie.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-muted px-4 py-2.5 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
                        >
                          <Film className="h-4 w-4" aria-hidden="true" />
                          {copy.details}
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            onSelectShowtime(movie, selectedDate, times[0])
                          }
                          className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
                        >
                          {copy.ticket}
                          <Ticket className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-border-default bg-surface-default p-8 text-center">
            <p className="text-sm font-semibold text-text-muted">
              {copy.noShowtimes}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}