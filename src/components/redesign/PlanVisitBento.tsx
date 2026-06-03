/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { events } from "@/data/events";
import { getLocalizedText } from "@/lib/locale";
import type { Locale } from "@/types/content";

type PlanVisitBentoProps = {
  locale: Locale;
};

type BentoCard = {
  key: "happening" | "giftCard" | "kids" | "next";
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  fromX: number;
  fromY: number;
  delay: number;
  badge?: string;
  special?: boolean;
};

const content = {
  tr: {
    eyebrow: "Ziyaret Rehberi",
    title: "Ziyaretini Planla",
    subtitle:
      "Etkinlikler, hediye kartı, aile eğlencesi ve sıradaki deneyimi tek bakışta keşfet.",
    cta: "Keşfet",
    cards: {
      happening: {
        title: "Etkinlikler",
        description: "CityMall’deki etkinlikleri ve canlı deneyimleri keşfet.",
        alt: "CityMall etkinlik atmosferi",
      },
      giftCard: {
        title: "Hediye Kartı",
        description: "Özel günler için şık ve kolay bir hediye seçeneği.",
        alt: "Premium hediye kartı ve alışveriş atmosferi",
      },
      kids: {
        title: "FunLab / Çocuk",
        description: "Çocuklar ve aileler için eğlenceli bir AVM deneyimi.",
        alt: "Çocuk ve aile eğlence atmosferi",
      },
      nextFallback: {
        title: "Sonraki Deneyim",
        description: "Yeni etkinlikler ve deneyimler yakında duyurulacak.",
        alt: "Yaklaşan etkinlik atmosferi",
      },
    },
    badges: {
      today: "BUGÜN",
      thisWeek: "BU HAFTA",
      upcoming: "YAKINDA",
    },
  },
  en: {
    eyebrow: "Visit Guide",
    title: "Plan Your Visit",
    subtitle:
      "Discover events, gift cards, family entertainment and the next experience at a glance.",
    cta: "Explore",
    cards: {
      happening: {
        title: "What’s Happening",
        description: "Explore events and live experiences at CityMall.",
        alt: "CityMall event atmosphere",
      },
      giftCard: {
        title: "Gift Card",
        description: "A stylish and easy gift option for special occasions.",
        alt: "Premium gift card and shopping atmosphere",
      },
      kids: {
        title: "FunLab / Kids",
        description: "A fun mall experience for kids and families.",
        alt: "Kids and family entertainment atmosphere",
      },
      nextFallback: {
        title: "Next Experience",
        description: "New events and experiences will be announced soon.",
        alt: "Upcoming event atmosphere",
      },
    },
    badges: {
      today: "HAPPENING TODAY",
      thisWeek: "THIS WEEK",
      upcoming: "UPCOMING",
    },
  },
};

const images = {
  happening:
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=85",
  giftCard:
    "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1400&q=85",
  kids:
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=85",
  next:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85",
};

function getDateAtNoon(date: string) {
  return new Date(`${date}T12:00:00`);
}

function getTodayAtStart() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function getDaysUntil(date: string) {
  const today = getTodayAtStart();
  const target = getDateAtNoon(date);
  const difference = target.getTime() - today.getTime();

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function getNextEvent() {
  const today = getTodayAtStart();

  return [...events]
    .filter((event) => getDateAtNoon(event.date).getTime() >= today.getTime())
    .sort(
      (a, b) => getDateAtNoon(a.date).getTime() - getDateAtNoon(b.date).getTime()
    )[0];
}

function formatEventDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
  }).format(getDateAtNoon(date));
}

