import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";
import { stores } from "@/data/stores";
import { locales } from "@/i18n/routing";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { getLocalizedText } from "@/lib/locale";
import type { Locale } from "@/types/content";

type KidsPageProps = {
  params: {
    locale: string;
  };
};

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    return {};
  }

  return createPageMetadata({
    locale,
    path: "/kids",
    title:
      locale === "tr"
        ? "Çocuk & Eğlence | CityMall Cyprus"
        : "Kids & Entertainment | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus’ta FunLab oyun alanı, çocuk mağazaları, aile etkinlikleri ve çocuklara özel ziyaret seçeneklerini keşfedin."
        : "Explore FunLab, kids stores, family events and child-friendly visit options at CityMall Cyprus.",
  });
}

const pageContent = {
  tr: {
    eyebrow: "Çocuk & Eğlence",
    title: "FunLab ile çocuklar için daha eğlenceli bir CityMall günü.",
    description:
      "Oyun alanları, çocuk mağazaları, aile etkinlikleri ve Cinemall seçenekleriyle CityMall Cyprus’ta çocuklu ziyaretleri daha kolay planlayın.",
    familyHighlights: "Aile Dostu Öne Çıkanlar",
    kidsStores: "Çocuk Mağazaları",
    familyEvents: "Çocuk & Aile Etkinlikleri",
    funlabTitle: "FunLab oyun ve eğlence alanı",
    funlabText:
      "Çocukların enerjisini atabileceği, ailelerin alışveriş molasını daha keyifli hale getirebileceği eğlence alanı.",
    funlabLocationLabel: "Konum",
    funlabLocation: "2. Kat",
    funlabAudienceLabel: "Hedef Kitle",
    funlabAudience: "Çocuklar ve aileler",
    location: "Konum",
    audience: "Hedef Kitle",
    storesEyebrow: "Mağazalar",
    eventsEyebrow: "Etkinlikler",
    kidsLabel: "Çocuk",
    backHome: "Ana Sayfaya Dön",
    exploreEvents: "Etkinlik Takvimine Bak",
    exploreStores: "Mağazaları Keşfet",
    features: [
      "FunLab oyun ve eğlence alanı",
      "Çocuk ve aile odaklı mağazalar",
      "Hafta sonu çocuk etkinlikleri",
    ],
    funlabCards: [
      {
        title: "Oyun molası",
        text: "Alışveriş arasında çocuklar için hareketli ve eğlenceli bir durak.",
      },
      {
        title: "Aileyle kolay plan",
        text: "Mağaza, yemek ve etkinlik planını çocuklu ziyaretlere göre düzenleyin.",
      },
      {
        title: "Hafta sonu programı",
        text: "Atölye, oyun günü ve aile etkinlikleriyle ziyareti zenginleştirin.",
      },
    ],
    storesText:
      "Çocuk giyim, oyuncak ve aile alışverişine uygun mağazaları keşfedin.",
    emptyStores: "Şu anda listelenen çocuk mağazası bulunmuyor.",
    emptyEvents: "Şu anda listelenen çocuk ve aile etkinliği bulunmuyor.",
  },
  en: {
    eyebrow: "Kids & Entertainment",
    title: "A more fun CityMall day for kids with FunLab.",
    description:
      "Plan family visits at CityMall Cyprus with play areas, kids stores, family events and Cinemall options.",
    familyHighlights: "Family-Friendly Highlights",
    kidsStores: "Kids Stores",
    familyEvents: "Kids & Family Events",
    funlabTitle: "FunLab games and entertainment area",
    funlabText:
      "An entertainment area where children can enjoy play time and families can turn a shopping break into a more enjoyable visit.",
    funlabLocationLabel: "Location",
    funlabLocation: "2nd Floor",
    funlabAudienceLabel: "Audience",
    funlabAudience: "Children and families",
    location: "Location",
    audience: "Audience",
    storesEyebrow: "Stores",
    eventsEyebrow: "Events",
    kidsLabel: "Kids",
    backHome: "Back to Home",
    exploreEvents: "View Event Calendar",
    exploreStores: "Explore Stores",
    features: [
      "FunLab games and entertainment area",
      "Kids and family-focused stores",
      "Weekend kids events",
    ],
    funlabCards: [
      {
        title: "Play break",
        text: "An active and entertaining stop for children during a CityMall visit.",
      },
      {
        title: "Easy family planning",
        text: "Plan stores, dining and events around a child-friendly visit.",
      },
      {
        title: "Weekend program",
        text: "Add workshops, game days and family events to your visit.",
      },
    ],
    storesText:
      "Explore stores suitable for kidswear, toys and family shopping.",
    emptyStores: "There are no listed kids stores at the moment.",
    emptyEvents: "There are no listed kids and family events at the moment.",
  },
};

