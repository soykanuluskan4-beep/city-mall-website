/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgePercent,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";
import type { CSSProperties } from "react";
import { campaigns } from "@/data/campaigns";
import { stores } from "@/data/stores";
import { getLocalizedText } from "@/lib/locale";
import type { Locale, Store, StoreCategory } from "@/types/content";

type StoresBrandCarouselProps = {
  locale: Locale;
};

type StoreCardItem = {
  id: string;
  name: string;
  category: string;
  image: string;
  href: string;
  featured?: boolean;
};

type OfferCardItem = {
  id: string;
  title: string;
  label: string;
  image: string;
  href: string;
  rotation: string;
};

const content = {
  tr: {
    eyebrow: "CityMall Stores",
    title: "Mağazaları Keşfet",
    subtitle:
      "Moda, teknoloji, yaşam, çocuk ve daha fazlasını akan bir mağaza vitrininde keşfet.",
    viewAll: "Tüm Mağazalar",
    fallbackCategory: "Mağaza",
    offers: {
      eyebrow: "Kampanyalar & Fırsatlar",
      title: "En yeni fırsatları ve kampanyaları keşfet",
      subtitle:
        "Seçili markalardan dönemsel fırsatlar, özel kampanyalar ve ziyaretini daha avantajlı hale getiren alışveriş deneyimleri.",
      specialTitle: "Özel kampanyalar",
      specialText: "Sınırlı süreli fırsatları ve marka duyurularını kaçırma.",
      currentTitle: "Güncel fırsatlar",
      currentText: "CityMall’de devam eden kampanyaları tek bakışta keşfet.",
      primaryCta: "Şimdi",
      secondaryCta: "Daha Fazla",
      activeLabel: "aktif fırsat",
    },
  },
  en: {
    eyebrow: "CityMall Stores",
    title: "Explore Our Stores",
    subtitle:
      "Discover fashion, technology, lifestyle, kids and more in a flowing store showcase.",
    viewAll: "All Stores",
    fallbackCategory: "Store",
    offers: {
      eyebrow: "Offers & Promotions",
      title: "Discover our latest offers and promotions",
      subtitle:
        "Benefit from selected brand offers, seasonal campaigns and shopping experiences that make every visit more rewarding.",
      specialTitle: "Special promotions",
      specialText: "Save now and take advantage of limited-time offers.",
      currentTitle: "Current offers",
      currentText: "Discover current campaigns and secure great bargains.",
      primaryCta: "Now",
      secondaryCta: "More",
      activeLabel: "active offer",
    },
  },
};

const categoryLabels: Record<Locale, Record<StoreCategory, string>> = {
  tr: {
    fashion: "Moda",
    electronics: "Elektronik",
    home: "Ev & Yaşam",
    beauty: "Güzellik",
    sports: "Spor",
    books: "Kitap & Kırtasiye",
    services: "Hizmetler",
    kids: "Çocuk",
    other: "Mağaza",
  },
  en: {
    fashion: "Fashion",
    electronics: "Electronics",
    home: "Home & Living",
    beauty: "Beauty",
    sports: "Sports",
    books: "Books & Stationery",
    services: "Services",
    kids: "Kids",
    other: "Store",
  },
};

const categoryImages: Record<StoreCategory, string> = {
  fashion:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  electronics:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
  home:
    "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&w=1200&q=85",
  beauty:
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
  sports:
    "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=85",
  books:
    "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=85",
  services:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
  kids:
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85",
  other:
    "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=85",
};

const offerFallbackImages = [
  "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=85",
];

function getStoreImage(store: Store) {
  return store.coverImage || store.logo || categoryImages[store.category];
}

function createStoreCards(locale: Locale): StoreCardItem[] {
  const sortedStores = [...stores].sort((a, b) => {
    if (a.featured && !b.featured) {
      return -1;
    }

    if (!a.featured && b.featured) {
      return 1;
    }

    return getLocalizedText(a.name, locale).localeCompare(
      getLocalizedText(b.name, locale),
      locale === "tr" ? "tr" : "en"
    );
  });

  return sortedStores.map((store, index) => ({
    id: store.id,
    name: getLocalizedText(store.name, locale),
    category: categoryLabels[locale][store.category],
    image: getStoreImage(store),
    href: `/${locale}/stores`,
    featured: index % 7 === 0,
  }));
}

function createOfferCards(locale: Locale): OfferCardItem[] {
  const activeCampaigns = campaigns
  .filter((campaign) => campaign.status !== "expired")
  .slice(0, 2);

const sourceCampaigns = activeCampaigns.length
  ? activeCampaigns
  : campaigns.slice(0, 2);

const rotations = ["-rotate-[5deg]", "rotate-[4deg]"];

  return sourceCampaigns.map((campaign, index) => {
    const title = getLocalizedText(campaign.title, locale);
    const storeName = campaign.storeName
      ? getLocalizedText(campaign.storeName, locale)
      : title;

    return {
      id: campaign.id,
      title,
      label: storeName,
      image: campaign.image || offerFallbackImages[index % offerFallbackImages.length],
      href: `/${locale}/campaigns`,
      rotation: rotations[index % rotations.length],
    };
  });
}

