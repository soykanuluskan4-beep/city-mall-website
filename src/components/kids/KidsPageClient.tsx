/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  ArrowRight,
  Baby,
  CalendarDays,
  Gamepad2,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { EventCard } from "@/components/events/EventCard";
import { events } from "@/data/events";
import { stores } from "@/data/stores";
import { getLocalizedText } from "@/lib/locale";
import type { Locale, Store } from "@/types/content";

type KidsPageClientProps = {
  locale: Locale;
};

const content = {
  tr: {
    eyebrow: "Çocuk & Eğlence",
    title: "Eğlence burada başlıyor.",
    description:
      "FunLab, çocuk mağazaları ve aile etkinlikleriyle CityMall’de çocuklu ziyaretleri daha keyifli planlayın.",
    primaryCta: "Etkinliklere Bak",
    secondaryCta: "Mağazaları Keşfet",
    heroAlt: "Çocuklar için eğlence ve oyun alanı atmosferi",

    funlabEyebrow: "FunLab",
    funlabTitle: "Çocuklar için oyun, eğlence ve hareketli bir mola.",
    funlabText:
      "FunLab, CityMall Cyprus’ta çocukların enerjisini atabileceği, ailelerin alışveriş ve yemek molasını daha keyifli hale getirebileceği eğlence alanıdır.",
    funlabAlt: "Çocuk oyun ve eğlence alanı",
    funlabCta: "Etkinlik Takvimine Git",
    locationLabel: "Konum",
    locationValue: "2. Kat",
    audienceLabel: "Yaş Grubu",
    audienceValue: "Çocuklar ve aileler",

    features: [
      {
        title: "Oyun Alanı",
        text: "Çocukların hareket edebileceği, enerjisini atabileceği eğlenceli bir alan.",
      },
      {
        title: "Aileyle Mola",
        text: "Alışveriş arasında çocuklu aileler için keyifli bir durak.",
      },
      {
        title: "Aktiviteler",
        text: "Hafta sonu programları ve çocuk etkinlikleriyle desteklenen bir deneyim.",
      },
      {
        title: "2. Kat Konumu",
        text: "Yeme-içme ve sinema rotasına yakın, kolay ulaşılabilir konum.",
      },
    ],

    storesEyebrow: "Çocuk Mağazaları",
    storesTitle: "Çocuk alışverişini kolayca planla.",
    storesText:
      "Oyuncak, çocuk giyim ve aile alışverişine uygun mağazalara göz atın.",
    storesCta: "Tüm Mağazalara Git",
    emptyStores: "Şu anda listelenen çocuk mağazası bulunmuyor.",
    storeCategory: "Çocuk",

    eventsEyebrow: "Aile Etkinlikleri",
    eventsTitle: "Çocuklar ve aileler için etkinlikler.",
    eventsText:
      "Çocuk atölyeleri, oyun günleri ve aile programlarını takip edin.",
    eventsCta: "Tüm Etkinliklere Git",
    emptyEvents: "Şu anda listelenen çocuk ve aile etkinliği bulunmuyor.",

    infoEyebrow: "Pratik Bilgiler",
    infoTitle: "Gitmeden önce bilmen gerekenler.",
    infoCards: [
      {
        title: "Konum",
        text: "FunLab ve çocuk eğlence alanı 2. katta konumlanır.",
      },
      {
        title: "Çalışma Saati",
        text: "AVM çalışma saatleri içinde ziyaret edilebilir.",
      },
      {
        title: "Ulaşım",
        text: "Asansör ve yürüyen merdivenlerle kolay erişim sağlanır.",
      },
      {
        title: "Ebeveyn Notu",
        text: "Bebek arabasıyla erişime uygun ziyaret rotası planlanabilir.",
      },
    ],
  },
  en: {
    eyebrow: "Kids & Entertainment",
    title: "The fun starts here.",
    description:
      "Plan a more enjoyable family visit at CityMall with FunLab, kids stores and family events.",
    primaryCta: "View Events",
    secondaryCta: "Explore Stores",
    heroAlt: "Kids entertainment and play area atmosphere",

    funlabEyebrow: "FunLab",
    funlabTitle: "A playful, active break for children.",
    funlabText:
      "FunLab is the CityMall Cyprus entertainment area where children can enjoy play time and families can turn a shopping or dining break into a more enjoyable visit.",
    funlabAlt: "Kids play and entertainment area",
    funlabCta: "Go to Event Calendar",
    locationLabel: "Location",
    locationValue: "2nd Floor",
    audienceLabel: "Age Group",
    audienceValue: "Children and families",

    features: [
      {
        title: "Play Area",
        text: "A fun space where children can move, play and enjoy an active break.",
      },
      {
        title: "Family Break",
        text: "A convenient stop for families during shopping and dining visits.",
      },
      {
        title: "Activities",
        text: "Supported with weekend programs and child-friendly events.",
      },
      {
        title: "2nd Floor Location",
        text: "Easy to reach, close to dining and cinema routes.",
      },
    ],

    storesEyebrow: "Kids Stores",
    storesTitle: "Plan kids shopping with ease.",
    storesText:
      "Browse stores suitable for toys, kidswear and family shopping.",
    storesCta: "Go to All Stores",
    emptyStores: "There are no listed kids stores at the moment.",
    storeCategory: "Kids",

    eventsEyebrow: "Family Events",
    eventsTitle: "Events for children and families.",
    eventsText:
      "Follow kids workshops, game days and family programs.",
    eventsCta: "Go to All Events",
    emptyEvents: "There are no listed kids and family events at the moment.",

    infoEyebrow: "Practical Information",
    infoTitle: "What to know before you visit.",
    infoCards: [
      {
        title: "Location",
        text: "FunLab and the kids entertainment area are located on the 2nd floor.",
      },
      {
        title: "Opening Hours",
        text: "Available during mall opening hours.",
      },
      {
        title: "Access",
        text: "Easy access by elevator and escalator.",
      },
      {
        title: "Parent Note",
        text: "A stroller-friendly visit route can be planned.",
      },
    ],
  },
};

