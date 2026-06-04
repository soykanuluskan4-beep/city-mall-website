"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import type { Locale } from "@/types/content";

declare global {
  interface Window {
    THREE?: any;
  }
}

type FloorMap3DProps = {
  locale: Locale;
};

type FloorKey = "basement" | "ground" | "first" | "second";
type EscalatorFloorKey = FloorKey;

type Category =
  | "fashion"
  | "sport"
  | "home"
  | "market"
  | "entertainment"
  | "food"
  | "technology"
  | "beauty"
  | "service"
  | "parking"
  | "closed"
  | "entrance"
  | "cashier";

type FloorBlock = {
  id: string;
  floor: FloorKey;
  name: string;
  category: Category;
  x: number;
  z: number;
  w: number;
  d: number;
  height?: number;
  clickable?: boolean;
  opacity?: number;
  visualColor?: string;
  description: {
    tr: string;
    en: string;
  };
  route?: string;
};

type SceneApi = {
  applySearch: (query: string, matchIds: Set<string>) => void;
  focusBlock: (id: string | null) => void;
  setActiveFloor: (floor: FloorKey) => void;
  resetCamera: () => void;
};

const THREE_CDN_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

const PLAN_WIDTH = 46;
const PLAN_DEPTH = 62;
const TH = 0.45;

const FLOOR_Y: Record<FloorKey, number> = {
  basement: 0,
  ground: 5.6,
  first: 11.2,
  second: 16.8,
};

// Zemin kattaki siyah çizgili atrium çerçevesi.
// Boşluk artık vezneye kaymayacak: siyah dikdörtgenin SADECE içi kesiliyor.
const GROUND_ATRIUM = {
  left: 33.45,
  top: 24.3,
  width: 33.55,
  depth: 35.1,
};

const FIRST_ATRIUMS = [
  { left: 33.2, top: 28.8, width: 34.0, depth: 13.0 },
  { left: 33.2, top: 48.0, width: 34.0, depth: 12.2 },
  { left: 33.2, top: 67.0, width: 34.0, depth: 16.0 },
];

const FIRST_ATRIUM_INSET = 0.65;

const SECOND_ATRIUMS = [
  { left: 33.2, top: 30.0, width: 34.0, depth: 24.0 },
  { left: 33.2, top: 59.4, width: 34.0, depth: 24.0 },
];

const SECOND_ATRIUM_INSET = 0.65;

// Siyah çerçevenin kalınlığı. Bu değer sayesinde çerçeve zeminde kalır,
// sadece çerçevenin içindeki alan boşluk olur.
const ATRIUM_INSET = 0.55;

const COLORS: Record<Category, string> = {
  fashion: "#E8312A",
  market: "#39B54A",
  entertainment: "#FFD100",
  sport: "#39B54A",
  home: "#F7941D",
  food: "#F7941D",
  technology: "#0072BC",
  beauty: "#EC008C",
  service: "#6B6256",
  parking: "#2a2a2a",
  closed: "#444444",
  entrance: "#2a2a2a",
  cashier: "#888888",
};

const BASEMENT_VISUAL_COLORS = [
  "#E8312A",
  "#F7941D",
  "#FFD100",
  "#39B54A",
  "#0072BC",
  "#EC008C",
  "#8B5CF6",
  "#14B8A6",
  "#F43F5E",
  "#84CC16",
  "#06B6D4",
  "#A855F7",
  "#F97316",
  "#22C55E",
  "#0EA5E9",
  "#D946EF",
  "#64748B",
  "#92400E",
  "#BE185D",
  "#6B6256",
];

const CATEGORY_LABELS: Record<Category, { tr: string; en: string }> = {
  fashion: { tr: "Moda", en: "Fashion" },
  market: { tr: "Market", en: "Market" },
  sport: { tr: "Spor", en: "Sport" },
  home: { tr: "Ev & Yaşam", en: "Home & Living" },
  entertainment: { tr: "Eğlence", en: "Entertainment" },
  food: { tr: "Yeme-İçme", en: "Food & Dining" },
  technology: { tr: "Teknoloji", en: "Technology" },
  beauty: { tr: "Güzellik", en: "Beauty" },
  service: { tr: "Hizmet", en: "Service" },
  parking: { tr: "Otopark", en: "Parking" },
  closed: { tr: "Kapalı", en: "Closed" },
  entrance: { tr: "Giriş", en: "Entrance" },
  cashier: { tr: "Vezne", en: "Cashier" },
};

const FLOOR_LABELS: Record<FloorKey, { tr: string; en: string }> = {
  basement: { tr: "-1. Kat", en: "Basement" },
  ground: { tr: "Zemin Kat", en: "Ground Floor" },
  first: { tr: "1. Kat", en: "First Floor" },
  second: { tr: "2. Kat", en: "Second Floor" },
};

const copy = {
  tr: {
    title: "CityMall · Kat Rehberi",
    searchPlaceholder: "Mağaza ara...",
    noResult: "Bulunamadı",
    result: "sonuç",
    defaultHint: "Bir mağazaya tıkla veya arama yap.",
    floor: "Kat",
    viewStores: "Mağazaları Gör",
    close: "Kapat",
    loading: "3B kat planı hazırlanıyor...",
    floors: {
  basement: "-1",
  ground: "Zemin",
  first: "1. Kat",
  second: "2. Kat",
},
  },
  en: {
    title: "CityMall · Floor Guide",
    searchPlaceholder: "Search stores...",
    noResult: "No results",
    result: "result",
    defaultHint: "Click a store or search.",
    floor: "Floor",
    viewStores: "View Stores",
    close: "Close",
    loading: "Preparing 3D floor guide...",
    floors: {
  basement: "B1",
  ground: "Ground",
  first: "1st",
  second: "2nd",
},
  },
};

function makeBlock(
  floor: FloorKey,
  id: string,
  name: string,
  category: Category,
  left: number,
  top: number,
  width: number,
  depth: number,
  options?: Partial<
    Pick<
      FloorBlock,
      | "clickable"
      | "opacity"
      | "height"
      | "description"
      | "route"
      | "visualColor"
    >
  >
): FloorBlock {
  const x = ((left + width / 2) / 100 - 0.5) * PLAN_WIDTH;
  const z = ((top + depth / 2) / 100 - 0.5) * PLAN_DEPTH;

  return {
    id,
    floor,
    name,
    category,
    x,
    z,
    w: (width / 100) * PLAN_WIDTH,
    d: (depth / 100) * PLAN_DEPTH,
    height: options?.height,
    clickable: options?.clickable ?? true,
    opacity: options?.opacity,
    route: options?.route,
    visualColor: options?.visualColor,
    description:
      options?.description ??
      {
        tr: `${name}, CityMall ${FLOOR_LABELS[floor].tr} içinde yer alıyor.`,
        en: `${name} is located on CityMall ${FLOOR_LABELS[floor].en}.`,
      },
  };
}

function rectEdges(left: number, top: number, width: number, depth: number) {
  return {
    x1: (left / 100 - 0.5) * PLAN_WIDTH,
    x2: ((left + width) / 100 - 0.5) * PLAN_WIDTH,
    z1: (top / 100 - 0.5) * PLAN_DEPTH,
    z2: ((top + depth) / 100 - 0.5) * PLAN_DEPTH,
  };
}

function percentToWorld(left: number, top: number) {
  return {
    x: (left / 100 - 0.5) * PLAN_WIDTH,
    z: (top / 100 - 0.5) * PLAN_DEPTH,
  };
}

function getGroundAtriumOuter() {
  return rectEdges(
    GROUND_ATRIUM.left,
    GROUND_ATRIUM.top,
    GROUND_ATRIUM.width,
    GROUND_ATRIUM.depth
  );
}

function getGroundVoid() {
  const outer = getGroundAtriumOuter();

  return {
    x1: outer.x1 + ATRIUM_INSET,
    x2: outer.x2 - ATRIUM_INSET,
    z1: outer.z1 + ATRIUM_INSET,
    z2: outer.z2 - ATRIUM_INSET,
  };
}

function getGroundEscalatorAnchors() {
  return {
    // Sol çift daha sola alındı; -1 kattaki Oyun Alanı'nın içine girmesin.
    leftTop: percentToWorld(33.7, 30.5),
    leftBottom: percentToWorld(33.7, 54.5),

    // Sağ çift siyah atrium dikdörtgeninin sağ iç tarafında kalır.
    rightTop: percentToWorld(63.0, 30.5),
    rightBottom: percentToWorld(63.0, 54.5),
  };
}

function getFirstFloorEscalatorAnchors() {
  return {
    leftBottom: percentToWorld(14.8, 75.0),
    rightBottom: percentToWorld(91.4, 75.8),
  };
}

