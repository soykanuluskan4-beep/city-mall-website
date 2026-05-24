import type { Event } from "@/types/content";

export const events: Event[] = [
  {
    id: "event-001",
    slug: "kids-art-workshop",
    title: {
      tr: "Çocuk Sanat Atölyesi",
      en: "Kids Art Workshop",
    },
    description: {
      tr: "Çocuklar için renkli, eğlenceli ve yaratıcı bir hafta sonu sanat etkinliği.",
      en: "A colorful, fun and creative weekend art activity for children.",
    },
    image: "/images/events/kids-art-workshop.jpg",
    date: "2026-06-07T14:00:00",
    location: {
      tr: "Etkinlik Alanı",
      en: "Event Area",
    },
    status: "upcoming",
    audience: {
      tr: "4-10 yaş",
      en: "Ages 4-10",
    },
    featured: true,
  },
  {
    id: "event-002",
    slug: "summer-music-evening",
    title: {
      tr: "Yaz Müzik Akşamı",
      en: "Summer Music Evening",
    },
    description: {
      tr: "AVM atmosferine eşlik eden canlı müzik performansı ve keyifli akşam buluşması.",
      en: "A live music performance and pleasant evening gathering accompanying the mall atmosphere.",
    },
    image: "/images/events/summer-music-evening.jpg",
    date: "2026-06-14T19:30:00",
    location: {
      tr: "Ana Atrium",
      en: "Main Atrium",
    },
    status: "upcoming",
    audience: {
      tr: "Tüm ziyaretçiler",
      en: "All visitors",
    },
    featured: true,
  },
  {
    id: "event-003",
    slug: "family-game-day",
    title: {
      tr: "Aile Oyun Günü",
      en: "Family Game Day",
    },
    description: {
      tr: "Aileler ve çocuklar için masa oyunları, mini yarışmalar ve eğlenceli aktiviteler.",
      en: "Board games, mini competitions and fun activities for families and children.",
    },
    image: "/images/events/family-game-day.jpg",
    date: "2026-06-21T13:00:00",
    location: {
      tr: "Çocuk & Eğlence Alanı",
      en: "Kids & Entertainment Area",
    },
    status: "upcoming",
    audience: {
      tr: "Aileler",
      en: "Families",
    },
  },
];