"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Accessibility,
  ArrowUpRight,
  Building2,
  Bus,
  Car,
  Film,
  Map,
  Navigation,
  ParkingCircle,
  Store as StoreIcon,
  Utensils,
} from "lucide-react";
import { diningPlaces } from "@/data/dining";
import { stores } from "@/data/stores";
import { getLocalizedText } from "@/lib/locale";
import type { DiningPlace, Floor, Locale, Store } from "@/types/content";

type MapExplorerProps = {
  locale: Locale;
};

type VisitorFloor = "basement" | "ground" | "first" | "second";

type FloorItem = {
  id: string;
  name: string;
  description: string;
  href: string;
  type: "store" | "dining" | "cinemall" | "info";
  meta: string;
};

const CITYMALL_COORDINATES = {
  lat: 35.1261651,
  lng: 33.9215289,
};

const mapEmbedUrl = `https://www.google.com/maps?q=${CITYMALL_COORDINATES.lat},${CITYMALL_COORDINATES.lng}&z=16&output=embed`;

const googleMapsUrl = "https://maps.app.goo.gl/EahpdnFAX9NoZvHv6";

const floorTabs: VisitorFloor[] = ["basement", "ground", "first", "second"];

const content = {
  tr: {
    eyebrow: "Harita & Ulaşım",
    title: "CityMall Cyprus’a ulaşımı ve kat planını keşfedin.",
    description:
      "Konum, yol tarifi, otopark bilgileri ve katlara göre mağaza/mekan listeleriyle ziyaretinizi kolayca planlayın.",
    openGoogleMaps: "Google Maps’te Aç",
    mapTitle: "Konum Haritası",
    mapDescription:
      "Harita yüklenmezse Google Maps bağlantısını kullanarak konumu yeni sekmede açabilirsiniz.",
    mapFallbackTitle: "Harita önizlemesi yüklenemedi",
    mapFallbackText:
      "Tarayıcı veya güvenlik ayarları iframe haritayı engelliyor olabilir. Konumu Google Maps’te açabilirsiniz.",
    directionsTitle: "Nasıl Gidilir?",
    byCar: {
      title: "Araçla",
      text: "Gazimağusa merkezinden ana yolları takip ederek CityMall Cyprus konumuna ulaşabilirsiniz. Canlı navigasyon için Google Maps bağlantısını kullanın.",
    },
    publicTransport: {
      title: "Toplu Taşıma",
      text: "Toplu taşıma saatleri ve güzergâhları dönemsel olarak değişebilir. Güncel hat bilgileri için yerel ulaşım duyurularını kontrol edin.",
    },
    floorPlanTitle: "Kat Planı",
    floorPlanText:
      "Kompleks SVG harita yerine, katlara göre mağaza ve mekan listelerini pratik bir grid düzeninde gösteriyoruz.",
    floors: {
      basement: "-1. Kat",
      ground: "Zemin Kat",
      first: "1. Kat",
      second: "2. Kat",
    },
    floorDescriptions: {
      basement: "Alt kat mekanları ve hızlı alışveriş noktaları.",
      ground: "Ana girişe yakın mağaza, cafe ve restoran noktaları.",
      first: "Alışveriş ve mağaza alanları.",
      second: "Food Court, Cinemall ve üst kat mağazaları.",
    },
    itemTypes: {
      store: "Mağaza",
      dining: "Yeme-İçme",
      cinemall: "Cinemall",
      info: "Bilgi",
    },
    noItems: "Bu katta listelenecek mekan bulunamadı.",
    parkingTitle: "Otopark Bilgisi",
    parkingText:
      "Otopark bilgileri ticari teslim öncesinde CityMall tarafından doğrulanmalıdır.",
    parkingCards: [
      {
        title: "Geniş Otopark Alanı",
         text: "Otopark kullanımı, giriş noktaları ve uygun alan bilgileri ziyaret sırasında yönlendirmelerle takip edilebilir.",
      },
      {
        title: "Ana Giriş Yönlendirmesi",
        text: "AVM girişine yakın yönlendirme tabelaları takip edilebilir.",
      },
      {
        title: "Engelli Park Yerleri",
        text: "Engelli ziyaretçiler için ayrılmış park alanları belirtilmelidir.",
      },
      {
        title: "Saat Bilgisi",
        text: "Otopark saatleri AVM çalışma saatlerine göre değişebilir.",
      },
    ],
    visitCtaTitle: "Ziyaretinizi planlamaya devam edin.",
    visitCtaText:
      "Çalışma saatleri, Cinemall seansları ve yeme-içme seçeneklerini ziyaretinizden önce inceleyin.",
    visitCtaHours: "Çalışma Saatleri",
    visitCtaDining: "Yeme-İçme",
  },
  en: {
    eyebrow: "Map & Directions",
    title: "Explore CityMall Cyprus location and floor plan.",
    description:
      "Plan your visit with location, directions, parking information and floor-based store/place lists.",
    openGoogleMaps: "Open in Google Maps",
    mapTitle: "Location Map",
    mapDescription:
      "If the map does not load, use the Google Maps link to open the location in a new tab.",
    mapFallbackTitle: "Map preview could not be loaded",
    mapFallbackText:
      "Your browser or security settings may be blocking the embedded map. You can open the location in Google Maps.",
    directionsTitle: "How to Get Here",
    byCar: {
      title: "By Car",
      text: "You can reach CityMall Cyprus by following the main roads from central Famagusta. Use the Google Maps link for live navigation.",
    },
    publicTransport: {
      title: "Public Transport",
      text: "Public transport routes and schedules may vary. Please check local transport announcements for current route information.",
    },
    floorPlanTitle: "Floor Plan",
    floorPlanText:
      "Instead of a complex SVG map, floor-based stores and places are shown in a practical grid layout.",
    floors: {
      basement: "Basement Floor",
      ground: "Ground Floor",
      first: "1st Floor",
      second: "2nd Floor",
    },
    floorDescriptions: {
      basement: "Basement-level places and quick shopping points.",
      ground: "Stores, cafes and restaurants near the main entrance.",
      first: "Shopping and store areas.",
      second: "Food Court, Cinemall and upper-floor stores.",
    },
    itemTypes: {
      store: "Store",
      dining: "Dining",
      cinemall: "Cinemall",
      info: "Info",
    },
    noItems: "No listed places for this floor.",
    parkingTitle: "Parking Information",
    parkingText:
      "Parking information should be verified by CityMall before commercial handoff.",
    parkingCards: [
      {
        title: "Spacious Parking Area",
         text: "Parking areas, entrance points and available directions can be followed through on-site guidance during your visit.",
      },
      {
        title: "Main Entrance Directions",
        text: "Directional signs near the mall entrance can be followed.",
      },
      {
        title: "Accessible Parking",
        text: "Accessible parking areas should be clearly indicated for visitors.",
      },
      {
        title: "Hours Information",
        text: "Parking hours may vary according to mall opening hours.",
      },
    ],
    visitCtaTitle: "Continue planning your visit.",
    visitCtaText:
      "Review opening hours, Cinemall showtimes and dining options before your visit.",
    visitCtaHours: "Opening Hours",
    visitCtaDining: "Dining",
  },
};

