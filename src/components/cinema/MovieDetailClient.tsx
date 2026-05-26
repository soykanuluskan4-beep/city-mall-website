"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Film,
  Play,
  Ticket,
  User,
  Users,
} from "lucide-react";
import { MovieCard } from "@/components/cinema/MovieCard";
import {
  TicketDemoModal,
  type TicketSelection,
} from "@/components/cinema/TicketDemoModal";
import { getLocalizedText } from "@/lib/locale";
import type { Locale, Movie, MovieGenre } from "@/types/content";

type MovieDetailClientProps = {
  locale: Locale;
  movie: Movie;
  relatedMovies: Movie[];
};

const content = {
  tr: {
    back: "Cinemall’a Dön",
    overview: "Film Özeti",
    director: "Yönetmen",
    cast: "Oyuncular",
    genre: "Tür",
    duration: "Süre",
    ageRating: "Yaş Sınırı",
    language: "Dil",
    showtimeTitle: "Seans Seçimi",
    showtimeText: "Tarih seçin, uygun seans saatlerinden birini belirleyin.",
    noShowtimes: "Bu film için seanslar yakında açıklanacak.",
    selectDate: "Tarih",
    selectTime: "Seans Saati",
    getTickets: "Bilet Al",
    chooseShowtime: "Lütfen bir seans saati seçin.",
    trailer: "Fragman",
    trailerText: "Demo fragman alanı.",
    related: "Diğer Filmler",
    minutes: "dk",
    comingSoon: "Yakında Vizyonda",
    estimatedRelease: "Tahmini vizyon",
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
    back: "Back to Cinemall",
    overview: "Movie Overview",
    director: "Director",
    cast: "Cast",
    genre: "Genre",
    duration: "Duration",
    ageRating: "Age Rating",
    language: "Language",
    showtimeTitle: "Select Showtime",
    showtimeText: "Choose a date and select an available showtime.",
    noShowtimes: "Showtimes for this movie will be announced soon.",
    selectDate: "Date",
    selectTime: "Showtime",
    getTickets: "Get Tickets",
    chooseShowtime: "Please select a showtime.",
    trailer: "Trailer",
    trailerText: "Demo trailer area.",
    related: "Other Movies",
    minutes: "min",
    comingSoon: "Coming Soon",
    estimatedRelease: "Estimated release",
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

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));
}

