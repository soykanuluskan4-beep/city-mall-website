import type { Store } from "@/types/content";

export const stores: Store[] = [
  {
    id: "store-001",
    slug: "moda-line",
    name: {
      tr: "Moda Line",
      en: "Moda Line",
    },
    description: {
      tr: "Kadın ve erkek giyiminde sezon trendlerini bir araya getiren modern mağaza.",
      en: "A modern fashion store bringing together seasonal trends for women and men.",
    },
    category: "fashion",
    floor: "ground",
    logo: "/images/stores/moda-line-logo.png",
    coverImage: "/images/stores/moda-line-cover.jpg",
    instagram: "https://instagram.com",
    featured: true,
  },
  {
    id: "store-002",
    slug: "tech-point",
    name: {
      tr: "Tech Point",
      en: "Tech Point",
    },
    description: {
      tr: "Telefon, aksesuar ve günlük teknoloji ihtiyaçları için pratik alışveriş noktası.",
      en: "A practical shopping point for phones, accessories and everyday technology needs.",
    },
    category: "electronics",
    floor: "first",
    logo: "/images/stores/tech-point-logo.png",
    coverImage: "/images/stores/tech-point-cover.jpg",
    featured: true,
  },
  {
    id: "store-003",
    slug: "home-style",
    name: {
      tr: "Home Style",
      en: "Home Style",
    },
    description: {
      tr: "Ev dekorasyonu, yaşam ürünleri ve küçük dokunuşlarla mekanlara sıcaklık katan seçenekler.",
      en: "Home decor and lifestyle products that add warmth to living spaces with small touches.",
    },
    category: "home",
    floor: "first",
    logo: "/images/stores/home-style-logo.png",
    coverImage: "/images/stores/home-style-cover.jpg",
  },
  {
    id: "store-004",
    slug: "beauty-room",
    name: {
      tr: "Beauty Room",
      en: "Beauty Room",
    },
    description: {
      tr: "Kozmetik, kişisel bakım ve günlük güzellik rutinleri için seçili ürünler.",
      en: "Selected cosmetics and personal care products for everyday beauty routines.",
    },
    category: "beauty",
    floor: "ground",
    logo: "/images/stores/beauty-room-logo.png",
    coverImage: "/images/stores/beauty-room-cover.jpg",
  },
  {
    id: "store-005",
    slug: "sportiva",
    name: {
      tr: "Sportiva",
      en: "Sportiva",
    },
    description: {
      tr: "Spor giyim, ayakkabı ve aktif yaşam ürünlerini bir araya getiren mağaza.",
      en: "A store bringing together sportswear, shoes and active lifestyle products.",
    },
    category: "sports",
    floor: "second",
    logo: "/images/stores/sportiva-logo.png",
    coverImage: "/images/stores/sportiva-cover.jpg",
    featured: true,
  },
  {
    id: "store-006",
    slug: "kids-world",
    name: {
      tr: "Kids World",
      en: "Kids World",
    },
    description: {
      tr: "Çocuk giyim, oyuncak ve aile alışverişi için renkli bir mağaza deneyimi.",
      en: "A colorful store experience for kidswear, toys and family shopping.",
    },
    category: "kids",
    floor: "second",
    logo: "/images/stores/kids-world-logo.png",
    coverImage: "/images/stores/kids-world-cover.jpg",
  },
];