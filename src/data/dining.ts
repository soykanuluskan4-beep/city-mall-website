import type { DiningPlace } from "@/types/content";

export const diningPlaces: DiningPlace[] = [
  {
    id: "dining-001",
    slug: "terrace-cafe",
    name: {
      tr: "Terrace Cafe",
      en: "Terrace Cafe",
    },
    description: {
      tr: "Kahve, tatlı ve hafif atıştırmalıklar için ferah bir mola noktası.",
      en: "A spacious stop for coffee, desserts and light snacks.",
    },
    category: "cafe",
    floor: "food-court",
    cuisine: {
      tr: "Kafe & Tatlı",
      en: "Cafe & Dessert",
    },
    coverImage: "/images/dining/terrace-cafe.jpg",
    featured: true,
  },
  {
    id: "dining-002",
    slug: "burger-station",
    name: {
      tr: "Burger Station",
      en: "Burger Station",
    },
    description: {
      tr: "Hızlı servis burgerler, patates ve günlük menü seçenekleri.",
      en: "Quick-service burgers, fries and daily menu options.",
    },
    category: "fast-food",
    floor: "food-court",
    cuisine: {
      tr: "Burger & Fast Food",
      en: "Burger & Fast Food",
    },
    coverImage: "/images/dining/burger-station.jpg",
    featured: true,
  },
  {
    id: "dining-003",
    slug: "med-kitchen",
    name: {
      tr: "Med Kitchen",
      en: "Med Kitchen",
    },
    description: {
      tr: "Akdeniz mutfağından günlük tabaklar ve paylaşmalık lezzetler.",
      en: "Daily plates and shareable flavors inspired by Mediterranean cuisine.",
    },
    category: "restaurant",
    floor: "food-court",
    cuisine: {
      tr: "Akdeniz Mutfağı",
      en: "Mediterranean Cuisine",
    },
    coverImage: "/images/dining/med-kitchen.jpg",
  },
  {
    id: "dining-004",
    slug: "sweet-corner",
    name: {
      tr: "Sweet Corner",
      en: "Sweet Corner",
    },
    description: {
      tr: "Tatlı, dondurma ve özel gün kaçamakları için renkli bir durak.",
      en: "A colorful stop for desserts, ice cream and sweet escapes.",
    },
    category: "dessert",
    floor: "food-court",
    cuisine: {
      tr: "Tatlı & Dondurma",
      en: "Dessert & Ice Cream",
    },
    coverImage: "/images/dining/sweet-corner.jpg",
  },
];