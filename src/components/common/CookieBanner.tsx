"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/types/content";

type CookieBannerProps = {
  locale: Locale;
};

const content = {
  tr: {
    title: "Çerez bilgilendirmesi",
    text: "Bu demo site, tercihlerinizi hatırlamak ve ziyaret deneyimini iyileştirmek için temel çerez/yerel depolama kullanabilir.",
    privacy: "Gizlilik ve Çerezler",
    accept: "Kabul Et",
  },
  en: {
    title: "Cookie notice",
    text: "This demo site may use basic cookies/local storage to remember your preferences and improve the visitor experience.",
    privacy: "Privacy and Cookies",
    accept: "Accept",
  },
};

const STORAGE_KEY = "citymall-cookie-consent";

export function CookieBanner({ locale }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpeningPrivacy, setIsOpeningPrivacy] = useState(false);

  useEffect(() => {
    const hasConsent = window.localStorage.getItem(STORAGE_KEY);

    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  function handleAccept() {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  const copy = content[locale];

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-4 pb-4">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border-default bg-surface-default p-4 shadow-overlay md:flex md:items-center md:justify-between md:gap-6 md:p-5">
        <div>
          <p className="text-sm font-semibold text-text-primary">
            {copy.title}
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">
            {copy.text}{" "}
            <Link
  href={`/${locale}/privacy`}
  onClick={() => setIsOpeningPrivacy(true)}
  className="font-semibold text-text-primary underline underline-offset-4 transition hover:opacity-80"
>
  {isOpeningPrivacy
    ? locale === "tr"
      ? "Açılıyor..."
      : "Opening..."
    : copy.privacy}
</Link>
          </p>
        </div>

        <button
          type="button"
          onClick={handleAccept}
          className="mt-4 inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:opacity-90 md:mt-0 md:w-auto"
        >
          {copy.accept}
        </button>
      </div>
    </div>
  );
}