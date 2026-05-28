"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Gift,
  Info,
  MapPin,
  ShoppingBag,
  Store as StoreIcon,
  X,
} from "lucide-react";
import { stores } from "@/data/stores";
import { getLocalizedText } from "@/lib/locale";
import type { Floor, Locale, Store, StoreCategory } from "@/types/content";

type GiftCardClientProps = {
  locale: Locale;
};

const giftValues = ["50₺", "100₺", "250₺", "500₺"];

const content = {
  tr: {
    eyebrow: "Hediye Kartı",
    title: "Hediye vermenin en kolay yolu.",
    description:
      "CityMall Cyprus hediye kartı ile sevdiklerinize alışveriş, lezzet ve eğlenceyi seçme özgürlüğü sunun.",
    primaryCta: "Hediye Kartı Bilgisi Al",
    secondaryCta: "Nasıl Kullanılır?",
    selectedValue: "Seçili değer",
    chooseValue: "Kart Değeri Seç",
    demoNote:
      "Hediye kartı satın alma, teslimat ve kullanım seçenekleri için CityMall Cyprus iletişim kanallarından bilgi alabilirsiniz.",
    howItWorksTitle: "Hediye Kartı Nasıl Kullanılır?",
    howItWorksText:
      "Kart değerini seçin, sevdiklerinize hediye edin ve katılımcı mağazalarda kullanılmasını sağlayın.",
    steps: [
      {
        title: "Seç",
        text: "50₺, 100₺, 250₺ veya 500₺ değer seçeneklerinden birini belirleyin.",
      },
      {
        title: "Hediye Et",
        text: "Doğum günü, bayram, yılbaşı veya özel günlerde sevdiklerinize ulaştırın.",
      },
      {
        title: "Kullan",
        text: "Katılımcı mağazalarda alışveriş, yeme-içme veya eğlence için değerlendirin.",
      },
    ],
    storesTitle: "Geçerli Mağazalar",
    storesText:
      "Hediye kartı kullanımı mağaza ve dönem koşullarına göre değişebilir. Güncel bilgi için danışma noktasından destek alabilirsiniz.",
    storeCta: "Geçerli Mağazaları Gör",
    termsTitle: "Şartlar & Koşullar",
    terms: [
      "Hediye kartı kullanımı katılımcı mağazalara göre değişiklik gösterebilir.",
      "Kart bakiyesi nakde çevrilemez.",
      "Kayıp veya çalıntı kartlar için danışma noktasından destek alınmalıdır.",
      "Kampanya ve özel günlerde kullanım koşulları değişiklik gösterebilir.",
      "Hediye kartı satış ve kullanım koşulları CityMall Cyprus tarafından belirlenir.",
    ],
    modal: {
      eyebrow: "Hediye Kartı",
      title: "Hediye kartı bilgilendirmesi",
      text: "Seçtiğiniz kart değeri için satın alma, teslimat ve kullanım seçenekleri hakkında CityMall Cyprus iletişim ekibinden güncel bilgi alabilirsiniz.",
      value: "Seçili kart değeri",
      contact: "Satın Alma Bilgisi Al",
      close: "Kapat",
    },
    categoryLabels: {
      fashion: "Moda",
      electronics: "Elektronik",
      home: "Ev & Yaşam",
      beauty: "Güzellik",
      sports: "Spor",
      books: "Kitap & Kırtasiye",
      services: "Hizmet",
      kids: "Çocuk",
      other: "Diğer",
    },
    floorLabels: {
      basement: "-1. Kat",
      ground: "Zemin Kat",
      first: "1. Kat",
      second: "2. Kat",
      "food-court": "Food Court",
      cinema: "Sinema Katı",
    },
  },
  en: {
    eyebrow: "Gift Card",
    title: "The easiest way to give a gift.",
    description:
      "Give your loved ones the freedom to choose shopping, dining and entertainment at CityMall Cyprus.",
    primaryCta: "Get Gift Card Info",
    secondaryCta: "How to Use It",
    selectedValue: "Selected value",
    chooseValue: "Choose Card Value",
    demoNote:
      "For gift card purchase, delivery and usage options, please contact CityMall Cyprus through the official contact channels.",
    howItWorksTitle: "How the Gift Card Works",
    howItWorksText:
      "Choose a card value, gift it to someone you love and let them use it at participating stores.",
    steps: [
      {
        title: "Choose",
        text: "Select one of the 50₺, 100₺, 250₺ or 500₺ value options.",
      },
      {
        title: "Gift",
        text: "Give it to your loved ones for birthdays, holidays, New Year or special occasions.",
      },
      {
        title: "Use",
        text: "Use it for shopping, dining or entertainment at participating stores.",
      },
    ],
    storesTitle: "Valid Stores",
    storesText:
      "Gift card usage may vary by store and seasonal terms. Please ask the information desk for current details.",
    storeCta: "View Valid Stores",
    termsTitle: "Terms & Conditions",
    terms: [
      "Gift card usage may vary by participating stores.",
      "Card balance cannot be exchanged for cash.",
      "For lost or stolen cards, please contact guest services.",
      "Terms may vary during campaigns and special days.",
      "Gift card sales and usage terms are determined by CityMall Cyprus.",
    ],
    modal: {
      eyebrow: "Gift Card",
      title: "Gift card information",
      text: "For the selected card value, please contact the CityMall Cyprus team for current purchase, delivery and usage options.",
      value: "Selected card value",
      contact: "Request Purchase Info",
      close: "Close",
    },
    categoryLabels: {
      fashion: "Fashion",
      electronics: "Electronics",
      home: "Home & Living",
      beauty: "Beauty",
      sports: "Sports",
      books: "Books & Stationery",
      services: "Services",
      kids: "Kids",
      other: "Other",
    },
    floorLabels: {
      basement: "Basement Floor",
      ground: "Ground Floor",
      first: "1st Floor",
      second: "2nd Floor",
      "food-court": "Food Court",
      cinema: "Cinema Floor",
    },
  },
};

