import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Film,
  MapPin,
  ShoppingBag,
  Sparkles,
  Store,
  Utensils,
  UsersRound,
} from "lucide-react";
import type { Locale } from "@/types/content";

type AboutPageClientProps = {
  locale: Locale;
};

const content = {
  tr: {
    eyebrow: "Hakkımızda",
    title: "Gazimağusa’nın alışveriş ve yaşam noktası.",
    description:
      "CityMall Cyprus; mağazaları, yeme-içme alanları, Cinemall, etkinlikleri ve ziyaretçi hizmetleriyle Gazimağusa’da günün farklı ihtiyaçlarını tek çatı altında buluşturur.",
    heroBadge: "CityMall Cyprus",
    storyTitle: "CityMall Cyprus’un hikayesi",
    storyText:
      "CityMall Cyprus, alışverişi, sosyal buluşmaları, yeme-içme duraklarını ve sinema deneyimini Gazimağusa’da aynı rotada bir araya getirir. Günlük ihtiyaçlar, aile ziyaretleri ve keyifli molalar için şehirde yaşayanlara ve ziyaretçilere pratik bir buluşma alanı sunar.",
    imageTitle: "Gazimağusa’da kolay bir ziyaret rotası",
    imageText:
      "Mağazalar, restoranlar, sinema, etkinlikler ve ziyaretçi hizmetleri aynı çatı altında planlı bir deneyime dönüşür.",
    statsTitle: "Rakamlarla CityMall",
    statsText:
      "CityMall Cyprus’un mağaza, yeme-içme, Cinemall ve ziyaretçi alanlarını özetleyen başlıca bilgiler.",
    stats: [
      {
        value: "50+",
        label: "Mağaza ve marka",
      },
      {
        value: "15",
        label: "Yeme-içme noktası",
      },
      {
        value: "4",
        label: "Ziyaretçi katı",
      },
      {
        value: "1",
        label: "Cinemall deneyimi",
      },
    ],
    visionTitle: "Vizyonumuz",
    visionText:
      "CityMall Cyprus’u Gazimağusa’da alışveriş, sosyalleşme ve eğlence için güvenilir, erişilebilir ve canlı bir merkez olarak konumlandırmak.",
    missionTitle: "Misyonumuz",
    missionText:
      "Ziyaretçilerin kolayca plan yapabildiği, markaların görünür olduğu ve şehir yaşamıyla uyumlu bir AVM deneyimi sunmak.",
    experienceTitle: "CityMall deneyimi",
    experienceText:
      "Alışverişten yeme-içmeye, Cinemall’dan etkinliklere kadar her bölüm ziyaretin daha kolay planlanması için bir arada sunulur.",
    experiences: [
      {
        title: "Alışveriş",
        text: "Moda, teknoloji, ev yaşamı, çocuk ve hizmet kategorilerinde mağazalar.",
      },
      {
        title: "Yeme-İçme",
        text: "Food Court, restoranlar, cafeler ve hızlı servis noktaları.",
      },
      {
        title: "Cinemall",
        text: "Güncel filmler, seans bilgileri ve sinema deneyimi.",
      },
      {
        title: "Etkinlikler",
        text: "Aile, çocuk, müzik, spor ve özel gün etkinlikleri.",
      },
    ],
    valuesTitle: "Kurumsal yaklaşım",
    values: [
      "Ziyaretçi odaklı deneyim",
      "Erişilebilir ve kolay yönlendirme",
      "Aile dostu sosyal alanlar",
      "Markalar için güçlü görünürlük",
      "Güncel ve şeffaf dijital iletişim",
    ],
    ctaTitle: "CityMall Cyprus ile iletişime geçin.",
    ctaText:
      "Ziyaret, marka iş birlikleri, kiralama ve kurumsal talepler için ilgili sayfalardan bize ulaşabilirsiniz.",
    ctaContact: "İletişime Geç",
    ctaLeasing: "Kiralama Başvurusu",
  },
  en: {
    eyebrow: "About Us",
    title: "Famagusta’s shopping and lifestyle destination.",
    description:
      "CityMall Cyprus brings stores, dining areas, Cinemall, events and visitor services together under one roof in Famagusta.",
    heroBadge: "CityMall Cyprus",
    storyTitle: "The CityMall Cyprus story",
    storyText:
      "CityMall Cyprus brings shopping, social moments, dining stops and cinema together on one easy route in Famagusta. It offers a practical meeting point for daily needs, family visits and relaxed breaks.",
    imageTitle: "An easier visit route in Famagusta",
    imageText:
      "Stores, restaurants, cinema, events and visitor services come together as one planned experience.",
    statsTitle: "CityMall in Numbers",
    statsText:
      "Key highlights of CityMall Cyprus across stores, dining, Cinemall and visitor areas.",
    stats: [
      {
        value: "50+",
        label: "Stores and brands",
      },
      {
        value: "15",
        label: "Dining points",
      },
      {
        value: "4",
        label: "Visitor floors",
      },
      {
        value: "1",
        label: "Cinemall experience",
      },
    ],
    visionTitle: "Our Vision",
    visionText:
      "To position CityMall Cyprus as a trusted, accessible and lively destination for shopping, social life and entertainment in Famagusta.",
    missionTitle: "Our Mission",
    missionText:
      "To offer a mall experience where visitors can plan easily, brands stay visible and daily city life feels connected.",
    experienceTitle: "CityMall experience",
    experienceText:
      "From shopping and dining to Cinemall and events, each section helps visitors plan their time with ease.",
    experiences: [
      {
        title: "Shopping",
        text: "Stores across fashion, technology, home living, kids and services.",
      },
      {
        title: "Dining",
        text: "Food Court, restaurants, cafes and quick-service points.",
      },
      {
        title: "Cinemall",
        text: "Current movies, showtime details and cinema experience.",
      },
      {
        title: "Events",
        text: "Family, kids, music, sports and special-day events.",
      },
    ],
    valuesTitle: "Corporate approach",
    values: [
      "Visitor-focused experience",
      "Accessible and easy navigation",
      "Family-friendly social spaces",
      "Strong visibility for brands",
      "Clear and up-to-date digital communication",
    ],
    ctaTitle: "Get in touch with CityMall Cyprus.",
    ctaText:
      "For visits, brand partnerships, leasing and corporate requests, reach us through the related pages.",
    ctaContact: "Contact Us",
    ctaLeasing: "Leasing Application",
  },
};