const heroImage =
  "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=2200&q=85";

const funlabImage =
  "https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&w=1600&q=85";

const featureIcons = [Gamepad2, UsersRound, Sparkles, MapPin];
const infoIcons = [MapPin, CalendarDays, ArrowRight, Baby];

function isFamilyEvent(event: (typeof events)[number], locale: Locale) {
  const audience = event.audience
    ? getLocalizedText(event.audience, locale).toLowerCase()
    : "";

  return (
    event.category === "kids" ||
    event.category === "family" ||
    audience.includes(locale === "tr" ? "çocuk" : "kid") ||
    audience.includes(locale === "tr" ? "aile" : "famil")
  );
}

function KidsStoreCard({
  store,
  locale,
  categoryLabel,
}: {
  store: Store;
  locale: Locale;
  categoryLabel: string;
}) {
  const name = getLocalizedText(store.name, locale);
  const description = getLocalizedText(store.description, locale);

  return (
    <article className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elevated">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
          {categoryLabel}
        </span>

        {store.isNew ? (
          <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-foreground">
            New
          </span>
        ) : null}
      </div>

      <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-surface-muted text-2xl font-semibold text-text-primary shadow-card">
        {name.slice(0, 1)}
      </div>

      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-text-primary">
        {name}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
        {description}
      </p>
    </article>
  );
}

export function KidsPageClient({ locale }: KidsPageClientProps) {
  const copy = content[locale];
  const kidsStores = stores.filter((store) => store.category === "kids");
  const familyEvents = events
    .filter((event) => isFamilyEvent(event, locale))
    .slice(0, 3);

  return (
    <main className="overflow-x-hidden bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <img
          src={heroImage}
          alt={copy.heroAlt}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,24,39,0.28)_0%,rgba(17,24,39,0.68)_48%,rgba(17,24,39,0.96)_100%)]" />

        <div className="container py-16 md:py-24">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/62">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78 md:text-xl">
              {copy.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/events`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href={`/${locale}/stores`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {copy.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid overflow-hidden rounded-[2rem] border border-border-default bg-text-primary text-white shadow-elevated lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/55">
                {copy.funlabEyebrow}
              </p>

              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
                {copy.funlabTitle}
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
                {copy.funlabText}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                    {copy.locationLabel}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {copy.locationValue}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                    {copy.audienceLabel}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {copy.audienceValue}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {copy.features.map((feature, index) => {
                  const Icon = featureIcons[index] ?? Sparkles;

                  return (
                    <article
                      key={feature.title}
                      className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>

                      <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                        {feature.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-white/68">
                        {feature.text}
                      </p>
                    </article>
                  );
                })}
              </div>

              <Link
                href={`/${locale}/events`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
              >
                {copy.funlabCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="relative min-h-[360px] bg-surface-muted lg:min-h-full">
              <img
                src={funlabImage}
                alt={copy.funlabAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
                {copy.storesEyebrow}
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
                {copy.storesTitle}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
                {copy.storesText}
              </p>
            </div>

            <Link
              href={`/${locale}/stores`}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
            >
              {copy.storesCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {kidsStores.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {kidsStores.map((store) => (
                <KidsStoreCard
                  key={store.id}
                  store={store}
                  locale={locale}
                  categoryLabel={copy.storeCategory}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-border-default bg-surface-default p-8 text-center text-text-muted shadow-card">
              {copy.emptyStores}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
                {copy.eventsEyebrow}
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
                {copy.eventsTitle}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
                {copy.eventsText}
              </p>
            </div>

            <Link
              href={`/${locale}/events`}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
            >
              {copy.eventsCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {familyEvents.length ? (
            <div className="grid gap-5 lg:grid-cols-3">
              {familyEvents.map((event) => (
                <EventCard key={event.id} event={event} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-border-default bg-surface-muted p-8 text-center text-text-muted shadow-card">
              {copy.emptyEvents}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.infoEyebrow}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.infoTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {copy.infoCards.map((card, index) => {
              const Icon = infoIcons[index] ?? MapPin;

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
    </main>
  );
}