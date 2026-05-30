/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, MapPinned, Sparkles } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/types/content";

type PreviewVideoHeroProps = {
  locale: Locale;
};

const content = {
  tr: {
    brand: "CityMall Cyprus",
    location: "Gazimağusa",
    eyebrow: "Cinematic Mall Experience",
    title: "Gazimağusa'nın buluşma noktası.",
    description:
      "Alışveriş, lezzet, sinema ve deneyimi tek noktada keşfet.",
    primaryCta: "Mağazaları Keşfet",
    secondaryCta: "Ziyaret Planla",
    scroll: "Keşfet",
    status: "Redesign Preview",
  },
  en: {
    brand: "CityMall Cyprus",
    location: "Famagusta",
    eyebrow: "Cinematic Mall Experience",
    title: "Famagusta's meeting point.",
    description:
      "Discover shopping, dining, cinema and experiences in one destination.",
    primaryCta: "Explore Stores",
    secondaryCta: "Plan Your Visit",
    scroll: "Explore",
    status: "Redesign Preview",
  },
};

const fallbackImage =
  "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=2400&q=85";

const videoSrc = "/videos/fashion-hero.mp4";

export function PreviewVideoHero({ locale }: PreviewVideoHeroProps) {
  const copy = content[locale];
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  const showFallback = hasVideoError || !isVideoReady;

  return (
    <section className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden bg-text-primary text-white">
      <style>{`
        @keyframes heroCopyReveal {
          0% {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes heroScrollLine {
          0% {
            transform: scaleY(0);
            transform-origin: top;
            opacity: 0;
          }
          35% {
            transform: scaleY(1);
            transform-origin: top;
            opacity: 1;
          }
          70% {
            transform: scaleY(1);
            transform-origin: bottom;
            opacity: 1;
          }
          100% {
            transform: scaleY(0);
            transform-origin: bottom;
            opacity: 0;
          }
        }

        @keyframes heroAmbientGlow {
          0%, 100% {
            opacity: 0.42;
            transform: translate3d(-1%, -1%, 0) scale(1);
          }
          50% {
            opacity: 0.68;
            transform: translate3d(1%, 1%, 0) scale(1.04);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .preview-video-hero-copy,
          .preview-video-hero-cta,
          .preview-video-hero-scroll-line,
          .preview-video-hero-glow,
          .preview-video-hero-media {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }

          .preview-video-hero-media video {
            display: none !important;
          }

          .preview-video-hero-media img {
            opacity: 1 !important;
          }
        }
      `}</style>

      <div className="preview-video-hero-media absolute inset-0 -z-30">
        <img
          src={fallbackImage}
          alt=""
          className={`h-full w-full object-cover transition duration-700 ${
            showFallback ? "opacity-100" : "opacity-0"
          }`}
        />

        {!hasVideoError ? (
          <video
            className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
              isVideoReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onLoadedData={() => setIsVideoReady(true)}
            onCanPlay={() => setIsVideoReady(true)}
            onError={() => setHasVideoError(true)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,8,14,0.52)_0%,rgba(5,8,14,0.46)_38%,rgba(5,8,14,0.82)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(180,126,47,0.24),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_26%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.13] mix-blend-overlay [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.62)_0_1px,transparent_1px)] [background-size:4px_4px]" />

      <div className="preview-video-hero-glow pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[radial-gradient(circle_at_bottom,rgba(180,126,47,0.26),transparent_58%)] [animation:heroAmbientGlow_8s_ease-in-out_infinite]" />

      <div className="container relative flex min-h-[calc(100svh-72px)] flex-col">
        <div className="flex items-center justify-between gap-4 pt-6 md:pt-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-white shadow-card backdrop-blur-md transition hover:bg-white/16"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-text-primary">
              C
            </span>

            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight">
                {copy.brand}
              </span>
              <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/48">
                {copy.location}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/58 backdrop-blur-md sm:inline-flex">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.status}
          </div>
        </div>

        <div className="flex flex-1 items-end pb-16 pt-24 md:pb-20 lg:pb-24">
          <div className="max-w-6xl">
            <p className="preview-video-hero-copy inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-white/68 backdrop-blur-md [animation:heroCopyReveal_850ms_cubic-bezier(0.22,1,0.36,1)_120ms_both]">
              {copy.eyebrow}
            </p>

            <h1 className="preview-video-hero-copy mt-6 max-w-[11ch] text-[clamp(3.4rem,9vw,8.8rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-white [animation:heroCopyReveal_950ms_cubic-bezier(0.22,1,0.36,1)_220ms_both]">
              {copy.title}
            </h1>

            <p className="preview-video-hero-copy mt-7 max-w-2xl text-base leading-8 text-white/76 md:text-xl [animation:heroCopyReveal_950ms_cubic-bezier(0.22,1,0.36,1)_320ms_both]">
              {copy.description}
            </p>

            <div className="preview-video-hero-cta mt-9 flex flex-col gap-3 sm:flex-row [animation:heroCopyReveal_950ms_cubic-bezier(0.22,1,0.36,1)_420ms_both]">
              <Link
                href={`/${locale}/stores`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-text-primary shadow-overlay transition hover:-translate-y-0.5 hover:bg-surface-muted"
              >
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href={`/${locale}/map`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/28 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18"
              >
                {copy.secondaryCta}
                <MapPinned className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <a
          href="#preview-mosaic"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/62 transition hover:text-white md:flex"
          aria-label={copy.scroll}
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em]">
            {copy.scroll}
          </span>

          <span className="relative h-12 w-px overflow-hidden bg-white/18">
            <span className="preview-video-hero-scroll-line absolute inset-x-0 top-0 h-full bg-white/70 [animation:heroScrollLine_2.2s_ease-in-out_infinite]" />
          </span>

          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}