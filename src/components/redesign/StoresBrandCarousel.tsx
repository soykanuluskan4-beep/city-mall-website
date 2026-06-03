"use client";

import Image from "next/image";
import type { Locale } from "@/types/content";

type StoresBrandCarouselProps = {
  locale?: Locale;
};

type StoreBrand = {
  name: string;
  image: string;
  logo?: string;
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
    name: "Discountterra",
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

function BrandCard({ brand }: { brand: StoreBrand }) {
  return (
    <div className="group relative aspect-square w-[132px] shrink-0 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#111] shadow-[0_18px_50px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-[3px] hover:shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:w-[160px] lg:w-[188px] xl:w-[206px]">
      <Image
        src={brand.image}
        alt={brand.name}
        fill
        sizes="(max-width: 640px) 132px, (max-width: 1024px) 160px, 206px"
        className="object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/55 transition duration-500 group-hover:bg-black/35" />

      <div className="absolute inset-0 flex items-center justify-center p-6">
        {brand.logo ? (
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            width={220}
            height={90}
            className="max-h-[60px] w-auto max-w-[78%] object-contain brightness-0 invert"
          />
        ) : (
          <span className="text-center text-[1.05rem] font-black uppercase leading-tight tracking-[0.1em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] sm:text-[1.1rem]">
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
    <div className="brand-carousel-row overflow-hidden">
      <div
        className={`brand-carousel-track flex w-max gap-3 sm:gap-4 ${
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

export function StoresBrandCarousel({ locale = "tr" }: StoresBrandCarouselProps) {
  const rowOneBrands = storeBrands.filter((_, index) => index % 2 === 0);
  const rowTwoBrands = storeBrands.filter((_, index) => index % 2 === 1);

  return (
    <section
      className="relative overflow-hidden py-8 md:py-10"
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

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f5f5f3] to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f5f5f3] to-transparent md:w-28" />

      <div className="space-y-3 sm:space-y-4">
        <CarouselRow brands={rowOneBrands} direction="left" />
        <CarouselRow brands={rowTwoBrands} direction="right" />
      </div>
    </section>
  );
}

export default StoresBrandCarousel;