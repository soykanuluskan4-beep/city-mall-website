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
        ? "CityMall Cyprus çocuk mağazaları, aile etkinlikleri ve eğlence odaklı konsept alanlarını keşfedin."
        : "Explore CityMall Cyprus kids stores, family events and entertainment-focused concept areas.",
  });
}

const pageContent = {
  tr: {
    eyebrow: "Çocuk & Eğlence",
    title: "Aileler ve çocuklar için keyifli bir AVM deneyimi.",
    description:
      "Çocuk mağazaları, aile etkinlikleri ve eğlence odaklı konsept alanlarla CityMall Cyprus’ta daha renkli bir ziyaret deneyimi.",
    familyHighlights: "Aile Dostu Öne Çıkanlar",
    kidsStores: "Çocuk Mağazaları",
    familyEvents: "Aile Etkinlikleri",
    location: "Konum",
    audience: "Hedef Kitle",
    backHome: "Ana sayfaya dön",
    exploreEvents: "Etkinlikleri Gör",
    features: [
      "Çocuk ve aile odaklı mağazalar",
      "Hafta sonu etkinlikleri",
      "Eğlence ve oyun konseptleri",
    ],
    emptyEvents: "Şu anda listelenen aile etkinliği bulunmuyor.",
  },
  en: {
    eyebrow: "Kids & Entertainment",
    title: "A pleasant mall experience for families and children.",
    description:
      "A more colorful visit experience at CityMall Cyprus with kids stores, family events and entertainment-focused concept areas.",
    familyHighlights: "Family-Friendly Highlights",
    kidsStores: "Kids Stores",
    familyEvents: "Family Events",
    location: "Location",
    audience: "Audience",
    backHome: "Back to home",
    exploreEvents: "View Events",
    features: [
      "Kids and family-focused stores",
      "Weekend events",
      "Entertainment and play concepts",
    ],
    emptyEvents: "There are no listed family events at the moment.",
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
                href={`/${locale}`}
                className="rounded-full border border-border-default bg-surface-default px-6 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
              >
                {content.backHome}
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

      <section className="container grid gap-8 py-16 md:py-20 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
            Stores
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-text-primary">
            {content.kidsStores}
          </h2>

          <p className="mt-4 leading-7 text-text-secondary">
            {locale === "tr"
              ? "Çocuk giyim, oyuncak ve aile alışverişine uygun konsept mağazalar."
              : "Concept stores suitable for kidswear, toys and family shopping."}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {kidsStores.map((store) => (
            <article
              key={store.id}
              className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                Kids
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
      </section>

      <section className="border-y border-border-default bg-surface-muted">
        <div className="container py-16 md:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
                Events
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