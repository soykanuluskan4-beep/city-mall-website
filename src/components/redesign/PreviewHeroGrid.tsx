/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clapperboard,
  MapPinned,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/types/content";

type PreviewHeroGridProps = {
  locale: Locale;
};

type HeroCard = {
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  image: string;
  video?: string;
  alt: string;
  icon: typeof ShoppingBag;
  className: string;
  titleClassName: string;
  overlay: string;
  variant?: "fashion" | "explore" | "default";
};

const content = {
  tr: {
    eyebrow: "Cinematic Redesign Preview",
    title: "CityMall deneyimi yeniden kurgulanıyor.",
    description:
      "Alışveriş, lezzet, sinema, etkinlik ve ziyaret planlamasını daha premium, daha sinematik ve daha keşfedilebilir bir giriş deneyiminde topluyoruz.",
    primaryCta: "Mağazaları Keşfet",
    secondaryCta: "Haritaya Git",
    cards: {
      fashion: {
        eyebrow: "Fashion / Luxury",
        title: "Fashion",
        description:
          "Slow motion vitrin hissi, sezon stilleri ve premium alışveriş rotaları.",
        alt: "Premium fashion shopping atmosphere",
      },
      dining: {
        eyebrow: "Dining",
        title: "Dining",
        description: "Sıcak tonlar, restoranlar ve lezzet molaları.",
        alt: "Warm dining atmosphere",
      },
      cinema: {
        eyebrow: "Cinemall",
        title: "Cinema",
        description: "Koyu neon atmosfer, film ve seans deneyimi.",
        alt: "Cinema atmosphere",
      },
      events: {
        eyebrow: "What’s Happening",
        title: "Events",
        description: "CityMall’de bu hafta olanları keşfet.",
        alt: "Live event atmosphere",
      },
      explore: {
        eyebrow: "Explore Mall",
        title: "Explore",
        description: "Katlar, hizmetler ve ziyaret rotaları.",
        alt: "Interactive mall map preview",
      },
    },
  },
  en: {
    eyebrow: "Cinematic Redesign Preview",
    title: "The CityMall experience is being redesigned.",
    description:
      "We are bringing shopping, dining, cinema, events and visit planning into a more premium, cinematic and discoverable entrance experience.",
    primaryCta: "Explore Stores",
    secondaryCta: "Open Map",
    cards: {
      fashion: {
        eyebrow: "Fashion / Luxury",
        title: "Fashion",
        description:
          "Slow-motion window feeling, seasonal styles and premium shopping routes.",
        alt: "Premium fashion shopping atmosphere",
      },
      dining: {
        eyebrow: "Dining",
        title: "Dining",
        description: "Warm tones, restaurants and tasteful breaks.",
        alt: "Warm dining atmosphere",
      },
      cinema: {
        eyebrow: "Cinemall",
        title: "Cinema",
        description: "Dark neon atmosphere, movies and showtimes.",
        alt: "Cinema atmosphere",
      },
      events: {
        eyebrow: "What’s Happening",
        title: "Events",
        description: "Discover what’s happening at CityMall this week.",
        alt: "Live event atmosphere",
      },
      explore: {
        eyebrow: "Explore Mall",
        title: "Explore",
        description: "Floors, services and visitor routes.",
        alt: "Interactive mall map preview",
      },
    },
  },
};

const images = {
  fashion:
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=85",
  dining:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",
  cinema:
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=85",
  events:
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
  explore:
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85",
};

