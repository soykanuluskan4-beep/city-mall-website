/* eslint-disable @next/next/no-img-element */

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent, Sparkles } from "lucide-react";
import { campaigns } from "@/data/campaigns";
import type { Locale } from "@/types/content";

type StoresBrandCarouselProps = {
  locale?: Locale;
};

type StoreBrand = {
  name: string;
  image: string;
  logo?: string;
};

type CampaignPreview = {
  id?: string;
  title?: unknown;
  name?: unknown;
  campaignTitle?: unknown;
  image?: string;
  coverImage?: string;
  isActive?: boolean;
  active?: boolean;
  status?: string;
};

type CampaignCardPreview = {
  id: string;
  title: string;
  image?: string;
};

const promoContent = {
  tr: {
    eyebrow: "Seçili Fırsatlar",
    title: "En yeni fırsatları ve kampanyaları keşfet",
    subtitle: "Seçili markalardan dönemsel fırsatlar ve özel kampanyalar.",
    primaryCta: "Kampanyalar",
    secondaryCta: "Tüm Mağazalar",
    activeBadge: "aktif fırsat",
    fallbackCards: [
      "Seçili mağazalarda dönemsel fırsatlar",
      "Yeme-içme noktalarında özel kampanyalar",
      "CityMall deneyimine özel avantajlar",
    ],
  },
  en: {
    eyebrow: "Selected Offers",
    title: "Discover our latest offers and promotions",
    subtitle:
      "Benefit from exclusive discounts and seasonal campaigns from selected brands.",
    primaryCta: "Campaigns",
    secondaryCta: "All Stores",
    activeBadge: "active offer",
    fallbackCards: [
      "Seasonal offers at selected stores",
      "Special campaigns across dining spots",
      "Exclusive benefits for the CityMall experience",
    ],
  },
};

const storeBrands: StoreBrand[] = [
  {
    name: "Adidas",
    image: "/stores/adidas.JPG",
    logo: "/logos/adidas.png",
  },
  {
    name: "Altınbaş",
    image: "/stores/altınbaş.JPG",
    logo: "/logos/altinbas.png",
  },
  {
    name: "Avva",
    image: "/stores/avva.JPG",
    logo: "/logos/avva.png",
  },
  {
    name: "Başman",
    image: "/stores/başman.JPG",
    logo: "/logos/basman.png",
  },
  {
    name: "Chicco",
    image: "/stores/chicco.JPG",
    logo: "/logos/chicco.png",
  },
  {
    name: "Colin's",
    image: "/stores/colins.JPG",
    logo: "/logos/colins.png",
  },
  {
    name: "D&P Parfumes",
    image: "/stores/d&p-perfumum.JPG",
    logo: "/logos/d&p-perfumum.png",
  },
  {
    name: "Defacto",
    image: "/stores/defacto.JPG",
    logo: "/logos/defacto.png",
  },
  {
    name: "Desa",
    image: "/stores/desa.JPG",
    logo: "/logos/desa.png",
  },
  {
    name: "Dogo",
    image: "/stores/dogo.JPG",
    logo: "/logos/dogo.png",
  },
  {
    name: "Efor",
    image: "/stores/efor.JPG",
    logo: "/logos/efor.png",
  },
  {
    name: "English Home",
    image: "/stores/englishhome.JPG",
    logo: "/logos/englishhome.png",
  },
  {
    name: "FLO",
    image: "/stores/flo.JPG",
    logo: "/logos/flo.png",
  },
  {
    name: "İpekyol",
    image: "/stores/ipekyol.JPG",
    logo: "/logos/ipekyol.png",
  },
  {
    name: "Jakamen",
    image: "/stores/jakamen.JPG",
    logo: "/logos/jakamen.png",
  },
  {
    name: "LC Waikiki",
    image: "/stores/lcwaikiki.JPG",
    logo: "/logos/lcwaikiki.png",
  },
  {
    name: "Mert Optik",
    image: "/stores/mertoptik.JPG",
    logo: "/logos/mertoptik.png",
  },
  {
    name: "Mudo",
    image: "/stores/mudo.JPG",
    logo: "/logos/mudo.png",
  },
  {
    name: "Pierre Cardin",
    image: "/stores/pierre-cardin.JPG",
    logo: "/logos/pierrecardin.png",
  },
  {
    name: "Puma",
    image: "/stores/puma.JPG",
    logo: "/logos/puma.png",
  },
  {
    name: "Toyzz Shop",
    image: "/stores/toyzzshop.JPG",
  },
  {
    name: "Twist",
    image: "/stores/twist.JPG",
    logo: "/logos/twist.png",
  },
  {
    name: "Under Armour",
    image: "/stores/underarmour.JPG",
    logo: "/logos/underarmour.png",
  },
  {
    name: "U.S. Polo",
    image: "/stores/uspolo.JPG",
    logo: "/logos/uspolo.png",
  },
  {
    name: "Buff & Bloom",
    image: "/stores/buff&bloom.JPG",
  },
  {
    name: "Discounterra",
    image: "/stores/discounterra.JPG",
  },
  {
    name: "Index",
    image: "/stores/index.JPG",
  },
  {
    name: "Passion",
    image: "/stores/passion.JPG",
  },
  {
    name: "Saydam",
    image: "/stores/saydam.JPG",
  },
  {
    name: "Sconto Superstore",
    image: "/stores/scontosuperstore.JPG",
  },
  {
    name: "Sport Soul",
    image: "/stores/sportsoul.JPG",
  },
];

