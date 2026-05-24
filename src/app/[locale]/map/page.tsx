import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import type { Locale } from "@/types/content";

type MapPageProps = {
  params: {
    locale: string;
  };
};

const pageContent = {
  tr: {
    eyebrow: "Harita & Yol Tarifi",
    title: "CityMall Cyprus’a ulaşımı kolayca planlayın.",
    description:
      "Konsept harita alanı, adres bilgisi ve ulaşım notlarıyla ziyaretinizi önceden planlayın.",
    addressTitle: "Adres",
    address:
      "Gazimağusa, Kuzey Kıbrıs Türk Cumhuriyeti — CityMall Cyprus konsept lokasyonu",
    mapTitle: "Harita Alanı",
    mapDescription:
      "Gerçek projede bu alana Google Maps iframe veya özel harita entegrasyonu eklenecektir.",
    directionsTitle: "Ulaşım Bilgileri",
    backHome: "Ana sayfaya dön",
    contact: "İletişime geç",
    points: [
      "Ana ulaşım akslarına yakın konumlandırılmış AVM konsepti",
      "Araçla gelen ziyaretçiler için otopark yönlendirmesi eklenebilir",
      "Toplu taşıma ve taksi bilgileri gerçek içerikle güncellenebilir",
    ],
    cards: {
      parking: "Otopark",
      parkingText: "Ziyaretçiler için yönlendirmeli otopark alanı bilgisi.",
      transport: "Toplu Taşıma",
      transportText: "Otobüs, taksi ve servis bilgileri için demo alan.",
      access: "Kolay Erişim",
      accessText: "Mağaza, sinema ve yeme-içme alanlarına hızlı yönlendirme.",
    },
  },
  en: {
    eyebrow: "Map & Directions",
    title: "Plan your route to CityMall Cyprus easily.",
    description:
      "Plan your visit in advance with a concept map area, address information and access notes.",
    addressTitle: "Address",
    address:
      "Famagusta, Turkish Republic of Northern Cyprus — CityMall Cyprus concept location",
    mapTitle: "Map Area",
    mapDescription:
      "In a real project, this area can include a Google Maps iframe or custom map integration.",
    directionsTitle: "Directions",
    backHome: "Back to home",
    contact: "Contact",
    points: [
      "Mall concept positioned close to main access routes",
      "Parking guidance can be added for visitors arriving by car",
      "Public transport and taxi information can be updated with real content",
    ],
    cards: {
      parking: "Parking",
      parkingText: "Guided parking information area for visitors.",
      transport: "Public Transport",
      transportText: "Demo area for bus, taxi and shuttle information.",
      access: "Easy Access",
      accessText: "Quick directions to stores, cinema and dining areas.",
    },
  },
};

export default function MapPage({ params }: MapPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];

  return (
    <main className="bg-surface-default">
      <section className="border-b border-border-default bg-surface-muted">
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
                className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:opacity-90"
              >
                {content.contact}
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
              {content.addressTitle}
            </p>

            <p className="mt-4 text-lg leading-8 text-text-secondary">
              {content.address}
            </p>
          </div>
        </div>
      </section>

      <section className="container grid gap-8 py-16 md:py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-2xl border border-border-default bg-surface-muted shadow-card">
          <div className="flex min-h-[420px] items-center justify-center p-8 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
                {content.mapTitle}
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-text-primary">
                Google Maps Placeholder
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-text-secondary">
                {content.mapDescription}
              </p>

              <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3">
                <div className="h-24 rounded-xl bg-surface-default shadow-card" />
                <div className="h-24 rounded-xl bg-surface-default shadow-card" />
                <div className="h-24 rounded-xl bg-surface-default shadow-card" />
                <div className="col-span-2 h-24 rounded-xl bg-brand-primary shadow-card" />
                <div className="h-24 rounded-xl bg-surface-default shadow-card" />
              </div>
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
        <div className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card md:p-8">
          <h2 className="text-2xl font-semibold text-text-primary">
            {content.directionsTitle}
          </h2>

          <div className="mt-6 grid gap-3">
            {content.points.map((point) => (
              <div
                key={point}
                className="rounded-xl bg-surface-muted p-4 text-sm leading-6 text-text-secondary"
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
    <article className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card">
      <h2 className="text-xl font-semibold text-text-primary">{title}</h2>

      <p className="mt-3 text-sm leading-6 text-text-secondary">{text}</p>
    </article>
  );
}