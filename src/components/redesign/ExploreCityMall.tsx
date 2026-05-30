"use client";

import {
  Accessibility,
  Baby,
  BatteryCharging,
  Car,
  Clock3,
  CreditCard,
  Film,
  Gift,
  Layers3,
  MapPinned,
  ShoppingBag,
  Sparkles,
  Utensils,
  Wifi,
  Gamepad2,
  Landmark,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  getOpeningStatus,
  type OpeningStatus,
} from "@/lib/opening-status";
import type { Locale } from "@/types/content";

type ExploreCityMallProps = {
  locale: Locale;
};

type FloorKey = "basement" | "ground" | "first" | "second";

type FloorBlock = {
  label: string;
  type: "fashion" | "dining" | "cinema" | "kids" | "service" | "parking";
  x: number;
  y: number;
  w: number;
  h: number;
};

type ServiceItem = {
  icon: LucideIcon;
  label: string;
};

const content = {
  tr: {
    eyebrow: "Explore CityMall",
    title: "Explore CityMall",
    subtitle: "İhtiyacın olan her şey tek noktada.",
    floorGuide: "İnteraktif Kat Rehberi",
    floorText:
      "Katları değiştirerek mağaza, yeme-içme, sinema ve aile alanlarını hızlıca keşfet.",
    today: "BUGÜN",
    openingHours: "Çalışma Saatleri",
    hoursRange: "10:00 — 22:00",
    open: "Şu an açık",
    closed: "Kapalı",
    defaultClosed: "Kapalı · Yarın 10:00'da açılıyor",
    services: "Hizmetler",
    servicesText: "Ziyaretini kolaylaştıran temel hizmetler.",
    floors: {
      basement: "-1",
      ground: "Zemin",
      first: "1. Kat",
      second: "2. Kat",
    },
    mapLabels: {
      fashion: "Moda",
      dining: "Yeme-İçme",
      cinema: "Cinemall",
      kids: "FunLab",
      service: "Hizmet",
      parking: "Otopark",
    },
    serviceItems: {
      valet: "Vale",
      wifi: "Ücretsiz Wi-Fi",
      baby: "Bebek Odası",
      accessibility: "Erişilebilirlik",
      charging: "Şarj Noktası",
      parking: "Otopark",
      atm: "ATM",
      giftCard: "Hediye Kartı",
    },
  },
  en: {
    eyebrow: "Explore CityMall",
    title: "Explore CityMall",
    subtitle: "Everything you need in one destination.",
    floorGuide: "Interactive Floor Guide",
    floorText:
      "Switch between floors to discover stores, dining, cinema and family areas quickly.",
    today: "TODAY",
    openingHours: "Opening Hours",
    hoursRange: "10:00 — 22:00",
    open: "Currently Open",
    closed: "Closed",
    defaultClosed: "Closed · Opens tomorrow at 10:00",
    services: "Services",
    servicesText: "Essential services that make every visit easier.",
    floors: {
      basement: "-1",
      ground: "Ground",
      first: "1st",
      second: "2nd",
    },
    mapLabels: {
      fashion: "Fashion",
      dining: "Dining",
      cinema: "Cinemall",
      kids: "FunLab",
      service: "Service",
      parking: "Parking",
    },
    serviceItems: {
      valet: "Valet",
      wifi: "Free Wi-Fi",
      baby: "Baby Room",
      accessibility: "Accessibility",
      charging: "Charging Station",
      parking: "Parking",
      atm: "ATM",
      giftCard: "Gift Card",
    },
  },
};

const floorOrder: FloorKey[] = ["basement", "ground", "first", "second"];