export function PreviewHeroGrid({ locale }: PreviewHeroGridProps) {
  const copy = content[locale];

  const cards: HeroCard[] = [
    {
      href: `/${locale}/stores`,
      image: images.fashion,
      video: "/videos/fashion-hero.mp4",
      icon: ShoppingBag,
      className:
        "order-1 min-h-[440px] lg:col-start-1 lg:col-end-4 lg:row-start-2 lg:row-end-4 lg:min-h-0",
      titleClassName: "text-5xl md:text-6xl lg:text-7xl",
      overlay: "from-black/8 via-black/32 to-black/90",
      variant: "fashion",
      ...copy.cards.fashion,
    },
    {
      href: `/${locale}/dining`,
      image: images.dining,
      icon: Utensils,
      className:
        "order-2 min-h-[190px] lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2 lg:min-h-0",
      titleClassName: "text-3xl",
      overlay: "from-amber-950/10 via-black/30 to-black/82",
      ...copy.cards.dining,
    },
    {
      href: `/${locale}/cinema`,
      image: images.cinema,
      icon: Clapperboard,
      className:
        "order-3 min-h-[190px] lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 lg:min-h-0",
      titleClassName: "text-3xl",
      overlay: "from-indigo-950/10 via-black/42 to-black/86",
      ...copy.cards.cinema,
    },
    {
      href: `/${locale}/events`,
      image: images.events,
      icon: CalendarDays,
      className:
        "order-4 min-h-[190px] lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2 lg:min-h-0",
      titleClassName: "text-3xl",
      overlay: "from-rose-950/10 via-black/34 to-black/84",
      ...copy.cards.events,
    },
    {
      href: `/${locale}/map`,
      image: images.explore,
      icon: MapPinned,
      className:
        "order-5 min-h-[360px] lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-4 lg:min-h-0",
      titleClassName: "text-4xl md:text-5xl",
      overlay: "from-slate-950/5 via-black/30 to-black/86",
      variant: "explore",
      ...copy.cards.explore,
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#f5f5f3] py-10 md:py-14">
      <style>{`
        @keyframes heroGridReveal {
          0% {
            opacity: 0;
            transform: translateY(24px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes mapPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.36;
          }
          50% {
            transform: scale(1.75);
            opacity: 0.08;
          }
        }

        @keyframes mapLineDrift {
          0%, 100% {
            opacity: 0.34;
            transform: translateY(0);
          }
          50% {
            opacity: 0.62;
            transform: translateY(-4px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-grid-reveal,
          .preview-hero-card,
          .preview-hero-card img,
          .preview-hero-card video,
          .map-pulse,
          .map-line-drift {
            animation: none !important;
            transition: none !important;
          }

          .hero-background-video {
            display: none !important;
          }

          .preview-hero-card img {
            opacity: 1 !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(180,126,47,0.16),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(17,24,39,0.08),transparent_30%)]" />

      <div className="container">
        <div className="mb-7 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-border-default bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-text-muted shadow-card backdrop-blur">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-text-primary md:text-6xl lg:text-7xl">
              {copy.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-text-secondary md:text-lg">
              {copy.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:pb-1">
            <Link
              href={`/${locale}/stores`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
            >
              {copy.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href={`/${locale}/map`}
              className="inline-flex items-center justify-center rounded-full border border-border-default bg-white/70 px-6 py-3 text-sm font-semibold text-text-primary shadow-card backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
            >
              {copy.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="hero-grid-reveal grid gap-3 [animation:heroGridReveal_760ms_cubic-bezier(0.22,1,0.36,1)_both] md:gap-4 lg:grid-cols-[1fr_1fr_1fr_1.08fr] lg:grid-rows-[170px_210px_210px]">
          {cards.map((card) => (
            <PreviewHeroCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PreviewHeroCard({ card }: { card: HeroCard }) {
  const Icon = card.icon;
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  const shouldShowImage = !card.video || hasVideoError;

  return (
    <Link
      href={card.href}
      className={`preview-hero-card group relative isolate flex overflow-hidden rounded-[1.65rem] border border-white/15 bg-text-primary p-5 text-white shadow-[0_20px_60px_rgba(17,24,39,0.16)] transition duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:border-white/28 hover:shadow-[0_28px_80px_rgba(17,24,39,0.24)] md:p-6 ${card.className}`}
    >
      <img
        src={card.image}
        alt={card.alt}
        className={`absolute inset-0 -z-30 h-full w-full scale-[1.01] object-cover transition duration-700 ease-out group-hover:scale-[1.055] ${
          shouldShowImage ? "opacity-100" : "opacity-0"
        }`}
      />

      {card.video && !hasVideoError ? (
        <video
          className={`hero-background-video absolute inset-0 -z-20 h-full w-full scale-[1.01] object-cover transition duration-700 ease-out group-hover:scale-[1.055] ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={card.alt}
          onLoadedData={() => setIsVideoReady(true)}
          onCanPlay={() => setIsVideoReady(true)}
          onError={() => setHasVideoError(true)}
        >
          <source src={card.video} type="video/mp4" />
        </video>
      ) : null}

      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-b ${card.overlay} transition duration-500 group-hover:opacity-88`}
      />

      <div className="absolute inset-0 -z-10 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        <div className="absolute inset-y-6 right-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      {card.variant === "explore" ? <ExploreMapPreview /> : null}

      <div className="mt-auto max-w-lg transition duration-500 group-hover:-translate-y-1.5">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>

          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-white/62">
            {card.eyebrow}
          </p>
        </div>

        <h2
          className={`font-semibold leading-[0.95] tracking-tight ${card.titleClassName}`}
        >
          {card.title}
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-white/72">
          {card.description}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/86 transition duration-300 group-hover:gap-3 group-hover:text-white">
          Explore
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}

function ExploreMapPreview() {
  return (
    <div className="pointer-events-none absolute inset-x-5 top-5 z-0 rounded-[1.35rem] border border-white/14 bg-white/[0.08] p-4 opacity-80 backdrop-blur-md transition duration-500 group-hover:border-white/26 group-hover:bg-white/[0.12]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/46">
            Floor Guide
          </p>
          <p className="mt-1 text-sm font-semibold text-white/82">
            Ground Level
          </p>
        </div>

        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
          <span className="map-pulse absolute h-6 w-6 rounded-full bg-white/25 [animation:mapPulse_2.4s_ease-in-out_infinite]" />
          <MapPinned className="relative h-4 w-4 text-white" aria-hidden="true" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <span className="map-line-drift h-9 rounded-xl bg-white/18 [animation:mapLineDrift_3s_ease-in-out_infinite]" />
        <span className="h-9 rounded-xl bg-white/10" />
        <span className="h-9 rounded-xl bg-white/16" />
        <span className="h-9 rounded-xl bg-white/8" />
        <span className="col-span-2 h-12 rounded-xl bg-white/12" />
        <span className="h-12 rounded-xl bg-white/22" />
        <span className="h-12 rounded-xl bg-white/10" />
      </div>
    </div>
  );
}