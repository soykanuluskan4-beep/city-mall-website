import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type PrivacyPageProps = {
  params: {
    locale: string;
  };
};

const pageContent = {
  tr: {
    eyebrow: "Gizlilik & Çerezler",
    title: "Gizlilik ve çerez bilgilendirmesi.",
    description:
      "Bu sayfa, CityMall Cyprus konsept web sitesinin demo gizlilik ve çerez bilgilendirme metnidir.",
    demoNotice:
      "Bu metin resmi hukuki metin değildir. Gerçek yayında CityMall Cyprus yönetimi veya hukuk danışmanı tarafından onaylanmış gizlilik politikası kullanılmalıdır.",
    sections: [
      {
        title: "Toplanan Bilgiler",
        text: "Bu demo sitede aktif bir üyelik, ödeme veya gerçek form gönderimi bulunmaz. Gerçek projede iletişim formu, çerez tercihleri ve analitik araçlar için ayrıca bilgilendirme yapılabilir.",
      },
      {
        title: "Çerez Kullanımı",
        text: "Site deneyimini iyileştirmek ve ziyaretçi tercihlerini hatırlamak için zorunlu veya tercih çerezleri kullanılabilir. Bu demo sürümde çerez bildirimi kabul tercihini tarayıcıda saklamak için localStorage kullanılabilir.",
      },
      {
        title: "Üçüncü Taraf Servisler",
        text: "Gerçek yayında harita, analitik, sosyal medya veya reklam servisleri entegre edilirse, bu servislerin veri işleme politikaları ayrıca değerlendirilmelidir.",
      },
      {
        title: "İletişim",
        text: "Gizlilik politikası ve veri işleme süreçleri gerçek proje yayına alınmadan önce müşteri tarafından netleştirilmelidir.",
      },
    ],
    backHome: "Ana sayfaya dön",
    contact: "İletişim",
  },
  en: {
    eyebrow: "Privacy & Cookies",
    title: "Privacy and cookie notice.",
    description:
      "This page is a demo privacy and cookie notice for the CityMall Cyprus concept website.",
    demoNotice:
      "This is not an official legal document. In a real launch, a privacy policy approved by CityMall Cyprus management or legal counsel should be used.",
    sections: [
      {
        title: "Information Collected",
        text: "This demo website does not include active membership, payment or real form submission. In a real project, contact forms, cookie preferences and analytics tools can be explained separately.",
      },
      {
        title: "Cookie Usage",
        text: "Essential or preference cookies may be used to improve the site experience and remember visitor choices. In this demo, localStorage may be used to store the cookie notice acceptance preference.",
      },
      {
        title: "Third-Party Services",
        text: "If maps, analytics, social media or advertising services are integrated in the real launch, their data processing policies should be reviewed separately.",
      },
      {
        title: "Contact",
        text: "Privacy policy and data processing details should be clarified by the client before the real project goes live.",
      },
    ],
    backHome: "Back to home",
    contact: "Contact",
  },
};

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    return {};
  }

  return createPageMetadata({
    locale,
    path: "/privacy",
    title:
      locale === "tr"
        ? "Gizlilik ve Çerezler | CityMall Cyprus"
        : "Privacy and Cookies | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus konsept web sitesi için demo gizlilik ve çerez bilgilendirme sayfası."
        : "Demo privacy and cookie notice page for the CityMall Cyprus concept website.",
  });
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];

  return (
    <main className="bg-surface-default">
      <section className="border-b border-border-default bg-[linear-gradient(180deg,#f9fafb_0%,#ffffff_100%)]">
        <div className="container py-16 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-text-muted">
            {content.eyebrow}
          </p>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
            {content.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
            {content.description}
          </p>

          <div className="mt-8 rounded-3xl border border-border-default bg-surface-default p-6 shadow-card">
            <p className="text-sm leading-6 text-text-muted">
              {content.demoNotice}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
            >
              {content.backHome}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-border-default bg-surface-default px-6 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
            >
              {content.contact}
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {content.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-border-default bg-surface-default p-6 shadow-card"
            >
              <h2 className="text-xl font-semibold text-text-primary">
                {section.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-text-secondary">
                {section.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}