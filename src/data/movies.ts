import type { Movie } from "@/types/content";

export const movies: Movie[] = [
  {
    id: "movie-001",
    slug: "galaxy-adventure",
    title: {
      tr: "Galaksi Macerası",
      en: "Galaxy Adventure",
    },
    description: {
      tr: "Aile dostu bilim kurgu atmosferinde geçen eğlenceli bir keşif hikayesi.",
      en: "A fun discovery story set in a family-friendly science fiction atmosphere.",
    },
    genre: "adventure",
    durationMinutes: 112,
    ageRating: "7+",
    posterImage: "/images/movies/galaxy-adventure.jpg",
    showtimes: [
      {
        date: "2026-06-01",
        times: ["13:00", "16:00", "19:00"],
      },
      {
        date: "2026-06-02",
        times: ["14:00", "17:00", "20:00"],
      },
    ],
    featured: true,
  },
  {
    id: "movie-002",
    slug: "little-heroes",
    title: {
      tr: "Küçük Kahramanlar",
      en: "Little Heroes",
    },
    description: {
      tr: "Çocuklar ve aileler için renkli, neşeli ve pozitif mesajlar taşıyan animasyon filmi.",
      en: "A colorful animated movie with cheerful and positive messages for children and families.",
    },
    genre: "animation",
    durationMinutes: 94,
    ageRating: "Genel İzleyici",
    posterImage: "/images/movies/little-heroes.jpg",
    showtimes: [
      {
        date: "2026-06-01",
        times: ["12:30", "15:30", "18:00"],
      },
      {
        date: "2026-06-02",
        times: ["13:30", "16:30"],
      },
    ],
    featured: true,
  },
  {
    id: "movie-003",
    slug: "city-lights",
    title: {
      tr: "Şehrin Işıkları",
      en: "City Lights",
    },
    description: {
      tr: "Duygusal, modern ve şehir yaşamını merkezine alan sürükleyici bir drama.",
      en: "An emotional and modern drama centered on city life.",
    },
    genre: "drama",
    durationMinutes: 128,
    ageRating: "13+",
    posterImage: "/images/movies/city-lights.jpg",
    showtimes: [
      {
        date: "2026-06-01",
        times: ["18:30", "21:30"],
      },
      {
        date: "2026-06-02",
        times: ["19:30", "22:00"],
      },
    ],
  },
];