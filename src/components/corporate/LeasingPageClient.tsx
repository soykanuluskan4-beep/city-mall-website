"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Info,
  Mail,
  MapPin,
  Send,
  Store,
  Utensils,
  UsersRound,
} from "lucide-react";
import type { Locale } from "@/types/content";

type LeasingPageClientProps = {
  locale: Locale;
};

type FormState = {
  brandName: string;
  contactName: string;
  email: string;
  phone: string;
  category: string;
  spaceType: string;
  message: string;
};

const initialFormState: FormState = {
  brandName: "",
  contactName: "",
  email: "",
  phone: "",
  category: "",
  spaceType: "",
  message: "",
};

const content = {
  tr: {
    eyebrow: "Kiralama",
    title: "Mağazanızı CityMall Cyprus’ta açın.",
    description:
      "Gazimağusa’da görünür bir konum, güçlü ziyaretçi akışı ve alışveriş, yeme-içme, Cinemall ve etkinliklerle desteklenen modern bir AVM deneyiminin parçası olun.",
    primaryCta: "Başvuru Formu",
    secondaryCta: "Alan Türleri",
    whyTitle: "Neden CityMall?",
    whyText:
      "CityMall Cyprus, markalar için sadece fiziksel bir mağaza alanı değil; ziyaretçi deneyimi, dijital görünürlük ve kategori karmasıyla desteklenen ticari bir temas noktası sunar.",
    whyCards: [
      {
        title: "Merkezi Konum",
        text: "Gazimağusa’da ziyaretçiler için ulaşılabilir ve görünür bir alışveriş noktası.",
      },
      {
        title: "Kategori Karması",
        text: "Moda, yeme-içme, hizmetler, çocuk, sinema ve etkinliklerle desteklenen ziyaretçi çeşitliliği.",
      },
      {
        title: "Dijital Görünürlük",
        text: "Web sitesi üzerinden mağaza, kampanya, etkinlik ve yönlendirme görünürlüğü.",
      },
      {
        title: "Ziyaretçi Deneyimi",
        text: "Harita, çalışma saatleri, hizmetler ve ziyaret planlama bölümleriyle desteklenen bütünsel yapı.",
      },
    ],
    spaceTitle: "Alan Türleri",
    spaceText:
      "Markanızın ihtiyacına göre farklı alan tipleri için başvuru yapılabilir.",
    spaces: [
      {
        title: "Mağaza Alanı",
        text: "Perakende markaları için kalıcı mağaza alanları.",
      },
      {
        title: "Food Court Alanı",
        text: "Yeme-içme markaları için hızlı servis ve restoran alanları.",
      },
      {
        title: "Kiosk / Stand",
        text: "Daha küçük satış noktaları ve dönemsel marka aktivasyonları.",
      },
      {
        title: "Etkinlik Alanı",
        text: "Lansman, pop-up, tanıtım ve özel gün etkinlikleri için alanlar.",
      },
    ],
    processTitle: "Başvuru Süreci",
    process: [
      "Başvuru formunu doldurun.",
      "Marka, kategori ve alan ihtiyacınız değerlendirilir.",
      "Uygunluk durumunda kiralama ekibi sizinle iletişime geçer.",
    ],
    formTitle: "Kiralama Başvuru Formu",
    formText:
      "Bu form demo amaçlıdır. Gerçek projede başvurular e-posta, CRM veya yönetim paneli entegrasyonu ile alınabilir.",
    fields: {
      brandName: "Marka Adı",
      contactName: "Yetkili Kişi",
      email: "E-posta",
      phone: "Telefon",
      category: "Kategori",
      spaceType: "Talep Edilen Alan Tipi",
      message: "Mesaj",
    },
    placeholders: {
      brandName: "Örn. Marka adı",
      contactName: "Ad soyad",
      email: "ornek@marka.com",
      phone: "Telefon numarası",
      category: "Moda, yeme-içme, hizmet...",
      spaceType: "Mağaza, kiosk, food court...",
      message: "Markanız ve talebiniz hakkında kısa bilgi yazın.",
    },
    submit: "Başvuruyu Gönder",
    successTitle: "Başvuru alındı",
    successText:
      "Bu demo akışta başvuru gerçek bir sisteme gönderilmez. Ticari teslimde form e-posta veya CRM entegrasyonuna bağlanabilir.",
    noteTitle: "Ticari teslim notu",
    noteText:
      "Gerçek kiralama sürecinde m² bilgisi, kira koşulları, müsait alanlar ve başvuru değerlendirme kriterleri CityMall yönetimi tarafından sağlanmalıdır.",
  },
  en: {
    eyebrow: "Leasing",
    title: "Open your store at CityMall Cyprus.",
    description:
      "Become part of a modern mall experience in Famagusta supported by a visible location, strong visitor flow, shopping, dining, Cinemall and events.",
    primaryCta: "Application Form",
    secondaryCta: "Space Types",
    whyTitle: "Why CityMall?",
    whyText:
      "CityMall Cyprus offers brands more than a physical retail space; it provides a commercial touchpoint supported by visitor experience, digital visibility and category mix.",
    whyCards: [
      {
        title: "Central Location",
        text: "An accessible and visible shopping destination for visitors in Famagusta.",
      },
      {
        title: "Category Mix",
        text: "Visitor variety supported by fashion, dining, services, kids, cinema and events.",
      },
      {
        title: "Digital Visibility",
        text: "Store, campaign, event and navigation visibility through the website.",
      },
      {
        title: "Visitor Experience",
        text: "A complete structure supported by map, opening hours, services and visit planning sections.",
      },
    ],
    spaceTitle: "Space Types",
    spaceText:
      "Brands can apply for different space types according to their needs.",
    spaces: [
      {
        title: "Retail Store",
        text: "Permanent retail spaces for shopping brands.",
      },
      {
        title: "Food Court Space",
        text: "Quick-service and restaurant areas for dining brands.",
      },
      {
        title: "Kiosk / Stand",
        text: "Smaller sales points and seasonal brand activations.",
      },
      {
        title: "Event Area",
        text: "Spaces for launches, pop-ups, promotions and special-day events.",
      },
    ],
    processTitle: "Application Process",
    process: [
      "Fill in the application form.",
      "Your brand, category and space needs are reviewed.",
      "If suitable, the leasing team contacts you.",
    ],
    formTitle: "Leasing Application Form",
    formText:
      "This form is for demo purposes. In a real project, applications can be connected to email, CRM or an admin panel integration.",
    fields: {
      brandName: "Brand Name",
      contactName: "Contact Person",
      email: "Email",
      phone: "Phone",
      category: "Category",
      spaceType: "Requested Space Type",
      message: "Message",
    },
    placeholders: {
      brandName: "E.g. Brand name",
      contactName: "Full name",
      email: "sample@brand.com",
      phone: "Phone number",
      category: "Fashion, dining, services...",
      spaceType: "Store, kiosk, food court...",
      message: "Write a short note about your brand and request.",
    },
    submit: "Submit Application",
    successTitle: "Application received",
    successText:
      "In this demo flow, the application is not sent to a real system. During commercial handoff, the form can be connected to email or CRM integration.",
    noteTitle: "Commercial handoff note",
    noteText:
      "In the real leasing process, m² details, rental conditions, available spaces and application criteria should be provided by CityMall management.",
  },
};

