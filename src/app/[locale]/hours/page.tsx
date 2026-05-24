import Link from "next/link";
import { notFound } from "next/navigation";
import { openingHours } from "@/data/opening-hours";
import { locales } from "@/i18n/routing";
import { getLocalizedText } from "@/lib/locale";
import type { Locale, OpeningHourDay } from "@/types/content";

type HoursPageProps = {
  params: {
    locale: string;
  };
};

const pageContent = {
  tr: {
    eyebrow: "Çalışma Saatleri",
    title: "Ziyaretinizi güncel saatlere göre planlayın.",
    description:
      "AVM, sinema ve yeme-içme alanları için konsept çalışma saatleri ve özel gün notları.",
    mallHours: "AVM Çalışma Saatleri",
    cinemaHours: "Sinema Saatleri",
    diningHours: "Yeme-İçme Saatleri",
    specialNotes: "Özel Notlar",
    open: "Açılış",
    close: "Kapanış",
    closed: "Kapalı",
    backHome: "Ana sayfaya dön",
    planRoute: "Haritaya Git",
  },
  en: {
    eyebrow: "Opening Hours",
    title: "Plan your visit around current opening hours.",
    description:
      "Concept opening hours and special notes for the mall, cinema and dining areas.",
    mallHours: "Mall Opening Hours",
    cinemaHours: "Cinema Hours",
    diningHours: "Dining Hours",
    specialNotes: "Special Notes",
    open: "Open",
    close: "Close",
    closed: "Closed",
    backHome: "Back to home",
    planRoute: "Go to Map",
  },
};

export default function HoursPage({ params }: HoursPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];

  return (
    <main className="bg-surface-default">
      <section className="border-b border-border-default bg-surface-muted">
        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-text-muted">
              {content.eyebrow}
            </p>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
              {content.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
              {content.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/map`}
                className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:opacity-90"
              >
                {content.planRoute}
              </Link>

              <Link
                href={`/${locale}`}
                className="rounded-full border border-border-default bg-surface-default px-6 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
              >
                {content.backHome}
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card">
  <p className="text-sm font-semibold text-text-primary">
    {content.mallHours}
  </p>

  <div className="mt-5 grid gap-3">
    <div className="flex items-center justify-between gap-4 rounded-xl bg-surface-muted p-4 text-sm">
      <span className="font-medium text-text-primary">
        {locale === "tr" ? "Hafta içi" : "Weekdays"}
      </span>

      <span className="text-text-secondary">10:00 — 22:00</span>
    </div>

    <div className="flex items-center justify-between gap-4 rounded-xl bg-surface-muted p-4 text-sm">
      <span className="font-medium text-text-primary">
        {locale === "tr" ? "Hafta sonu" : "Weekend"}
      </span>

      <span className="text-text-secondary">10:00 — 23:00</span>
    </div>

    <div className="flex items-center justify-between gap-4 rounded-xl bg-surface-muted p-4 text-sm">
      <span className="font-medium text-text-primary">
        {locale === "tr" ? "Yeme-İçme" : "Dining"}
      </span>

      <span className="text-text-secondary">10:00 — 23:00</span>
    </div>
  </div>

  <p className="mt-4 text-xs leading-5 text-text-muted">
    {locale === "tr"
      ? "Haftanın tüm günleri ve özel notlar aşağıda detaylı olarak listelenir."
      : "All days of the week and special notes are listed in detail below."}
  </p>
</div>
        </div>
      </section>

      <section className="container grid gap-8 py-16 md:py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <HoursTable
          title={content.mallHours}
          days={openingHours.mall}
          locale={locale}
          openLabel={content.open}
          closeLabel={content.close}
          closedLabel={content.closed}
        />

        <div className="grid gap-8">
          {openingHours.cinema ? (
            <HoursTable
              title={content.cinemaHours}
              days={openingHours.cinema}
              locale={locale}
              openLabel={content.open}
              closeLabel={content.close}
              closedLabel={content.closed}
              compact
            />
          ) : null}

          {openingHours.dining ? (
            <HoursTable
              title={content.diningHours}
              days={openingHours.dining}
              locale={locale}
              openLabel={content.open}
              closeLabel={content.close}
              closedLabel={content.closed}
              compact
            />
          ) : null}
        </div>
      </section>

      {openingHours.specialNotes ? (
        <section className="container pb-20">
          <div className="rounded-2xl border border-border-default bg-surface-muted p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-text-primary">
              {content.specialNotes}
            </h2>

            <div className="mt-5 grid gap-3">
              {openingHours.specialNotes.map((note) => (
                <p
                  key={getLocalizedText(note, locale)}
                  className="rounded-xl bg-surface-default p-4 text-sm leading-6 text-text-secondary shadow-card"
                >
                  {getLocalizedText(note, locale)}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

type HoursTableProps = {
  title: string;
  days: OpeningHourDay[];
  locale: Locale;
  openLabel: string;
  closeLabel: string;
  closedLabel: string;
  compact?: boolean;
};

function HoursTable({
  title,
  days,
  locale,
  openLabel,
  closeLabel,
  closedLabel,
  compact = false,
}: HoursTableProps) {
  return (
    <section className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card">
      <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>

      <div className="mt-6 grid gap-3">
        {days.map((day) => (
          <article
            key={`${title}-${day.day}-${day.label.tr}`}
            className="rounded-xl border border-border-default bg-surface-muted p-4"
          >
            <div
              className={
                compact
                  ? "grid gap-3"
                  : "grid gap-3 sm:grid-cols-[1fr_0.75fr_0.75fr] sm:items-center"
              }
            >
              <h3 className="font-semibold text-text-primary">
                {getLocalizedText(day.label, locale)}
              </h3>

              {day.isClosed ? (
                <p className="text-sm font-medium text-text-secondary">
                  {closedLabel}
                </p>
              ) : (
                <>
                  <p className="text-sm text-text-secondary">
                    <span className="text-text-muted">{openLabel}: </span>
                    <span className="font-medium text-text-primary">
                      {day.open}
                    </span>
                  </p>

                  <p className="text-sm text-text-secondary">
                    <span className="text-text-muted">{closeLabel}: </span>
                    <span className="font-medium text-text-primary">
                      {day.close}
                    </span>
                  </p>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}