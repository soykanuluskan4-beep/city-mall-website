import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { campaigns } from "@/data/campaigns";
import { diningPlaces } from "@/data/dining";
import {
  JsonLd,
  createOrganizationSchema,
  createShoppingMallSchema,
} from "@/lib/schema";
import { events } from "@/data/events";
import { stores } from "@/data/stores";
import { locales } from "@/i18n/routing";
import { getLocalizedText } from "@/lib/locale";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type HomePageProps = {
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
    path: "",
    title:
      locale === "tr"
        ? "CityMall Cyprus | Gazimağusa'nın buluşma noktası"
        : "CityMall Cyprus | Famagusta's meeting point",
    description:
      locale === "tr"
        ? "CityMall Cyprus konsept sitesinde mağazalar, yeme-içme seçenekleri, kampanyalar, etkinlikler, sinema ve ziyaret bilgilerini keşfedin."
        : "Discover stores, dining options, campaigns, events, cinema and visitor information on the CityMall Cyprus concept website.",
  });
}

const pageContent = {
  tr: {
    eyebrow: "CityMall Cyprus",
    title: "Alışveriş, lezzet ve eğlenceyi tek çatı altında keşfet.",
    description:
      "CityMall Cyprus konsept sitesi; mağazalar, yeme-içme alanları, kampanyalar, etkinlikler ve ziyaret bilgilerini modern bir AVM deneyimiyle sunar.",
    storesTitle: "Öne Çıkan Mağazalar",
    diningTitle: "Yeme-İçme",
    campaignsTitle: "Kampanyalar",
    eventsTitle: "Etkinlikler",
    visitTitle: "Ziyaretinizi planlayın",
    visitDescription:
      "Çalışma saatleri, harita ve iletişim bilgileriyle CityMall Cyprus deneyimini kolayca planlayın.",
    viewAll: "Tümünü Gör",
    exploreStores: "Mağazaları Keşfet",
    planVisit: "Ziyaret Bilgileri",
    featured: "Öne Çıkan",
    conceptBadge: "Kurumsal AVM web sitesi konsepti",
    demoNotice:
      "Bu çalışma resmi site değildir; portföy ve konsept demonstrasyonu amacıyla hazırlanmıştır.",
    locationHint: "Gazimağusa · KKTC",
    contact: "İletişim",
  },
  en: {
    eyebrow: "CityMall Cyprus",
    title: "Discover shopping, dining and entertainment under one roof.",
    description:
      "The CityMall Cyprus concept website presents stores, dining areas, campaigns, events and visitor information through a modern mall experience.",
    storesTitle: "Featured Stores",
    diningTitle: "Dining",
    campaignsTitle: "Campaigns",
    eventsTitle: "Events",
    visitTitle: "Plan your visit",
    visitDescription:
      "Plan your CityMall Cyprus experience easily with opening hours, map and contact information.",
    viewAll: "View All",
    exploreStores: "Explore Stores",
    planVisit: "Visit Info",
    featured: "Featured",
    conceptBadge: "Corporate mall website concept",
    demoNotice:
      "This is not an official website; it was created for portfolio and concept demonstration purposes.",
    locationHint: "Famagusta · TRNC",
    contact: "Contact",
  },
};