const whyIcons = [MapPin, Store, Building2, UsersRound];
const spaceIcons = [Store, Utensils, Building2, Info];

export function LeasingPageClient({ locale }: LeasingPageClientProps) {
  const copy = content[locale];
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="overflow-x-hidden bg-surface-default">
      <section className="relative isolate overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_38%),linear-gradient(135deg,rgba(17,24,39,1),rgba(42,49,63,1))]" />

        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.72fr] lg:items-center">
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
              <a
                href="#leasing-form"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#space-types"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {copy.secondaryCta}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-elevated backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-6 text-text-primary">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-text-primary text-white">
                <Building2 className="h-6 w-6" aria-hidden="true" />
              </div>

              <h2 className="mt-6 text-3xl font-semibold tracking-tight">
                {copy.whyTitle}
              </h2>

              <p className="mt-4 text-sm leading-6 text-text-secondary">
                {copy.whyText}
              </p>

              <div className="mt-6 grid gap-3">
                {copy.process.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-border-default bg-surface-muted p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-text-primary text-xs font-semibold text-white">
                      {index + 1}
                    </span>

                    <p className="text-sm font-medium leading-6 text-text-secondary">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.whyTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.whyTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.whyText}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {copy.whyCards.map((card, index) => {
              const Icon = whyIcons[index] ?? Building2;

              return (
                <article
                  key={card.title}
                  className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {card.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="space-types"
        className="scroll-mt-28 border-y border-border-default bg-surface-muted/45 py-12 md:py-16"
      >
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.spaceTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.spaceTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.spaceText}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {copy.spaces.map((space, index) => {
              const Icon = spaceIcons[index] ?? Store;

              return (
                <article
                  key={space.title}
                  className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-text-primary text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
                    {space.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {space.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="leasing-form" className="scroll-mt-28 py-12 md:py-16">
        <div className="container grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[2rem] border border-border-default bg-text-primary p-6 text-white shadow-elevated md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-text-primary">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
              {copy.formTitle}
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/72">
              {copy.formText}
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5">
              <div className="flex items-start gap-3">
                <Info className="mt-1 h-5 w-5 shrink-0 text-white" />
                <div>
                  <h3 className="text-lg font-semibold">{copy.noteTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {copy.noteText}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-border-default bg-surface-default p-5 shadow-card md:p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-text-primary">
                {copy.fields.brandName}
                <input
                  value={formState.brandName}
                  onChange={(event) =>
                    updateField("brandName", event.target.value)
                  }
                  placeholder={copy.placeholders.brandName}
                  className="rounded-2xl border border-border-default bg-surface-muted px-4 py-3 text-sm font-medium text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-text-primary">
                {copy.fields.contactName}
                <input
                  value={formState.contactName}
                  onChange={(event) =>
                    updateField("contactName", event.target.value)
                  }
                  placeholder={copy.placeholders.contactName}
                  className="rounded-2xl border border-border-default bg-surface-muted px-4 py-3 text-sm font-medium text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-text-primary">
                {copy.fields.email}
                <input
                  type="email"
                  value={formState.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder={copy.placeholders.email}
                  className="rounded-2xl border border-border-default bg-surface-muted px-4 py-3 text-sm font-medium text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-text-primary">
                {copy.fields.phone}
                <input
                  value={formState.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder={copy.placeholders.phone}
                  className="rounded-2xl border border-border-default bg-surface-muted px-4 py-3 text-sm font-medium text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-text-primary">
                {copy.fields.category}
                <input
                  value={formState.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  placeholder={copy.placeholders.category}
                  className="rounded-2xl border border-border-default bg-surface-muted px-4 py-3 text-sm font-medium text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-text-primary">
                {copy.fields.spaceType}
                <input
                  value={formState.spaceType}
                  onChange={(event) =>
                    updateField("spaceType", event.target.value)
                  }
                  placeholder={copy.placeholders.spaceType}
                  className="rounded-2xl border border-border-default bg-surface-muted px-4 py-3 text-sm font-medium text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary"
                />
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm font-semibold text-text-primary">
              {copy.fields.message}
              <textarea
                value={formState.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder={copy.placeholders.message}
                rows={5}
                className="resize-none rounded-2xl border border-border-default bg-surface-muted px-4 py-3 text-sm font-medium text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary"
              />
            </label>

            {submitted ? (
              <div className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-emerald-800">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <h3 className="font-semibold">{copy.successTitle}</h3>
                    <p className="mt-1 text-sm leading-6">
                      {copy.successText}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90 md:w-auto"
            >
              {copy.submit}
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}