import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { JsonLd, createLocalBusinessSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";

type MapPageProps = {
  params: {
    locale: string;
  };
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
    path: "/map",
    title:
      locale === "tr"
        ? "Harita ve Yol Tarifi | CityMall Cyprus"
        : "Map and Directions | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus konum, ulaşım, otopark ve ziyaret bilgilerini görüntüleyin."
        : "View CityMall Cyprus location, access, parking and visitor information.",
  });
}

const pageContent = {
  tr: {
    eyebrow: "Harita & Yol Tarifi",
    title: "CityMall Cyprus’a ulaşımı kolayca planlayın.",
    description:
      "Adres bilgisi, ulaşım notları ve harita alanıyla ziyaretçilerin AVM’ye daha kolay ulaşmasını sağlayan konsept yapı.",
    addressTitle: "Adres Bilgisi",
    address:
      "Gazimağusa, Kuzey Kıbrıs Türk Cumhuriyeti — CityMall Cyprus konsept lokasyonu",
    mapTitle: "Konum Önizlemesi",
    mapDescription:
      "Gerçek projede bu alana Google Maps entegrasyonu eklenerek canlı yol tarifi, konum paylaşımı ve rota bağlantısı sağlanabilir.",
    directionsTitle: "Ulaşım Bilgileri",
    backHome: "Ana sayfaya dön",
    contact: "İletişime geç",
    routeButton: "Yol Tarifi Alanı",
    demoLabel: "Demo harita alanı",
    points: [
      "Adres ve konum bilgileri gerçek proje yayına alınmadan önce müşteri tarafından doğrulanır.",
      "Araçla gelen ziyaretçiler için otopark yönlendirmesi ve giriş bilgileri eklenebilir.",
      "Toplu taşıma, taksi ve servis bilgileri gerçek operasyon bilgilerine göre güncellenebilir.",
    ],
    cards: {
      parking: "Otopark",
      parkingText: "Araçla gelen ziyaretçiler için otopark ve giriş yönlendirmeleri.",
      transport: "Ulaşım",
      transportText: "Toplu taşıma, taksi ve servis bilgileri için düzenli alan.",
      access: "Kolay Erişim",
      accessText: "Mağazalar, sinema ve yeme-içme alanlarına hızlı yönlendirme.",
    },
  },
  en: {
    eyebrow: "Map & Directions",
    title: "Plan your route to CityMall Cyprus easily.",
    description:
      "A concept structure that helps visitors reach the mall more easily with address information, access notes and a map area.",
    addressTitle: "Address Information",
    address:
      "Famagusta, Turkish Republic of Northern Cyprus — CityMall Cyprus concept location",
    mapTitle: "Location Preview",
    mapDescription:
      "In a real project, Google Maps integration can be added here for live directions, location sharing and route links.",
    directionsTitle: "Access Information",
    backHome: "Back to home",
    contact: "Contact",
    routeButton: "Directions Area",
    demoLabel: "Demo map area",
    points: [
      "Address and location information can be verified by the client before the real project goes live.",
      "Parking guidance and entrance information can be added for visitors arriving by car.",
      "Public transport, taxi and shuttle details can be updated according to real operational information.",
    ],
    cards: {
      parking: "Parking",
      parkingText: "Parking and entrance guidance for visitors arriving by car.",
      transport: "Transport",
      transportText: "A clear area for public transport, taxi and shuttle information.",
      access: "Easy Access",
      accessText: "Quick guidance to stores, cinema and dining areas.",
    },
  },
};

export default function MapPage({ params }: MapPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];
  const mapSchema = createLocalBusinessSchema(locale, "/map");

  return (
  <main className="bg-surface-default">
    <JsonLd data={mapSchema} />

      <section className="border-b border-border-default bg-[radial-gradient(circle_at_top_right,rgba(17,24,39,0.10),transparent_34%),linear-gradient(180deg,#f9fafb_0%,#ffffff_100%)]">
        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.85fr] lg:items-end">
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
  href={`/${locale}/contact`}
  className="inline-flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
