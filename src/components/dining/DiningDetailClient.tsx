"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  FileText,
  MapPin,
  Phone,
  Store,
  Utensils,
} from "lucide-react";
import { DiningCard } from "@/components/dining/DiningCard";
import { MenuDemoModal } from "@/components/dining/MenuDemoModal";
import { getLocalizedText } from "@/lib/locale";
import type { DiningCategory, DiningPlace, Floor, Locale } from "@/types/content";

type DiningDetailClientProps = {
  locale: Locale;
  place: DiningPlace;
  relatedPlaces: DiningPlace[];
};

const content = {
  tr: {
    back: "Yeme-İçme’ye Dön",
    overview: "Mekan Hakkında",
    cuisine: "Mutfak",
    placeType: "Mekan Türü",
    location: "Konum",
    workingHours: "Çalışma Saati",
    menu: "Menüyü Gör",
    contact: "Bilgi Al",
    contactText:
      "Rezervasyon, çalışma saatleri veya güncel menü bilgileri için iletişim sayfasına geçebilirsiniz.",
    similar: "Benzer Mekanlar",
    citymall: "CityMall Cyprus",
    floorLabels: {
      basement: "-1. Kat",
      ground: "Zemin Kat",
      first: "1. Kat",
      second: "2. Kat",
      "food-court": "Food Court",
      cinema: "Sinema Katı",
    },
    categoryLabels: {
      restaurant: "Restoran",
      cafe: "Cafe",
      "fast-food": "Fast Food",
      dessert: "Tatlı",
      coffee: "Cafe",
      other: "Atıştırmalık",
    },
  },
  en: {
    back: "Back to Dining",
    overview: "About This Place",
    cuisine: "Cuisine",
    placeType: "Place Type",
    location: "Location",
    workingHours: "Working Hours",
    menu: "View Menu",
    contact: "Get Information",
    contactText:
      "For reservation, working hours or current menu details, you can visit the contact page.",
    similar: "Similar Places",
    citymall: "CityMall Cyprus",
    floorLabels: {
      basement: "Basement Floor",
      ground: "Ground Floor",
      first: "1st Floor",
      second: "2nd Floor",
      "food-court": "Food Court",
      cinema: "Cinema Floor",
    },
    categoryLabels: {
      restaurant: "Restaurant",
      cafe: "Cafe",
      "fast-food": "Fast Food",
      dessert: "Dessert",
      coffee: "Cafe",
      other: "Snacks",
    },
  },
};

export function DiningDetailClient({
  locale,
  place,
  relatedPlaces,
}: DiningDetailClientProps) {
  const copy = content[locale];
  const [menuOpen, setMenuOpen] = useState(false);

  const name = getLocalizedText(place.name, locale);
  const description = getLocalizedText(place.description, locale);
  const cuisine = place.cuisine ? getLocalizedText(place.cuisine, locale) : "";
  const workingHours = place.workingHours
    ? getLocalizedText(place.workingHours, locale)
    : "-";

  const floorLabel = copy.floorLabels[place.floor as Floor] ?? place.floor;
  const categoryLabel =
    copy.categoryLabels[place.category as DiningCategory] ?? place.category;

  return (
    <main className="overflow-x-hidden bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <img
          src={place.coverImage ?? ""}
          alt={name}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,24,39,0.25)_0%,rgba(17,24,39,0.68)_48%,rgba(17,24,39,0.98)_100%)]" />

        <div className="container py-12 md:py-20">
          <Link
            href={`/${locale}/dining`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {copy.back}
          </Link>

          <div className="mt-16 max-w-5xl">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {cuisine ? (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-text-primary">
                  {cuisine}
                </span>
              ) : null}

              <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground">
                {categoryLabel}
              </span>

              <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {floorLabel}
              </span>
            </div>

            <h1 className="break-words text-5xl font-semibold tracking-tight md:text-7xl">
              {name}
            </h1>

            <p className="mt-6 max-w-3xl break-words text-lg leading-8 text-white/82 md:text-xl">
              {description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/60">
                  {copy.cuisine}
                </p>
                <p className="mt-2 text-lg font-semibold">{cuisine || "-"}</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/60">
                  {copy.placeType}
                </p>
                <p className="mt-2 text-lg font-semibold">{categoryLabel}</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/60">
                  {copy.location}
                </p>
                <p className="mt-2 text-lg font-semibold">{floorLabel}</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/60">
                  {copy.workingHours}
                </p>
                <p className="mt-2 text-lg font-semibold">{workingHours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid min-w-0 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="h-fit rounded-[2rem] border border-border-default bg-surface-muted p-6 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
                {copy.citymall}
              </p>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <Utensils className="mt-1 h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {copy.cuisine}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {cuisine || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Store className="mt-1 h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {copy.placeType}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {categoryLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {copy.location}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {floorLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 text-text-muted" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {copy.workingHours}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="min-w-0 space-y-8">
              <article className="w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card md:p-8">
                <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
                  {copy.overview}
                </h2>

                <p className="mt-5 max-w-full break-words text-base leading-8 text-text-secondary md:text-lg">
                  {description}
                </p>
              </article>

              <section className="w-full max-w-full overflow-hidden rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card md:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
                      {copy.menu}
                    </h2>

                    <p className="mt-3 max-w-2xl break-words text-sm leading-6 text-text-secondary">
                      {copy.contactText}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setMenuOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
                    >
                      <FileText className="h-4 w-4" aria-hidden="true" />
                      {copy.menu}
                    </button>

                    <Link
                      href={`/${locale}/contact`}
                      className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-muted px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {copy.contact}
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.citymall}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.similar}
            </h2>
          </div>

          <div className="grid min-w-0 gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {relatedPlaces.map((relatedPlace) => (
              <DiningCard
                key={relatedPlace.id}
                place={relatedPlace}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <MenuDemoModal
        locale={locale}
        placeName={name}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </main>
  );
}