"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Accessibility,
  BadgeCheck,
  CalendarDays,
  Car,
  Clock,
  Film,
  Info,
  Navigation,
  Store,
  Utensils,
} from "lucide-react";
import { getOpeningStatus, type OpeningStatus } from "@/lib/opening-status";
import type { Locale } from "@/types/content";

type HoursExplorerProps = {
  locale: Locale;
};

type HoursTab = "stores" | "restaurants" | "cinemall";

type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

const tabs: HoursTab[] = ["stores", "restaurants", "cinemall"];

const weekDays: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const content = {
  tr: {
    eyebrow: "Ziyaret Planlama",
    title: "CityMall Cyprus ziyaretinizi saatlere göre planlayın.",
    description:
      "Mağazalar, restoranlar, food court ve Cinemall çalışma saatlerini tek yerden takip edin.",
    statusLabel: "Mağazalar için canlı durum",
    statusLoading: "Durum hesaplanıyor...",
    subnav: {
      openingHours: "Çalışma Saatleri",
      gettingHere: "Nasıl Gidilir",
      parking: "Otopark",
      services: "Hizmetler",
      accessibility: "Erişilebilirlik",
    },
    tabs: {
      stores: "Mağazalar",
      restaurants: "Restoranlar & Food Court",
      cinemall: "Cinemall",
    },
    tabDescriptions: {
      stores:
        "CityMall mağazaları hafta içi ve hafta sonu farklı kapanış saatleriyle hizmet verir.",
      restaurants:
        "Restoranlar ve food court alanı özellikle hafta sonu daha geç saate kadar açıktır.",
      cinemall:
        "Cinemall film seanslarına göre her gün gece yarısına kadar hizmet verir.",
    },
    openingHoursTitle: "Haftalık Çalışma Saatleri",
    day: "Gün",
    open: "Açılış",
    close: "Kapanış",
    specialDaysTitle: "Özel Günler & Tatil Saatleri",
    specialDaysText:
      "Özel günlerde çalışma saatleri değişiklik gösterebilir. Güncel bilgi için CityMall duyurularını takip edin.",
    specialColumns: {
      day: "Özel Gün",
      period: "Tarih / Dönem",
      stores: "Mağazalar",
      restaurants: "Restoranlar",
      cinemall: "Cinemall",
      note: "Not",
    },
    specialNoteDefault: "Duyurulara göre güncellenir",
    planningTitle: "Ziyaretinizi tamamlayın",
    planningText:
      "Ulaşım, otopark, hizmetler ve erişilebilirlik bilgilerini ziyaretinizden önce kontrol edin.",
    planningCards: {
      gettingHere: {
        title: "Nasıl Gidilir",
        text: "Konum ve yol tarifi için iletişim ve harita sayfasına geçin.",
        cta: "Haritaya Git",
      },
      parking: {
        title: "Otopark",
        text: "AVM otopark alanlarını ve yönlendirme tabelalarını ziyaret sırasında takip edin.",
        cta: "Otopark Bilgisi",
      },
      services: {
        title: "Hizmetler",
        text: "Danışma, aile alanları ve ziyaretçi hizmetleri için ilgili bölümleri inceleyin.",
        cta: "Hizmetleri Gör",
      },
      accessibility: {
        title: "Erişilebilirlik",
        text: "Engelli erişimi ve ziyaret kolaylığı sağlayan alanlar için bilgi alın.",
        cta: "Erişilebilirlik Bilgilerini Gör",
       },
    },
    days: {
      monday: "Pazartesi",
      tuesday: "Salı",
      wednesday: "Çarşamba",
      thursday: "Perşembe",
      friday: "Cuma",
      saturday: "Cumartesi",
      sunday: "Pazar",
    },
    specialDays: [
      {
        day: "Yılbaşı",
        period: "1 Ocak",
        stores: "Duyurulacak",
        restaurants: "Duyurulacak",
        cinemall: "Duyurulacak",
      },
      {
        day: "Ramazan Bayramı 1. Gün",
        period: "Bayram dönemi",
        stores: "Duyurulacak",
        restaurants: "Duyurulacak",
        cinemall: "Duyurulacak",
      },
      {
        day: "Ramazan Bayramı 2. Gün",
        period: "Bayram dönemi",
        stores: "Duyurulacak",
        restaurants: "Duyurulacak",
        cinemall: "Duyurulacak",
      },
      {
        day: "Kurban Bayramı 1. Gün",
        period: "Bayram dönemi",
        stores: "Duyurulacak",
        restaurants: "Duyurulacak",
        cinemall: "Duyurulacak",
      },
      {
        day: "Kurban Bayramı 2. Gün",
        period: "Bayram dönemi",
        stores: "Duyurulacak",
        restaurants: "Duyurulacak",
        cinemall: "Duyurulacak",
      },
      {
        day: "Özel Etkinlik Günleri",
        period: "Duyuruya göre",
        stores: "Değişebilir",
        restaurants: "Değişebilir",
        cinemall: "Değişebilir",
      },
    ],
  },
  en: {
    eyebrow: "Visit Planning",
    title: "Plan your CityMall Cyprus visit around opening hours.",
    description:
      "Check store, restaurant, food court and Cinemall opening hours in one place.",
    statusLabel: "Live status for stores",
    statusLoading: "Checking status...",
    subnav: {
      openingHours: "Opening Hours",
      gettingHere: "Getting Here",
      parking: "Parking",
      services: "Services",
      accessibility: "Accessibility",
    },
    tabs: {
      stores: "Stores",
      restaurants: "Restaurants & Food Court",
      cinemall: "Cinemall",
    },
    tabDescriptions: {
      stores:
        "CityMall stores operate with different closing hours on weekdays and weekends.",
      restaurants:
        "Restaurants and the food court stay open later, especially on weekends.",
      cinemall:
        "Cinemall operates every day until midnight depending on movie showtimes.",
    },
    openingHoursTitle: "Weekly Opening Hours",
    day: "Day",
    open: "Open",
    close: "Close",
    specialDaysTitle: "Special Days & Holiday Hours",
    specialDaysText:
      "Opening hours may vary on special days. Follow CityMall announcements for current information.",
    specialColumns: {
      day: "Special Day",
      period: "Date / Period",
      stores: "Stores",
      restaurants: "Restaurants",
      cinemall: "Cinemall",
      note: "Note",
    },
    specialNoteDefault: "Updated by announcement",
    planningTitle: "Complete your visit plan",
    planningText:
      "Check directions, parking, services and accessibility information before your visit.",
    planningCards: {
      gettingHere: {
        title: "Getting Here",
        text: "Visit the contact and map page for location and directions.",
        cta: "Go to Map",
      },
      parking: {
        title: "Parking",
        text: "Follow mall parking areas and directional signs during your visit.",
        cta: "Parking Info",
      },
      services: {
        title: "Services",
        text: "Review information points, family areas and visitor services.",
        cta: "View Services",
      },
      accessibility: {
        title: "Accessibility",
        text: "Find information about accessible access and visitor support areas.",
        cta: "View Accessibility Info",
      },
    },
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },
    specialDays: [
      {
        day: "New Year’s Day",
        period: "January 1",
        stores: "To be announced",
        restaurants: "To be announced",
        cinemall: "To be announced",
      },
      {
        day: "Ramadan Feast Day 1",
        period: "Holiday period",
        stores: "To be announced",
        restaurants: "To be announced",
        cinemall: "To be announced",
      },
      {
        day: "Ramadan Feast Day 2",
        period: "Holiday period",
        stores: "To be announced",
        restaurants: "To be announced",
        cinemall: "To be announced",
      },
      {
        day: "Eid al-Adha Day 1",
        period: "Holiday period",
        stores: "To be announced",
        restaurants: "To be announced",
        cinemall: "To be announced",
      },
      {
        day: "Eid al-Adha Day 2",
        period: "Holiday period",
        stores: "To be announced",
        restaurants: "To be announced",
        cinemall: "To be announced",
      },
      {
        day: "Special Event Days",
        period: "By announcement",
        stores: "May vary",
        restaurants: "May vary",
        cinemall: "May vary",
      },
    ],
  },
};