const floorBlocks: Record<FloorKey, FloorBlock[]> = {
  basement: [
    { label: "Parking", type: "parking", x: 8, y: 18, w: 34, h: 24 },
    { label: "Services", type: "service", x: 50, y: 16, w: 28, h: 22 },
    { label: "ATM", type: "service", x: 18, y: 58, w: 24, h: 18 },
    { label: "Access", type: "service", x: 58, y: 54, w: 30, h: 20 },
  ],
  ground: [
    { label: "Fashion", type: "fashion", x: 8, y: 15, w: 28, h: 23 },
    { label: "Dining", type: "dining", x: 45, y: 13, w: 30, h: 22 },
    { label: "Services", type: "service", x: 14, y: 56, w: 26, h: 22 },
    { label: "Fashion", type: "fashion", x: 55, y: 55, w: 34, h: 24 },
  ],
  first: [
    { label: "Fashion", type: "fashion", x: 9, y: 16, w: 34, h: 24 },
    { label: "Home", type: "service", x: 52, y: 14, w: 30, h: 22 },
    { label: "Books", type: "service", x: 15, y: 58, w: 28, h: 20 },
    { label: "Beauty", type: "fashion", x: 56, y: 56, w: 30, h: 21 },
  ],
  second: [
    { label: "Cinemall", type: "cinema", x: 8, y: 16, w: 36, h: 25 },
    { label: "Food Court", type: "dining", x: 54, y: 15, w: 32, h: 23 },
    { label: "FunLab", type: "kids", x: 16, y: 58, w: 30, h: 22 },
    { label: "Kids", type: "kids", x: 58, y: 57, w: 28, h: 20 },
  ],
};

const typeStyles: Record<FloorBlock["type"], string> = {
  fashion: "border-[#EC008C]/25 bg-[#EC008C] text-white",
  dining: "border-[#F7941D]/25 bg-[#F7941D] text-black",
  cinema: "border-[#0072BC]/25 bg-[#0072BC] text-white",
  kids: "border-[#FFD100]/30 bg-[#FFD100] text-black",
  service: "border-[#39B54A]/25 bg-[#39B54A] text-white",
  parking: "border-[#0072BC]/25 bg-[#0072BC] text-white",
};

const serviceColorClasses = [
  "bg-[#E8312A] text-white",
  "bg-[#0072BC] text-white",
  "bg-[#EC008C] text-white",
  "bg-[#39B54A] text-white",
  "bg-[#F7941D] text-black",
  "bg-[#FFD100] text-black",
  "bg-[#0072BC] text-white",
  "bg-[#EC008C] text-white",
];

const typeIcons: Record<FloorBlock["type"], LucideIcon> = {
  fashion: ShoppingBag,
  dining: Utensils,
  cinema: Film,
  kids: Gamepad2,
  service: Sparkles,
  parking: Car,
};

function getDayName(locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    weekday: "long",
  }).format(new Date());
}