export function PlanVisitBento({ locale }: PlanVisitBentoProps) {
  const copy = content[locale];
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const nextEvent = useMemo(() => getNextEvent(), []);

  const nextEventData = useMemo(() => {
    if (!nextEvent) {
      return {
        title: copy.cards.nextFallback.title,
        description: copy.cards.nextFallback.description,
        image: images.next,
        alt: copy.cards.nextFallback.alt,
        badge: copy.badges.upcoming,
      };
    }

    const daysUntil = getDaysUntil(nextEvent.date);

    const badge =
      daysUntil <= 0
        ? copy.badges.today
        : daysUntil <= 3
          ? copy.badges.thisWeek
          : copy.badges.upcoming;

    const eventTitle = getLocalizedText(nextEvent.title, locale);
    const eventLocation = getLocalizedText(nextEvent.location, locale);
    const eventDate = formatEventDate(nextEvent.date, locale);

    return {
      title: copy.cards.nextFallback.title,
      description:
        locale === "tr"
          ? `${eventTitle} · ${eventDate} · ${eventLocation}`
          : `${eventTitle} · ${eventDate} · ${eventLocation}`,
      image: nextEvent.image || images.next,
      alt: eventTitle,
      badge,
    };
  }, [copy, locale, nextEvent]);

  const cards: BentoCard[] = [
    {
      key: "happening",
      title: copy.cards.happening.title,
      description: copy.cards.happening.description,
      href: `/${locale}/events`,
      image: images.happening,
      alt: copy.cards.happening.alt,
      fromX: -40,
      fromY: -40,
      delay: 0.2,
    },
    {
      key: "giftCard",
      title: copy.cards.giftCard.title,
      description: copy.cards.giftCard.description,
      href: `/${locale}/gift-card`,
      image: images.giftCard,
      alt: copy.cards.giftCard.alt,
      fromX: 40,
      fromY: -40,
      delay: 0.3,
    },
    {
      key: "kids",
      title: copy.cards.kids.title,
      description: copy.cards.kids.description,
      href: `/${locale}/kids`,
      image: images.kids,
      alt: copy.cards.kids.alt,
      fromX: -40,
      fromY: 40,
      delay: 0.4,
    },
    {
      key: "next",
      title: nextEventData.title,
      description: nextEventData.description,
      href: `/${locale}/events`,
      image: nextEventData.image,
      alt: nextEventData.alt,
      fromX: 40,
      fromY: 40,
      delay: 0.5,
      badge: nextEventData.badge,
      special: true,
    },
  ];

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
      {
        threshold: 0.25,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#f5f5f3] py-20 text-text-primary md:py-28"
    >
      <style>{`
        @keyframes planTitleReveal {
          0% {
            opacity: 0;
            transform: translateY(105%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes planCardReveal {
          0% {
            opacity: 0;
            transform: translate3d(var(--from-x), var(--from-y), 0) scale(0.96);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes gradientBorderFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @media (max-width: 767px) {
          .plan-visit-card {
            --from-x: calc(var(--card-x) * 0.5);
            --from-y: calc(var(--card-y) * 0.5);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .plan-visit-title,
          .plan-visit-card,
          .plan-visit-card img,
          .plan-visit-gradient-border {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(180,126,47,0.10),transparent_32%),radial-gradient(circle_at_85%_18%,rgba(17,24,39,0.05),transparent_30%)]" />

      <div className="container relative">
        <div className="mx-auto mb-12 max-w-4xl text-center md:mb-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-text-muted">
            {copy.eyebrow}
          </p>

          <div className="overflow-hidden">
            <h2
              className={`plan-visit-title text-4xl font-semibold tracking-tight text-text-primary md:text-6xl ${
                isVisible
                  ? "[animation:planTitleReveal_780ms_cubic-bezier(0.22,1,0.36,1)_both]"
                  : "translate-y-full opacity-0"
              }`}
            >
              {copy.title}
            </h2>
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
            {copy.subtitle}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <PlanVisitCard
              key={card.key}
              card={card}
              cta={copy.cta}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanVisitCard({
  card,
  cta,
  isVisible,
}: {
  card: BentoCard;
  cta: string;
  isVisible: boolean;
}) {
  const style = {
    "--card-x": `${card.fromX}px`,
    "--card-y": `${card.fromY}px`,
    "--from-x": `${card.fromX}px`,
    "--from-y": `${card.fromY}px`,
    animationDelay: `${card.delay}s`,
  } as CSSProperties;

  const cardContent = (
    <Link
      href={card.href}
      style={style}
      className={`plan-visit-card group relative isolate block min-h-[330px] overflow-hidden rounded-[1.75rem] bg-white text-text-primary shadow-[0_28px_90px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_34px_110px_rgba(255,214,10,0.16)] md:min-h-[360px] ${
        isVisible
          ? "[animation:planCardReveal_900ms_cubic-bezier(0.22,1,0.36,1)_both]"
          : "opacity-0"
      }`}
    >
      <img
        src={card.image}
        alt={card.alt}
        className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/8 via-black/12 to-black/38 transition duration-500 group-hover:from-black/4 group-hover:to-black/26" />

      {card.badge ? (
        <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/38 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-card backdrop-blur-md">
          {card.badge}
        </span>
      ) : null}

      <div className="absolute inset-x-4 bottom-4 rounded-[1.25rem] bg-white p-4 shadow-[0_18px_48px_rgba(0,0,0,0.18)] transition duration-500 group-hover:-translate-y-1 md:inset-x-5 md:bottom-5 md:p-5">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-1 text-2xl font-semibold tracking-tight text-text-primary">
              {card.title}
            </h3>

            <p className="mt-1 line-clamp-2 text-sm leading-6 text-text-secondary">
              {card.description}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-default bg-white text-text-primary shadow-[0_12px_30px_rgba(0,0,0,0.14)] transition duration-300 group-hover:scale-105 group-hover:bg-surface-muted"
          >
            <ArrowUpRight className="h-5 w-5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <span className="sr-only">{cta}</span>
      </div>
    </Link>
  );

  if (!card.special) {
    return cardContent;
  }

  return (
    <div className="plan-visit-gradient-border rounded-[1.9rem] bg-[linear-gradient(120deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05),rgba(255,255,255,0.28),rgba(255,255,255,0.06))] bg-[length:220%_220%] p-px [animation:gradientBorderFlow_6s_ease-in-out_infinite]">
      {cardContent}
    </div>
  );
}