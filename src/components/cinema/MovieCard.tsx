"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, Clock, Ticket } from "lucide-react";
import { getLocalizedText } from "@/lib/locale";
import type { Locale, Movie, MovieGenre } from "@/types/content";

type MovieCardProps = {
  movie: Movie;
  locale: Locale;
  selectedDate: string;
  onSelectShowtime: (movie: Movie, date: string, time: string) => void;
};

const content = {
  tr: {
    details: "Film Detaylarını Gör",
    ticket: "Bilet Bilgisi Al",
    noShowtimes: "Bu tarihte seans görünmüyor",
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
    details: "View Movie Details",
    ticket: "Get Ticket Info",
    noShowtimes: "No showtimes available for this date",
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

export function MovieCard({
  movie,
  locale,
  selectedDate,
  onSelectShowtime,
}: MovieCardProps) {
  const copy = content[locale];
  const title = getLocalizedText(movie.title, locale);
  const description = getLocalizedText(movie.description, locale);
  const language = movie.language ? getLocalizedText(movie.language, locale) : "";
  const genreLabel = copy.genres[movie.genre as MovieGenre] ?? movie.genre;
  const showtime = movie.showtimes.find((item) => item.date === selectedDate);
  const selectedDateTimes = showtime?.times ?? [];

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-border-default bg-surface-default shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-elevated">
      <div className="relative aspect-[3/4] overflow-hidden bg-text-primary">
        <img
          src={movie.posterImage ?? movie.heroImage ?? ""}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.04)_0%,rgba(17,24,39,0.7)_100%)]" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-text-primary shadow-card">
            {genreLabel}
          </span>

          {movie.ageRating ? (
            <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground shadow-card">
              {movie.ageRating}
            </span>
          ) : null}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            {title}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/80">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {movie.durationMinutes} {copy.minutes}
            </span>

            {language ? <span>{language}</span> : null}
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="line-clamp-2 min-h-[48px] text-sm leading-6 text-text-secondary">
          {description}
        </p>

        <div className="mt-5">
          {selectedDateTimes.length ? (
            <div className="flex flex-wrap gap-2">
              {selectedDateTimes.slice(0, 4).map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => onSelectShowtime(movie, selectedDate, time)}
                  className="rounded-full border border-border-default bg-surface-muted px-3 py-2 text-xs font-semibold text-text-primary transition hover:border-brand-primary hover:bg-brand-primary hover:text-brand-foreground"
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm font-semibold text-text-muted">
              {copy.noShowtimes}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href={`/${locale}/cinema/${movie.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-muted px-4 py-2.5 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
          >
            {copy.details}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          {selectedDateTimes[0] ? (
            <button
              type="button"
              onClick={() =>
                onSelectShowtime(movie, selectedDate, selectedDateTimes[0])
              }
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
            >
              {copy.ticket}
              <Ticket className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}