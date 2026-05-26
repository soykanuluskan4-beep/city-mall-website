import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPinned } from "lucide-react";
import type { Locale } from "@/types/content";

type VisitSummaryProps = {
  locale: Locale;
};

const content = {
  tr: {
    eyebrow: "Ziyaret Bilgileri",
    title: "Ziyaretini kolayca planla.",
    description:
      "Konum, çalışma saatleri ve iletişim bilgilerine hızlıca ulaşın.",
    addressLabel: "Adres",
    address: "Gazimağusa, KKTC",
    hoursLabel: "Çalışma Saatleri",
    weekday: "Hafta içi 10:00–22:00",
    weekend: "Hafta sonu 10:00–23:00",
    directions: "Yol Tarifi Al",
    contact: "İletişim",
  },
  en: {
    eyebrow: "Visitor Information",
    title: "Plan your visit with ease.",
    description:
      "Quickly access location, opening hours and contact information.",
    addressLabel: "Address",
    address: "Famagusta, TRNC",
    hoursLabel: "Opening Hours",
    weekday: "Weekdays 10:00–22:00",
    weekend: "Weekend 10:00–23:00",
    directions: "Get Directions",
    contact: "Contact",
  },
};

export function VisitSummary({ locale }: VisitSummaryProps) {
  const copy = content[locale];

  return (
    <section className="bg-surface-default py-16 md:py-20">
      <div className="container">
        <div className="grid gap-6 rounded-[2rem] border border-border-default bg-surface-muted p-6 shadow-elevated md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              {copy.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.title}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://maps.google.com/?q=Famagusta+Cyprus"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {copy.directions}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-default bg-surface-default px-6 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
              >
                {copy.contact}
                <Mail className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-[1.5rem] border border-border-default bg-surface-default p-5 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-muted text-text-primary">
                <MapPinned className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-text-muted">
                {copy.addressLabel}
              </h3>

              <p className="mt-2 text-xl font-semibold text-text-primary">
                {copy.address}
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-border-default bg-surface-default p-5 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-muted text-text-primary">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-text-muted">
                {copy.hoursLabel}
              </h3>

              <div className="mt-2 space-y-1 text-base font-semibold text-text-primary">
                <p>{copy.weekday}</p>
                <p>{copy.weekend}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}