const RAW_BASEMENT_BLOCKS: FloorBlock[] = [
  makeBlock("basement", "b-unimar-top", "Ünimar", "service", 0, 0, 28.5, 6.3, {
    visualColor: "#F7941D",
  }),
  makeBlock(
  "basement",
  "b-sconto",
  "Sconto Super Store",
  "service",
  28.5,
  0,
  71.5,
  12.5,
  {
    visualColor: "#003B73",
  }
),
  makeBlock("basement", "b-unimar-left", "Ünimar", "service", 0, 6.3, 8.1, 15.6, {
    visualColor: "#F7941D",
  }), 
  makeBlock("basement", "b-jupiter", "Jupiter", "technology", 0, 21.9, 8.1, 9.3),
  makeBlock("basement", "b-toyzz-shop", "Toyzz Shop", "entertainment", 0, 31.2, 8.1, 13.7, {
  route: "/kids",
}),
makeBlock("basement", "b-left-stairs-wc", "Merdiven ve WC", "service", 0, 44.9, 8.1, 7.1, {
  clickable: false,
  opacity: 0.55,
  height: 1.2,
  visualColor: "#5b18e8",
}),
makeBlock("basement", "b-chicco", "Chicco", "market", 0, 52.0, 8.1, 9.5),
  makeBlock("basement", "b-techno-life", "Techno Life", "technology", 0, 61.5, 8.1, 26.3),
  makeBlock("basement", "b-closed-left", "Closed", "closed", 0, 87.8, 18.2, 12.2, {
    clickable: false,
    opacity: 0.4,
    height: 1.2,
  }),
  makeBlock(
    "basement",
    "b-toilet-stairs",
    "Tuvalet ve Merdiven",
    "service",
    90.6,
    14.4,
    9.4,
    5.0,
    {
      clickable: false,
      opacity: 0.55,
      height: 1.4,
    }
  ),
  makeBlock("basement", "b-ates-kuruyemis", "Ateş Kuruyemiş", "food", 90.6, 19.4, 9.4, 7.1, {
    route: "/dining",
  }),
  makeBlock("basement", "b-lokmazade", "Lokmazade", "food", 90.6, 26.5, 9.4, 7.3, {
    route: "/dining",
  }),
  makeBlock(
    "basement",
    "b-tatliaci-cigkofte",
    "Tatlıacı Çiğköfte",
    "food",
    90.6,
    33.8,
    9.4,
    7.4,
    {
      route: "/dining",
    }
  ),
  makeBlock("basement", "b-en-zirve", "En Zirve Beauty Center", "beauty", 90.6, 41.2, 9.4, 10.6),
  makeBlock(
    "basement",
    "b-atom-master-cafe",
    "Atom Master Cafe",
    "food",
    84.9,
    51.8,
    15.1,
    15.0,
    {
      route: "/dining",
    }
  ),
  makeBlock("basement", "b-nxg-computer", "NXG Computer", "technology", 84.9, 66.8, 15.1, 7.5),
  makeBlock("basement", "b-closed-right", "Closed", "closed", 84.9, 74.3, 15.1, 7.3, {
    clickable: false,
    opacity: 0.4,
    height: 1.2,
  }),
  makeBlock("basement", "b-city-barber", "City Barber Shop", "service", 84.9, 81.6, 15.1, 7.2),
  makeBlock("basement", "b-edera", "Edera Accessories", "beauty", 79.2, 88.8, 20.8, 11.2),
  makeBlock(
    "basement",
    "b-playground",
    "Oyun Alanı",
    "entertainment",
    39.0,
    28.8,
    22.0,
    22.8,
    {
      route: "/kids",
      height: 2.1,
      description: {
        tr: "Çocuklar ve aileler için eğlence alanı.",
        en: "Entertainment area for children and families.",
      },
    }
  ),
  makeBlock("basement", "b-candy-shop", "Candy Shop", "food", 39.1, 53.2, 5.2, 4.2, {
    route: "/dining",
    height: 2.0,
  }),
  makeBlock("basement", "b-mini-golf", "Mini Golf", "entertainment", 39.2, 63.3, 22.2, 18.8, {
    route: "/kids",
    height: 2.1,
    description: {
      tr: "Mini golf ve eğlence deneyimi.",
      en: "Mini golf and entertainment experience.",
    },
  }),
  makeBlock("basement", "b-parking", "Kapalı Otopark", "parking", 19.2, 94.4, 58.0, 5.6, {
    clickable: false,
    opacity: 0.9,
    height: 0.75,
  }),
];

const BASEMENT_BLOCKS = RAW_BASEMENT_BLOCKS.map((block, index) => {
  if (block.visualColor) {
    return block;
  }

  if (block.category === "closed" || block.category === "parking") {
    return block;
  }

  return {
    ...block,
    visualColor: BASEMENT_VISUAL_COLORS[index % BASEMENT_VISUAL_COLORS.length],
  };
});

const GROUND_BLOCKS: FloorBlock[] = [
  makeBlock("ground", "g-lc-waikiki", "LC Waikiki", "fashion", 0, 0, 33.0, 13.6, {
  visualColor: "#5b18e8",
}),
  makeBlock("ground", "g-defacto", "Defacto", "fashion", 33.0, 0, 34.0, 4.5, {
    visualColor: "#9bbac2",
  }),
  makeBlock("ground", "g-flo", "FLO", "fashion", 67.0, 0, 33.0, 13.6, {
    visualColor: "#ff8a45",
  }),
  makeBlock("ground", "g-jakamen", "Jakamen", "fashion", 0, 13.6, 5.8, 9.8, {
  visualColor: "#222222",
}),
  makeBlock("ground", "g-pierre-cardin", "Pierre Cardin", "fashion", 0, 23.4, 5.8, 8.4, {
  visualColor: "#6B6256",
}),
  makeBlock("ground", "g-avva", "Avva", "fashion", 0, 31.8, 5.8, 8.0, {
    visualColor: "#8dbdf2",
  }),
  makeBlock("ground", "g-dogo", "Dogo", "fashion", 0, 39.8, 5.8, 5.6, {
    visualColor: "#ffe45c",
  }),
  makeBlock("ground", "g-left-stairs", "Merdiven", "service", 0, 45.4, 5.8, 4.6, {
    clickable: false,
    opacity: 0.55,
    height: 1.15,
    visualColor: "#5b18e8",
  }),
  makeBlock("ground", "g-us-polo", "U.S Polo Assn.", "fashion", 0, 50.0, 5.8, 11.3, {
    visualColor: "#928c00",
  }),
  makeBlock("ground", "g-desa", "Desa", "fashion", 0, 61.3, 11.7, 9.1, {
    visualColor: "#8b3500",
  }),
  makeBlock("ground", "g-ipekyol", "İpekyol", "fashion", 0, 70.4, 11.7, 10.9, {
    visualColor: "#5a5a5a",
  }),
  makeBlock("ground", "g-tavuk-dunyasi", "Tavuk Dünyası", "food", 0, 81.3, 11.7, 18.7, {
    route: "/dining",
    visualColor: "#ffc35a",
  }),
  makeBlock("ground", "g-mert-optik", "Mert Optik", "service", 90.6, 13.6, 9.4, 13.5, {
    visualColor: "#d1d1d1",
  }),
  makeBlock("ground", "g-stairs-wc", "Merdiven ve WC", "service", 91.7, 27.2, 8.3, 4.6, {
    clickable: false,
    opacity: 0.55,
    height: 1.2,
    visualColor: "#5b18e8",
  }),
  makeBlock("ground", "g-altinbas", "Altınbaş", "service", 90.6, 31.8, 9.4, 8.7, {
    visualColor: "#5aa0f0",
  }),
  makeBlock("ground", "g-old-plane", "Old Plane Bistro", "food", 90.6, 40.5, 9.4, 11.4, {
    route: "/dining",
    visualColor: "#d7d7d7",
  }),
  makeBlock("ground", "g-basman-plus", "Başman Plus", "service", 89.4, 51.9, 10.6, 14.2, {
    visualColor: "#b9ff64",
  }),
  makeBlock("ground", "g-twist", "Twist", "beauty", 89.4, 66.1, 10.6, 11.6, {
    visualColor: "#f08acb",
  }),
  makeBlock("ground", "g-espresso-lab", "Espresso Lab", "food", 89.4, 77.7, 10.6, 22.3, {
    route: "/dining",
    visualColor: "#8f6f38",
  }),
  makeBlock("ground", "g-telsim", "Telsim", "service", 27.4, 91.2, 11.4, 8.8, {
    visualColor: "#ff1111",
  }),
  makeBlock("ground", "g-entrance", "Giriş", "entrance", 38.9, 94.2, 22.2, 5.8, {
    clickable: false,
    opacity: 0.6,
    height: 0.9,
  }),
  makeBlock("ground", "g-dp-parfumes", "D&P Parfumes", "beauty", 61.2, 91.2, 11.4, 8.8, {
    visualColor: "#f45ec3",
  }),
  makeBlock("ground", "g-cashier", "Vezne", "cashier", 46.5, 60.3, 7.0, 3.0, {
    clickable: false,
    opacity: 0.5,
    height: 0.9,
  }),
];