function splitRows(items: StoreCardItem[]) {
  const rowOne = items.filter((_, index) => index % 2 === 0);
  const rowTwo = items.filter((_, index) => index % 2 !== 0).reverse();

  return {
    rowOne: rowOne.length ? rowOne : items,
    rowTwo: rowTwo.length ? rowTwo : items,
  };
}

export function StoresBrandCarousel({ locale }: StoresBrandCarouselProps) {
  const copy = content[locale];
  const cards = createStoreCards(locale);
  const offerCards = createOfferCards(locale);
  const { rowOne, rowTwo } = splitRows(cards);

  return (
    <section className="relative isolate overflow-hidden bg-[#f5f5f3] py-20 text-text-primary md:py-28">
      <style>{`
        @keyframes storesMarqueeForward {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes storesMarqueeReverse {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .stores-brand-track {
          animation-duration: var(--brand-duration);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .stores-brand-track-forward {
          animation-name: storesMarqueeForward;
        }

        .stores-brand-track-reverse {
          animation-name: storesMarqueeReverse;
        }

        @media (max-width: 767px) {
          .stores-brand-track {
            animation-duration: var(--brand-mobile-duration);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stores-brand-track,
          .stores-brand-card,
          .stores-brand-card img,
          .offer-float-card,
          .offer-float-card img {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_0%,rgba(180,126,47,0.10),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(17,24,39,0.05),transparent_28%)]" />

      <div className="container relative">
        <OffersPromotionBlock locale={locale} offers={offerCards} />

        <div className="mb-12 mt-20 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-text-muted">
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {copy.eyebrow}
            </p>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-tight text-text-primary md:text-6xl">
              {copy.title}
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
              {copy.subtitle}
            </p>
          </div>

          <Link
            href={`/${locale}/stores`}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-border-default bg-white px-6 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-muted"
          >
            {copy.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:gap-6">
        <StoreCarouselRow
          items={rowOne}
          direction="forward"
          duration="72s"
          mobileDuration="88s"
        />

        <StoreCarouselRow
          items={rowTwo}
          direction="reverse"
          duration="80s"
          mobileDuration="96s"
        />
      </div>
    </section>
  );
}

function OffersPromotionBlock({
  locale,
  offers,
}: {
  locale: Locale;
  offers: OfferCardItem[];
}) {
  const copy = content[locale];

  return (
    <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
      <div>
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-text-muted">
          <BadgePercent className="h-4 w-4" aria-hidden="true" />
          {copy.offers.eyebrow}
        </p>

        <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-text-primary md:text-6xl">
          {copy.offers.title}
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
          {copy.offers.subtitle}
        </p>

        <div className="mt-9 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              {copy.offers.specialTitle}
            </h3>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {copy.offers.specialText}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              {copy.offers.currentTitle}
            </h3>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {copy.offers.currentText}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/campaigns`}
            className="inline-flex items-center justify-center rounded-full bg-text-primary px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
          >
            {copy.offers.primaryCta}
          </Link>

          <Link
            href={`/${locale}/campaigns`}
            className="inline-flex items-center justify-center rounded-full border border-border-default bg-white px-6 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-muted"
          >
            {copy.offers.secondaryCta}
          </Link>
        </div>
      </div>

      <div className="relative min-h-[430px] overflow-visible rounded-[2rem] border border-border-default bg-white/72 p-6 shadow-card md:min-h-[500px] md:p-8">
  <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_70%_18%,rgba(180,126,47,0.14),transparent_34%),radial-gradient(circle_at_30%_100%,rgba(17,24,39,0.06),transparent_32%)]" />

  <div className="relative mx-auto h-[390px] max-w-[520px] md:h-[445px]">
    {offers.slice(0, 2).map((offer, index) => (
      <Link
        key={offer.id}
        href={offer.href}
        className={`offer-float-card group absolute overflow-hidden rounded-[1.4rem] bg-white text-text-primary shadow-[0_24px_70px_rgba(15,23,42,0.16)] transition duration-500 hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_34px_95px_rgba(15,23,42,0.22)] ${
          index === 0
            ? "left-2 top-10 w-[68%] md:left-4 md:top-14 md:w-[64%]"
            : "right-2 top-[43%] w-[70%] md:right-3 md:top-[40%] md:w-[66%]"
        } ${offer.rotation}`}
      >
        <div className="relative aspect-[1.45/1] overflow-hidden">
          <img
            src={offer.image}
            alt={offer.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/12 to-black/50" />
          <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-text-primary shadow-card">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 p-4">
          <div className="min-w-0">
            <p className="line-clamp-1 text-sm font-semibold text-text-primary">
              {offer.label}
            </p>
            <p className="mt-1 line-clamp-1 text-xs text-text-muted">
              {copy.offers.activeLabel}
            </p>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface-muted text-text-primary transition group-hover:bg-text-primary group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    ))}
  </div>
</div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(180,126,47,0.14),transparent_34%),radial-gradient(circle_at_30%_100%,rgba(17,24,39,0.06),transparent_32%)]" />

        <div className="relative mx-auto h-full max-w-[520px]">
          {offers.map((offer, index) => (
            <Link
              key={offer.id}
              href={offer.href}
              className={`offer-float-card group absolute overflow-hidden rounded-[1.4rem] bg-white text-text-primary shadow-[0_24px_70px_rgba(15,23,42,0.16)] transition duration-500 hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_34px_95px_rgba(15,23,42,0.22)] ${
                index === 0
                  ? "left-0 top-3 w-[72%]"
                  : index === 1
                    ? "right-0 top-[34%] w-[64%]"
                    : "bottom-4 left-[18%] w-[68%]"
              } ${offer.rotation}`}
            >
              <div className="relative aspect-[1.45/1] overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/12 to-black/50" />
                <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-text-primary shadow-card">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="line-clamp-1 text-sm font-semibold text-text-primary">
                    {offer.label}
                  </p>
                  <p className="mt-1 line-clamp-1 text-xs text-text-muted">
                    {copy.offers.activeLabel}
                  </p>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface-muted text-text-primary transition group-hover:bg-text-primary group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
  );
}

function StoreCarouselRow({
  items,
  direction,
  duration,
  mobileDuration,
}: {
  items: StoreCardItem[];
  direction: "forward" | "reverse";
  duration: string;
  mobileDuration: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const duplicatedItems = [...items, ...items];

  const style = {
    "--brand-duration": duration,
    "--brand-mobile-duration": mobileDuration,
  } as CSSProperties;

  function setPlaybackRate(rate: number) {
    const animations = trackRef.current?.getAnimations() ?? [];

    animations.forEach((animation) => {
      animation.play();
      animation.updatePlaybackRate(rate);
    });
  }

  function pauseTrack() {
    const animations = trackRef.current?.getAnimations() ?? [];

    animations.forEach((animation) => {
      animation.pause();
    });
  }

  return (
    <div
      className="stores-brand-row relative w-full overflow-hidden"
      onMouseEnter={() => setPlaybackRate(0.32)}
      onMouseLeave={() => setPlaybackRate(1)}
      onPointerDown={pauseTrack}
      onPointerUp={() => setPlaybackRate(0.32)}
      onPointerCancel={() => setPlaybackRate(1)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f5f5f3] to-transparent md:w-44" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f5f5f3] to-transparent md:w-44" />

      <div
        ref={trackRef}
        style={style}
        className={`stores-brand-track flex w-max gap-4 px-5 md:gap-5 md:px-8 ${
          direction === "forward"
            ? "stores-brand-track-forward"
            : "stores-brand-track-reverse"
        }`}
      >
        {duplicatedItems.map((item, index) => (
          <StoreBrandCard
            key={`${item.id}-${direction}-${index}`}
            item={item}
            ariaHidden={index >= items.length}
          />
        ))}
      </div>
    </div>
  );
}

function StoreBrandCard({
  item,
  ariaHidden,
}: {
  item: StoreCardItem;
  ariaHidden?: boolean;
}) {
  const style = {
    "--store-card-width": item.featured ? "330px" : "248px",
  } as CSSProperties;

  return (
    <Link
      href={item.href}
      aria-hidden={ariaHidden}
      tabIndex={ariaHidden ? -1 : undefined}
      style={style}
      className="stores-brand-card group relative block aspect-[4/3] w-[var(--store-card-width)] shrink-0 overflow-hidden rounded-[1.5rem] bg-text-primary shadow-[0_22px_70px_rgba(15,23,42,0.14)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.20)]"
    >
      <img
        src={item.image}
        alt={item.name}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/22 via-black/38 to-black/72 transition duration-500 group-hover:from-black/12 group-hover:via-black/26 group-hover:to-black/58" />

      <div className="absolute inset-x-4 bottom-4">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/52">
              {item.category}
            </p>

            <h3 className="mt-2 line-clamp-2 text-3xl font-semibold leading-none tracking-tight text-white drop-shadow-sm">
              {item.name}
            </h3>
          </div>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/12 text-white backdrop-blur-md transition duration-300 group-hover:bg-white group-hover:text-text-primary">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        <div className="absolute inset-y-5 right-5 w-px bg-gradient-to-b from-transparent via-white/24 to-transparent" />
      </div>
    </Link>
  );
}