import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { movies } from "@/data/movies";
import { MovieDetailClient } from "@/components/cinema/MovieDetailClient";
import { getLocalizedText } from "@/lib/locale";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale, Movie } from "@/types/content";

type MovieDetailPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

function findMovie(slug: string) {
  return movies.find((movie) => movie.slug === slug);
}

function getRelatedMovies(currentMovie: Movie) {
  const sameGenre = movies.filter(
    (movie) =>
      movie.slug !== currentMovie.slug && movie.genre === currentMovie.genre
  );

  const otherMovies = movies.filter(
    (movie) =>
      movie.slug !== currentMovie.slug && movie.genre !== currentMovie.genre
  );

  return [...sameGenre, ...otherMovies].slice(0, 3);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    movies.map((movie) => ({
      locale,
      slug: movie.slug,
    }))
  );
}

export function generateMetadata({
  params,
}: MovieDetailPageProps): Metadata {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    return {};
  }

  const movie = findMovie(params.slug);

  if (!movie) {
    return {};
  }

  return createPageMetadata({
    locale,
    path: `/cinema/${movie.slug}`,
    title: `${getLocalizedText(movie.title, locale)} | Cinemall`,
    description: getLocalizedText(movie.description, locale),
  });
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const movie = findMovie(params.slug);

  if (!movie) {
    notFound();
  }

  const relatedMovies = getRelatedMovies(movie);

  return (
    <MovieDetailClient
      locale={locale}
      movie={movie}
      relatedMovies={relatedMovies}
    />
  );
}