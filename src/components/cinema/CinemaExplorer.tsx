"use client";

/* eslint-disable @next/next/no-img-element */

import { Accessibility, Armchair, BadgeCheck, Headphones, MonitorPlay, Ticket } from "lucide-react";
import { useMemo, useState } from "react";
import { DailyShowtimes } from "@/components/cinema/DailyShowtimes";
import { MovieCard } from "@/components/cinema/MovieCard";
import {
  TicketDemoModal,
  type TicketSelection,
} from "@/components/cinema/TicketDemoModal";
import { movies } from "@/data/movies";
import { getLocalizedText } from "@/lib/locale";
import type { Locale, Movie } from "@/types/content";

type CinemaExplorerProps = {
  locale: Locale;
};

const content = {
  tr: {
    eyebrow: "Cinemall",
    title: "Cinemall’da bu hafta ne izlenir?",
    description:
      "Vizyondaki filmleri, günlük seansları ve yakında gelecek yapımları tek yerden kontrol edin.",
    halls: "5 Salon",
    daily: "Günlük Seanslar",
    family: "Aileye Uygun Filmler",
    demo: "Bilet Bilgisi",
    featuresTitle: "Cinemall’da seni neler bekliyor?",
    nowShowing: "Vizyondaki Filmler",
    nowShowingText: "Bu hafta Cinemall’da izleyebileceğiniz filmlere göz atın.",
    comingSoon: "Yakında Vizyonda",
    comingSoonText: "Takvime eklemek isteyeceğiniz yeni yapımlar.",
    estimatedRelease: "Vizyon tarihi",
    details: "Film Detaylarını Gör",
    featureItems: [
      "2K Dijital Projeksiyon",
      "Dolby Ses Sistemi",
      "5 Sinema Salonu",
      "Konforlu Koltuklar",
      "Erişilebilir Salon Girişi",
      "Aileye Uygun Seanslar",
    ],
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
    eyebrow: "Cinemall",
    title: "What’s on at Cinemall this week?",
    description:
      "Check current movies, daily showtimes and upcoming releases in one place.",
    halls: "5 Halls",
    daily: "Daily Showtimes",
    family: "Family-friendly Movies",
    demo: "Ticket Info",
    featuresTitle: "What to expect at Cinemall",
    nowShowing: "Now Showing",
    nowShowingText: "Browse the movies you can watch at Cinemall this week.",
    comingSoon: "Coming Soon",
    comingSoonText: "New releases worth adding to your watchlist.",
    estimatedRelease: "Release date",
    details: "View Movie Details",
    featureItems: [
      "2K Digital Projection",
      "Dolby Sound System",
      "5 Cinema Halls",
      "Comfortable Seats",
      "Accessible Hall Entry",
      "Family-friendly Showtimes",
    ],
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

const featureIcons = [
  MonitorPlay,
  Headphones,
  BadgeCheck,
  Armchair,
  Accessibility,
  Ticket,
];

function getDateOptions(movieList: Movie[]) {
  const dates = movieList.flatMap((movie) =>
    movie.showtimes.map((showtime) => showtime.date)
  );

  return Array.from(new Set(dates)).sort();
}

function formatReleaseDate(date: string | undefined, locale: Locale) {
  if (!date) {
    return locale === "tr" ? "Yakında" : "Coming soon";
  }

  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatDateForModal(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));
}

export function CinemaExplorer({ locale }: CinemaExplorerProps) {
  const copy = content[locale];
  const nowShowingMovies = movies.filter(
    (movie) => movie.status !== "comingSoon"
  );
  const comingSoonMovies = movies.filter(
    (movie) => movie.status === "comingSoon"
  );
  const dateOptions = useMemo(
    () => getDateOptions(nowShowingMovies),
    [nowShowingMovies]
  );

  const [selectedDate, setSelectedDate] = useState(
    dateOptions[0] ?? "2026-06-01"
  );
  const [ticketSelection, setTicketSelection] =
    useState<TicketSelection | null>(null);

  function handleSelectShowtime(movie: Movie, date: string, time: string) {
    setTicketSelection({
      movieTitle: getLocalizedText(movie.title, locale),
      dateLabel: formatDateForModal(date, locale),
      time,
    });
  }

  return (
    <main className="bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=85"
          alt="Cinemall"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,24,39,0.25)_0%,rgba(17,24,39,0.72)_50%,rgba(17,24,39,0.98)_100%)]" />

        <div className="container py-16 md:py-24">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78 md:text-xl">
              {copy.description}
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[copy.halls, copy.daily, copy.family, copy.demo].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur"
                >
                  <p className="text-lg font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border-default bg-surface-default py-8">
        <div className="container">
          <div className="rounded-[2rem] border border-border-default bg-surface-muted p-5 shadow-card">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              {copy.featuresTitle}
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {copy.featureItems.map((feature, index) => {
                const Icon = featureIcons[index] ?? BadgeCheck;

                return (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-2xl border border-border-default bg-surface-default p-4"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <p className="text-sm font-semibold text-text-primary">
                      {feature}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <DailyShowtimes
        locale={locale}
        movies={nowShowingMovies}
        selectedDate={selectedDate}
        dateOptions={dateOptions}
        onDateChange={setSelectedDate}
        onSelectShowtime={handleSelectShowtime}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
                Cinemall
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
                {copy.nowShowing}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
                {copy.nowShowingText}
              </p>
            </div>

            <div className="w-fit rounded-full border border-border-default bg-surface-muted px-5 py-3 text-sm font-semibold text-text-primary">
              {nowShowingMovies.length} {copy.nowShowing}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {nowShowingMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                locale={locale}
                selectedDate={selectedDate}
                onSelectShowtime={handleSelectShowtime}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              Cinemall
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.comingSoon}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
              {copy.comingSoonText}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {comingSoonMovies.map((movie) => {
              const title = getLocalizedText(movie.title, locale);
              const description = getLocalizedText(movie.description, locale);

              return (
                <article
                  key={movie.id}
                  className="grid overflow-hidden rounded-[2rem] border border-border-default bg-surface-default shadow-card md:grid-cols-[180px_1fr]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-text-primary md:aspect-auto">
                    <img
                      src={movie.posterImage ?? movie.heroImage ?? ""}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground">
                      {copy.comingSoon}
                    </span>

                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary">
                      {title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-text-secondary">
                      {description}
                    </p>

                    <p className="mt-5 text-sm font-semibold text-text-muted">
                      {copy.estimatedRelease}:{" "}
                      {formatReleaseDate(movie.releaseDate, locale)}
                    </p>
                  </div>
                </article>
              );
            })}
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