function getLocalizedValue(value: unknown, locale: Locale) {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    const localized = value as Partial<Record<Locale, string>>;

    return localized[locale] ?? localized.tr ?? localized.en ?? "";
  }

  return "";
}

function isActiveCampaign(campaign: CampaignPreview) {
  if (campaign.isActive === false || campaign.active === false) {
    return false;
  }

  if (campaign.status) {
    const status = campaign.status.toLowerCase();

    return !["expired", "ended", "inactive", "passive"].includes(status);
  }

  return true;
}

function getCampaignPreviewCards(locale: Locale): CampaignCardPreview[] {
  const campaignSource = campaigns as unknown as CampaignPreview[];
  const activeCampaigns = campaignSource.filter(isActiveCampaign);
  const source = activeCampaigns.length ? activeCampaigns : campaignSource;

  const mappedCampaigns = source
    .slice(0, 3)
    .map((campaign, index) => {
      const title =
        getLocalizedValue(campaign.title, locale) ||
        getLocalizedValue(campaign.campaignTitle, locale) ||
        getLocalizedValue(campaign.name, locale);

      return {
        id: campaign.id ?? `campaign-${index}`,
        title,
        image: campaign.image ?? campaign.coverImage,
      };
    })
    .filter((campaign) => campaign.title);

  if (mappedCampaigns.length) {
    return mappedCampaigns;
  }

  return promoContent[locale].fallbackCards.map((title, index) => ({
    id: `fallback-campaign-${index}`,
    title,
  }));
}

