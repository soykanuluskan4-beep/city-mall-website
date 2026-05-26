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
    posterImage:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1800&q=85",
    director: "Mert Karan",
    cast: ["Deniz Aral", "Lara Eren", "Can Soylu"],
    language: {
      tr: "Türkçe Dublaj",
      en: "Turkish Dubbed",
    },
    status: "nowShowing",
    trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    showtimes: [
      { date: "2026-06-01", times: ["13:00", "16:00", "19:00"] },
      { date: "2026-06-02", times: ["14:00", "17:00", "20:00"] },
      { date: "2026-06-03", times: ["13:30", "16:30", "21:00"] },
      { date: "2026-06-04", times: ["15:00", "18:00", "21:30"] },
      { date: "2026-06-05", times: ["12:30", "16:00", "20:30"] },
      { date: "2026-06-06", times: ["13:00", "17:30", "21:00"] },
      { date: "2026-06-07", times: ["14:00", "18:00", "21:30"] },
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
    posterImage:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1800&q=85",
    director: "Selin Akay",
    cast: ["Ece Tuna", "Arda Bilgin", "Mina Korkmaz"],
    language: {
      tr: "Türkçe Dublaj",
      en: "Turkish Dubbed",
    },
    status: "nowShowing",
    trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    showtimes: [
      { date: "2026-06-01", times: ["12:30", "15:30", "18:00"] },
      { date: "2026-06-02", times: ["13:30", "16:30"] },
      { date: "2026-06-03", times: ["12:00", "15:00", "17:30"] },
      { date: "2026-06-04", times: ["13:00", "16:00"] },
      { date: "2026-06-05", times: ["12:30", "15:30", "18:30"] },
      { date: "2026-06-06", times: ["11:30", "14:30", "17:30"] },
      { date: "2026-06-07", times: ["12:00", "15:00", "18:00"] },
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
    posterImage:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1800&q=85",
    director: "Emir Yıldız",
    cast: ["Bora Deniz", "Elif Aydın", "Kerem Vural"],
    language: {
      tr: "Orijinal Dil / Türkçe Altyazı",
      en: "Original Language / Turkish Subtitles",
    },
    status: "nowShowing",
    trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    showtimes: [
      { date: "2026-06-01", times: ["18:30", "21:30"] },
      { date: "2026-06-02", times: ["19:30", "22:00"] },
      { date: "2026-06-03", times: ["18:00", "21:00"] },
      { date: "2026-06-04", times: ["19:00", "21:45"] },
      { date: "2026-06-05", times: ["18:30", "22:00"] },
      { date: "2026-06-06", times: ["17:30", "21:30"] },
      { date: "2026-06-07", times: ["18:00", "21:00"] },
    ],
  },
  {
    id: "movie-004",
    slug: "midnight-escape",
    title: {
      tr: "Gece Kaçışı",
      en: "Midnight Escape",
    },
    description: {
      tr: "Gerilim, tempo ve gizem dolu bir gece hikayesi.",
      en: "A night story filled with suspense, pace and mystery.",
    },
    genre: "thriller",
    durationMinutes: 106,
    ageRating: "16+",
    posterImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
    director: "Kaan Erdem",
    cast: ["Mert Acar", "Duru Şahin", "Ali Demir"],
    language: {
      tr: "Orijinal Dil / Türkçe Altyazı",
      en: "Original Language / Turkish Subtitles",
    },
    status: "nowShowing",
    trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    showtimes: [
      { date: "2026-06-01", times: ["20:30", "22:45"] },
      { date: "2026-06-02", times: ["20:00", "22:30"] },
      { date: "2026-06-03", times: ["19:45", "22:15"] },
      { date: "2026-06-04", times: ["20:15", "22:45"] },
      { date: "2026-06-05", times: ["19:30", "22:30"] },
      { date: "2026-06-06", times: ["20:00", "23:00"] },
      { date: "2026-06-07", times: ["19:45", "22:15"] },
    ],
    featured: true,
  },
  {
    id: "movie-005",
    slug: "island-lights",
    title: {
      tr: "Ada Işıkları",
      en: "Island Lights",
    },
    description: {
      tr: "Sıcak, romantik ve Akdeniz atmosferi taşıyan duygusal bir hikaye.",
      en: "A warm and romantic story carrying a Mediterranean atmosphere.",
    },
    genre: "romance",
    durationMinutes: 118,
    ageRating: "13+",
    posterImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
    director: "Aylin Mor",
    cast: ["Ekin Sarp", "Nehir Kaya", "Ozan Tamer"],
    language: {
      tr: "Türkçe",
      en: "Turkish",
    },
    status: "nowShowing",
    trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    showtimes: [
      { date: "2026-06-01", times: ["17:00", "20:00"] },
      { date: "2026-06-02", times: ["16:30", "19:30"] },
      { date: "2026-06-03", times: ["17:30", "20:30"] },
      { date: "2026-06-04", times: ["18:00", "21:00"] },
      { date: "2026-06-05", times: ["17:00", "20:00"] },
      { date: "2026-06-06", times: ["16:30", "19:30"] },
      { date: "2026-06-07", times: ["17:30", "20:30"] },
    ],
  },
  {
    id: "movie-006",
    slug: "dream-arcade",
    title: {
      tr: "Rüya Arcade",
      en: "Dream Arcade",
    },
    description: {
      tr: "Renkli görsel dünyası ve fantastik atmosferiyle gençlere yönelik macera.",
      en: "A youth adventure with a colorful visual world and fantasy atmosphere.",
    },
    genre: "fantasy",
    durationMinutes: 101,
    ageRating: "10+",
    posterImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1800&q=85",
    director: "Caner Bilge",
    cast: ["Lina Türe", "Aras Güneş", "Efe Koral"],
    language: {
      tr: "Türkçe Dublaj",
      en: "Turkish Dubbed",
    },
    status: "nowShowing",
    trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    showtimes: [
      { date: "2026-06-01", times: ["13:45", "16:45", "19:45"] },
      { date: "2026-06-02", times: ["14:15", "17:15", "20:15"] },
      { date: "2026-06-03", times: ["13:30", "16:30", "19:30"] },
      { date: "2026-06-04", times: ["14:00", "17:00", "20:00"] },
      { date: "2026-06-05", times: ["13:45", "16:45", "19:45"] },
      { date: "2026-06-06", times: ["14:15", "17:15", "20:15"] },
      { date: "2026-06-07", times: ["13:30", "16:30", "19:30"] },
    ],
  },
  {
    id: "movie-007",
    slug: "galaxy-run",
    title: {
      tr: "Galaksi Yarışı",
      en: "Galaxy Run",
    },
    description: {
      tr: "Hız, rekabet ve uzay atmosferini birleştiren tempolu aksiyon macerası.",
      en: "A fast-paced action adventure combining speed, competition and space atmosphere.",
    },
    genre: "action",
    durationMinutes: 124,
    ageRating: "13+",
    posterImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=85",
    director: "Arda Kılıç",
    cast: ["Kuzey Akın", "Sera Dinç", "Mert Uslu"],
    language: {
      tr: "Türkçe Altyazı",
      en: "Turkish Subtitles",
    },
    status: "comingSoon",
    releaseDate: "2026-07-12",
    trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    showtimes: [],
    featured: true,
  },
  {
    id: "movie-008",
    slug: "forest-keepers",
    title: {
      tr: "Orman Koruyucuları",
      en: "Forest Keepers",
    },
    description: {
      tr: "Çocuklar için doğa sevgisini anlatan renkli ve eğlenceli animasyon.",
      en: "A colorful and fun animation teaching children about love for nature.",
    },
    genre: "animation",
    durationMinutes: 88,
    ageRating: "Genel İzleyici",
    posterImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=85",
    director: "Mina Acar",
    cast: ["Zeynep Ilgaz", "Kerem Ulu", "Ada Sevin"],
    language: {
      tr: "Türkçe Dublaj",
      en: "Turkish Dubbed",
    },
    status: "comingSoon",
    releaseDate: "2026-08-09",
    trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    showtimes: [],
  },
];