function formatDateTime(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function KidsPage({ params }: KidsPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];
  const kidsStores = stores.filter((store) => store.category === "kids");
  const familyEvents = events.filter(
    (event) =>
      event.slug.includes("kids") ||
      event.slug.includes("family") ||
      getLocalizedText(event.audience ?? { tr: "", en: "" }, locale)
        .toLowerCase()
        .includes(locale === "tr" ? "aile" : "famil")
  );

  return (
    <main className="bg-surface-default">
      <section className="border-b border-border-default bg-surface-muted">
        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-text-muted">
              {content.eyebrow}
            </p>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
              {content.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
              {content.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/events`}
                className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:opacity-90"
              >
                {content.exploreEvents}
              </Link>

              <Link
                href={`/${locale}/stores`}
                className="rounded-full border border-border-default bg-surface-default px-6 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
              >
                {content.exploreStores}
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card">
            <p className="text-sm font-semibold text-text-primary">
              {content.familyHighlights}
            </p>

            <div className="mt-5 grid gap-3">
              {content.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-border-default bg-surface-muted p-4 text-sm font-medium text-text-secondary"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="grid gap-8 rounded-[2rem] border border-border-default bg-text-primary p-6 text-white shadow-elevated md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/55">
              FunLab
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              {content.funlabTitle}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
              {content.funlabText}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                  {content.funlabLocationLabel}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {content.funlabLocation}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                  {content.funlabAudienceLabel}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {content.funlabAudience}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {content.funlabCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-5"
              >
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/68">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid gap-8 pb-16 md:pb-20 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
            {content.storesEyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-text-primary">
            {content.kidsStores}
          </h2>

          <p className="mt-4 leading-7 text-text-secondary">
            {content.storesText}
          </p>
        </div>

        {kidsStores.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {kidsStores.map((store) => (
              <article
                key={store.id}
                className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {content.kidsLabel}
                </p>

                <h3 className="mt-4 text-2xl font-semibold text-text-primary">
                  {getLocalizedText(store.name, locale)}
                </h3>

                <p className="mt-4 line-clamp-4 text-sm leading-6 text-text-secondary">
                  {getLocalizedText(store.description, locale)}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border-default bg-surface-default p-8 text-text-secondary shadow-card">
            {content.emptyStores}
          </div>
        )}
      </section>

      <section className="border-y border-border-default bg-surface-muted">
        <div className="container py-16 md:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
                {content.eventsEyebrow}
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-text-primary">
                {content.familyEvents}
              </h2>
            </div>

            <Link
              href={`/${locale}/events`}
              className="rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
            >
              {content.exploreEvents}
            </Link>
          </div>

          {familyEvents.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-3">
              {familyEvents.map((event) => (
                <article
                  key={event.id}
                  className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                    {formatDateTime(event.date, locale)}
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold text-text-primary">
                    {getLocalizedText(event.title, locale)}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-text-secondary">
                    {getLocalizedText(event.description, locale)}
                  </p>

                  <div className="mt-6 grid gap-3 border-t border-border-default pt-5 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-text-muted">
                        {content.location}
                      </span>
                      <span className="font-medium text-text-primary">
                        {getLocalizedText(event.location, locale)}
                      </span>
                    </div>

                    {event.audience ? (
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-text-muted">
                          {content.audience}
                        </span>
                        <span className="font-medium text-text-primary">
                          {getLocalizedText(event.audience, locale)}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border-default bg-surface-default p-8 text-text-secondary shadow-card">
              {content.emptyEvents}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}