import type { DiningPlace } from "@/types/content";

export const diningPlaces: DiningPlace[] = [
  {
    id: "dining-001",
    slug: "burger-king",
    name: {
      tr: "Burger King",
      en: "Burger King",
    },
    description: {
      tr: "Burger, patates ve hızlı servis menüleriyle CityMall’da pratik bir lezzet durağı.",
      en: "A quick dining stop at CityMall with burgers, fries and fast-service menus.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Burger & Fast Food",
      en: "Burger & Fast Food",
    },
    cuisineType: "fast-food",
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-002",
    slug: "popeyes",
    name: {
      tr: "Popeyes",
      en: "Popeyes",
    },
    description: {
      tr: "Çıtır tavuk, sandviç ve hızlı servis menüleriyle food court lezzetlerinden biri.",
      en: "A food court favorite with crispy chicken, sandwiches and quick-service menus.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Tavuk & Fast Food",
      en: "Chicken & Fast Food",
    },
    cuisineType: "fast-food",
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-003",
    slug: "orkide-persian-turkish-cuisine",
    name: {
      tr: "Orkide Persian & Turkish Cuisine",
      en: "Orkide Persian & Turkish Cuisine",
    },
    description: {
      tr: "Pers ve Türk mutfağından esinlenen sıcak tabaklar ve doyurucu lezzetler.",
      en: "Warm plates and satisfying flavors inspired by Persian and Turkish cuisine.",
    },
    category: "restaurant",
    floor: "second",
    cuisine: {
      tr: "Pers & Türk Mutfağı",
      en: "Persian & Turkish Cuisine",
    },
    cuisineType: "turkish",
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-004",
    slug: "no-33-limon-tantuni",
    name: {
      tr: "No.33 Limon Tantuni",
      en: "No.33 Limon Tantuni",
    },
    description: {
      tr: "Tantuni, dürüm ve hızlı Türk mutfağı seçenekleriyle pratik bir öğün noktası.",
      en: "A practical meal stop with tantuni, wraps and quick Turkish flavors.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Tantuni & Türk Fast Food",
      en: "Tantuni & Turkish Fast Food",
    },
    cuisineType: "turkish",
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "dining-005",
    slug: "sampi-pide",
    name: {
      tr: "Sampi Pide",
      en: "Sampi Pide",
    },
    description: {
      tr: "Pide ve geleneksel fırın lezzetleriyle hızlı ve doyurucu seçenekler.",
      en: "Quick and satisfying options with pide and traditional baked flavors.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Pide & Türk Mutfağı",
      en: "Pide & Turkish Cuisine",
    },
    cuisineType: "turkish",
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "dining-006",
    slug: "pita-doner",
    name: {
      tr: "Pita Döner",
      en: "Pita Döner",
    },
    description: {
      tr: "Döner, pita ve hızlı servis lezzetleriyle alışveriş molalarına uygun bir seçenek.",
      en: "A convenient option for shopping breaks with döner, pita and quick-service flavors.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Döner & Türk Fast Food",
      en: "Döner & Turkish Fast Food",
    },
    cuisineType: "turkish",
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "dining-007",
    slug: "sultanahmet-koftecisi",
    name: {
      tr: "Sultanahmet Köftecisi",
      en: "Sultanahmet Köftecisi",
    },
    description: {
      tr: "Köfte ve Türk mutfağı lezzetleriyle klasik ve doyurucu bir yemek alternatifi.",
      en: "A classic and satisfying dining option with meatballs and Turkish flavors.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Köfte & Türk Mutfağı",
      en: "Meatballs & Turkish Cuisine",
    },
    cuisineType: "turkish",
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "dining-008",
    slug: "tavuk-dunyasi",
    name: {
      tr: "Tavuk Dünyası",
      en: "Tavuk Dünyası",
    },
    description: {
      tr: "Tavuk tabakları, makarna ve hızlı servis öğünleriyle zemin katta lezzet molası.",
      en: "A ground-floor dining stop with chicken plates, pasta and quick-service meals.",
    },
    category: "fast-food",
    floor: "ground",
    cuisine: {
  tr: "Tavuk & Fast Food",
  en: "Chicken & Fast Food",
},
    cuisineType: "fast-food",
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-009",
    slug: "katsu-express",
    name: {
      tr: "Katsu Express",
      en: "Katsu Express",
    },
    description: {
      tr: "Asya esintili hızlı tabaklar ve pratik servis seçenekleri.",
      en: "Asian-inspired quick plates and practical service options.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Asya Mutfağı",
      en: "Asian Cuisine",
    },
    cuisineType: "world",
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "dining-010",
    slug: "pizza-ferro",
    name: {
      tr: "Pizza Ferro",
      en: "Pizza Ferro",
    },
    description: {
      tr: "Pizza ve İtalyan esintili hızlı lezzetlerle food court seçeneklerinden biri.",
      en: "A food court option with pizza and Italian-inspired quick flavors.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Pizza & İtalyan",
      en: "Pizza & Italian",
    },
    cuisineType: "italian",
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "dining-011",
    slug: "old-plane-lounge-bistro",
    name: {
      tr: "Old Plane Lounge & Bistro",
      en: "Old Plane Lounge & Bistro",
    },
    description: {
      tr: "Zemin katta lounge ve bistro atmosferiyle yemek ve mola seçenekleri.",
      en: "A ground-floor lounge and bistro atmosphere for meals and breaks.",
    },
    category: "restaurant",
    floor: "ground",
    cuisine: {
      tr: "Bistro",
      en: "Bistro",
    },
    cuisineType: "world",
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-012",
    slug: "espresso-lab",
    name: {
      tr: "Espresso Lab",
      en: "Espresso Lab",
    },
    description: {
      tr: "Kahve, soğuk içecekler ve kısa molalar için zemin katta modern bir durak.",
      en: "A modern ground-floor stop for coffee, iced drinks and short breaks.",
    },
    category: "coffee",
    floor: "ground",
    cuisine: {
  tr: "Cafe & Tatlı",
  en: "Cafe & Dessert",
},
cuisineType: "cafe",
cuisineTags: ["cafe", "dessert"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-013",
    slug: "perks-up",
    name: {
      tr: "Perks Up",
      en: "Perks Up",
    },
    description: {
      tr: "Kahve, içecek ve hafif atıştırmalıklar için 2. katta keyifli bir cafe noktası.",
      en: "A pleasant second-floor cafe spot for coffee, drinks and light snacks.",
    },
    category: "cafe",
    floor: "second",
    cuisine: {
      tr: "Cafe",
      en: "Cafe",
    },
    cuisineType: "cafe",
    cuisineTags: ["cafe"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "dining-014",
    slug: "atom-master",
    name: {
      tr: "Atom Master",
      en: "Atom Master",
    },
    description: {
      tr: "-1. katta içecek ve hızlı mola seçenekleriyle pratik bir cafe noktası.",
      en: "A practical basement-level cafe point for drinks and quick breaks.",
    },
    category: "cafe",
    floor: "basement",
    cuisine: {
  tr: "Cafe & Tatlı",
  en: "Cafe & Dessert",
},
cuisineType: "cafe",
cuisineTags: ["cafe", "dessert"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "dining-015",
    slug: "ates-kuruyemis",
    name: {
      tr: "Ateş Kuruyemiş",
      en: "Ateş Nuts & Snacks",
    },
    description: {
      tr: "-1. katta kuruyemiş, atıştırmalık ve hızlı alışveriş seçenekleri.",
      en: "Basement-level nuts, snacks and quick shopping options.",
    },
    category: "other",
    floor: "basement",
    cuisine: {
      tr: "Kuruyemiş & Atıştırmalık",
      en: "Nuts & Snacks",
    },
    cuisineType: "snack",
    cuisineTags: ["snack"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=1600&q=85",
  },
];