const FIRST_BLOCKS: FloorBlock[] = [
  makeBlock("first", "f-discounterra", "Discountterra", "fashion", 0, 0, 33.0, 13.6, {
    visualColor: "#5b18e8",
    route: "/stores",
  }),
  makeBlock("first", "f-index", "Index", "fashion", 33.0, 0, 34.0, 4.5, {
  visualColor: "#6f9aa4",
  route: "/stores",
}),
  makeBlock("first", "f-mudo", "Mudo Collection", "fashion", 67.0, 0, 33.0, 13.6, {
    visualColor: "#ff8a45",
    route: "/stores",
  }),

  makeBlock("first", "f-english-home", "English Home", "home", 0, 13.6, 5.8, 10.8, {
    visualColor: "#222222",
  }),
  makeBlock("first", "f-under-armour", "Under Armour", "sport", 0, 24.4, 5.8, 10.4, {
    visualColor: "#6B6256",
  }),
  makeBlock("first", "f-adidas", "Adidas", "sport", 0, 34.8, 5.8, 10.6, {
    visualColor: "#8dbdf2",
  }),
  makeBlock("first", "f-left-stairs", "Merdiven", "service", 0, 45.4, 5.8, 5.0, {
    clickable: false,
    opacity: 0.55,
    height: 1.15,
    visualColor: "#5b18e8",
  }),
  makeBlock("first", "f-efor", "Efor", "fashion", 0, 50.4, 6.2, 10.1, {
    visualColor: "#202020",
  }),
  makeBlock("first", "f-sport-soul", "Sport Soul", "sport", 0, 60.5, 6.2, 13.2, {
    visualColor: "#FFD100",
  }),

  // PUMA görselde L formunda. İki blok tek mağaza gibi davranır.
 makeBlock("first", "f-puma-main", "PUMA", "sport", 0, 74.0, 18.6, 14.8, {
  visualColor: "#4b4b4b",
}),
  makeBlock("first", "f-section", "Section", "beauty", 90.6, 13.6, 9.4, 13.5, {
  visualColor: "#9d9d9d",
}),
  makeBlock("first", "f-stairs-wc", "Merdiven ve WC", "service", 91.7, 27.2, 8.3, 4.6, {
    clickable: false,
    opacity: 0.55,
    height: 1.15,
    visualColor: "#5b18e8",
  }),
  makeBlock("first", "f-passion", "Passion", "fashion", 90.6, 31.8, 9.4, 11.2, {
    visualColor: "#f21ca0",
  }),
  makeBlock("first", "f-sketchers", "Sketchers", "sport", 90.6, 43.0, 9.4, 11.8, {
  visualColor: "#9a9a9a",
}),
  makeBlock("first", "f-saydam", "Saydam", "fashion", 90.6, 54.8, 9.4, 8.0, {
  visualColor: "#d4b200",
}),
  makeBlock("first", "f-buff-bloom", "Buff & Bloom", "fashion", 94.0, 62.8, 6.0, 10.2, {
  visualColor: "#2f2f2f",
}),
makeBlock("first", "f-colins", "COLIN'S", "service", 84.2, 75.2, 13.8, 18.8, {
  visualColor: "#4E8F97",
}),
  makeBlock("first", "f-uso-parfume", "U.S.O Parfume", "beauty", 37.0, 44.8, 16.5, 2.4, {
  height: 0.28,
  visualColor: "#c90076",
}),
  makeBlock("first", "f-golden-rose", "Golden Rose", "beauty", 37.2, 63.2, 16.2, 2.4, {
  height: 0.28,
  visualColor: "#c90076",
}),
];

const SECOND_BLOCKS: FloorBlock[] = [
  // Üst kenar
  makeBlock("second", "s-funlab-top", "FunLab", "entertainment", 0, 0, 46.5, 13.6, {
    visualColor: "#5b18e8",
    route: "/kids",
  }),
  makeBlock("second", "s-cinemall", "Cinemall", "entertainment", 46.5, 0, 53.5, 13.6, {
    visualColor: "#ff8a45",
    route: "/cinema",
  }),

  // Sol kenar
  makeBlock("second", "s-funlab-side", "FunLab", "entertainment", 0, 13.6, 8.4, 30.8, {
    visualColor: "#5b18e8",
    route: "/kids",
  }),
  makeBlock("second", "s-left-stairs", "Merdiven", "service", 0, 44.4, 9.8, 5.2, {
    clickable: false,
    opacity: 0.45,
    height: 1.1,
    visualColor: "#5b18e8",
  }),
  makeBlock("second", "s-no33", "No 33 Limon Tantuni", "food", 0, 49.6, 9.8, 7.0, {
    visualColor: "#3f3f3f",
  }),
  makeBlock("second", "s-orkide", "Orkide", "food", 0, 56.6, 9.8, 7.6, {
    visualColor: "#d4b200",
  }),
  makeBlock("second", "s-sampi-pide", "Samp Pide", "food", 0, 64.2, 9.8, 7.8, {
    visualColor: "#7fbf4d",
  }),
  makeBlock("second", "s-sultanahmet", "Sultanahmet Köftecisi", "food", 0, 72.0, 9.8, 10.8, {
    visualColor: "#1f5d10",
  }),

  // Sağ kenar
  makeBlock("second", "s-stairs-wc", "Merdiven ve WC", "service", 88.5, 22.6, 11.5, 5.8, {
    clickable: false,
    opacity: 0.45,
    height: 1.1,
    visualColor: "#888888",
  }),
  makeBlock("second", "s-pizza-ferro", "Pizza Ferro", "food", 87.8, 34.0, 12.2, 11.8, {
    visualColor: "#efe9a4",
  }),
  makeBlock("second", "s-popeyes", "Popeyes", "food", 87.8, 45.8, 12.2, 11.8, {
    visualColor: "#e9772f",
  }),
  makeBlock("second", "s-katsu", "Katsu Express", "food", 87.8, 57.6, 12.2, 11.8, {
    visualColor: "#e91616",
  }),
  makeBlock("second", "s-burger-king", "Burger King", "food", 87.8, 69.4, 12.2, 12.0, {
    visualColor: "#8b6435",
  }),

  // Alt kenar / dekoratif alanlar
  makeBlock("second", "s-terrace-left", "Teras", "service", 0, 84.2, 3.8, 10.8, {
    clickable: false,
    opacity: 0.5,
    height: 0.9,
    visualColor: "#b3d9e8",
  }),
  makeBlock("second", "s-perks-up", "Perks Up", "food", 13.0, 89.0, 14.6, 11.0, {
    visualColor: "#17201e",
  }),
  makeBlock("second", "s-terrace-right", "Teras", "service", 96.2, 84.2, 3.8, 10.8, {
    clickable: false,
    opacity: 0.5,
    height: 0.9,
    visualColor: "#b3d9e8",
  }),
];

const FLOOR_BLOCKS: FloorBlock[] = [
  ...BASEMENT_BLOCKS,
  ...GROUND_BLOCKS,
  ...FIRST_BLOCKS,
  ...SECOND_BLOCKS,
];

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("İ", "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getBlockColor(block: FloorBlock) {
  return block.visualColor ?? COLORS[block.category];
}

function getContrastText(category: Category) {
  return category === "entertainment" ||
    category === "food" ||
    category === "home"
    ? "text-black"
    : "text-white";
}

function getBlockHref(block: FloorBlock, activeLocale: Locale) {
  if (block.category === "food") {
    return `/${activeLocale}/dining`;
  }

  if (block.category === "entertainment") {
    return `/${activeLocale}/cinema`;
  }

  return `/${activeLocale}/stores`;
}

function loadThreeScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("window is not available"));
  }

  if (window.THREE) {
    return Promise.resolve(window.THREE);
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    'script[data-three-r128="true"]'
  );

  if (existingScript) {
    return new Promise<any>((resolve, reject) => {
      existingScript.addEventListener("load", () => resolve(window.THREE));
      existingScript.addEventListener("error", reject);
    });
  }

  return new Promise<any>((resolve, reject) => {
    const script = document.createElement("script");

    script.src = THREE_CDN_URL;
    script.async = true;
    script.dataset.threeR128 = "true";

    script.onload = () => resolve(window.THREE);
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

export function FloorMap3D({ locale }: FloorMap3DProps) {
  const text = copy[locale];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneApiRef = useRef<SceneApi | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [activeFloor, setActiveFloor] = useState<FloorKey>("basement");
  const [query, setQuery] = useState("");
  const [resultCount, setResultCount] = useState<number | null>(null);
  const [hoveredBlock, setHoveredBlock] = useState<FloorBlock | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<FloorBlock | null>(null);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

function closeSelectedBlock() {
  setSelectedBlock(null);
  sceneApiRef.current?.resetCamera();
}

  const clickableBlocks = useMemo(
    () => FLOOR_BLOCKS.filter((block) => block.clickable !== false),
    []
  );

  useEffect(() => {
    sceneApiRef.current?.setActiveFloor(activeFloor);
  }, [activeFloor]);

  useEffect(() => {
    const normalizedQuery = normalizeText(query.trim());

    if (!normalizedQuery) {
      setResultCount(null);
      sceneApiRef.current?.applySearch("", new Set());
      sceneApiRef.current?.focusBlock(null);
      return;
    }

    const matches = clickableBlocks.filter((block) =>
      normalizeText(block.name).includes(normalizedQuery)
    );

    setResultCount(matches.length);

    const matchIds = new Set(matches.map((block) => block.id));

    sceneApiRef.current?.applySearch(normalizedQuery, matchIds);

    if (matches[0]) {
      setActiveFloor(matches[0].floor);
      sceneApiRef.current?.setActiveFloor(matches[0].floor);
      sceneApiRef.current?.focusBlock(matches[0].id);
    }
  }, [query, clickableBlocks]);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    loadThreeScript()
      .then((THREE) => {
        if (cancelled || !containerRef.current) {
          return;
        }

        cleanup = initScene({
          THREE,
          container: containerRef.current,
          sceneApiRef,
          setHoveredBlock,
          setSelectedBlock,
          setIsReady,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(true);
        }
      });

    return () => {
      cancelled = true;
      cleanup();
      sceneApiRef.current = null;
    };
  }, []);

  return (
    <div
      className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-border-default bg-[#0f0f10] shadow-card md:h-[500px]"
      style={{ fontFamily: "Outfit, sans-serif" }}
    >
            <div ref={containerRef} className="absolute inset-0" />

      <button
        type="button"
        onClick={() => setIsMobilePanelOpen((value) => !value)}
        className="absolute left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-black/35 text-xl font-semibold text-white shadow-[0_14px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl transition hover:bg-black/50"
        aria-label={
          isMobilePanelOpen
            ? text.close
            : locale === "tr"
              ? "Menüyü aç"
              : "Open menu"
        }
      >
        {isMobilePanelOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <span aria-hidden="true">☰</span>
        )}
      </button>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_10%,rgba(232,49,42,0.16),transparent_28%),linear-gradient(180deg,rgba(15,15,16,0.05),rgba(15,15,16,0.34))]" />

      <div
        className={`absolute left-4 top-20 z-40 w-[min(330px,calc(100%-32px))] rounded-2xl border border-white/14 bg-black/42 p-4 text-white shadow-[0_18px_54px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 ${
          isMobilePanelOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/52">
              {FLOOR_LABELS[activeFloor][locale]}
            </p>

            <h3 className="mt-1 text-lg font-semibold tracking-tight">
              {text.title}
            </h3>
          </div>

          <span className="rounded-full bg-[#E8312A] px-3 py-1 text-xs font-semibold text-white">
            {text.floors[activeFloor]}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {(["basement", "ground", "first", "second"] as FloorKey[]).map(
            (floor) => (
              <button
                key={floor}
                type="button"
                onClick={() => {
                  setActiveFloor(floor);
                  sceneApiRef.current?.setActiveFloor(floor);
                  sceneApiRef.current?.focusBlock(null);
                }}
                className={`flex min-h-[46px] min-w-0 items-center justify-center rounded-full px-2 py-2 text-center text-xs font-semibold leading-tight transition ${
                  activeFloor === floor
                    ? "bg-[#E8312A] text-white"
                    : "border border-white/14 bg-white/10 text-white/68 hover:bg-white/16 hover:text-white"
                }`}
              >
                <span className="block w-full text-center leading-tight">
                  {text.floors[floor]}
                </span>
              </button>
            )
          )}
        </div>

        <label className="mt-4 flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-3 text-sm text-white/80">
          <Search className="h-4 w-4 shrink-0 text-white/52" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={text.searchPlaceholder}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/42"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="shrink-0 rounded-full p-1 text-white/56 transition hover:bg-white/10 hover:text-white"
              aria-label={text.close}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </label>

        <p className="mt-3 text-xs leading-5 text-white/58">
          {resultCount === null
            ? text.defaultHint
            : resultCount === 0
              ? text.noResult
              : `${resultCount} ${text.result}`}
        </p>
      </div>

      {hoveredBlock ? (
        <div className="pointer-events-none absolute bottom-4 left-4 z-20 hidden rounded-2xl border border-white/14 bg-black/50 px-4 py-3 text-white shadow-[0_18px_54px_rgba(0,0,0,0.26)] backdrop-blur-xl md:block">
          <p className="text-sm font-semibold">{hoveredBlock.name}</p>
          <p className="mt-1 text-xs text-white/52">
            {CATEGORY_LABELS[hoveredBlock.category][locale]} ·{" "}
            {FLOOR_LABELS[hoveredBlock.floor][locale]}
          </p>
        </div>
      ) : null}

      <div
  className={`fixed inset-x-3 bottom-3 z-[60] h-[280px] max-h-[calc(100dvh-7rem)] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0f0f10]/95 p-5 text-white shadow-[0_-20px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl transition duration-300 md:absolute md:inset-x-auto md:bottom-4 md:right-4 md:top-4 md:z-30 md:h-auto md:max-h-none md:w-[330px] md:rounded-2xl md:border md:overflow-y-auto ${
    selectedBlock
      ? "translate-y-0 opacity-100 md:translate-x-0"
      : "pointer-events-none translate-y-[calc(100%+2rem)] opacity-0 md:translate-x-[calc(100%+2rem)] md:translate-y-0"
  }`}
>
  {selectedBlock ? (
  <div className="h-full overflow-y-auto pr-1 md:h-auto md:overflow-visible md:pr-0">
    <button
      type="button"
      onClick={closeSelectedBlock}
      className="absolute right-4 top-4 z-10 rounded-full border border-white/14 bg-black/24 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
      aria-label={text.close}
    >
      <X className="h-4 w-4" aria-hidden="true" />
    </button>

    <div className="pr-12">
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getContrastText(
          selectedBlock.category
        )}`}
        style={{ backgroundColor: getBlockColor(selectedBlock) }}
      >
        {CATEGORY_LABELS[selectedBlock.category][locale]}
      </span>

      <h3 className="mt-4 break-words text-3xl font-semibold leading-tight tracking-tight">
        {selectedBlock.name}
      </h3>
    </div>

    <div className="mt-5 rounded-2xl border border-white/10 bg-white/8 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
        {locale === "tr" ? "Kat Bilgisi" : "Floor"}
      </p>

      <p className="mt-2 text-base font-semibold text-white">
        {FLOOR_LABELS[selectedBlock.floor][locale]}
      </p>
    </div>

    <p className="mt-5 text-sm leading-6 text-white/68">
      {selectedBlock.description?.[locale] ??
        selectedBlock.description?.tr ??
        selectedBlock.description?.en ??
        (locale === "tr"
          ? `${selectedBlock.name}, CityMall içinde yer alıyor.`
          : `${selectedBlock.name} is located inside CityMall.`)}
    </p>

    <Link
      href={getBlockHref(selectedBlock, locale)}
      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E8312A] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-text-primary"
    >
      {locale === "tr" ? "Mağazaları Gör" : "View Stores"}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  </div>
) : null}
</div>

      {!isReady && !loadError ? (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#0f0f10] text-white">
          <p className="text-sm font-semibold tracking-wide text-white/70">
            {text.loading}
          </p>
        </div>
      ) : null}

      {loadError ? (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#0f0f10] p-6 text-center text-white">
          <p className="max-w-sm text-sm leading-6 text-white/70">
            3D kat planı yüklenemedi. Sayfayı yenileyip tekrar deneyin.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function initScene({
  THREE,
  container,
  sceneApiRef,
  setHoveredBlock,
  setSelectedBlock,
  setIsReady,
}: {
  THREE: any;
  container: HTMLDivElement;
  sceneApiRef: MutableRefObject<SceneApi | null>;
  setHoveredBlock: (block: FloorBlock | null) => void;
  setSelectedBlock: (block: FloorBlock | null) => void;
  setIsReady: (value: boolean) => void;
}) {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color("#0f0f10");
  scene.fog = new THREE.Fog("#0f0f10", 54, 125);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 240);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
  });

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.display = "block";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.touchAction = "none";

  container.appendChild(renderer.domElement);

  const root = new THREE.Group();

  scene.add(root);

  const ambient = new THREE.AmbientLight("#ffffff", 0.92);
  const key = new THREE.DirectionalLight("#ffffff", 1.18);
  const fill = new THREE.PointLight("#FFD100", 0.68, 92);
  const rim = new THREE.PointLight("#0072BC", 0.42, 100);

  key.position.set(20, 36, 18);
  key.castShadow = true;
  key.shadow.mapSize.width = 1024;
  key.shadow.mapSize.height = 1024;

  fill.position.set(-18, 16, -20);
  rim.position.set(18, 14, 22);

  scene.add(ambient, key, fill, rim);

  const floorGroups = new Map<FloorKey, any>();
  const blockMeshes = new Map<string, any>();
  const clickableMeshes: any[] = [];
  const escalatorObjects: any[] = [];

  (["basement", "ground", "first", "second"] as FloorKey[]).forEach((floor) => {
    const floorGroup = new THREE.Group();

    floorGroup.position.y = FLOOR_Y[floor];
    floorGroup.add(makeFloorOutline(THREE, floor));

    if (floor === "ground") {
      floorGroup.add(makeGroundAtriumFrame(THREE));
    }

    if (floor === "first") {
  floorGroup.add(makeFirstFloorAtriumFrames(THREE));
    }

    if (floor === "second") {
  floorGroup.add(makeSecondFloorAtriumFrames(THREE));
}

    FLOOR_BLOCKS.filter((block) => block.floor === floor).forEach((block) => {
      const mesh = makeStoreBlock(THREE, block);

      floorGroup.add(mesh);
      blockMeshes.set(block.id, mesh);

      if (block.clickable !== false) {
        clickableMeshes.push(mesh);
      }
    });

    root.add(floorGroup);
    floorGroups.set(floor, floorGroup);
  });