function getHoursForTab(tab: HoursTab, day: DayKey) {
  const isWeekend = day === "saturday" || day === "sunday";

  if (tab === "stores") {
    return {
      open: "10:00",
      close: isWeekend ? "23:00" : "22:00",
    };
  }

  if (tab === "restaurants") {
    return {
      open: "10:00",
      close: isWeekend ? "00:00" : "23:00",
    };
  }

  return {
    open: "11:00",
    close: "00:00",
  };
}

export function HoursExplorer({ locale }: HoursExplorerProps) {
  const copy = content[locale];
  const [activeTab, setActiveTab] = useState<HoursTab>("stores");
  const [status, setStatus] = useState<OpeningStatus | null>(null);

  useEffect(() => {
    function updateStatus() {
      setStatus(getOpeningStatus(locale));
    }

    updateStatus();

    const intervalId = window.setInterval(updateStatus, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, [locale]);

  const planningCards = [
  {
    id: "getting-here",
    icon: Navigation,
    href: `/${locale}/map#directions`,
    ...copy.planningCards.gettingHere,
  },
  {
    id: "parking-info",
    icon: Car,
    href: `/${locale}/map#parking`,
    ...copy.planningCards.parking,
  },
  {
  id: "services-info",
  icon: BadgeCheck,
  href: `/${locale}/services`,
  ...copy.planningCards.services,
},
  {
    id: "accessibility-info",
    icon: Accessibility,
    href: `/${locale}/map#parking`,
    ...copy.planningCards.accessibility,
  },
];

  return (
    <main className="overflow-x-hidden bg-surface-default">
      <section className="border-b border-border-default bg-surface-muted/45">
        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-text-muted">
              {copy.eyebrow}
            </p>

            <h1 className="mt-6 max-w-5xl break-words text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#opening-hours"
                className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:opacity-90"
              >
                {copy.subnav.openingHours}
              </a>

              <Link
                href={`/${locale}/contact`}
                className="rounded-full border border-border-default bg-surface-default px-6 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
              >
                {copy.subnav.gettingHere}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  status?.isOpen
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <Clock className="h-5 w-5" aria-hidden="true" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {copy.statusLabel}
                </p>

                <p
                  className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${
                    status?.isOpen
                      ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                      : "border-red-100 bg-red-50 text-red-700"
                  }`}
                >
                  {status ? status.statusText : copy.statusLoading}
                </p>

                <p className="mt-4 text-sm leading-6 text-text-secondary">
                  {copy.tabDescriptions.stores}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-30 border-b border-border-default bg-surface-default/90 backdrop-blur">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto py-3 [-webkit-overflow-scrolling:touch]">
            <a
              href="#opening-hours"
              className="whitespace-nowrap rounded-full bg-surface-muted px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
            >
              {copy.subnav.openingHours}
            </a>

            <Link
              href={`/${locale}/contact`}
              className="whitespace-nowrap rounded-full bg-surface-muted px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
            >
              {copy.subnav.gettingHere}
            </Link>

            <a
              href="#parking-info"
              className="whitespace-nowrap rounded-full bg-surface-muted px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
            >
              {copy.subnav.parking}
            </a>

            <a
              href="#services-info"
              className="whitespace-nowrap rounded-full bg-surface-muted px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
            >
              {copy.subnav.services}
            </a>

            <a
              href="#accessibility-info"
              className="whitespace-nowrap rounded-full bg-surface-muted px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
            >
              {copy.subnav.accessibility}
            </a>
          </div>
        </div>
      </nav>

      <section id="opening-hours" className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.subnav.openingHours}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.openingHoursTitle}
            </h2>
          </div>

          <div className="rounded-[2rem] border border-border-default bg-surface-default p-4 shadow-card md:p-5">
            <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-full border px-5 py-3 text-sm font-semibold transition ${
                    activeTab === tab
                      ? "border-brand-primary bg-brand-primary text-brand-foreground"
                      : "border-border-default bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                  }`}
                >
                  {copy.tabs[tab]}
                </button>
              ))}
            </div>

            <div className="mb-6 rounded-3xl bg-surface-muted p-5">
              <div className="flex items-start gap-3">
                {activeTab === "stores" ? (
                  <Store className="mt-1 h-5 w-5 text-text-muted" />
                ) : activeTab === "restaurants" ? (
                  <Utensils className="mt-1 h-5 w-5 text-text-muted" />
                ) : (
                  <Film className="mt-1 h-5 w-5 text-text-muted" />
                )}

                <div>
                  <h3 className="text-xl font-semibold text-text-primary">
                    {copy.tabs[activeTab]}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {copy.tabDescriptions[activeTab]}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border-default">
              <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] bg-surface-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                <span>{copy.day}</span>
                <span>{copy.open}</span>
                <span>{copy.close}</span>
              </div>

              <div className="divide-y divide-border-default">
                {weekDays.map((day) => {
                  const hours = getHoursForTab(activeTab, day);

                  return (
                    <div
                      key={`${activeTab}-${day}`}
                      className="grid grid-cols-[1.2fr_0.8fr_0.8fr] px-4 py-4 text-sm"
                    >
                      <span className="font-semibold text-text-primary">
                        {copy.days[day]}
                      </span>

                      <span className="text-text-secondary">{hours.open}</span>

                      <span className="font-semibold text-text-primary">
                        {hours.close}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              <CalendarDays className="mr-2 inline h-4 w-4" aria-hidden="true" />
              {copy.specialDaysTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.specialDaysTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.specialDaysText}
            </p>
          </div>

          <div className="overflow-x-auto rounded-[2rem] border border-border-default bg-surface-default shadow-card">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1.2fr] bg-surface-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                <span>{copy.specialColumns.day}</span>
                <span>{copy.specialColumns.period}</span>
                <span>{copy.specialColumns.stores}</span>
                <span>{copy.specialColumns.restaurants}</span>
                <span>{copy.specialColumns.cinemall}</span>
                <span>{copy.specialColumns.note}</span>
              </div>

              <div className="divide-y divide-border-default">
                {copy.specialDays.map((specialDay) => (
                  <div
                    key={`${specialDay.day}-${specialDay.period}`}
                    className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1.2fr] px-4 py-4 text-sm"
                  >
                    <span className="font-semibold text-text-primary">
                      {specialDay.day}
                    </span>
                    <span className="text-text-secondary">
                      {specialDay.period}
                    </span>
                    <span className="text-text-secondary">
                      {specialDay.stores}
                    </span>
                    <span className="text-text-secondary">
                      {specialDay.restaurants}
                    </span>
                    <span className="text-text-secondary">
                      {specialDay.cinemall}
                    </span>
                    <span className="text-text-muted">
                      {copy.specialNoteDefault}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              <Info className="mr-2 inline h-4 w-4" aria-hidden="true" />
              {copy.planningTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.planningTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.planningText}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {planningCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.id}
                  id={card.id}
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

                  {card.href.startsWith("/") ? (
                    <Link
                      href={card.href}
                      className="mt-5 inline-flex rounded-full border border-border-default bg-surface-muted px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
                    >
                      {card.cta}
                    </Link>
                  ) : (
                    <a
                      href={card.href}
                      className="mt-5 inline-flex rounded-full border border-border-default bg-surface-muted px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
                    >
                      {card.cta}
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}