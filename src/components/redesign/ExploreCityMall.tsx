"use client";

import { FloorMap3D } from "@/components/redesign/FloorMap3D";
import {
  Accessibility,
  Baby,
  BatteryCharging,
  Car,
  ChevronRight,
  Clock3,
  CreditCard,
  Gift,
  Landmark,
  Layers3,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getOpeningStatus,
  type OpeningStatus,
} from "@/lib/opening-status";
import type { Locale } from "@/types/content";

type ExploreCityMallProps = {
  locale: Locale;
};

type ServiceItem = {
  icon: LucideIcon;
  label: string;
};

type TimeInfo = {
  dayName: string;
  hoursRange: string;
};

const content = {
  tr: {
    eyebrow: "CityMall Rehberi",
    title: "CityMall'ı Keşfet",
    subtitle: "İhtiyacın olan her şey tek noktada.",
    floorGuide: "Kat Planını Gör",
    floorText:
      "Mağaza konumları, kat bilgileri ve ziyaret rotaları için harita sayfasına geç.",
    mapCta: "Kat Planını Gör",
    mapHelper: "Detaylı kat planı ve mağaza konumları için harita sayfasını aç.",
    today: "BUGÜN",
    openingHours: "Çalışma Saatleri",
    open: "Şu an açık",
    closed: "Kapalı",
    defaultClosed: "Kapalı · Yarın 10:00'da açılıyor",
    servicesEyebrow: "AVM Hizmetleri",
    services: "Hizmetler",
    servicesText: "Ziyaretini kolaylaştıran temel hizmetler.",
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
    eyebrow: "CityMall Guide",
    title: "Explore CityMall",
    subtitle: "Everything you need in one destination.",
    floorGuide: "View Floor Plan",
    floorText:
      "Open the map page for store locations, floor details and visitor routes.",
    mapCta: "View Floor Plan",
    mapHelper: "Open the map page for detailed floor plans and store locations.",
    today: "TODAY",
    openingHours: "Opening Hours",
    open: "Currently Open",
    closed: "Closed",
    defaultClosed: "Closed · Opens tomorrow at 10:00",
    servicesEyebrow: "Mall Services",
    services: "Services",
    servicesText: "Essential services that make every visit easier.",
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

const cityMallCoordinates = {
  lat: 35.1259061,
  lng: 33.921234,
};

const mapEmbedUrl = `https://www.google.com/maps?q=${cityMallCoordinates.lat},${cityMallCoordinates.lng}&ll=${cityMallCoordinates.lat},${cityMallCoordinates.lng}&z=17&hl=tr&output=embed`;

const cityMallMapsUrl = "https://maps.app.goo.gl/KDUQpTdHwGMozPGF6";
  
function getDayName(locale: Locale, date = new Date()) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    weekday: "long",
  }).format(date);
}

function getTodayHoursRange(date = new Date()) {
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;

  return isWeekend ? "10:00 — 23:00" : "10:00 — 22:00";
}

export function ExploreCityMall({ locale }: ExploreCityMallProps) {
  const copy = content[locale];
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openingStatus, setOpeningStatus] = useState<OpeningStatus | null>(
    null
  );
  const [timeInfo, setTimeInfo] = useState<TimeInfo | null>(null);

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
      const now = new Date();

      setOpeningStatus(getOpeningStatus(locale, now));
      setTimeInfo({
        dayName: getDayName(locale, now),
        hoursRange: getTodayHoursRange(now),
      });
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

        @media (prefers-reduced-motion: reduce) {
          .explore-citymall-reveal,
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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,rgba(232,49,42,0.08),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(0,114,188,0.07),transparent_28%)]" />

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
          <FloorNavigator locale={locale} />

          <div className="grid gap-6">
            <OpeningHoursCard
              locale={locale}
              openingStatus={openingStatus}
              dayName={timeInfo?.dayName ?? (locale === "tr" ? "Bugün" : "Today")}
              hoursRange={timeInfo?.hoursRange ?? "10:00 — 22:00"}
            />

            <ServicesCard services={services} locale={locale} />
          </div>
        </div>

        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent" />
      </div>
    </section>
  );
}

function FloorNavigator({ locale }: { locale: Locale }) {
  const copy = content[locale];

  return (
    <div className="min-h-[420px] rounded-[2rem] border border-white/60 bg-white/70 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl md:p-6">
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

      <div className="mt-7 rounded-[1.5rem] border border-border-default bg-white p-5 shadow-card">
        <button
  type="button"
  onClick={() => {
    document
      .getElementById("citymall-3d-floor-guide")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }}
  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD100] px-6 py-4 text-sm font-semibold text-black shadow-card transition hover:-translate-y-0.5 hover:bg-[#F7941D]"
>
  {copy.mapCta}
  <ChevronRight className="h-4 w-4 rotate-90" aria-hidden="true" />
</button>

        <p className="mt-4 text-center text-sm leading-6 text-text-secondary">
          {copy.mapHelper}
        </p>
      </div>

      <div id="citymall-3d-floor-guide" className="scroll-mt-24">
  <FloorMap3D locale={locale} />
</div>

<div className="mt-5 overflow-hidden rounded-[1.5rem] border border-border-default bg-white shadow-card">
  <div className="relative h-[320px] w-full overflow-hidden rounded-[1.5rem]">
    <iframe
      title={
        locale === "tr"
          ? "CityMall konum haritası"
          : "CityMall location map"
      }
      src={mapEmbedUrl}
      className="h-full w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />

    <a
      href={cityMallMapsUrl}
      target="_blank"
      rel="noreferrer"
      className="absolute left-3 top-3 z-20 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#1a73e8] shadow-[0_2px_8px_rgba(15,23,42,0.18)] transition hover:bg-slate-50"
    >
      {locale === "tr" ? "Haritada Göster" : "View on Map"}
      <span aria-hidden="true">↗</span>
    </a>
  </div>
</div>
    </div>
  );
}

function OpeningHoursCard({
  locale,
  openingStatus,
  dayName,
  hoursRange,
}: {
  locale: Locale;
  openingStatus: OpeningStatus | null;
  dayName: string;
  hoursRange: string;
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
          {hoursRange}
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
          {copy.servicesEyebrow}
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