>
  {content.contact}
</Link>

              <Link
                href={`/${locale}`}
                className="rounded-full border border-border-default bg-surface-default px-6 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
              >
                {content.backHome}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-border-default bg-surface-default p-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
              {content.addressTitle}
            </p>

            <p className="mt-4 text-lg font-semibold leading-8 text-text-primary">
              CityMall Cyprus
            </p>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {content.address}
            </p>

            <div className="mt-5 rounded-2xl bg-surface-muted p-4 text-sm leading-6 text-text-muted">
              {locale === "tr"
                ? "Gerçek adres ve harita bağlantısı müşteri onayı sonrası güncellenir."
                : "The real address and map link can be updated after client confirmation."}
            </div>
          </div>
        </div>
      </section>

      <section className="container grid gap-8 py-16 md:py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-3xl border border-border-default bg-surface-default shadow-elevated">
          <div className="relative min-h-[460px] bg-[linear-gradient(135deg,#f9fafb_0%,#e5e7eb_100%)] p-6 md:p-8">
            <div className="absolute left-0 top-1/3 h-px w-full bg-border-muted" />
            <div className="absolute left-0 top-2/3 h-px w-full bg-border-muted" />
            <div className="absolute left-1/3 top-0 h-full w-px bg-border-muted" />
            <div className="absolute left-2/3 top-0 h-full w-px bg-border-muted" />

            <div className="relative z-10 flex min-h-[400px] items-center justify-center">
              <div className="w-full max-w-md rounded-3xl border border-border-default bg-surface-default/95 p-6 text-center shadow-elevated backdrop-blur">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary text-lg font-semibold text-brand-foreground shadow-card">
                  CM
                </span>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
                  {content.demoLabel}
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-text-primary">
                  {content.mapTitle}
                </h2>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-text-secondary">
                  {content.mapDescription}
                </p>

                <div className="mt-6 inline-flex rounded-full border border-border-default bg-surface-muted px-4 py-2 text-sm font-semibold text-text-secondary">
                  {content.routeButton}
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 hidden rounded-2xl border border-border-default bg-surface-default p-4 text-sm shadow-card md:block">
              <p className="font-semibold text-text-primary">CityMall Cyprus</p>
              <p className="mt-1 text-xs text-text-muted">
                {locale === "tr" ? "Konsept lokasyon" : "Concept location"}
              </p>
            </div>
          </div>
        </div>

        <aside className="grid gap-5">
          <InfoCard
            title={content.cards.parking}
            text={content.cards.parkingText}
          />

          <InfoCard
            title={content.cards.transport}
            text={content.cards.transportText}
          />

          <InfoCard title={content.cards.access} text={content.cards.accessText} />
        </aside>
      </section>

      <section className="container pb-20">
        <div className="rounded-3xl border border-border-default bg-surface-default p-6 shadow-card md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
                {content.eyebrow}
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-text-primary">
                {content.directionsTitle}
              </h2>
            </div>

            <Link
              href={`/${locale}/contact`}
              className="inline-flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
            >
              {content.contact}
            </Link>
          </div>

          <div className="mt-6 grid gap-3">
            {content.points.map((point) => (
              <div
                key={point}
                className="rounded-2xl bg-surface-muted p-4 text-sm leading-6 text-text-secondary"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

type InfoCardProps = {
  title: string;
  text: string;
};

function InfoCard({ title, text }: InfoCardProps) {
  return (
    <article className="rounded-3xl border border-border-default bg-surface-default p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elevated">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-muted text-sm font-semibold text-text-primary">
        {title.slice(0, 1)}
      </div>

      <h2 className="mt-5 text-xl font-semibold text-text-primary">{title}</h2>

      <p className="mt-3 text-sm leading-6 text-text-secondary">{text}</p>
    </article>
  );
}