export function ExploreCityMall({ locale }: ExploreCityMallProps) {
  const copy = content[locale];
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFloor, setActiveFloor] = useState<FloorKey>("ground");
  const [openingStatus, setOpeningStatus] = useState<OpeningStatus | null>(
    null
  );

  const services: ServiceItem[] = useMemo(
    () => [
      { icon: Car, label: copy.serviceItems.valet },
      { icon: Wifi, label: copy.serviceItems.wifi },
      { icon: Baby, label: copy.serviceItems.baby },
      { icon: Accessibility, label: copy.serviceItems.accessibility },
      { icon: BatteryCharging, label: copy.serviceItems.charging },
      { icon: Landmark, label: copy.serviceItems.parking },
      { icon: CreditCard, label: copy.serviceItems.atm },
      { icon: Gift, label: copy.serviceItems.giftCard },
    ],
    [copy]
  );

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function updateOpeningStatus() {
      setOpeningStatus(getOpeningStatus(locale));
    }

    updateOpeningStatus();

    const interval = window.setInterval(updateOpeningStatus, 60_000);

    return () => window.clearInterval(interval);
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#f5f5f3] py-20 text-text-primary md:py-28"
    >
      <style>{`
        @keyframes exploreReveal {
          0% {
            opacity: 0;
            transform: translateY(40px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes floorMapEnter {
          0% {
            opacity: 0;
            transform: translateY(12px);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .explore-citymall-reveal,
          .floor-map-transition,
          .floor-block,
          .service-item {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,rgba(180,126,47,0.10),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(17,24,39,0.05),transparent_28%)]" />

      <div className="container">
        <div
          className={`explore-citymall-reveal mx-auto mb-12 max-w-4xl text-center md:mb-16 ${
            isVisible
              ? "[animation:exploreReveal_850ms_cubic-bezier(0.22,1,0.36,1)_both]"
              : "opacity-0"
          }`}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-text-muted">
            {copy.eyebrow}
          </p>

          <h2 className="text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
            {copy.title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
            {copy.subtitle}
          </p>
        </div>

        <div
          className={`explore-citymall-reveal grid gap-6 lg:grid-cols-[1.15fr_0.85fr] ${
            isVisible
              ? "[animation:exploreReveal_900ms_cubic-bezier(0.22,1,0.36,1)_120ms_both]"
              : "opacity-0"
          }`}
        >
          <FloorNavigator
            locale={locale}
            activeFloor={activeFloor}
            setActiveFloor={setActiveFloor}
          />

          <div className="grid gap-6">
            <OpeningHoursCard
              locale={locale}
              openingStatus={openingStatus}
              dayName={getDayName(locale)}
            />

            <ServicesCard services={services} locale={locale} />
          </div>
        </div>

        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent" />
      </div>
    </section>
  );
}

function FloorNavigator({
  locale,
  activeFloor,
  setActiveFloor,
}: {
  locale: Locale;
  activeFloor: FloorKey;
  setActiveFloor: (floor: FloorKey) => void;
}) {
  const copy = content[locale];

  return (
    <div className="min-h-[420px] rounded-[2rem] border border-white/60 bg-white/70 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl md:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border-default bg-white text-text-primary shadow-card">
            <Layers3 className="h-5 w-5" aria-hidden="true" />
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
            {copy.floorGuide}
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
            {copy.floorText}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {floorOrder.map((floor) => {
            const isActive = activeFloor === floor;

            return (
              <button
                key={floor}
                type="button"
                onClick={() => setActiveFloor(floor)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-text-primary text-white shadow-card"
                    : "border border-border-default bg-white text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                }`}
              >
                {copy.floors[floor]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-7 rounded-[1.5rem] border border-border-default bg-[#f7f2ea] p-4 shadow-inner">
        <div
          key={activeFloor}
          className="floor-map-transition grid gap-3 [animation:floorMapEnter_450ms_cubic-bezier(0.22,1,0.36,1)_both] sm:grid-cols-2"
        >
          {floorOrder.map((floor) => (
            <MiniFloorPlate
              key={floor}
              floor={floor}
              locale={locale}
              isActive={activeFloor === floor}
              onClick={() => setActiveFloor(floor)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniFloorPlate({
  floor,
  locale,
  isActive,
  onClick,
}: {
  floor: FloorKey;
  locale: Locale;
  isActive: boolean;
  onClick: () => void;
}) {
  const copy = content[locale];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative h-[190px] overflow-hidden rounded-[1.25rem] border bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(245,245,243,0.72))] p-3 text-left transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.13)] ${
        isActive
          ? "border-text-primary shadow-[0_18px_50px_rgba(15,23,42,0.16)]"
          : "border-white/80 shadow-card"
      }`}
      aria-pressed={isActive}
    >
      <div className="absolute left-[8%] top-1/2 h-3 w-[84%] -translate-y-1/2 rounded-full bg-slate-900/8" />
      <div className="absolute left-1/2 top-[14%] h-[72%] w-3 -translate-x-1/2 rounded-full bg-slate-900/8" />

      <div
        className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1.5 text-xs font-semibold shadow-card ${
          isActive
            ? "bg-text-primary text-white"
            : "border border-border-default bg-white/82 text-text-secondary"
        }`}
      >
        {copy.floors[floor]}
      </div>

      <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border-default bg-white/82 text-text-primary shadow-card">
        <MapPinned className="h-3.5 w-3.5" aria-hidden="true" />
      </div>

      {floorBlocks[floor].map((block) => (
        <MiniFloorBlock
          key={`${floor}-${block.label}-${block.x}`}
          block={block}
          locale={locale}
          isActiveFloor={isActive}
        />
      ))}

      <div
        className={`pointer-events-none absolute inset-0 rounded-[1.25rem] transition duration-300 ${
          isActive
            ? "ring-2 ring-text-primary/12"
            : "ring-1 ring-white/40 group-hover:ring-text-primary/8"
        }`}
      />
    </button>
  );
}