const escalatorAnchors = getGroundEscalatorAnchors();

const yBasementTop = FLOOR_Y.basement + TH / 2;
const yGroundTop = FLOOR_Y.ground + TH / 2;
const yFirstTop = FLOOR_Y.ground + (FLOOR_Y.ground - FLOOR_Y.basement) + TH / 2;

const leftEscalatorRotationY = -Math.PI / 2;
const rightEscalatorRotationY = Math.PI / 2;
const escalatorGroup = new THREE.Group();

const escalatorFloorGroups = new Map<EscalatorFloorKey, any>();

function getEscalatorFloorGroup(floor: EscalatorFloorKey) {
  const existingGroup = escalatorFloorGroups.get(floor);

  if (existingGroup) {
    return existingGroup;
  }

  const group = new THREE.Group();

  group.userData.floor = floor;
  escalatorFloorGroups.set(floor, group);
  escalatorGroup.add(group);

  return group;
}

function rememberBaseOpacity(object: any) {
  object.traverse((child: any) => {
    if (!child.material) {
      return;
    }

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((material: any) => {
      if (material.userData.baseOpacity === undefined) {
        material.userData.baseOpacity = material.opacity ?? 1;
      }
    });
  });
}

function addEscalatorForFloor(
  floor: EscalatorFloorKey,
  escalator: any
) {
  escalator.userData.floor = floor;

  rememberBaseOpacity(escalator);

  const floorGroup = getEscalatorFloorGroup(floor);

  floorGroup.add(escalator);
  escalatorObjects.push(escalator);
}

// Sol üst = -1'den zemine çıkan
addEscalatorForFloor(
  "basement",
  makeEscalator(
    THREE,
    escalatorAnchors.leftTop.x,
    escalatorAnchors.leftTop.z,
    yBasementTop,
    yGroundTop,
    -1,
    leftEscalatorRotationY
  )
);

// Sol alt = zeminden -1'e inen
addEscalatorForFloor(
  "basement",
  makeEscalator(
    THREE,
    escalatorAnchors.leftBottom.x,
    escalatorAnchors.leftBottom.z,
    yGroundTop,
    yBasementTop,
    1,
    leftEscalatorRotationY + Math.PI
  )
);

// Sağ üst = zeminden 1. kata çıkan
addEscalatorForFloor(
  "ground",
  makeEscalator(
    THREE,
    escalatorAnchors.rightTop.x,
    escalatorAnchors.rightTop.z,
    yGroundTop,
    yFirstTop,
    -1,
    rightEscalatorRotationY
  )
);

// Sağ alt = 1. kattan zemine inen
addEscalatorForFloor(
  "ground",
  makeEscalator(
    THREE,
    escalatorAnchors.rightBottom.x,
    escalatorAnchors.rightBottom.z,
    yFirstTop,
    yGroundTop,
    1,
    rightEscalatorRotationY + Math.PI
  )
);

const firstEscalatorAnchors = getFirstFloorEscalatorAnchors();
const ySecondTop = FLOOR_Y.second + TH / 2;

// Sol alt PUMA yanı = 1. kattan 2. kata çıkan
addEscalatorForFloor(
  "first",
  makeEscalator(
    THREE,
    firstEscalatorAnchors.leftBottom.x,
    firstEscalatorAnchors.leftBottom.z,
    yFirstTop,
    ySecondTop,
    -1,
    Math.PI / 2
  )
);

// Sağ alt COLIN'S yanı = 2. kattan 1. kata inen
addEscalatorForFloor(
  "first",
  makeEscalator(
    THREE,
    firstEscalatorAnchors.rightBottom.x,
    firstEscalatorAnchors.rightBottom.z,
    ySecondTop,
    yFirstTop,
    1,
    Math.PI / 2
  )
);

root.add(escalatorGroup);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const rig = {
    theta: -0.58,
    thetaTarget: -0.58,
    phi: 0.98,
    phiTarget: 0.98,
    radius: 74,
    radiusTarget: 74,
    target: new THREE.Vector3(0, FLOOR_Y.basement, 0),
    targetTarget: new THREE.Vector3(0, FLOOR_Y.basement, 0),
  };

  const pointerState = {
    isDown: false,
    moved: false,
    lastX: 0,
    lastY: 0,
    hoverMesh: null as any,
  };

  const touchState = {
  mode: null as "rotate" | "pinchpan" | null,
  moved: false,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  lastDistance: 0,
  lastMidX: 0,
  lastMidY: 0,
};

function getTouchDistance(touches: TouchList) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;

  return Math.hypot(dx, dy);
}

function getTouchMidpoint(touches: TouchList) {
  return {
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  };
}

