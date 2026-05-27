/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/types/content";

type HeroSectionProps = {
  locale: Locale;
};

const content = {
  tr: {
    title: "Gazimağusa'nın buluşma noktası.",
    subtitle: "Alışveriş, yeme-içme ve eğlenceyi tek noktada keşfedin.",
    primaryCta: "Mağazaları Keşfet",
    secondaryCta: "Ziyaret Planla",
    scroll: "Aşağı kaydır",
    imageAlt: "Modern alışveriş merkezi iç mekan atmosferi",
  },
  en: {
    title: "Famagusta's meeting point.",
    subtitle: "Discover shopping, dining and entertainment in one place.",
    primaryCta: "Explore Stores",
    secondaryCta: "Plan Your Visit",
    scroll: "Scroll down",
    imageAlt: "Modern shopping mall interior atmosphere",
  },
};

const heroImage =
  "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=2400&q=85";

export function HeroSection({ locale }: HeroSectionProps) {
  const copy = content[locale];

  return (
    <section className="relative isolate flex min-h-[calc(100vh-72px)] overflow-hidden bg-text-primary text-text-inverse">
      <img
        src={heroImage}
        alt={copy.imageAlt}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,24,39,0.25)_0%,rgba(17,24,39,0.46)_42%,rgba(17,24,39,0.88)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[radial-gradient(circle_at_bottom_left,rgba(180,126,47,0.32),transparent_45%)]" />

      <div className="container flex flex-1 items-end pb-16 pt-28 md:pb-20 lg:pb-24">
        <div className="max-w-5xl">
          <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur">
            CityMall Cyprus
          </p>

          <h1 className="max-w-[11ch] break-words text-[clamp(3rem,12vw,4.75rem)] font-semibold leading-[0.92] tracking-tight text-white md:max-w-5xl md:text-7xl md:leading-[0.95] lg:text-8xl">
             {copy.title}
          </h1>

          <p className="mt-6 max-w-[28rem] break-words text-xl leading-8 text-white/85 md:max-w-2xl md:text-2xl">
            {copy.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/stores`}
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-text-primary shadow-overlay transition hover:-translate-y-0.5 hover:bg-surface-muted"
            >
              {copy.primaryCta}
            </Link>

            <Link
              href={`/${locale}/map`}
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              {copy.secondaryCta}
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:flex">
        <span className="text-xs font-semibold uppercase tracking-[0.22em]">
          {copy.scroll}
        </span>
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}