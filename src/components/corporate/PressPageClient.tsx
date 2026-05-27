"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Building2,
  Camera,
  Download,
  FileText,
  Image,
  Info,
  Mail,
  Newspaper,
  Package,
  X,
} from "lucide-react";
import type { Locale } from "@/types/content";

type PressPageClientProps = {
  locale: Locale;
};

type DownloadType = "pressKit" | "logoPack" | "photoPack";

const content = {
  tr: {
    eyebrow: "Basın & Medya",
    title: "CityMall Cyprus medya kaynakları ve kurumsal iletişim.",
    description:
      "Basın mensupları, marka iş birlikleri ve kurumsal iletişim talepleri için medya kaynaklarını ve iletişim bilgilerini inceleyin.",
    primaryCta: "Medya İletişimi",
    secondaryCta: "Kaynakları Gör",
    resourcesTitle: "Medya Kaynakları",
    resourcesText:
      "Press kit, logo paketi ve görsel kaynaklar ticari teslimde gerçek dosyalarla değiştirilebilir. Şimdilik demo indirme akışı kullanılır.",
    resources: [
      {
        type: "pressKit" as const,
        title: "Press Kit",
        text: "Kurumsal tanıtım metni, temel bilgiler ve medya kullanım notları.",
        cta: "Press Kit İndir",
      },
      {
        type: "logoPack" as const,
        title: "Logo Paketi",
        text: "CityMall Cyprus logo kullanımı için marka dosyaları ve formatları.",
        cta: "Logo Paketini İndir",
      },
      {
        type: "photoPack" as const,
        title: "Medya Görselleri",
        text: "AVM dış görünüm, etkinlik ve yaşam alanı fotoğrafları için kaynak paketi.",
        cta: "Görselleri İndir",
      },
    ],
    newsTitle: "Basın Duyuruları",
    newsText:
      "Basın duyuruları ve kurumsal haberler bu alanda listelenebilir.",
    news: [
      {
        date: "2026",
        title: "CityMall Cyprus dijital ziyaret deneyimini yeniliyor",
        text: "Yeni web deneyimiyle mağazalar, Cinemall, etkinlikler ve ziyaretçi hizmetleri tek platformda sunulur.",
      },
      {
        date: "2026",
        title: "Cinemall ve etkinlik programı dijitalde görünür hale geliyor",
        text: "Ziyaretçiler film seanslarını, yaklaşan etkinlikleri ve ziyaret planlama bilgilerini kolayca inceleyebilir.",
      },
      {
        date: "2026",
        title: "Markalar için kiralama ve kurumsal iletişim kanalları güçleniyor",
        text: "Leasing ve kurumsal başvuru süreçleri için dijital iletişim alanları oluşturulur.",
      },
    ],
    contactTitle: "Medya İletişimi",
    contactText:
      "Basın, röportaj, logo kullanımı, fotoğraf talebi ve kurumsal iş birlikleri için iletişim sayfasından bize ulaşabilirsiniz.",
    contactButton: "İletişime Geç",
    usageTitle: "Kullanım Notları",
    usageItems: [
      "Logo ve görseller yalnızca CityMall Cyprus kurumsal iletişimi için kullanılmalıdır.",
      "Medya materyalleri ticari teslimde gerçek marka dosyalarıyla değiştirilmelidir.",
      "Basın talepleri ve röportaj istekleri için medya iletişim kanalı kullanılmalıdır.",
      "Bu sayfadaki indirme butonları demo amaçlıdır.",
    ],
    modal: {
      title: "Demo indirme akışı",
      close: "Kapat",
      contact: "Medya İletişimi",
      pressKit:
        "Press Kit dosyası bu demo projede gerçek PDF olarak eklenmemiştir. Ticari teslimde kurumsal PDF dosyası buraya bağlanabilir.",
      logoPack:
        "Logo paketi bu demo projede gerçek ZIP olarak eklenmemiştir. Ticari teslimde logo dosyaları ve marka kılavuzu buraya bağlanabilir.",
      photoPack:
        "Medya görselleri bu demo projede gerçek dosya paketi olarak eklenmemiştir. Ticari teslimde fotoğraf arşivi buraya bağlanabilir.",
    },
  },
  en: {
    eyebrow: "Press & Media",
    title: "CityMall Cyprus media resources and corporate communication.",
    description:
      "Explore media resources and contact information for press members, brand collaborations and corporate communication requests.",
    primaryCta: "Media Contact",
    secondaryCta: "View Resources",
    resourcesTitle: "Media Resources",
    resourcesText:
      "Press kit, logo package and visual assets can be replaced with real files during commercial handoff. A demo download flow is used for now.",
    resources: [
      {
        type: "pressKit" as const,
        title: "Press Kit",
        text: "Corporate introduction copy, key facts and media usage notes.",
        cta: "Download Press Kit",
      },
      {
        type: "logoPack" as const,
        title: "Logo Package",
        text: "Brand files and formats for CityMall Cyprus logo usage.",
        cta: "Download Logo Pack",
      },
      {
        type: "photoPack" as const,
        title: "Media Images",
        text: "Resource package for mall exterior, events and lifestyle area photos.",
        cta: "Download Images",
      },
    ],
    newsTitle: "Press Releases",
    newsText:
      "Press releases and corporate news can be listed in this section.",
    news: [
      {
        date: "2026",
        title: "CityMall Cyprus refreshes its digital visitor experience",
        text: "The new web experience brings stores, Cinemall, events and visitor services into one platform.",
      },
      {
        date: "2026",
        title: "Cinemall and event programs become easier to discover online",
        text: "Visitors can easily review showtimes, upcoming events and visit planning information.",
      },
      {
        date: "2026",
        title: "Leasing and corporate communication channels become stronger",
        text: "Digital communication areas are created for leasing and corporate application processes.",
      },
    ],
    contactTitle: "Media Contact",
    contactText:
      "For press, interviews, logo usage, photo requests and corporate collaborations, please contact us through the contact page.",
    contactButton: "Contact Us",
    usageTitle: "Usage Notes",
    usageItems: [
      "Logos and images should only be used for CityMall Cyprus corporate communication.",
      "Media materials should be replaced with real brand files during commercial handoff.",
      "Media contact channels should be used for press requests and interview inquiries.",
      "Download buttons on this page are for demo purposes.",
    ],
    modal: {
      title: "Demo download flow",
      close: "Close",
      contact: "Media Contact",
      pressKit:
        "The press kit is not added as a real PDF in this demo project. A corporate PDF file can be connected here during commercial handoff.",
      logoPack:
        "The logo package is not added as a real ZIP in this demo project. Logo files and brand guidelines can be connected here during commercial handoff.",
      photoPack:
        "Media images are not added as a real file package in this demo project. A photo archive can be connected here during commercial handoff.",
    },
  },
};