function clampCameraTarget() {
  rig.targetTarget.x = Math.max(-28, Math.min(28, rig.targetTarget.x));
  rig.targetTarget.z = Math.max(-36, Math.min(36, rig.targetTarget.z));
}

  let selectedMesh: any = null;
  let activeFloor: FloorKey = "basement";

  function setMaterialOpacity(material: any, opacity: number) {
    const baseOpacity = material.userData.baseOpacity ?? material.opacity ?? 1;
    const finalOpacity = baseOpacity * opacity;

    material.transparent = finalOpacity < 1;
    material.opacity = finalOpacity;
    material.depthWrite = finalOpacity >= 0.98;
  }

  function setObjectOpacity(object: any, opacity: number) {
    object.traverse((child: any) => {
      if (!child.material) {
        return;
      }

      if (Array.isArray(child.material)) {
        child.material.forEach((material: any) => setMaterialOpacity(material, opacity));
        return;
      }

      setMaterialOpacity(child.material, opacity);
    });
  }

  function getFloorOpacity(floor: FloorKey) {
  if (floor === activeFloor) {
    return 1;
  }

  const order: FloorKey[] = ["basement", "ground", "first", "second"];
  const activeIndex = order.indexOf(activeFloor);
  const floorIndex = order.indexOf(floor);

  if (Math.abs(activeIndex - floorIndex) === 1) {
    return 0.16;
  }

  return 0.04;
}

  function updateFloorVisibility() {
  floorGroups.forEach((group, floor) => {
    setObjectOpacity(group, getFloorOpacity(floor));
  });

  escalatorFloorGroups.forEach((group, floor) => {
  const isActive = floor === activeFloor;

  setObjectOpacity(group, isActive ? 1 : 0);
  group.visible = isActive;
});

escalatorObjects.forEach((escalator) => {
  const escalatorFloor = escalator.userData.floor as EscalatorFloorKey;
  const isActive = escalatorFloor === activeFloor;

  setObjectOpacity(escalator, isActive ? 1 : 0);
  escalator.visible = isActive;
});
}

  function updateSize() {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function updateCamera() {
    rig.theta += (rig.thetaTarget - rig.theta) * 0.08;
    rig.phi += (rig.phiTarget - rig.phi) * 0.08;
    rig.radius += (rig.radiusTarget - rig.radius) * 0.08;
    rig.target.lerp(rig.targetTarget, 0.08);

    const y = Math.cos(rig.phi) * rig.radius;
    const flat = Math.sin(rig.phi) * rig.radius;
    const x = Math.sin(rig.theta) * flat;
    const z = Math.cos(rig.theta) * flat;

    camera.position.set(
      rig.target.x + x,
      rig.target.y + y + 10,
      rig.target.z + z
    );
    camera.lookAt(rig.target.x, rig.target.y, rig.target.z);
  }

  function setPointerFromClient(clientX: number, clientY: number) {
  const rect = renderer.domElement.getBoundingClientRect();

  pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
}

function getIntersectionFromClient(clientX: number, clientY: number) {
  setPointerFromClient(clientX, clientY);

  raycaster.setFromCamera(pointer, camera);

  const hits = raycaster.intersectObjects(clickableMeshes, false);

  const activeHit = hits.find((hit: any) => {
    const block = hit.object.userData.block as FloorBlock;

    return block.floor === activeFloor;
  });

  return activeHit?.object ?? null;
}

function getIntersection(event: PointerEvent) {
  return getIntersectionFromClient(event.clientX, event.clientY);
}

  function paintMesh(mesh: any, mode: "default" | "dim" | "match" | "hover" | "selected") {
    const block = mesh.userData.block as FloorBlock;
    const material = mesh.material;
    const baseOpacity = block.opacity ?? 1;
    const floorOpacity = getFloorOpacity(block.floor);
    const targetOpacity = mode === "dim" ? 0.2 : baseOpacity;
    const finalOpacity = targetOpacity * floorOpacity;

    material.color.set(getBlockColor(block));
    material.transparent = finalOpacity < 1;
    material.opacity = finalOpacity;
    material.depthWrite = finalOpacity >= 0.98;
    material.roughness = 0.62;
    material.metalness = 0.05;

    if (material.emissive) {
      material.emissive.set("#000000");
      material.emissiveIntensity = 0;
    }

    mesh.scale.set(1, 1, 1);

    if (mode === "match") {
      material.opacity = floorOpacity;
      material.transparent = floorOpacity < 1;
      material.depthWrite = floorOpacity >= 0.98;
      material.emissive?.set(getBlockColor(block));
      material.emissiveIntensity = 0.2;
    }

    if (mode === "hover") {
      material.opacity = 1;
      material.transparent = false;
      material.depthWrite = true;
      material.emissive?.set("#ffffff");
      material.emissiveIntensity = 0.16;
      mesh.scale.set(1.025, 1.025, 1.025);
    }

    if (mode === "selected") {
      material.opacity = 1;
      material.transparent = false;
      material.depthWrite = true;
      material.emissive?.set("#FFD100");
      material.emissiveIntensity = 0.26;
      mesh.scale.set(1.035, 1.035, 1.035);
    }
  }

  function clearHover() {
    if (pointerState.hoverMesh && pointerState.hoverMesh !== selectedMesh) {
      paintMesh(pointerState.hoverMesh, "default");
    }

    pointerState.hoverMesh = null;
    setHoveredBlock(null);
    renderer.domElement.style.cursor = "grab";
  }

  function applySearch(query: string, matchIds: Set<string>) {
    const hasQuery = Boolean(query);

    blockMeshes.forEach((mesh, id) => {
      const block = mesh.userData.block as FloorBlock;

      if (block.clickable === false) {
        paintMesh(mesh, "default");
        return;
      }

      if (!hasQuery) {
        paintMesh(mesh, mesh === selectedMesh ? "selected" : "default");
        return;
      }

      paintMesh(mesh, matchIds.has(id) ? "match" : "dim");
    });
  }

  function focusBlock(id: string | null) {
    if (!id) {
      rig.targetTarget.set(0, FLOOR_Y[activeFloor], 0);
      rig.radiusTarget = 74;
      rig.phiTarget = 0.98;
      return;
    }

    const mesh = blockMeshes.get(id);

    if (!mesh) {
      return;
    }

    const block = mesh.userData.block as FloorBlock;

    rig.targetTarget.set(block.x, FLOOR_Y[block.floor], block.z);
    rig.radiusTarget = 38;
    rig.phiTarget = 0.84;
  }

  function setActiveFloor(floor: FloorKey) {
    activeFloor = floor;
    rig.targetTarget.set(0, FLOOR_Y[floor], 0);
    rig.radiusTarget = 74;
    rig.phiTarget = 0.98;
    updateFloorVisibility();
  }

  function resetCamera() {
  if (selectedMesh) {
    paintMesh(selectedMesh, "default");
    selectedMesh = null;
  }

  clearHover();

  rig.thetaTarget = -0.58;
  rig.phiTarget = 0.98;
  rig.radiusTarget = 74;
  rig.targetTarget.set(0, FLOOR_Y[activeFloor], 0);
}

  sceneApiRef.current = {
  applySearch,
  focusBlock,
  setActiveFloor,
  resetCamera,
};

  function selectMesh(mesh: any) {
  if (!mesh) {
    return;
  }

  const block = mesh.userData.block as FloorBlock;

  if (selectedMesh && selectedMesh !== mesh) {
    paintMesh(selectedMesh, "default");
  }

  selectedMesh = mesh;
  setSelectedBlock(block);
  paintMesh(mesh, "selected");
  setActiveFloor(block.floor);
  focusBlock(block.id);
}

function onPointerDown(event: PointerEvent) {
  if (event.pointerType === "touch") {
    return;
  }

  pointerState.isDown = true;
  pointerState.moved = false;
  pointerState.lastX = event.clientX;
  pointerState.lastY = event.clientY;
  renderer.domElement.style.cursor = "grabbing";
  event.preventDefault();
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerType === "touch") {
    return;
  }

  if (pointerState.isDown) {
    const dx = event.clientX - pointerState.lastX;
    const dy = event.clientY - pointerState.lastY;

    if (Math.abs(dx) + Math.abs(dy) > 3) {
      pointerState.moved = true;
    }

    rig.thetaTarget -= dx * 0.006;
    rig.phiTarget += dy * 0.005;
    rig.phiTarget = Math.max(0.42, Math.min(1.24, rig.phiTarget));

    pointerState.lastX = event.clientX;
    pointerState.lastY = event.clientY;

    return;
  }

  const mesh = getIntersection(event);

  if (mesh === pointerState.hoverMesh) {
    return;
  }

  if (pointerState.hoverMesh && pointerState.hoverMesh !== selectedMesh) {
    paintMesh(pointerState.hoverMesh, "default");
  }

  pointerState.hoverMesh = mesh;

  if (mesh) {
    const block = mesh.userData.block as FloorBlock;

    paintMesh(mesh, "hover");
    setHoveredBlock(block);
    renderer.domElement.style.cursor = "pointer";
    return;
  }

  clearHover();
}

function onPointerUp(event: PointerEvent) {
  if (event.pointerType === "touch") {
    return;
  }

  if (!pointerState.isDown) {
    return;
  }

  pointerState.isDown = false;
  renderer.domElement.style.cursor = "grab";

  if (!pointerState.moved) {
    const mesh = getIntersection(event);

    if (mesh) {
      selectMesh(mesh);
    }
  }
}

  function onWheel(event: WheelEvent) {
    event.preventDefault();
    rig.radiusTarget += event.deltaY * 0.035;
    rig.radiusTarget = Math.max(30, Math.min(94, rig.radiusTarget));
  }

  function onTouchStart(event: TouchEvent) {
  event.preventDefault();

  if (event.touches.length === 1) {
    const touch = event.touches[0];

    touchState.mode = "rotate";
    touchState.moved = false;
    touchState.startX = touch.clientX;
    touchState.startY = touch.clientY;
    touchState.lastX = touch.clientX;
    touchState.lastY = touch.clientY;

    return;
  }

  if (event.touches.length === 2) {
    const midpoint = getTouchMidpoint(event.touches);

    touchState.mode = "pinchpan";
    touchState.moved = false;
    touchState.lastDistance = getTouchDistance(event.touches);
    touchState.lastMidX = midpoint.x;
    touchState.lastMidY = midpoint.y;
  }
}

function onTouchMove(event: TouchEvent) {
  event.preventDefault();

  if (event.touches.length === 1 && touchState.mode === "rotate") {
    const touch = event.touches[0];
    const dx = touch.clientX - touchState.lastX;
    const dy = touch.clientY - touchState.lastY;

    if (Math.abs(dx) + Math.abs(dy) > 4) {
      touchState.moved = true;
    }

    rig.thetaTarget -= dx * 0.006;
    rig.phiTarget += dy * 0.005;
    rig.phiTarget = Math.max(0.42, Math.min(1.24, rig.phiTarget));

    touchState.lastX = touch.clientX;
    touchState.lastY = touch.clientY;

    return;
  }

  if (event.touches.length === 2 && touchState.mode === "pinchpan") {
    const distance = getTouchDistance(event.touches);
    const midpoint = getTouchMidpoint(event.touches);

    const distanceDelta = distance - touchState.lastDistance;
    const midDx = midpoint.x - touchState.lastMidX;
    const midDy = midpoint.y - touchState.lastMidY;

    if (Math.abs(distanceDelta) + Math.abs(midDx) + Math.abs(midDy) > 3) {
      touchState.moved = true;
    }

    rig.radiusTarget -= distanceDelta * 0.08;
    rig.radiusTarget = Math.max(26, Math.min(100, rig.radiusTarget));

    const panScale = rig.radiusTarget * 0.0022;

    const rightX = Math.cos(rig.thetaTarget);
    const rightZ = -Math.sin(rig.thetaTarget);

    const forwardX = Math.sin(rig.thetaTarget);
    const forwardZ = Math.cos(rig.thetaTarget);

    rig.targetTarget.x -= midDx * panScale * rightX;
    rig.targetTarget.z -= midDx * panScale * rightZ;

    rig.targetTarget.x += midDy * panScale * forwardX;
    rig.targetTarget.z += midDy * panScale * forwardZ;

    clampCameraTarget();

    touchState.lastDistance = distance;
    touchState.lastMidX = midpoint.x;
    touchState.lastMidY = midpoint.y;
  }
}

function onTouchEnd(event: TouchEvent) {
  event.preventDefault();

  if (touchState.mode === "rotate" && !touchState.moved) {
    const mesh = getIntersectionFromClient(touchState.startX, touchState.startY);

    if (mesh) {
      selectMesh(mesh);
    }
  }

  if (event.touches.length === 0) {
    touchState.mode = null;
  }
}

  const resizeObserver = new ResizeObserver(updateSize);

  resizeObserver.observe(container);

  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  renderer.domElement.addEventListener("wheel", onWheel, { passive: false });

  renderer.domElement.addEventListener("touchstart", onTouchStart, {
  passive: false,
});
renderer.domElement.addEventListener("touchmove", onTouchMove, {
  passive: false,
});
renderer.domElement.addEventListener("touchend", onTouchEnd, {
  passive: false,
});
renderer.domElement.addEventListener("touchcancel", onTouchEnd, {
  passive: false,
});

  let frame = 0;

  function animate() {
    frame = window.requestAnimationFrame(animate);

    if (!pointerState.isDown) {
      rig.thetaTarget += 0.00042;
    }

    updateCamera();
    renderer.render(scene, camera);
  }

  updateSize();
  setActiveFloor("basement");
  updateCamera();
  animate();
  setIsReady(true);

  return () => {
    window.cancelAnimationFrame(frame);
    resizeObserver.disconnect();

    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    renderer.domElement.removeEventListener("wheel", onWheel);

    renderer.domElement.removeEventListener("touchstart", onTouchStart);
    renderer.domElement.removeEventListener("touchmove", onTouchMove);
    renderer.domElement.removeEventListener("touchend", onTouchEnd);
    renderer.domElement.removeEventListener("touchcancel", onTouchEnd);

    scene.traverse((object: any) => {
      if (object.geometry) {
        object.geometry.dispose();
      }

      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material: any) => {
            material.map?.dispose?.();
            material.dispose?.();
          });
        } else {
          object.material.map?.dispose?.();
          object.material.dispose?.();
        }
      }
    });

    renderer.dispose();

    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}


