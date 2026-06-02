/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, MapPinned } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/types/content";

type PreviewVideoHeroProps = {
  locale: Locale;
};

const content = {
  tr: {
    title: "Gazimağusa'nın buluşma noktası.",
    description:
      "Alışveriş, lezzet, sinema ve deneyimi tek noktada keşfet.",
    primaryCta: "Mağazaları Keşfet",
    secondaryCta: "Ziyaret Planla",
    scroll: "Keşfet",
  },
  en: {
    title: "Famagusta's meeting point.",
    description:
      "Discover shopping, dining, cinema and experiences in one destination.",
    primaryCta: "Explore Stores",
    secondaryCta: "Plan Your Visit",
    scroll: "Explore",
  },
};

const videoSrc = "/videos/hero-main.mp4";
const videoPoster = "/videos/hero-main-poster.jpg";

export function PreviewVideoHero({ locale }: PreviewVideoHeroProps) {
  const copy = content[locale];

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  const shouldShowPoster = hasVideoError || !isVideoReady;

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-text-primary text-white">
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
          src={videoPoster}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${
            shouldShowPoster ? "opacity-100" : "opacity-0"
          }`}
        />

        {!hasVideoError ? (
          <video
            className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${
              isVideoReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={videoPoster}
            aria-hidden="true"
            onLoadedData={() => setIsVideoReady(true)}
            onCanPlay={() => setIsVideoReady(true)}
            onError={() => setHasVideoError(true)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,8,14,0.44)_0%,rgba(5,8,14,0.42)_38%,rgba(5,8,14,0.82)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(232,49,42,0.20),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(0,114,188,0.10),transparent_26%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.13] mix-blend-overlay [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.62)_0_1px,transparent_1px)] [background-size:4px_4px]" />

      <div className="preview-video-hero-glow pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[radial-gradient(circle_at_bottom,rgba(255,209,0,0.20),transparent_58%)] [animation:heroAmbientGlow_8s_ease-in-out_infinite]" />

      <div className="container relative flex min-h-[100svh] flex-col">
        <div className="flex flex-1 items-end pb-16 pt-32 md:pb-20 lg:pb-24">
          <div className="max-w-6xl">
            <h1 className="preview-video-hero-copy mt-0 max-w-[12ch] text-[clamp(3rem,7.6vw,7.4rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white [animation:heroCopyReveal_950ms_cubic-bezier(0.22,1,0.36,1)_220ms_both]">
              {copy.title}
            </h1>

            <p className="preview-video-hero-copy mt-7 max-w-2xl text-base leading-8 text-white/82 md:text-xl [animation:heroCopyReveal_950ms_cubic-bezier(0.22,1,0.36,1)_320ms_both]">
              {copy.description}
            </p>

            <div className="preview-video-hero-cta mt-9 flex flex-col gap-3 sm:flex-row [animation:heroCopyReveal_950ms_cubic-bezier(0.22,1,0.36,1)_420ms_both]">
              <Link
                href={`/${locale}/stores`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD100] px-7 py-4 text-sm font-semibold text-black shadow-overlay transition hover:-translate-y-0.5 hover:bg-[#F7941D]"
              >
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href={`/${locale}/map`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18"
              >
                {copy.secondaryCta}
                <MapPinned className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <a
          href="#preview-mosaic"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/68 transition hover:text-white md:flex"
          aria-label={copy.scroll}
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em]">
            {copy.scroll}
          </span>

          <span className="relative h-12 w-px overflow-hidden bg-white/20">
            <span className="preview-video-hero-scroll-line absolute inset-x-0 top-0 h-full bg-white/76 [animation:heroScrollLine_2.2s_ease-in-out_infinite]" />
          </span>

          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}