function MiniFloorBlock({
  block,
  locale,
  isActiveFloor,
}: {
  block: FloorBlock;
  locale: Locale;
  isActiveFloor: boolean;
}) {
  const copy = content[locale];
  const Icon = typeIcons[block.type];

  const style = {
    left: `${block.x}%`,
    top: `${block.y}%`,
    width: `${block.w}%`,
    height: `${block.h}%`,
  } as CSSProperties;

  return (
    <div
      style={style}
      className={`floor-block absolute flex flex-col justify-between rounded-xl border p-2 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition duration-300 group-hover:shadow-[0_14px_34px_rgba(15,23,42,0.15)] ${
        typeStyles[block.type]
      } ${isActiveFloor ? "opacity-100" : "opacity-72"}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />

      <div className="min-w-0">
        <p className="truncate text-[0.68rem] font-bold leading-tight">
          {block.label}
        </p>

        <p className="mt-0.5 hidden truncate text-[0.55rem] font-semibold uppercase tracking-[0.12em] opacity-60 md:block">
          {copy.mapLabels[block.type]}
        </p>
      </div>
    </div>
  );
}
  
function OpeningHoursCard({
  locale,
  openingStatus,
  dayName,
}: {
  locale: Locale;
  openingStatus: OpeningStatus | null;
  dayName: string;
}) {
  const copy = content[locale];
  const isOpen = Boolean(openingStatus?.isOpen);
  const statusText =
    openingStatus?.statusText ??
    (isOpen ? copy.open : copy.defaultClosed);

  return (
    <div className="rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border-default bg-white text-text-primary shadow-card">
            <Clock3 className="h-5 w-5" aria-hidden="true" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
            {copy.today}
          </p>

          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary">
            {dayName}
          </h3>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
            isOpen
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isOpen ? "bg-emerald-500" : "bg-rose-500"
            }`}
            aria-hidden="true"
          />
          {isOpen ? copy.open : copy.closed}
        </span>
      </div>

      <div className="mt-7 rounded-[1.5rem] border border-border-default bg-white p-5 shadow-card">
        <p className="text-sm font-semibold text-text-muted">
          {copy.openingHours}
        </p>

        <p className="mt-2 text-4xl font-semibold tracking-tight text-text-primary">
          {copy.hoursRange}
        </p>

        <p className="mt-3 text-sm leading-6 text-text-secondary">
          {statusText}
        </p>
      </div>
    </div>
  );
}

function ServicesCard({
  services,
  locale,
}: {
  services: ServiceItem[];
  locale: Locale;
}) {
  const copy = content[locale];

  return (
    <div className="rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
          {copy.services}
        </p>

        <h3 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary">
          {copy.services}
        </h3>

        <p className="mt-2 text-sm leading-6 text-text-secondary">
          {copy.servicesText}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
        {services.map((service, index) => {
          const Icon = service.icon;
          const colorClass =
            serviceColorClasses[index % serviceColorClasses.length];

          return (
            <div
              key={service.label}
              className="service-item group rounded-2xl border border-border-default bg-white p-4 shadow-card transition duration-300 hover:-translate-y-0.5 hover:bg-surface-muted hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)]"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_28px_rgba(0,0,0,0.16)] ${colorClass}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <p className="mt-3 text-sm font-semibold leading-5 text-text-primary">
                {service.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}