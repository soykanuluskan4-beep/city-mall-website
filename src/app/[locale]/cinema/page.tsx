import Link from "next/link";
import { notFound } from "next/navigation";
import { movies } from "@/data/movies";
import { locales } from "@/i18n/routing";
import { getLocalizedText } from "@/lib/locale";
import type { Locale, MovieGenre } from "@/types/content";

type CinemaPageProps = {
  params: {
    locale: string;
  };
};

const pageContent = {
  tr: {
    eyebrow: "Sinema",
    title: "CityMall Cyprus sinema deneyimini keşfet.",
    description:
      "Aile filmleri, animasyonlar, dramalar ve macera yapımlarıyla konsept sinema programı.",
    allMovies: "Tüm Filmler",
    featuredMovies: "Öne Çıkan Filmler",
    genre: "Tür",
    duration: "Süre",
    ageRating: "Yaş Sınırı",
    showtimes: "Seanslar",
    minutes: "dk",
    backHome: "Ana sayfaya dön",
    genres: {
      action: "Aksiyon",
      animation: "Animasyon",
      comedy: "Komedi",
      drama: "Drama",
      family: "Aile",
      thriller: "Gerilim",
      adventure: "Macera",
      other: "Diğer",
    },
  },
  en: {
    eyebrow: "Cinema",
    title: "Discover the CityMall Cyprus cinema experience.",
    description:
      "A concept cinema program with family movies, animations, dramas and adventure titles.",
    allMovies: "All Movies",
    featuredMovies: "Featured Movies",
    genre: "Genre",
    duration: "Duration",
    ageRating: "Age Rating",
    showtimes: "Showtimes",
    minutes: "min",
    backHome: "Back to home",
    genres: {
      action: "Action",
      animation: "Animation",
      comedy: "Comedy",
      drama: "Drama",
      family: "Family",
      thriller: "Thriller",
      adventure: "Adventure",
      other: "Other",
    },
  },
};

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    weekday: "short",
  }).format(new Date(date));
}

export default function CinemaPage({ params }: CinemaPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];
  const featuredMovies = movies.filter((movie) => movie.featured);

  return (
    <main className="bg-surface-default">
      <section className="border-b border-border-default bg-brand-primary text-brand-foreground">
        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              {content.eyebrow}
            </p>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              {content.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              {content.description}
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-overlay backdrop-blur">
            <p className="text-sm font-semibold text-white">
              {content.featuredMovies}
            </p>

            <div className="mt-4 grid gap-3">
              {featuredMovies.map((movie) => (
                <article
                  key={movie.id}
                  className="rounded-xl border border-white/10 bg-white/10 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                      {content.genres[movie.genre as MovieGenre]}
                    </p>

                    {movie.ageRating ? (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-text-primary">
                        {movie.ageRating}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-3 text-lg font-semibold">
                    {getLocalizedText(movie.title, locale)}
                  </h2>

                  <p className="mt-2 text-sm text-white/70">
                    {movie.durationMinutes} {content.minutes}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              {movies.length} {content.allMovies}
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-text-primary">
              {content.allMovies}
            </h2>
          </div>

          <Link
            href={`/${locale}`}
            className="rounded-full border border-border-default px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
          >
            {content.backHome}
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {movies.map((movie) => (
            <article
              key={movie.id}
              className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {content.genres[movie.genre as MovieGenre]}
                </p>

                {movie.ageRating ? (
                  <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-semibold text-text-secondary">
                    {movie.ageRating}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-text-primary">
                {getLocalizedText(movie.title, locale)}
              </h3>

              <p className="mt-4 line-clamp-4 text-sm leading-6 text-text-secondary">
                {getLocalizedText(movie.description, locale)}
              </p>

              <div className="mt-6 grid gap-3 border-t border-border-default pt-5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-text-muted">{content.genre}</span>
                  <span className="font-medium text-text-primary">
                    {content.genres[movie.genre as MovieGenre]}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-text-muted">{content.duration}</span>
                  <span className="font-medium text-text-primary">
                    {movie.durationMinutes} {content.minutes}
                  </span>
                </div>

                {movie.ageRating ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-text-muted">{content.ageRating}</span>
                    <span className="font-medium text-text-primary">
                      {movie.ageRating}
                    </span>
                  </div>
                ) : null}

                <div className="grid gap-3 pt-2">
                  <span className="text-text-muted">{content.showtimes}</span>

                  <div className="grid gap-3">
                    {movie.showtimes.map((showtime) => (
                      <div
                        key={showtime.date}
                        className="rounded-xl bg-surface-muted p-3"
                      >
                        <p className="text-xs font-semibold text-text-primary">
                          {formatDate(showtime.date, locale)}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {showtime.times.map((time) => (
                            <span
                              key={time}
                              className="rounded-full bg-surface-default px-3 py-1 text-xs font-semibold text-text-secondary"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}