const storeCategoryLabels = {
  tr: {
    fashion: "Moda",
    electronics: "Elektronik",
    home: "Ev & Yaşam",
    beauty: "Güzellik",
    sports: "Spor",
    books: "Kitap & Kırtasiye",
    services: "Hizmet",
    kids: "Çocuk",
    other: "Diğer",
  },
  en: {
    fashion: "Fashion",
    electronics: "Electronics",
    home: "Home & Living",
    beauty: "Beauty",
    sports: "Sports",
    books: "Books & Stationery",
    services: "Services",
    kids: "Kids",
    other: "Other",
  },
};

const diningCategoryLabels = {
  tr: {
    restaurant: "Restoran",
    cafe: "Cafe",
    "fast-food": "Fast Food",
    dessert: "Tatlı",
    coffee: "Cafe",
    other: "Atıştırmalık",
  },
  en: {
    restaurant: "Restaurant",
    cafe: "Cafe",
    "fast-food": "Fast Food",
    dessert: "Dessert",
    coffee: "Cafe",
    other: "Snacks",
  },
};

function getVisitorFloor(floor: Floor): VisitorFloor {
  if (floor === "food-court" || floor === "cinema") {
    return "second";
  }

  if (floor === "basement" || floor === "ground" || floor === "first") {
    return floor;
  }

  return "second";
}