function makeStoreBlock(THREE: any, block: FloorBlock) {
  const height =
    block.height ??
    (block.category === "parking" ? 0.7 : block.clickable === false ? 1.15 : 2.8);

  const geometry = new THREE.BoxGeometry(block.w, height, block.d);
  const material = new THREE.MeshStandardMaterial({
    color: getBlockColor(block),
    roughness: 0.58,
    metalness: 0.04,
    transparent: (block.opacity ?? 1) < 1,
    opacity: block.opacity ?? 1,
  });

  material.userData.baseOpacity = block.opacity ?? 1;

  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(block.x, height / 2, block.z);
  mesh.castShadow = block.category !== "parking";
  mesh.receiveShadow = true;
  mesh.userData.block = block;

  const edgeMaterial = new THREE.LineBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: block.clickable === false ? 0.16 : 0.34,
  });

  edgeMaterial.userData.baseOpacity = block.clickable === false ? 0.16 : 0.34;

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    edgeMaterial
  );

  mesh.add(edges);

  return mesh;
}

function makeFloorOutline(THREE: any, floor: FloorKey) {
  if (floor === "ground") {
    return makeGroundFloorPlate(THREE);
  }

  if (floor === "first") {
    return makeFirstFloorPlate(THREE);
  }

  if (floor === "second") {
    return makeSecondFloorPlate(THREE);
  }

  const shape = new THREE.Shape();

  const left = -PLAN_WIDTH / 2;
  const right = PLAN_WIDTH / 2;
  const top = -PLAN_DEPTH / 2;
  const bottom = PLAN_DEPTH / 2;

  shape.moveTo(left, top);
  shape.lineTo(right, top);
  shape.lineTo(right, bottom - 9);
  shape.lineTo(right - 6.8, bottom);
  shape.lineTo(left + 7.5, bottom);
  shape.lineTo(left, bottom - 8);
  shape.lineTo(left, top);

  const geometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshStandardMaterial({
    color: "#f7f4ee",
    roughness: 0.84,
    metalness: 0.02,
  });

  material.userData.baseOpacity = 1;

  const mesh = new THREE.Mesh(geometry, material);

  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.02;
  mesh.receiveShadow = true;

  const borderMaterial = new THREE.LineBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.28,
  });

  borderMaterial.userData.baseOpacity = 0.28;

  const border = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    borderMaterial
  );

  border.rotation.x = -Math.PI / 2;
  border.position.y = 0.03;

  const group = new THREE.Group();

  group.add(mesh, border);

  return group;
}

function makeGroundFloorPlate(THREE: any) {
  const group = new THREE.Group();
  const voidRect = getGroundVoid();

  const material = new THREE.MeshStandardMaterial({
    color: "#f7f4ee",
    roughness: 0.84,
    metalness: 0.02,
  });

  material.userData.baseOpacity = 1;

  function addPlate(x1: number, x2: number, z1: number, z2: number) {
    const width = Math.max(0.01, x2 - x1);
    const depth = Math.max(0.01, z2 - z1);
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.05, depth),
      material.clone()
    );

    mesh.material.userData.baseOpacity = 1;
    mesh.position.set((x1 + x2) / 2, -0.025, (z1 + z2) / 2);
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  const left = -PLAN_WIDTH / 2;
  const right = PLAN_WIDTH / 2;
  const top = -PLAN_DEPTH / 2;
  const bottom = PLAN_DEPTH / 2;

  // Üst bant
  addPlate(left, right, top, voidRect.z1);

  // Alt bant
  addPlate(left, right, voidRect.z2, bottom);

  // Sol bant: kullanıcının beyazla işaretlediği taraf normal zemin kalır.
  addPlate(left, voidRect.x1, voidRect.z1, voidRect.z2);

  // Sağ bant
  addPlate(voidRect.x2, right, voidRect.z1, voidRect.z2);

  const borderMaterial = new THREE.LineBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.22,
  });

  borderMaterial.userData.baseOpacity = 0.22;

  const outerBorder = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(PLAN_WIDTH, 0.05, PLAN_DEPTH)),
    borderMaterial
  );

  outerBorder.position.set(0, 0.035, 0);
  group.add(outerBorder);

  return group;
}

function makeFirstFloorPlate(THREE: any) {
  const group = new THREE.Group();

  const material = new THREE.MeshStandardMaterial({
    color: "#f7f4ee",
    roughness: 0.84,
    metalness: 0.02,
  });

  material.userData.baseOpacity = 1;

  const holes = FIRST_ATRIUMS.map((rect) => {
    const outer = rectEdges(rect.left, rect.top, rect.width, rect.depth);

    return {
      x1: outer.x1 + FIRST_ATRIUM_INSET,
      x2: outer.x2 - FIRST_ATRIUM_INSET,
      z1: outer.z1 + FIRST_ATRIUM_INSET,
      z2: outer.z2 - FIRST_ATRIUM_INSET,
    };
  });

  const xCuts = [
    -PLAN_WIDTH / 2,
    PLAN_WIDTH / 2,
    ...holes.flatMap((hole) => [hole.x1, hole.x2]),
  ].sort((a, b) => a - b);

  const zCuts = [
    -PLAN_DEPTH / 2,
    PLAN_DEPTH / 2,
    ...holes.flatMap((hole) => [hole.z1, hole.z2]),
  ].sort((a, b) => a - b);

  function isInsideHole(cx: number, cz: number) {
    return holes.some(
      (hole) =>
        cx > hole.x1 &&
        cx < hole.x2 &&
        cz > hole.z1 &&
        cz < hole.z2
    );
  }

  for (let xIndex = 0; xIndex < xCuts.length - 1; xIndex += 1) {
    for (let zIndex = 0; zIndex < zCuts.length - 1; zIndex += 1) {
      const x1 = xCuts[xIndex];
      const x2 = xCuts[xIndex + 1];
      const z1 = zCuts[zIndex];
      const z2 = zCuts[zIndex + 1];

      const width = x2 - x1;
      const depth = z2 - z1;
      const cx = (x1 + x2) / 2;
      const cz = (z1 + z2) / 2;

      if (width <= 0.05 || depth <= 0.05 || isInsideHole(cx, cz)) {
        continue;
      }

      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.05, depth),
        material.clone()
      );

      mesh.material.userData.baseOpacity = 1;
      mesh.position.set(cx, -0.025, cz);
      mesh.receiveShadow = true;

      group.add(mesh);
    }
  }

  return group;
}

function makeSecondFloorPlate(THREE: any) {
  const group = new THREE.Group();

  const material = new THREE.MeshStandardMaterial({
    color: "#f7f4ee",
    roughness: 0.84,
    metalness: 0.02,
  });

  material.userData.baseOpacity = 1;

  const holes = SECOND_ATRIUMS.map((rect) => {
    const outer = rectEdges(rect.left, rect.top, rect.width, rect.depth);

    return {
      x1: outer.x1 + SECOND_ATRIUM_INSET,
      x2: outer.x2 - SECOND_ATRIUM_INSET,
      z1: outer.z1 + SECOND_ATRIUM_INSET,
      z2: outer.z2 - SECOND_ATRIUM_INSET,
    };
  });

  const xCuts = [
    -PLAN_WIDTH / 2,
    PLAN_WIDTH / 2,
    ...holes.flatMap((hole) => [hole.x1, hole.x2]),
  ].sort((a, b) => a - b);

  const zCuts = [
    -PLAN_DEPTH / 2,
    PLAN_DEPTH / 2,
    ...holes.flatMap((hole) => [hole.z1, hole.z2]),
  ].sort((a, b) => a - b);

  function isInsideHole(cx: number, cz: number) {
    return holes.some(
      (hole) =>
        cx > hole.x1 &&
        cx < hole.x2 &&
        cz > hole.z1 &&
        cz < hole.z2
    );
  }

  for (let xIndex = 0; xIndex < xCuts.length - 1; xIndex += 1) {
    for (let zIndex = 0; zIndex < zCuts.length - 1; zIndex += 1) {
      const x1 = xCuts[xIndex];
      const x2 = xCuts[xIndex + 1];
      const z1 = zCuts[zIndex];
      const z2 = zCuts[zIndex + 1];

      const width = x2 - x1;
      const depth = z2 - z1;
      const cx = (x1 + x2) / 2;
      const cz = (z1 + z2) / 2;

      if (width <= 0.05 || depth <= 0.05 || isInsideHole(cx, cz)) {
        continue;
      }

      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.05, depth),
        material.clone()
      );

      mesh.material.userData.baseOpacity = 1;
      mesh.position.set(cx, -0.025, cz);
      mesh.receiveShadow = true;

      group.add(mesh);
    }
  }

  return group;
}