const resourceIcons = {
  pressKit: FileText,
  logoPack: Package,
  photoPack: Image,
};

export function PressPageClient({ locale }: PressPageClientProps) {
  const copy = content[locale];
  const [activeDownload, setActiveDownload] = useState<DownloadType | null>(
    null
  );

  useEffect(() => {
  if (!activeDownload) {
    return;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" || event.key === "Esc") {
      setActiveDownload(null);
    }
  }

  window.addEventListener("keydown", handleKeyDown);
  document.body.style.overflow = "hidden";

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "";
  };
}, [activeDownload]);

  return (
    <main className="overflow-x-hidden bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_38%),linear-gradient(135deg,rgba(17,24,39,1),rgba(42,49,63,1))]" />

        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 max-w-[13ch] text-[clamp(2.75rem,11vw,4.25rem)] font-semibold leading-[0.95] tracking-tight text-white md:max-w-5xl md:text-7xl md:leading-[0.95]">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-3xl break-words text-base leading-7 text-white/78 md:text-xl md:leading-8">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <a
                href="#media-resources"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {copy.secondaryCta}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-elevated backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-6 text-text-primary">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-text-primary text-white">
                <Newspaper className="h-6 w-6" aria-hidden="true" />
              </div>

              <h2 className="mt-6 text-3xl font-semibold tracking-tight">
                {copy.resourcesTitle}
              </h2>

              <p className="mt-4 text-sm leading-6 text-text-secondary">
                {copy.resourcesText}
              </p>

              <div className="mt-6 grid gap-3">
                {copy.resources.map((resource) => {
                  const Icon = resourceIcons[resource.type];

                  return (
                    <button
                      key={resource.type}
                      type="button"
                      onClick={() => setActiveDownload(resource.type)}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border-default bg-surface-muted p-4 text-left transition hover:bg-surface-subtle"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-text-primary" />
                        <span className="text-sm font-semibold text-text-primary">
                          {resource.title}
                        </span>
                      </span>

                      <Download className="h-4 w-4 text-text-muted" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="media-resources" className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.resourcesTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.resourcesTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.resourcesText}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {copy.resources.map((resource) => {
              const Icon = resourceIcons[resource.type];

              return (
                <article
                  key={resource.type}
                  className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
                    {resource.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {resource.text}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveDownload(resource.type)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-muted px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
                  >
                    {resource.cta}
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border-default bg-surface-muted/45 py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.newsTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.newsTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.newsText}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {copy.news.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card"
              >
                <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
                  {item.date}
                </span>

                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-border-default bg-text-primary p-6 text-white shadow-elevated md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-text-primary">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight">
              {copy.contactTitle}
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/72">
              {copy.contactText}
            </p>

            <Link
              href={`/${locale}/contact`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
            >
              {copy.contactButton}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>

          <article className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-muted text-text-primary">
              <Info className="h-5 w-5" aria-hidden="true" />
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-text-primary">
              {copy.usageTitle}
            </h2>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-text-secondary">
              {copy.usageItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <Building2
                    className="mt-1 h-4 w-4 shrink-0 text-text-muted"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {activeDownload ? (
        <div
  className="fixed inset-0 z-[100] flex items-center justify-center bg-text-primary/70 p-4 backdrop-blur-sm"
  onClick={() => setActiveDownload(null)}
  onKeyDown={(event) => {
    if (event.key === "Escape" || event.key === "Esc") {
      setActiveDownload(null);
    }
  }}
  role="presentation"
  tabIndex={-1}
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
                  {copy.eyebrow}
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">
                  {copy.modal.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveDownload(null)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface-muted text-text-primary transition hover:bg-surface-subtle"
                aria-label={copy.modal.close}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 rounded-3xl bg-surface-muted p-5">
              <Camera className="h-6 w-6 text-text-primary" aria-hidden="true" />
              <p className="mt-4 text-sm leading-6 text-text-secondary">
                {copy.modal[activeDownload]}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {copy.modal.contact}
              </Link>

              <button
                type="button"
                onClick={() => setActiveDownload(null)}
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