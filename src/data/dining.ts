import type { DiningPlace } from "@/types/content";

export const diningPlaces: DiningPlace[] = [
  {
    id: "dining-001",
    slug: "ates-kuruyemis",
    name: {
      tr: "Ateş Kuruyemiş",
      en: "Ateş Kuruyemiş",
    },
    description: {
      tr: "-1. katta kuruyemiş, atıştırmalık ve paketli lezzetler.",
      en: "Basement-level nuts, snacks and packaged treats.",
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
    featured: false,
  },
  {
    id: "dining-002",
    slug: "lokmazade",
    name: {
      tr: "Lokmazade",
      en: "Lokmazade",
    },
    description: {
      tr: "-1. katta tatlı, lokma ve hızlı atıştırmalık molası.",
      en: "A basement-level stop for desserts, lokma and quick snacks.",
    },
    category: "other",
    floor: "basement",
    cuisine: {
      tr: "Tatlı & Atıştırmalık",
      en: "Dessert & Snacks",
    },
    cuisineType: "cafe",
    cuisineTags: ["dessert", "snack"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=85",
    featured: false,
  },
  {
    id: "dining-003",
    slug: "tatliaci-cigkofte",
    name: {
      tr: "Tatlıacı Çiğköfte",
      en: "Tatlıacı Çiğköfte",
    },
    description: {
      tr: "-1. katta çiğköfte, dürüm ve pratik Türk lezzetleri.",
      en: "Basement-level çiğköfte, wraps and quick Turkish flavors.",
    },
    category: "fast-food",
    floor: "basement",
    cuisine: {
      tr: "Çiğköfte & Türk Fast Food",
      en: "Çiğköfte & Turkish Fast Food",
    },
    cuisineType: "turkish",
    cuisineTags: ["turkish", "snack"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1662116765994-1e4200c43589?auto=format&fit=crop&w=1600&q=85",
    featured: false,
  },
  {
    id: "dining-004",
    slug: "atom-master-cafe",
    name: {
      tr: "Atom Master Cafe",
      en: "Atom Master Cafe",
    },
    description: {
      tr: "-1. katta içecek, tatlı ve hızlı mola seçenekleri.",
      en: "Basement-level drinks, desserts and quick break options.",
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
    featured: false,
  },
  {
    id: "dining-005",
    slug: "tavuk-dunyasi",
    name: {
      tr: "Tavuk Dünyası",
      en: "Tavuk Dünyası",
    },
    description: {
      tr: "Zemin katta tavuk tabakları, makarna ve hızlı öğün alternatifleri.",
      en: "Ground-floor chicken plates, pasta and quick meal alternatives.",
    },
    category: "fast-food",
    floor: "ground",
    cuisine: {
      tr: "Tavuk & Fast Food",
      en: "Chicken & Fast Food",
    },
    cuisineType: "fast-food",
    cuisineTags: ["chicken", "fast-food"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-006",
    slug: "old-plane-bistro",
    name: {
      tr: "Old Plane Bistro",
      en: "Old Plane Bistro",
    },
    description: {
      tr: "Zemin katta yemek, içecek ve uzun mola için bistro atmosferi.",
      en: "A ground-floor bistro setting for meals, drinks and longer breaks.",
    },
    category: "restaurant",
    floor: "ground",
    cuisine: {
      tr: "Bistro",
      en: "Bistro",
    },
    cuisineType: "world",
    cuisineTags: ["bistro", "world"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-007",
    slug: "espresso-lab",
    name: {
      tr: "Espresso Lab",
      en: "Espresso Lab",
    },
    description: {
      tr: "Zemin katta kahve, soğuk içecek ve kısa buluşmalar için modern cafe.",
      en: "A modern ground-floor cafe for coffee, cold drinks and quick meetups.",
    },
    category: "coffee",
    floor: "ground",
    cuisine: {
      tr: "Cafe & Kahve",
      en: "Cafe & Coffee",
    },
    cuisineType: "cafe",
    cuisineTags: ["cafe", "coffee"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-008",
    slug: "no-33-limon-tantuni",
    name: {
      tr: "No.33 Limon Tantuni",
      en: "No.33 Limon Tantuni",
    },
    description: {
      tr: "2. katta tantuni, dürüm ve hızlı Türk lezzetleri.",
      en: "Second-floor tantuni, wraps and quick Turkish flavors.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Tantuni & Türk Fast Food",
      en: "Tantuni & Turkish Fast Food",
    },
    cuisineType: "turkish",
    cuisineTags: ["turkish", "fast-food"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1600&q=85",
    featured: false,
  },
  {
    id: "dining-009",
    slug: "orkide",
    name: {
      tr: "Orkide",
      en: "Orkide",
    },
    description: {
      tr: "2. katta sıcak, doyurucu ve klasik lezzetler.",
      en: "Second-floor warm, filling and classic flavors.",
    },
    category: "restaurant",
    floor: "second",
    cuisine: {
      tr: "Türk Mutfağı",
      en: "Turkish Cuisine",
    },
    cuisineType: "turkish",
    cuisineTags: ["turkish", "restaurant"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-010",
    slug: "sampi-pide",
    name: {
      tr: "Sampi Pide",
      en: "Sampi Pide",
    },
    description: {
      tr: "2. katta pide ve fırın lezzetleriyle doyurucu bir mola.",
      en: "A filling second-floor break with pide and baked Turkish flavors.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Pide & Türk Mutfağı",
      en: "Pide & Turkish Cuisine",
    },
    cuisineType: "turkish",
    cuisineTags: ["turkish", "pide"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=85",
    featured: false,
  },
  {
    id: "dining-011",
    slug: "sultanahmet-koftecisi",
    name: {
      tr: "Sultanahmet Köftecisi",
      en: "Sultanahmet Köftecisi",
    },
    description: {
      tr: "2. katta köfte ve klasik Türk mutfağı sevenler için.",
      en: "Second-floor meatballs and classic Turkish flavors.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Köfte & Türk Mutfağı",
      en: "Meatballs & Turkish Cuisine",
    },
    cuisineType: "turkish",
    cuisineTags: ["turkish", "meatballs"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-012",
    slug: "pizza-ferro",
    name: {
      tr: "Pizza Ferro",
      en: "Pizza Ferro",
    },
    description: {
      tr: "2. katta pizza ve İtalyan esintili hızlı lezzetler.",
      en: "Second-floor pizza and Italian-inspired quick flavors.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Pizza & İtalyan",
      en: "Pizza & Italian",
    },
    cuisineType: "italian",
    cuisineTags: ["pizza", "italian"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=85",
    featured: false,
  },
  {
    id: "dining-013",
    slug: "popeyes",
    name: {
      tr: "Popeyes",
      en: "Popeyes",
    },
    description: {
      tr: "2. katta çıtır tavuk, sandviç ve hızlı servis menüleri.",
      en: "Second-floor crispy chicken, sandwiches and quick-service menus.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Tavuk & Fast Food",
      en: "Chicken & Fast Food",
    },
    cuisineType: "fast-food",
    cuisineTags: ["chicken", "fast-food"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-014",
    slug: "katsu-express",
    name: {
      tr: "Katsu Express",
      en: "Katsu Express",
    },
    description: {
      tr: "2. katta Asya esintili hızlı tabaklar ve pratik servis.",
      en: "Second-floor Asian-inspired quick plates with practical service.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Asya Mutfağı",
      en: "Asian Cuisine",
    },
    cuisineType: "world",
    cuisineTags: ["asian", "fast-food"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1600&q=85",
    featured: false,
  },
  {
    id: "dining-015",
    slug: "burger-king",
    name: {
      tr: "Burger King",
      en: "Burger King",
    },
    description: {
      tr: "2. katta burger, patates ve hızlı öğünler.",
      en: "Second-floor burgers, fries and quick meals.",
    },
    category: "fast-food",
    floor: "second",
    cuisine: {
      tr: "Burger & Fast Food",
      en: "Burger & Fast Food",
    },
    cuisineType: "fast-food",
    cuisineTags: ["burger", "fast-food"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },
  {
    id: "dining-016",
    slug: "perks-up",
    name: {
      tr: "Perks Up",
      en: "Perks Up",
    },
    description: {
      tr: "2. katta kahve, içecek ve hafif atıştırmalık molası.",
      en: "Second-floor coffee, drinks and light snack breaks.",
    },
    category: "cafe",
    floor: "second",
    cuisine: {
      tr: "Cafe",
      en: "Cafe",
    },
    cuisineType: "cafe",
    cuisineTags: ["cafe", "coffee"],
    workingHours: {
      tr: "10:00 - 22:00",
      en: "10:00 AM - 10:00 PM",
    },
    coverImage:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=85",
    featured: false,
  },
];