function makeGroundAtriumFrame(THREE: any) {
  const group = new THREE.Group();

  const outer = getGroundAtriumOuter();
  const voidRect = getGroundVoid();

  const outerWidth = outer.x2 - outer.x1;
  const outerDepth = outer.z2 - outer.z1;
  const voidWidth = voidRect.x2 - voidRect.x1;
  const voidDepth = voidRect.z2 - voidRect.z1;

  const outerCenterX = (outer.x1 + outer.x2) / 2;
  const outerCenterZ = (outer.z1 + outer.z2) / 2;
  const voidCenterX = (voidRect.x1 + voidRect.x2) / 2;
  const voidCenterZ = (voidRect.z1 + voidRect.z2) / 2;

  const shaftDepth = FLOOR_Y.ground - FLOOR_Y.basement - TH;

  // Siyah çizgili atrium çerçevesi: görseldeki dikdörtgenin sınırı.
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: "#111111",
    roughness: 0.55,
    metalness: 0.06,
  });

  frameMaterial.userData.baseOpacity = 1;

  const top = new THREE.Mesh(
    new THREE.BoxGeometry(outerWidth, 0.18, 0.36),
    frameMaterial
  );
  top.position.set(outerCenterX, 0.14, outer.z1);

  const bottom = top.clone();
  bottom.position.z = outer.z2;

  const left = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.18, outerDepth),
    frameMaterial
  );
  left.position.set(outer.x1, 0.14, outerCenterZ);

  const right = left.clone();
  right.position.x = outer.x2;

  group.add(top, bottom, left, right);

  // Void'in iç duvarları. Sadece kırmızı işaretlenen boşluk bölümüne uygulanır.
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: "#f4f1eb",
    roughness: 0.96,
    metalness: 0,
  });

  wallMaterial.userData.baseOpacity = 1;

  const wallThickness = 0.22;
  const wallY = -shaftDepth / 2;

  const wallTop = new THREE.Mesh(
    new THREE.BoxGeometry(voidWidth, shaftDepth, wallThickness),
    wallMaterial
  );
  wallTop.position.set(voidCenterX, wallY, voidRect.z1 + wallThickness / 2);

  const wallBottom = wallTop.clone();
  wallBottom.position.z = voidRect.z2 - wallThickness / 2;

  const wallLeft = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, shaftDepth, voidDepth),
    wallMaterial
  );
  wallLeft.position.set(voidRect.x1 + wallThickness / 2, wallY, voidCenterZ);

  const wallRight = wallLeft.clone();
  wallRight.position.x = voidRect.x2 - wallThickness / 2;

  group.add(wallTop, wallBottom, wallLeft, wallRight);

  const bottomMaterial = new THREE.MeshStandardMaterial({
    color: "#fbfaf7",
    roughness: 1,
    metalness: 0,
  });

  bottomMaterial.userData.baseOpacity = 1;

  const bottomPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(voidWidth - 0.2, voidDepth - 0.2),
    bottomMaterial
  );

  bottomPlane.rotation.x = -Math.PI / 2;
  bottomPlane.position.set(voidCenterX, -shaftDepth + 0.04, voidCenterZ);

  group.add(bottomPlane);

  const light1 = new THREE.PointLight(0xffffff, 0.95, 36);
  light1.position.set(voidCenterX, -1.2, voidCenterZ);

  const light2 = new THREE.PointLight(0xfff4cc, 0.55, 30);
  light2.position.set(voidCenterX, -shaftDepth + 1.8, voidCenterZ);

  group.add(light1, light2);

  return group;
}

function makeFirstFloorAtriumFrames(THREE: any) {
  const group = new THREE.Group();

  function makeFrame(left: number, top: number, width: number, depth: number) {
    const rect = rectEdges(left, top, width, depth);
    const w = rect.x2 - rect.x1;
    const d = rect.z2 - rect.z1;
    const cx = (rect.x1 + rect.x2) / 2;
    const cz = (rect.z1 + rect.z2) / 2;

    const material = new THREE.MeshStandardMaterial({
      color: "#080808",
      roughness: 0.55,
      metalness: 0.06,
    });

    material.userData.baseOpacity = 1;

    const y = 0.22;

    const topBar = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.12, 0.36),
      material
    );
    topBar.position.set(cx, y, rect.z1);

    const bottomBar = topBar.clone();
    bottomBar.position.z = rect.z2;

    const leftBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.12, d),
      material
    );
    leftBar.position.set(rect.x1, y, cz);

    const rightBar = leftBar.clone();
    rightBar.position.x = rect.x2;

    group.add(topBar, bottomBar, leftBar, rightBar);
  }

  FIRST_ATRIUMS.forEach((rect) => {
    makeFrame(rect.left, rect.top, rect.width, rect.depth);
  });

  return group;
}

function makeSecondFloorAtriumFrames(THREE: any) {
  const group = new THREE.Group();

  function makeFrame(left: number, top: number, width: number, depth: number) {
    const rect = rectEdges(left, top, width, depth);
    const w = rect.x2 - rect.x1;
    const d = rect.z2 - rect.z1;
    const cx = (rect.x1 + rect.x2) / 2;
    const cz = (rect.z1 + rect.z2) / 2;

    const material = new THREE.MeshStandardMaterial({
      color: "#080808",
      roughness: 0.55,
      metalness: 0.06,
    });

    material.userData.baseOpacity = 1;

    const y = 0.22;

    const topBar = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.12, 0.36),
      material
    );
    topBar.position.set(cx, y, rect.z1);

    const bottomBar = topBar.clone();
    bottomBar.position.z = rect.z2;

    const leftBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.12, d),
      material
    );
    leftBar.position.set(rect.x1, y, cz);

    const rightBar = leftBar.clone();
    rightBar.position.x = rect.x2;

    group.add(topBar, bottomBar, leftBar, rightBar);
  }

  SECOND_ATRIUMS.forEach((rect) => {
    makeFrame(rect.left, rect.top, rect.width, rect.depth);
  });

  return group;
}

function makeStepTexture(THREE: any) {
  const canvas = document.createElement("canvas");

  canvas.width = 64;
  canvas.height = 64;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  context.fillStyle = "#c7ccd2";
  context.fillRect(0, 0, 64, 64);

  context.strokeStyle = "#969da6";
  context.lineWidth = 4;

  for (let i = 0; i <= 64; i += 12) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(64, i);
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 1);
  texture.encoding = THREE.sRGBEncoding;

  return texture;
}

function makeEscalator(
  THREE: any,
  x: number,
  z: number,
  yBottom: number,
  yTop: number,
  dir: 1 | -1,
  rotationY = 0
) {
  const run = 8.4;
  const rise = yTop - yBottom;
  const length = Math.hypot(run, rise);
  const angle = Math.atan2(rise, run) * dir;

  const group = new THREE.Group();

  const rampMaterial = new THREE.MeshStandardMaterial({
    color: 0xc2c8cf,
    roughness: 0.55,
    metalness: 0.5,
    map: makeStepTexture(THREE),
  });

  rampMaterial.userData.baseOpacity = 1;

  const ramp = new THREE.Mesh(
    new THREE.BoxGeometry(length, 0.34, 2.0),
    rampMaterial
  );

  ramp.castShadow = true;
  ramp.receiveShadow = true;

  group.add(ramp);

  const balustradeMaterial = new THREE.MeshStandardMaterial({
    color: 0x9aa3ad,
    roughness: 0.35,
    metalness: 0.55,
    transparent: true,
    opacity: 0.55,
  });

  balustradeMaterial.userData.baseOpacity = 0.55;

  const balustradeGeometry = new THREE.BoxGeometry(length, 0.9, 0.1);

  const leftGlass = new THREE.Mesh(balustradeGeometry, balustradeMaterial);
  leftGlass.position.set(0, 0.5, 1.0);

  const rightGlass = leftGlass.clone();
  rightGlass.position.z = -1.0;

  group.add(leftGlass, rightGlass);

  const handrailMaterial = new THREE.MeshStandardMaterial({
    color: 0x3a3f45,
    roughness: 0.4,
    metalness: 0.5,
  });

  handrailMaterial.userData.baseOpacity = 1;

  const handrailGeometry = new THREE.BoxGeometry(length, 0.12, 0.16);

  const leftHandrail = new THREE.Mesh(handrailGeometry, handrailMaterial);
  leftHandrail.position.set(0, 0.97, 1.0);

  const rightHandrail = leftHandrail.clone();
  rightHandrail.position.z = -1.0;

  group.add(leftHandrail, rightHandrail);

  group.rotation.z = angle;
  group.rotation.y = rotationY;
  group.position.set(x, (yBottom + yTop) / 2, z);

  return group;
}
