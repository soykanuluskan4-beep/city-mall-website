import type { Campaign } from "@/types/content";

export const campaigns: Campaign[] = [
  {
    id: "campaign-001",
    slug: "summer-style-days",
    title: {
      tr: "Yaz Stil Günleri",
      en: "Summer Style Days",
    },
    description: {
      tr: "Seçili giyim mağazalarında yaz sezonuna özel avantajlı alışveriş fırsatları.",
      en: "Special shopping opportunities for the summer season at selected fashion stores.",
    },
    image: "/images/campaigns/summer-style-days.jpg",
    storeName: {
      tr: "Seçili Mağazalar",
      en: "Selected Stores",
    },
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    status: "upcoming",
    badge: {
      tr: "Yeni Sezon",
      en: "New Season",
    },
    featured: true,
  },
  {
    id: "campaign-002",
    slug: "coffee-break",
    title: {
      tr: "Kahve Molası",
      en: "Coffee Break",
    },
    description: {
      tr: "Terrace Cafe’de hafta içi belirli saatlerde kahve menülerinde özel fiyatlar.",
      en: "Special prices on coffee menus at Terrace Cafe during selected weekday hours.",
    },
    image: "/images/campaigns/coffee-break.jpg",
    storeName: {
      tr: "Terrace Cafe",
      en: "Terrace Cafe",
    },
    startDate: "2026-05-20",
    endDate: "2026-06-15",
    status: "active",
    badge: {
      tr: "Yeme-İçme",
      en: "Dining",
    },
  },
  {
    id: "campaign-003",
    slug: "family-weekend",
    title: {
      tr: "Aile Hafta Sonu",
      en: "Family Weekend",
    },
    description: {
      tr: "Çocuk ve aile odaklı mağazalarda hafta sonuna özel demo kampanya.",
      en: "A weekend demo campaign focused on kids and family-oriented stores.",
    },
    image: "/images/campaigns/family-weekend.jpg",
    storeName: {
      tr: "Kids World",
      en: "Kids World",
    },
    startDate: "2026-05-25",
    endDate: "2026-06-10",
    status: "active",
    badge: {
      tr: "Aile",
      en: "Family",
    },
    featured: true,
  },
];