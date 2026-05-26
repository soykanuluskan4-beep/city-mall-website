/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/types/content";

type CampaignSliderProps = {
  locale: Locale;
};

type Slide = {
  title: string;
  description: string;
  cta: string;
  image: string;
  alt: string;
};

const slides = {
  tr: [
    {
      title: "Sezon Fırsatları",
      description:
        "CityMall Cyprus mağazalarında sezonun öne çıkan kampanyalarını keşfedin.",
      cta: "Kampanyaları Gör",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85",
      alt: "Alışveriş kampanyası atmosferi",
    },
    {
      title: "Yeme-İçme Keyfi",
      description:
        "Kafe, restoran ve lezzet duraklarıyla ziyaretinize keyifli bir mola ekleyin.",
      cta: "Lezzetleri Keşfet",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85",
      alt: "Restoran ve yeme içme alanı",
    },
    {
      title: "Aile Etkinlikleri",
      description:
        "Çocuklar ve aileler için hazırlanan etkinlik alanlarını ve programları inceleyin.",
      cta: "Etkinlikleri Gör",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=85",
      alt: "Aile etkinliği atmosferi",
    },
    {
      title: "Sinema Haftası",
      description:
        "Güncel filmler, seanslar ve sinema deneyimiyle ziyaretinizi tamamlayın.",
      cta: "Sinema Programı",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=85",
      alt: "Sinema salonu atmosferi",
    },
  ],
  en: [
    {
      title: "Seasonal Offers",
      description:
        "Discover highlighted seasonal campaigns across CityMall Cyprus stores.",
      cta: "View Campaigns",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85",
      alt: "Shopping campaign atmosphere",
    },
    {
      title: "Dining Moments",
      description:
        "Add a tasteful break to your visit with cafes, restaurants and dining spots.",
      cta: "Explore Dining",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85",
      alt: "Restaurant and dining area",
    },
    {
      title: "Family Events",
      description:
        "Explore event areas and programs created for children and families.",
      cta: "View Events",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=85",
      alt: "Family event atmosphere",
    },
    {
      title: "Cinema Week",
      description:
        "Complete your visit with current movies, showtimes and a cinema experience.",
      cta: "Cinema Program",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=85",
      alt: "Cinema hall atmosphere",
    },
  ],
};

const sectionCopy = {
  tr: {
    eyebrow: "Kampanyalar",
    title: "CityMall’de öne çıkanlar",
  },
  en: {
    eyebrow: "Campaigns",
    title: "Featured at CityMall",
  },
};

export function CampaignSlider({ locale }: CampaignSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [rotationKey, setRotationKey] = useState(0);

  const copy = sectionCopy[locale];
  const currentSlides = slides[locale];
  const activeSlide = currentSlides[activeIndex];

  useEffect(() => {
  const interval = window.setInterval(() => {
    setActiveIndex((current) => (current + 1) % currentSlides.length);
  }, 4000);

  return () => {
    window.clearInterval(interval);
  };
}, [currentSlides.length, rotationKey]);

  function resetRotationTimer() {
  setRotationKey((current) => current + 1);
}

function goToPrevious() {
  setActiveIndex((current) =>
    current === 0 ? currentSlides.length - 1 : current - 1
  );
  resetRotationTimer();
}

function goToNext() {
  setActiveIndex((current) => (current + 1) % currentSlides.length);
  resetRotationTimer();
}

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStart === null) {
      return;
    }

    const touchEnd = event.changedTouches[0]?.clientX ?? touchStart;
    const distance = touchStart - touchEnd;

    if (distance > 45) {
      goToNext();
    }

    if (distance < -45) {
      goToPrevious();
    }

    setTouchStart(null);
  }

  return (
    <section className="bg-surface-default py-16 md:py-20">
          <style>{`
      @keyframes fadeZoom {
        0% {
          opacity: 0.55;
          transform: scale(1.035);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes fadeSlideUp {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
      <div className="container">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              {copy.eyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.title}
            </h2>
          </div>

          <Link
            href={`/${locale}/campaigns`}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
          >
            {activeSlide.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div
          className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-muted shadow-elevated"
          onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid min-h-[460px] lg:grid-cols-[1fr_1fr]">
            <div
  key={`content-${activeIndex}`}
  className="order-2 flex animate-[fadeSlideUp_650ms_ease-out] flex-col justify-center p-6 md:p-10 lg:order-1"
>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
                0{activeIndex + 1} / 0{currentSlides.length}
              </p>

              <h3 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
                {activeSlide.title}
              </h3>

              <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary md:text-lg">
                {activeSlide.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${locale}/campaigns`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
                >
                  {activeSlide.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <div className="flex items-center gap-2">
                  {currentSlides.map((slide: Slide, index) => (
  <button
    key={slide.title}
    type="button"
    onClick={() => {
  setActiveIndex(index);
  setRotationKey((current) => current + 1);
}}
    className={`h-1.5 rounded-full transition-all duration-300 ${
      activeIndex === index
        ? "w-10 bg-brand-primary"
        : "w-5 bg-text-muted/25 hover:bg-text-muted/50"
    }`}
    aria-label={`${index + 1}. slide`}
  />
))}
                </div>
              </div>
            </div>

            <div className="order-1 min-h-[280px] overflow-hidden lg:order-2 lg:min-h-full">
              <img
  key={activeSlide.image}
  src={activeSlide.image}
  alt={activeSlide.alt}
  className="h-full w-full animate-[fadeZoom_800ms_ease-out] object-cover"
/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}