"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/types/content";

type StatsSectionProps = {
  locale: Locale;
};

type NumericStat = {
  type: "number";
  value: number;
  suffix: string;
  label: string;
};

type TextStat = {
  type: "text";
  value: string;
  label: string;
};

type Stat = NumericStat | TextStat;

const content = {
  tr: {
    eyebrow: "CityMall Cyprus",
    title: "Gazimağusa’da alışveriş, lezzet ve eğlenceyi bir araya getiren yaşam noktası.",
    stats: [
      {
  type: "number",
  value: 60,
  suffix: "+",
  label: "Mağaza",
},
{
  type: "number",
  value: 20,
  suffix: "+",
  label: "Restoran",
},
{
  type: "number",
  value: 5,
  suffix: "",
  label: "Sinema Salonu",
},
{
  type: "text",
  value: "7 Gün",
  label: "Açık",
},
    ] satisfies Stat[],
  },
  en: {
    eyebrow: "CityMall Cyprus",
    title: "A lifestyle destination bringing shopping, dining and entertainment together in Famagusta.",
    stats: [
      {
  type: "number",
  value: 60,
  suffix: "+",
  label: "Stores",
},
{
  type: "number",
  value: 20,
  suffix: "+",
  label: "Restaurants",
},
{
  type: "number",
  value: 5,
  suffix: "",
  label: "Cinema Halls",
},
{
  type: "text",
  value: "7 Days",
  label: "Open",
},
    ] satisfies Stat[],
  },
};

function AnimatedNumber({
  value,
  suffix,
  shouldAnimate,
}: {
  value: number;
  suffix: string;
  shouldAnimate: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    const duration = 1100;
    const start = performance.now();

    function updateFrame(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(updateFrame);
      }
    }

    requestAnimationFrame(updateFrame);
  }, [shouldAnimate, value]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

export function StatsSection({ locale }: StatsSectionProps) {
  const copy = content[locale];
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
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
      className="bg-text-primary py-16 text-white md:py-24"
    >
      <div className="container">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55">
            {copy.eyebrow}
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
            {copy.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-card backdrop-blur"
            >
              <div className="text-4xl font-semibold tracking-tight md:text-5xl">
                {stat.type === "number" ? (
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    shouldAnimate={hasEntered}
                  />
                ) : (
                  stat.value
                )}
              </div>

              <p className="mt-3 text-sm font-medium text-white/65">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}