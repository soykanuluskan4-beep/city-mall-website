import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import type { Locale } from "@/types/content";

type LocaleCatchAllNotFoundPageProps = {
  params: {
    locale: string;
  };
};

const content = {
  tr: {
    title: "Sayfa bulunamadı",
    description:
      "Aradığınız sayfa taşınmış, kaldırılmış veya henüz oluşturulmamış olabilir.",
    home: "Ana sayfaya dön",
    contact: "İletişim",
    disclaimer:
      "Bu çalışma CityMall Cyprus'un resmi sitesi değildir. Portföy ve konsept demonstrasyonu amacıyla hazırlanmıştır.",
  },
  en: {
    title: "Page not found",
    description:
      "The page you are looking for may have moved, been removed, or has not been created yet.",
    home: "Back to home",
    contact: "Contact",
    disclaimer:
      "This site is not the official website of CityMall Cyprus. It was created for portfolio and concept demonstration purposes.",
  },
};

export default function LocaleCatchAllNotFoundPage({
  params,
}: LocaleCatchAllNotFoundPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const page = content[locale];

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-surface-default px-6 py-20">
      <section className="w-full max-w-2xl rounded-2xl border border-border-default bg-surface-muted p-8 text-center shadow-card md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-text-muted">
          404
        </p>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
          {page.title}
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-text-secondary">
          {page.description}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}`}
            className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:opacity-90"
          >
            {page.home}
          </Link>

          <Link
            href={`/${locale}/contact`}
            className="rounded-full border border-border-default bg-surface-default px-6 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
          >
            {page.contact}
          </Link>
        </div>

        <p className="mt-8 text-xs leading-5 text-text-muted">
          {page.disclaimer}
        </p>
      </section>
    </main>
  );
}