const experienceIcons = [ShoppingBag, Utensils, Film, CalendarDays];

export function AboutPageClient({ locale }: AboutPageClientProps) {
  const copy = content[locale];

  return (
    <main className="overflow-x-hidden bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_38%),linear-gradient(135deg,rgba(17,24,39,1),rgba(42,49,63,1))]" />

        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 max-w-[13ch] text-[clamp(2.75rem,11vw,4rem)] font-semibold leading-[0.95] tracking-tight text-white [overflow-wrap:normal] [word-break:normal] md:max-w-5xl md:text-7xl md:leading-[0.95]">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-3xl break-words text-base leading-7 text-white/78 md:text-xl md:leading-8">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {copy.ctaContact}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href={`/${locale}/leasing`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {copy.ctaLeasing}
              </Link>
            </div>
          </div>

          <div className="w-full max-w-full min-w-0">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-elevated backdrop-blur md:p-5">
              <div
                className="min-h-[360px] rounded-[1.5rem] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(17,24,39,0.12), rgba(17,24,39,0.74)), url('https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=80')",
                }}
              />

              <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/15 bg-white/15 p-5 text-white backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/62">
                  {copy.heroBadge}
                </p>

                <p className="mt-3 text-2xl font-semibold tracking-tight">
                  {locale === "tr"
                    ? "Alışverişten daha fazlası"
                    : "More than shopping"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-[2rem] border border-border-default bg-surface-muted p-6 shadow-card md:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
              {copy.storyTitle}
            </h2>

            <p className="mt-5 text-base leading-8 text-text-secondary">
              {copy.storyText}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card">
              <MapPin className="h-8 w-8 text-text-primary" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
                {copy.imageTitle}
              </h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                {copy.imageText}
              </p>
            </article>

            <article className="rounded-[2rem] border border-border-default bg-text-primary p-6 text-white shadow-card">
              <Sparkles className="h-8 w-8 text-white" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                {copy.valuesTitle}
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-white/72">
                {copy.values.slice(0, 3).map((value) => (
                  <li key={value} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.statsTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.statsTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.statsText}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {copy.stats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card"
              >
                <p className="text-5xl font-semibold tracking-tight text-text-primary">
                  {stat.value}
                </p>

                <p className="mt-3 text-sm font-semibold text-text-secondary">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid gap-5 md:grid-cols-2">
          <article className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
              <UsersRound className="h-5 w-5" aria-hidden="true" />
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-text-primary">
              {copy.visionTitle}
            </h2>

            <p className="mt-4 text-sm leading-7 text-text-secondary">
              {copy.visionText}
            </p>
          </article>

          <article className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
              <Store className="h-5 w-5" aria-hidden="true" />
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-text-primary">
              {copy.missionTitle}
            </h2>

            <p className="mt-4 text-sm leading-7 text-text-secondary">
              {copy.missionText}
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.experienceTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.experienceTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.experienceText}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {copy.experiences.map((experience, index) => {
              const Icon = experienceIcons[index] ?? Sparkles;

              return (
                <article
                  key={experience.title}
                  className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
                    {experience.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {experience.text}
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
                  {copy.ctaTitle}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">
                  {copy.ctaText}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact`}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
                >
                  {copy.ctaContact}
                </Link>

                <Link
                  href={`/${locale}/leasing`}
                  className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  {copy.ctaLeasing}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}