export default function HomePage({ params }: HomePageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];
  const organizationSchema = createOrganizationSchema(locale);
  const shoppingMallSchema = createShoppingMallSchema(locale);

  const featuredStores = stores.filter((store) => store.featured).slice(0, 3);
  const featuredCampaigns = campaigns
    .filter((campaign) => campaign.featured)
    .slice(0, 2);
  const featuredEvents = events.filter((event) => event.featured).slice(0, 2);
  const featuredDining = diningPlaces
    .filter((place) => place.featured)
    .slice(0, 2);

  return (
  <main className="bg-surface-default">
    <JsonLd data={organizationSchema} />
    <JsonLd data={shoppingMallSchema} />
      <section className="relative overflow-hidden border-b border-border-default bg-[radial-gradient(circle_at_top_right,rgba(17,24,39,0.10),transparent_34%),linear-gradient(180deg,#f9fafb_0%,#ffffff_100%)]">
        <div className="container grid min-h-[720px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-default px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted shadow-card">
              <span className="h-2 w-2 rounded-full bg-brand-primary" />
              {content.conceptBadge}
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.35em] text-text-muted">
              {content.eyebrow}
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-text-primary md:text-7xl">
              {content.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
              {content.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/stores`}
                className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {content.exploreStores}
              </Link>

              <Link
                href={`/${locale}/hours`}
                className="rounded-full border border-border-default bg-surface-default px-6 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
              >
                {content.planVisit}
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-text-muted">
              <span className="rounded-full border border-border-default bg-surface-default px-4 py-2 shadow-card">
                {content.locationHint}
              </span>
              <span className="rounded-full border border-border-default bg-surface-default px-4 py-2 shadow-card">
  TR / EN
</span>
            </div>

            <p className="mt-8 max-w-xl text-sm leading-6 text-text-muted">
              {content.demoNotice}
            </p>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-primary/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-brand-primary/10 blur-2xl" />

            <div className="relative rounded-[2rem] border border-border-default bg-surface-default p-5 shadow-elevated">
              <div className="rounded-[1.5rem] bg-brand-primary p-7 text-brand-foreground">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] opacity-70">
                    {content.featured}
                  </p>

                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
  {locale === "tr" ? "Kampanya" : "Campaign"}
</span>
                </div>

                <h2 className="mt-5 text-3xl font-semibold">
                  {getLocalizedText(featuredCampaigns[0].title, locale)}
                </h2>

                <p className="mt-4 leading-7 opacity-80">
                  {getLocalizedText(featuredCampaigns[0].description, locale)}
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {featuredStores.slice(0, 2).map((store) => (
                  <article
                    key={store.id}
                    className="rounded-2xl border border-border-default bg-surface-muted p-5 transition hover:bg-surface-subtle"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                      {store.category}
                    </p>

                    <h3 className="mt-3 text-lg font-semibold text-text-primary">
                      {getLocalizedText(store.name, locale)}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-text-secondary">
                      {getLocalizedText(store.description, locale)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <SectionHeading
          eyebrow="Stores"
          title={content.storesTitle}
          href={`/${locale}/stores`}
          viewAll={content.viewAll}
        />

        <div className="grid gap-5 md:grid-cols-3">
          {featuredStores.map((store) => (
            <article
              key={store.id}
              className="rounded-3xl border border-border-default bg-surface-default p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                {store.category}
              </p>

              <h3 className="mt-4 text-xl font-semibold text-text-primary">
                {getLocalizedText(store.name, locale)}
              </h3>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
                {getLocalizedText(store.description, locale)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border-default bg-surface-muted">
        <div className="container grid gap-8 py-20 lg:grid-cols-2">
          <PreviewList
            title={content.campaignsTitle}
            href={`/${locale}/campaigns`}
            viewAll={content.viewAll}
            items={featuredCampaigns.map((campaign) => ({
              id: campaign.id,
              title: getLocalizedText(campaign.title, locale),
              description: getLocalizedText(campaign.description, locale),
              badge: campaign.badge
                ? getLocalizedText(campaign.badge, locale)
                : campaign.status,
            }))}
          />

          <PreviewList
            title={content.eventsTitle}
            href={`/${locale}/events`}
            viewAll={content.viewAll}
            items={featuredEvents.map((event) => ({
              id: event.id,
              title: getLocalizedText(event.title, locale),
              description: getLocalizedText(event.description, locale),
              badge: getLocalizedText(event.location, locale),
            }))}
          />
        </div>
      </section>

      <section className="container grid gap-8 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
            Dining
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-text-primary md:text-4xl">
            {content.diningTitle}
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-text-secondary">
            {locale === "tr"
              ? "Kahve molasından aile yemeklerine kadar farklı lezzet seçenekleri."
              : "Different taste options from coffee breaks to family meals."}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {featuredDining.map((place) => (
            <article
              key={place.id}
              className="rounded-3xl border border-border-default bg-surface-default p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                {place.cuisine
                  ? getLocalizedText(place.cuisine, locale)
                  : place.category}
              </p>

              <h3 className="mt-4 text-xl font-semibold text-text-primary">
                {getLocalizedText(place.name, locale)}
              </h3>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
                {getLocalizedText(place.description, locale)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pb-20">
        <div className="rounded-[2rem] bg-brand-primary p-8 text-brand-foreground shadow-elevated md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-70">
            {content.locationHint}
          </p>

          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
            {content.visitTitle}
          </h2>

          <p className="mt-4 max-w-2xl leading-7 opacity-80">
            {content.visitDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/${locale}/hours`}
              className="rounded-full bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card"
            >
              {content.planVisit}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-brand-foreground transition hover:bg-white/10"
            >
              {content.contact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  href: string;
  viewAll: string;
};

function SectionHeading({ eyebrow, title, href, viewAll }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-text-primary md:text-4xl">
          {title}
        </h2>
      </div>

      <Link
        href={href}
        className="hidden rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:bg-surface-muted sm:inline-flex"
      >
        {viewAll}
      </Link>
    </div>
  );
}

type PreviewListProps = {
  title: string;
  href: string;
  viewAll: string;
  items: {
    id: string;
    title: string;
    description: string;
    badge: string;
  }[];
};

function PreviewList({ title, href, viewAll, items }: PreviewListProps) {
  return (
    <section className="rounded-3xl border border-border-default bg-surface-default p-6 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>

        <Link
          href={href}
          className="rounded-full border border-border-default px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
        >
          {viewAll}
        </Link>
      </div>

      <div className="mt-6 grid gap-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-border-default bg-surface-muted p-5 transition hover:bg-surface-subtle"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              {item.badge}
            </p>

            <h3 className="mt-3 text-lg font-semibold text-text-primary">
              {item.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-secondary">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}