function getStoreMeta(store: Store, locale: Locale) {
  return (
    storeCategoryLabels[locale][
      store.category as keyof (typeof storeCategoryLabels)["tr"]
    ] ?? store.category
  );
}

function getDiningMeta(place: DiningPlace, locale: Locale) {
  if (place.cuisine) {
    return getLocalizedText(place.cuisine, locale);
  }

  return (
    diningCategoryLabels[locale][
      place.category as keyof (typeof diningCategoryLabels)["tr"]
    ] ?? place.category
  );
}

function getFloorItems(floor: VisitorFloor, locale: Locale): FloorItem[] {
  const storeItems = stores
    .filter((store) => getVisitorFloor(store.floor) === floor)
    .map((store) => ({
      id: `store-${store.id}`,
      name: getLocalizedText(store.name, locale),
      description: getLocalizedText(store.description, locale),
      href: `/${locale}/stores`,
      type: "store" as const,
      meta: getStoreMeta(store, locale),
    }));

  const diningItems = diningPlaces
    .filter((place) => getVisitorFloor(place.floor) === floor)
    .map((place) => ({
      id: `dining-${place.id}`,
      name: getLocalizedText(place.name, locale),
      description: getLocalizedText(place.description, locale),
      href: `/${locale}/dining/${place.slug}`,
      type: "dining" as const,
      meta: getDiningMeta(place, locale),
    }));

  const extraItems: FloorItem[] =
    floor === "second"
      ? [
          {
            id: "cinemall-info",
            name: "Cinemall",
            description:
              locale === "tr"
                ? "Film seansları ve Cinemall deneyimi 2. katta."
                : "Movie showtimes and the Cinemall experience are on the 2nd floor.",
            href: `/${locale}/cinema`,
            type: "cinemall",
            meta: locale === "tr" ? "Sinema" : "Cinema",
          },
          {
            id: "food-court-info",
            name: "Food Court",
            description:
              locale === "tr"
                ? "Yeme-içme mekanlarının büyük bölümü 2. katta yer alır."
                : "Most dining places are located on the 2nd floor.",
            href: `/${locale}/dining`,
            type: "info",
            meta: locale === "tr" ? "Yeme-İçme Alanı" : "Dining Area",
          },
        ]
      : [];

  return [...extraItems, ...diningItems, ...storeItems].sort((a, b) =>
    a.name.localeCompare(b.name, locale)
  );
}

function getItemIcon(type: FloorItem["type"]) {
  if (type === "dining") {
    return Utensils;
  }

  if (type === "cinemall") {
    return Film;
  }

  if (type === "info") {
    return Building2;
  }

  return StoreIcon;
}