function getStoreCategoryLabel(store: Store, locale: Locale) {
  return (
    content[locale].categoryLabels[store.category as StoreCategory] ??
    store.category
  );
}

function getStoreFloorLabel(store: Store, locale: Locale) {
  return content[locale].floorLabels[store.floor as Floor] ?? store.floor;
}

function getParticipatingStores(locale: Locale) {
  return [...stores]
    .sort((a, b) => {
      if (a.featured && !b.featured) {
        return -1;
      }

      if (!a.featured && b.featured) {
        return 1;
      }

      return getLocalizedText(a.name, locale).localeCompare(
        getLocalizedText(b.name, locale),
        locale
      );
    })
    .slice(0, 12);
}

export function GiftCardClient({ locale }: GiftCardClientProps) {
  const copy = content[locale];
  const [selectedValue, setSelectedValue] = useState("250₺");
  const [modalOpen, setModalOpen] = useState(false);

  const participatingStores = useMemo(
    () => getParticipatingStores(locale),
    [locale]
  );

  useEffect(() => {
    if (!modalOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <main className="overflow-x-hidden bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_36%),linear-gradient(135deg,rgba(17,24,39,1),rgba(42,49,63,1))]" />

        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 max-w-[12ch] break-words text-[clamp(2.75rem,11vw,4rem)] font-semibold leading-[0.95] tracking-tight md:max-w-5xl md:text-7xl md:leading-[0.95]">
              {copy.title}
            </h1>

            <p className="mt-5 max-w-full break-words text-base leading-7 text-white/78 md:mt-6 md:max-w-3xl md:text-xl md:leading-8">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {copy.secondaryCta}
              </a>
            </div>
          </div>

          <div className="w-full max-w-full min-w-0 overflow-hidden">
             <div className="relative mx-auto w-full max-w-[360px] md:max-w-md">
              <div className="absolute -inset-6 rounded-[3rem] bg-brand-primary/20 blur-3xl" />

              <div className="relative w-full max-w-full overflow-hidden rounded-[2rem] border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] p-4 shadow-elevated backdrop-blur sm:p-6">
                <div className="w-full max-w-full rounded-[1.5rem] border border-white/15 bg-[linear-gradient(135deg,#f8efe0,#d9b99e,#8b6a4f)] p-5 text-text-primary shadow-elevated sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-primary/60">
                        CityMall Cyprus
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                        Gift Card
                      </h2>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/45">
                      <Gift className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="mt-14">
                    <p className="text-sm font-semibold text-text-primary/60">
                      {copy.selectedValue}
                    </p>
                    <p className="mt-1 text-4xl font-semibold">
                      {selectedValue}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <div className="h-2 w-28 rounded-full bg-white/45" />
                    <div className="h-2 w-16 rounded-full bg-white/35" />
                    <div className="h-2 w-10 rounded-full bg-white/30" />
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm font-semibold text-white">
                    {copy.chooseValue}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                    {giftValues.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setSelectedValue(value)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          selectedValue === value
                            ? "border-white bg-white text-text-primary"
                            : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>

                  <p className="mt-4 text-xs leading-5 text-white/62">
                    {copy.demoNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.howItWorksTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.howItWorksTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.howItWorksText}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {copy.steps.map((step, index) => {
              const icons = [CreditCard, Gift, ShoppingBag];
              const Icon = icons[index] ?? CheckCircle2;

              return (
                <article
                  key={step.title}
                  className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <p className="mt-5 text-sm font-semibold text-text-muted">
                    0{index + 1}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {step.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
                {copy.storesTitle}
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
                {copy.storesTitle}
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
                {copy.storesText}
              </p>
            </div>

            <Link
              href={`/${locale}/stores`}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
            >
              {copy.storeCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {participatingStores.map((store) => {
              const name = getLocalizedText(store.name, locale);
              const category = getStoreCategoryLabel(store, locale);
              const floor = getStoreFloorLabel(store, locale);

              return (
                <article
                  key={store.id}
                  className="min-w-0 rounded-[1.5rem] border border-border-default bg-surface-default p-5 shadow-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface-muted text-text-primary">
                      <StoreIcon className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="break-words text-lg font-semibold text-text-primary">
                        {name}
                      </h3>

                      <p className="mt-2 text-sm text-text-secondary">
                        {category}
                      </p>

                      <p className="mt-2 inline-flex items-start gap-1.5 rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
                        <MapPin
                          className="mt-0.5 h-3.5 w-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        {floor}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface-muted text-text-primary">
                <Info className="h-5 w-5" aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
                  {copy.termsTitle}
                </h2>

                <ul className="mt-5 space-y-3 text-sm leading-6 text-text-secondary">
                  {copy.terms.map((term) => (
                    <li key={term} className="flex gap-3">
                      <CheckCircle2
                        className="mt-1 h-4 w-4 shrink-0 text-text-muted"
                        aria-hidden="true"
                      />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-text-primary/70 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-lg rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-elevated"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={copy.modal.title}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
                  {copy.modal.eyebrow}
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">
                  {copy.modal.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface-muted text-text-primary transition hover:bg-surface-subtle"
                aria-label={copy.modal.close}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 rounded-3xl bg-surface-muted p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                {copy.modal.value}
              </p>

              <p className="mt-2 text-4xl font-semibold tracking-tight text-text-primary">
                {selectedValue}
              </p>
            </div>

            <p className="mt-5 text-sm leading-6 text-text-secondary">
              {copy.modal.text}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {copy.modal.contact}
              </Link>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-border-default bg-surface-muted px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
              >
                {copy.modal.close}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}