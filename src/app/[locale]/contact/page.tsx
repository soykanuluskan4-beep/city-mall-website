import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import type { Locale } from "@/types/content";

type ContactPageProps = {
  params: {
    locale: string;
  };
};

const pageContent = {
  tr: {
    eyebrow: "İletişim",
    title: "CityMall Cyprus ile iletişim ve ziyaret bilgileri.",
    description:
      "Telefon, e-posta, adres ve demo iletişim formu alanlarıyla ziyaretçi iletişimini tek sayfada toplayan konsept yapı.",
    phone: "Telefon",
    email: "E-posta",
    address: "Adres",
    addressText:
      "Gazimağusa, Kuzey Kıbrıs Türk Cumhuriyeti — CityMall Cyprus konsept lokasyonu",
    formTitle: "İletişim Formu",
    formDescription:
      "Gerçek projede bu alan çalışan bir form, CRM veya e-posta entegrasyonu ile bağlanabilir.",
    nameLabel: "Ad Soyad",
    emailLabel: "E-posta",
    messageLabel: "Mesaj",
    submit: "Gönder",
    socialTitle: "Sosyal Medya",
    socialDescription:
      "Gerçek hesap bağlantıları proje yayına alınmadan önce müşteri tarafından sağlanır.",
    map: "Haritayı Gör",
    backHome: "Ana sayfaya dön",
    demoNotice:
      "Bu form şu an demo amaçlıdır; gönderim yapmaz.",
  },
  en: {
    eyebrow: "Contact",
    title: "Contact and visitor information for CityMall Cyprus.",
    description:
      "A concept structure bringing phone, email, address and demo contact form areas together on one visitor-focused page.",
    phone: "Phone",
    email: "Email",
    address: "Address",
    addressText:
      "Famagusta, Turkish Republic of Northern Cyprus — CityMall Cyprus concept location",
    formTitle: "Contact Form",
    formDescription:
      "In a real project, this area can be connected to a working form, CRM or email integration.",
    nameLabel: "Full Name",
    emailLabel: "Email",
    messageLabel: "Message",
    submit: "Send",
    socialTitle: "Social Media",
    socialDescription:
      "Real account links are provided by the client before launch.",
    map: "View Map",
    backHome: "Back to home",
    demoNotice:
      "This form is currently for demo purposes and does not submit.",
  },
};

export default function ContactPage({ params }: ContactPageProps) {
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
                href={`/${locale}/map`}
                className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:opacity-90"
              >
                {content.map}
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
              CityMall Cyprus
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
        <div className="rounded-2xl border border-border-default bg-surface-default p-6 shadow-card md:p-8">
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
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-text-primary"
              >
                {content.nameLabel}
              </label>

              <input
                id="name"
                type="text"
                placeholder={content.nameLabel}
                disabled
                className="h-12 rounded-xl border border-border-default bg-surface-muted px-4 text-sm text-text-secondary outline-none"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-text-primary"
              >
                {content.emailLabel}
              </label>

              <input
                id="email"
                type="email"
                placeholder={content.emailLabel}
                disabled
                className="h-12 rounded-xl border border-border-default bg-surface-muted px-4 text-sm text-text-secondary outline-none"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-text-primary"
              >
                {content.messageLabel}
              </label>

              <textarea
                id="message"
                placeholder={content.messageLabel}
                disabled
                rows={6}
                className="resize-none rounded-xl border border-border-default bg-surface-muted px-4 py-3 text-sm text-text-secondary outline-none"
              />
            </div>

            <button
              type="button"
              disabled
              className="w-fit rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground opacity-70"
            >
              {content.submit}
            </button>

            <p className="text-xs leading-5 text-text-muted">
              {content.demoNotice}
            </p>
          </form>
        </div>

        <aside className="grid gap-5">
          <InfoCard
            title={content.socialTitle}
            text={content.socialDescription}
          />

          <InfoCard
            title={content.phone}
            text="+90 533 000 00 00"
          />

          <InfoCard
            title={content.email}
            text="info@example.com"
          />

          <InfoCard
            title={content.address}
            text={content.addressText}
          />
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
    <div className="rounded-xl bg-surface-muted p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium leading-6 text-text-primary">
        {value}
      </p>
    </div>
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