export function MapExplorer({ locale }: MapExplorerProps) {
  const copy = content[locale];
  const [activeFloor, setActiveFloor] = useState<VisitorFloor>("ground");
  const [mapFailed, setMapFailed] = useState(false);

  const activeItems = useMemo(
    () => getFloorItems(activeFloor, locale),
    [activeFloor, locale]
  );

  return (
    <main className="overflow-x-hidden bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_38%),linear-gradient(135deg,rgba(17,24,39,1),rgba(42,49,63,1))]" />

        <div className="container py-16 md:py-24">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 break-words text-5xl font-semibold tracking-tight md:text-7xl">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-3xl break-words text-lg leading-8 text-white/78 md:text-xl">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {copy.openGoogleMaps}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#floor-plan"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {copy.floorPlanTitle}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
                {copy.mapTitle}
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
                {copy.mapTitle}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
                {copy.mapDescription}
              </p>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
            >
              {copy.openGoogleMaps}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-surface-muted shadow-elevated">
            {!mapFailed ? (
              <iframe
                title="CityMall Cyprus Google Maps"
                src={mapEmbedUrl}
                className="h-[360px] w-full border-0 md:h-[520px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onError={() => setMapFailed(true)}
              />
            ) : (
              <div className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center md:min-h-[520px]">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-primary text-brand-foreground">
                  <Map className="h-7 w-7" aria-hidden="true" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-text-primary">
                  {copy.mapFallbackTitle}
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary">
                  {copy.mapFallbackText}
                </p>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
                >
                  {copy.openGoogleMaps}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <section
  id="directions"
  className="scroll-mt-28 border-y border-border-default bg-surface-muted/45 py-12 md:py-16"
>
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.directionsTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.directionsTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
                <Car className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
                {copy.byCar.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-text-secondary">
                {copy.byCar.text}
              </p>
            </article>

            <article className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
                <Bus className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
                {copy.publicTransport.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-text-secondary">
                {copy.publicTransport.text}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="floor-plan" className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.floorPlanTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.floorPlanTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.floorPlanText}
            </p>
          </div>

          <div className="rounded-[2rem] border border-border-default bg-surface-default p-4 shadow-card md:p-5">
            <div className="mb-6 w-full max-w-full overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
              <div className="flex w-max gap-2 px-1">
                {floorTabs.map((floor) => (
                  <button
                    key={floor}
                    type="button"
                    onClick={() => setActiveFloor(floor)}
                    className={`whitespace-nowrap rounded-full border px-5 py-3 text-sm font-semibold transition ${
                      activeFloor === floor
                        ? "border-brand-primary bg-brand-primary text-brand-foreground"
                        : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                    }`}
                  >
                    {copy.floors[floor]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 rounded-3xl bg-surface-muted p-5">
              <h3 className="text-2xl font-semibold text-text-primary">
                {copy.floors[activeFloor]}
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {copy.floorDescriptions[activeFloor]}
              </p>
            </div>

            {activeItems.length ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {activeItems.map((item) => {
                  const Icon = getItemIcon(item.type);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group min-w-0 rounded-[1.5rem] border border-border-default bg-surface-muted p-5 transition hover:-translate-y-0.5 hover:bg-surface-subtle hover:shadow-card"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface-default text-text-primary shadow-card">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>

                        <div className="min-w-0">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-surface-default px-3 py-1 text-xs font-semibold text-text-muted">
                              {copy.itemTypes[item.type]}
                            </span>

                            <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-text-primary">
                              {item.meta}
                            </span>
                          </div>

                          <h4 className="break-words text-lg font-semibold text-text-primary">
                            {item.name}
                          </h4>

                          <p className="mt-2 line-clamp-2 break-words text-sm leading-6 text-text-secondary">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-border-default bg-surface-muted p-8 text-center">
                <p className="text-sm font-semibold text-text-muted">
                  {copy.noItems}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section
  id="parking"
  className="scroll-mt-28 border-y border-border-default bg-surface-muted/45 py-12 md:py-16"
>
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.parkingTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.parkingTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.parkingText}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {copy.parkingCards.map((card, index) => {
             const icons = [
              ParkingCircle,
              Navigation,
              Accessibility,
              Accessibility,
            ];
              const Icon = icons[index] ?? ParkingCircle;

              return (
                <article
                  key={card.title}
                  className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {card.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="rounded-[2rem] border border-border-default bg-text-primary p-6 text-white shadow-elevated md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {copy.visitCtaTitle}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">
                  {copy.visitCtaText}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/hours`}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
                >
                  {copy.visitCtaHours}
                </Link>

                <Link
                  href={`/${locale}/dining`}
                  className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  {copy.visitCtaDining}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}