function CampaignPromoIntro({ locale }: { locale: Locale }) {
  const copy = promoContent[locale];
  const campaignCards = getCampaignPreviewCards(locale);

  const cardStyles = [
   "left-4 top-5 rotate-[-3deg] md:left-8 md:top-6",
   "left-20 top-28 rotate-[5deg] md:left-36 md:top-32",
 ];

  return (
    <div className="grid gap-10 rounded-[2.25rem] bg-white/72 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-text-muted">
          {copy.eyebrow}
        </p>

        <h2 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-tight text-text-primary md:text-6xl">
          {copy.title}
        </h2>

        <p className="mt-5 max-w-lg text-sm leading-7 text-text-secondary md:text-base">
          {copy.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/campaigns`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8312A] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(232,49,42,0.25)] transition hover:-translate-y-0.5 hover:bg-text-primary"
          >
            {copy.primaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            href={`/${locale}/stores`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border-default bg-white px-6 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-muted"
          >
            {copy.secondaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="relative mx-auto h-[340px] w-full max-w-[540px] overflow-hidden rounded-[1.9rem] bg-[radial-gradient(circle_at_20%_10%,rgba(232,49,42,0.12),transparent_30%),linear-gradient(135deg,#f7f7f5,#ffffff)] p-4 md:h-[360px]">
        <div className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-text-primary text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)]">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>

        {campaignCards.slice(0, 2).map((campaign, index) => (
          <article
            key={campaign.id}
            className={`absolute w-[250px] overflow-hidden rounded-[1.35rem] border border-white/70 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] transition duration-300 hover:z-20 hover:-translate-y-1 hover:rotate-0 sm:w-[280px] ${cardStyles[index]}`}
          >
            <div className="relative h-[145px] overflow-hidden bg-surface-muted">
              {campaign.image ? (
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.65),transparent_24%),linear-gradient(135deg,#111827,#E8312A)]" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-black/10 to-transparent" />
            </div>

            <div className="p-4">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#ffe600] px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-text-primary">
                <BadgePercent className="h-3.5 w-3.5" aria-hidden="true" />
                {copy.activeBadge}
              </div>

              <h3 className="line-clamp-2 text-base font-semibold leading-tight tracking-tight text-text-primary">
                {campaign.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function BrandCard({ brand }: { brand: StoreBrand }) {
  return (
    <div className="group relative aspect-square w-[clamp(112px,32vw,132px)] shrink-0 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#111] shadow-[0_18px_50px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-[3px] hover:shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:w-[160px] lg:w-[188px] xl:w-[206px]">
      <Image
        src={brand.image}
        alt={brand.name}
        fill
        sizes="(max-width: 640px) 32vw, (max-width: 1024px) 160px, 206px"
        className="object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/55 transition duration-500 group-hover:bg-black/35" />

      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        {brand.logo ? (
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            width={220}
            height={90}
            className="max-h-[54px] w-auto max-w-[78%] object-contain brightness-0 invert sm:max-h-[60px]"
          />
        ) : (
          <span className="break-words text-center text-[0.82rem] font-black uppercase leading-tight tracking-[0.08em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] sm:text-[1.1rem] sm:tracking-[0.1em]">
            {brand.name}
          </span>
        )}
      </div>
    </div>
  );
}

function CarouselRow({
  brands,
  direction,
}: {
  brands: StoreBrand[];
  direction: "left" | "right";
}) {
  const repeatedBrands = [...brands, ...brands];

  return (
    <div className="brand-carousel-row relative w-full min-w-0 max-w-full overflow-hidden">
      <div
        className={`brand-carousel-track flex w-max max-w-none gap-3 will-change-transform sm:gap-4 ${
          direction === "left"
            ? "animate-[brandMarqueeLeft_82s_linear_infinite]"
            : "animate-[brandMarqueeRight_90s_linear_infinite]"
        }`}
      >
        {repeatedBrands.map((brand, index) => (
          <BrandCard
            key={`${direction}-${brand.name}-${index}`}
            brand={brand}
          />
        ))}
      </div>
    </div>
  );
}

export function StoresBrandCarousel({
  locale = "tr",
}: StoresBrandCarouselProps) {
  const rowOneBrands = storeBrands.filter((_, index) => index % 2 === 0);
  const rowTwoBrands = storeBrands.filter((_, index) => index % 2 === 1);

  return (
    <section
      className="relative w-full max-w-full overflow-hidden overflow-x-clip py-8 md:py-10"
      aria-label={locale === "tr" ? "CityMall mağazaları" : "CityMall stores"}
    >
      <style>{`
        @keyframes brandMarqueeLeft {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes brandMarqueeRight {
          from {
            transform: translate3d(-50%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        .brand-carousel-row {
          contain: paint;
        }

        .brand-carousel-row:hover .brand-carousel-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .brand-carousel-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#f5f5f3] to-transparent sm:w-16 md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#f5f5f3] to-transparent sm:w-16 md:w-28" />

      <div className="container relative mb-12 md:mb-16">
        <CampaignPromoIntro locale={locale} />
      </div>

      <div className="w-full min-w-0 max-w-full space-y-3 overflow-hidden sm:space-y-4">
        <CarouselRow brands={rowOneBrands} direction="left" />
        <CarouselRow brands={rowTwoBrands} direction="right" />
      </div>
    </section>
  );
}

export default StoresBrandCarousel;