function formatLongDate(date: string | undefined, locale: Locale) {
  if (!date) {
    return locale === "tr" ? "Yakında" : "Coming soon";
  }

  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function getDateOptions(movie: Movie) {
  return movie.showtimes.map((showtime) => showtime.date);
}

function getTimesForDate(movie: Movie, date: string) {
  return movie.showtimes.find((showtime) => showtime.date === date)?.times ?? [];
}

export function MovieDetailClient({
  locale,
  movie,
  relatedMovies,
}: MovieDetailClientProps) {
  const copy = content[locale];
  const title = getLocalizedText(movie.title, locale);
  const description = getLocalizedText(movie.description, locale);
  const language = movie.language ? getLocalizedText(movie.language, locale) : "";
  const genreLabel = copy.genres[movie.genre as MovieGenre] ?? movie.genre;
  const dateOptions = useMemo(() => getDateOptions(movie), [movie]);

  const [selectedDate, setSelectedDate] = useState(dateOptions[0] ?? "");
  const [selectedTime, setSelectedTime] = useState("");
  const [ticketSelection, setTicketSelection] =
    useState<TicketSelection | null>(null);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  const selectedTimes = useMemo(() => {
  if (!selectedDate) {
    return [];
  }

  return getTimesForDate(movie, selectedDate);
}, [movie, selectedDate]);

useEffect(() => {
  setSelectedTime(selectedTimes[0] ?? "");
  setShowTimeWarning(false);
}, [selectedTimes]);

  function openTicketModal(targetMovie: Movie, date: string, time: string) {
    setTicketSelection({
      movieTitle: getLocalizedText(targetMovie.title, locale),
      dateLabel: formatDate(date, locale),
      time,
    });
  }

  function handleMainTicketClick() {
    if (!selectedDate || !selectedTime) {
      setShowTimeWarning(true);
      return;
    }

    openTicketModal(movie, selectedDate, selectedTime);
  }

  return (
    <main className="overflow-x-hidden bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <img
          src={movie.heroImage ?? movie.posterImage ?? ""}
          alt={title}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,24,39,0.35)_0%,rgba(17,24,39,0.72)_50%,rgba(17,24,39,0.98)_100%)]" />

        <div className="container py-12 md:py-20">
          <Link
            href={`/${locale}/cinema`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {copy.back}
          </Link>

          <div className="mt-14 grid min-w-0 gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-end">
            <div className="w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-elevated backdrop-blur">
              <img
                src={movie.posterImage ?? movie.heroImage ?? ""}
                alt={title}
                className="aspect-[3/4] h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-text-primary">
                  {genreLabel}
                </span>

                {movie.ageRating ? (
                  <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground">
                    {movie.ageRating}
                  </span>
                ) : null}

                {movie.status === "comingSoon" ? (
                  <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                    {copy.comingSoon}
                  </span>
                ) : null}
              </div>

              <h1 className="break-words text-4xl font-semibold tracking-tight md:text-7xl">
                {title}
              </h1>

              <p className="mt-6 max-w-3xl break-words text-base leading-8 text-white/82 md:text-xl">
                 {description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-sm font-semibold text-white/60">
                    {copy.genre}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{genreLabel}</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-sm font-semibold text-white/60">
                    {copy.duration}
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {movie.durationMinutes} {copy.minutes}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-sm font-semibold text-white/60">
                    {copy.language}
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {language || "-"}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-sm font-semibold text-white/60">
                    {movie.status === "comingSoon"
                      ? copy.estimatedRelease
                      : copy.ageRating}
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {movie.status === "comingSoon"
                      ? formatLongDate(movie.releaseDate, locale)
                      : movie.ageRating ?? "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <aside className="h-fit rounded-[2rem] border border-border-default bg-surface-muted p-6 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
                Cinemall
              </p>

              <div className="mt-6 space-y-5">
                {movie.director ? (
                  <div className="flex items-start gap-3">
                    <User className="mt-1 h-5 w-5 text-text-muted" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {copy.director}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        {movie.director}
                      </p>
                    </div>
                  </div>
                ) : null}

                {movie.cast?.length ? (
                  <div className="flex items-start gap-3">
                    <Users className="mt-1 h-5 w-5 text-text-muted" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {copy.cast}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-text-secondary">
                        {movie.cast.join(", ")}
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {copy.duration}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {movie.durationMinutes} {copy.minutes}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Film className="mt-1 h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {copy.genre}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {genreLabel}
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="min-w-0 space-y-8">
  <article className="w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card md:p-8">
    <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
      {copy.overview}
    </h2>

    <p className="mt-5 max-w-full break-words text-base leading-8 text-text-secondary md:text-lg">
      {description}
    </p>
  </article>

  <section className="w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card md:p-8">
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
          {copy.showtimeTitle}
        </h2>

        <p className="mt-3 max-w-full break-words text-sm leading-6 text-text-secondary">
          {copy.showtimeText}
        </p>
      </div>

      <button
        type="button"
        onClick={handleMainTicketClick}
        disabled={!dateOptions.length}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Ticket className="h-4 w-4" aria-hidden="true" />
        {copy.getTickets}
      </button>
    </div>

    {dateOptions.length ? (
      <div className="mt-6 grid gap-6">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            {copy.selectDate}
          </p>

          <div className="w-full max-w-full overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
            <div className="flex w-max gap-2 px-1">
              {dateOptions.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                    selectedDate === date
                      ? "border-brand-primary bg-brand-primary text-brand-foreground"
                      : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                  }`}
                >
                  {formatDate(date, locale)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            {copy.selectTime}
          </p>

          <div className="flex max-w-full flex-wrap gap-2">
            {selectedTimes.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => {
                  setSelectedTime(time);
                  setShowTimeWarning(false);
                }}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  selectedTime === time
                    ? "border-brand-primary bg-brand-primary text-brand-foreground"
                    : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {showTimeWarning ? (
          <p className="text-sm font-semibold text-amber-700">
            {copy.chooseShowtime}
          </p>
        ) : null}
      </div>
    ) : (
      <div className="mt-6 rounded-3xl border border-dashed border-border-default bg-surface-muted p-6 text-center">
        <CalendarDays className="mx-auto h-6 w-6 text-text-muted" />
        <p className="mt-3 text-sm font-semibold text-text-muted">
          {copy.noShowtimes}
        </p>
      </div>
    )}
  </section>
</div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              Cinemall
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.trailer}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
              {copy.trailerText}
            </p>
          </div>

          <div className="w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-text-primary shadow-elevated">
            {movie.trailerUrl ? (
              <iframe
                src={movie.trailerUrl}
                title={`${title} trailer`}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex aspect-video items-center justify-center text-white">
                <Play className="h-10 w-10" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              Cinemall
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.related}
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedMovies.map((relatedMovie) => (
              <MovieCard
                key={relatedMovie.id}
                movie={relatedMovie}
                locale={locale}
                selectedDate={selectedDate}
                onSelectShowtime={openTicketModal}
              />
            ))}
          </div>
        </div>
      </section>

      <TicketDemoModal
        locale={locale}
        selection={ticketSelection}
        onClose={() => setTicketSelection(null)}
      />
    </main>
  );
}