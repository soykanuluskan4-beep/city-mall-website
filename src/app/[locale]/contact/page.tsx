import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd, createLocalBusinessSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/metadata";
import { locales } from "@/i18n/routing";
import type { Locale } from "@/types/content";

type ContactPageProps = {
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
    path: "/contact",
    title:
      locale === "tr"
        ? "İletişim | CityMall Cyprus"
        : "Contact | CityMall Cyprus",
    description:
      locale === "tr"
        ? "CityMall Cyprus telefon, e-posta, adres ve ziyaretçi iletişim bilgilerini görüntüleyin."
        : "View CityMall Cyprus phone, email, address and visitor contact information.",
  });
}

const pageContent = {
  tr: {
    eyebrow: "İletişim",
    title: "CityMall Cyprus ile iletişim ve ziyaret bilgileri.",
    description:
      "Telefon, e-posta, adres ve iletişim formu alanlarıyla ziyaretçi iletişimini tek sayfada toplayan kurumsal yapı.",
    phone: "Telefon",
    email: "E-posta",
    address: "Adres",
    addressText:
      "Gazimağusa, Kuzey Kıbrıs Türk Cumhuriyeti — CityMall Cyprus lokasyonu",
    formTitle: "İletişim Formu",
    formDescription:
      "Gerçek projede bu form e-posta, CRM veya yönetim paneli entegrasyonu ile aktif hale getirilebilir.",
    nameLabel: "Ad Soyad",
    emailLabel: "E-posta",
    messageLabel: "Mesaj",
    submit: "Gönder",
    socialTitle: "Sosyal Medya",
    socialDescription:
      "Gerçek sosyal medya bağlantıları proje yayına alınmadan önce müşteri tarafından sağlanır.",
    map: "Haritayı Gör",
    backHome: "Ana sayfaya dön",
    demoNotice:
  "Mesajınız ilgili ekibe iletilmek üzere alınır. Güncel iletişim talepleri için formu doldurabilirsiniz.",
    responseNote:
      "Canlı projede form gönderimleri ilgili departmana otomatik iletilebilir.",
    quickInfo: "Hızlı Bilgi",
  },
  en: {
    eyebrow: "Contact",
    title: "Contact and visitor information for CityMall Cyprus.",
    description:
      "A corporate structure bringing phone, email, address and contact form areas together on one visitor-focused page.",
    phone: "Phone",
    email: "Email",
    address: "Address",
    addressText:
      "Famagusta, Turkish Republic of Northern Cyprus — CityMall Cyprus location",
    formTitle: "Contact Form",
    formDescription:
      "In a real project, this form can be activated with email, CRM or admin panel integration.",
    nameLabel: "Full Name",
    emailLabel: "Email",
    messageLabel: "Message",
    submit: "Send",
    socialTitle: "Social Media",
    socialDescription:
      "Real social media links are provided by the client before launch.",
    map: "View Map",
    backHome: "Back to home",
    demoNotice:
  "Your message is received for review by the relevant team. You can use the form for current contact requests.",
    responseNote:
      "In the live project, form submissions can be automatically forwarded to the relevant department.",
    quickInfo: "Quick Info",
  },
};

export default function ContactPage({ params }: ContactPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const content = pageContent[locale];
const contactSchema = createLocalBusinessSchema(locale, "/contact");

  return (
  <main className="bg-surface-default">
    <JsonLd data={contactSchema} />
    
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
                href={`/${locale}/map`}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {content.map}
              </Link>

              <Link
                href={`/${locale}`}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-border-default bg-surface-default px-6 py-3 text-sm font-semibold text-text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-surface-subtle"
              >
                {content.backHome}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-border-default bg-surface-default p-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
              {content.quickInfo}
            </p>

            <div className="mt-5 grid gap-4">
              <ContactLine label={content.phone} value="+90 533 000 00 00" />
              <ContactLine label={content.email} value="info@example.com" />
              <ContactLine label={content.address} value={content.addressText} />
            </div>
          </div>
        </div>
      </section>

      <section className="container grid gap-8 py-16 md:py-20 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-border-default bg-surface-default p-6 shadow-card md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
            {content.formTitle}
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-text-primary">
            {content.formTitle}
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-text-secondary">
            {content.formDescription}
          </p>

          <form className="mt-8 grid gap-5">
            <FieldPreview label={content.nameLabel} />
            <FieldPreview label={content.emailLabel} />
            <FieldPreview label={content.messageLabel} textarea />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                disabled
                className="inline-flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground opacity-75 shadow-card"
              >
                {content.submit}
              </button>

              <p className="text-xs leading-5 text-text-muted">
                {content.demoNotice}
              </p>
            </div>

            <div className="rounded-2xl border border-border-default bg-surface-muted p-4 text-sm leading-6 text-text-secondary">
              {content.responseNote}
            </div>
          </form>
        </div>

        <aside className="grid gap-5">
          <InfoCard
            title={content.socialTitle}
            text={content.socialDescription}
          />

          <InfoCard title={content.phone} text="+90 533 000 00 00" />

          <InfoCard title={content.email} text="info@example.com" />

          <InfoCard title={content.address} text={content.addressText} />
        </aside>
      </section>
    </main>
  );
}

type ContactLineProps = {
  label: string;
  value: string;
};

function ContactLine({ label, value }: ContactLineProps) {
  return (
    <div className="rounded-2xl bg-surface-muted p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium leading-6 text-text-primary">
        {value}
      </p>
    </div>
  );
}

type FieldPreviewProps = {
  label: string;
  textarea?: boolean;
};

function FieldPreview({ label, textarea = false }: FieldPreviewProps) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-text-primary">{label}</label>

      {textarea ? (
        <div className="min-h-36 rounded-2xl border border-border-default bg-surface-muted px-4 py-3 text-sm text-text-muted">
          {label}
        </div>
      ) : (
        <div className="flex h-12 items-center rounded-2xl border border-border-default bg-surface-muted px-4 text-sm text-text-muted">
          {label}
        </div>
      )}
    </div>
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