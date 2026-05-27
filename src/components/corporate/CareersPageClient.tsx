"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  HeartHandshake,
  Info,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import type { Locale } from "@/types/content";

type CareersPageClientProps = {
  locale: Locale;
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  message: string;
};

const initialFormState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  message: "",
};

const content = {
  tr: {
    eyebrow: "Kariyer",
    title: "CityMall Cyprus ekibinin bir parçası olun.",
    description:
      "Operasyon, müşteri hizmetleri, güvenlik, temizlik, teknik destek ve mağaza ekipleri için kariyer fırsatlarını takip edin.",
    primaryCta: "Genel Başvuru",
    secondaryCta: "Pozisyonları Gör",
    introTitle: "CityMall’da çalışma deneyimi",
    introText:
      "CityMall Cyprus, ziyaretçilere daha iyi bir AVM deneyimi sunmak için farklı alanlarda görev alan ekiplerin birlikte çalıştığı dinamik bir yapıdır.",
    areasTitle: "Çalışma Alanları",
    areasText:
      "AVM operasyonu farklı ekiplerin koordinasyonuyla yürütülür. Gerçek açık pozisyonlar CityMall yönetimi tarafından güncellenmelidir.",
    areas: [
      {
        title: "Müşteri Hizmetleri",
        text: "Danışma, ziyaretçi yönlendirme, kayıp eşya ve genel destek süreçleri.",
      },
      {
        title: "Operasyon",
        text: "Günlük AVM işleyişi, alan koordinasyonu ve ziyaretçi deneyimi takibi.",
      },
      {
        title: "Güvenlik",
        text: "Ziyaretçi güvenliği, yönlendirme ve acil durum koordinasyonu.",
      },
      {
        title: "Teknik & Destek",
        text: "Teknik takip, bakım süreçleri ve operasyonel destek alanları.",
      },
    ],
    positionsTitle: "Açık Pozisyonlar",
    positionsText:
      "Şu an gerçek açık pozisyon bilgisi bulunmadığı için örnek pozisyon kartları kullanılır.",
    positions: [
      {
        title: "Genel Başvuru",
        type: "Sürekli",
        location: "CityMall Cyprus",
        text: "Uygun pozisyonlar için değerlendirilmek üzere genel başvuru bırakabilirsiniz.",
      },
      {
        title: "Müşteri Hizmetleri Yetkilisi",
        type: "Örnek Pozisyon",
        location: "Danışma / Ortak Alanlar",
        text: "Ziyaretçi yönlendirme ve hizmet süreçlerine destek olacak ekip üyesi.",
      },
      {
        title: "Operasyon Destek Personeli",
        type: "Örnek Pozisyon",
        location: "AVM Operasyon",
        text: "Günlük operasyon ve alan koordinasyon süreçlerine destek olacak ekip üyesi.",
      },
    ],
    formTitle: "CV / Genel Başvuru Formu",
    formText:
      "Bu form demo amaçlıdır. Gerçek projede CV yükleme, e-posta veya insan kaynakları sistemi entegrasyonu yapılabilir.",
    fields: {
      fullName: "Ad Soyad",
      email: "E-posta",
      phone: "Telefon",
      position: "İlgilenilen Pozisyon",
      message: "Mesaj",
    },
    placeholders: {
      fullName: "Ad soyad",
      email: "ornek@email.com",
      phone: "Telefon numarası",
      position: "Genel başvuru, müşteri hizmetleri...",
      message: "Kendiniz ve başvurunuz hakkında kısa bilgi yazın.",
    },
    submit: "Başvuruyu Gönder",
    successTitle: "Başvuru alındı",
    successText:
      "Bu demo akışta başvuru gerçek bir sisteme gönderilmez. Ticari teslimde CV yükleme veya e-posta entegrasyonu eklenebilir.",
    cvNoteTitle: "CV yükleme notu",
    cvNote:
      "Gerçek projede bu alana PDF/DOC CV yükleme alanı eklenebilir. Şimdilik başvuru formu demo mesajı üretir.",
  },
  en: {
    eyebrow: "Careers",
    title: "Become part of the CityMall Cyprus team.",
    description:
      "Follow career opportunities for operations, guest services, security, cleaning, technical support and store teams.",
    primaryCta: "General Application",
    secondaryCta: "View Positions",
    introTitle: "Working at CityMall",
    introText:
      "CityMall Cyprus is a dynamic environment where teams across different areas work together to deliver a better mall experience for visitors.",
    areasTitle: "Work Areas",
    areasText:
      "Mall operations are run through coordination between different teams. Real open positions should be updated by CityMall management.",
    areas: [
      {
        title: "Guest Services",
        text: "Information desk, visitor guidance, lost & found and general support processes.",
      },
      {
        title: "Operations",
        text: "Daily mall operations, area coordination and visitor experience tracking.",
      },
      {
        title: "Security",
        text: "Visitor safety, guidance and emergency coordination.",
      },
      {
        title: "Technical & Support",
        text: "Technical follow-up, maintenance processes and operational support areas.",
      },
    ],
    positionsTitle: "Open Positions",
    positionsText:
      "Since real open position data is not available yet, sample position cards are used.",
    positions: [
      {
        title: "General Application",
        type: "Ongoing",
        location: "CityMall Cyprus",
        text: "Submit a general application to be considered for suitable future positions.",
      },
      {
        title: "Guest Services Representative",
        type: "Sample Position",
        location: "Information Desk / Common Areas",
        text: "A team member supporting visitor guidance and guest service processes.",
      },
      {
        title: "Operations Support Staff",
        type: "Sample Position",
        location: "Mall Operations",
        text: "A team member supporting daily operations and area coordination processes.",
      },
    ],
    formTitle: "CV / General Application Form",
    formText:
      "This form is for demo purposes. In a real project, CV upload, email or HR system integration can be added.",
    fields: {
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      position: "Interested Position",
      message: "Message",
    },
    placeholders: {
      fullName: "Full name",
      email: "sample@email.com",
      phone: "Phone number",
      position: "General application, guest services...",
      message: "Write a short note about yourself and your application.",
    },
    submit: "Submit Application",
    successTitle: "Application received",
    successText:
      "In this demo flow, the application is not sent to a real system. CV upload or email integration can be added during commercial handoff.",
    cvNoteTitle: "CV upload note",
    cvNote:
      "In a real project, a PDF/DOC CV upload field can be added here. For now, the application form produces a demo message.",
  },
};

const areaIcons = [UsersRound, Briefcase, ShieldCheck, Sparkles];

export function CareersPageClient({ locale }: CareersPageClientProps) {
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
                href="#career-form"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#open-positions"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {copy.secondaryCta}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-elevated backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-6 text-text-primary">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-text-primary text-white">
                <HeartHandshake className="h-6 w-6" aria-hidden="true" />
              </div>

              <h2 className="mt-6 text-3xl font-semibold tracking-tight">
                {copy.introTitle}
              </h2>

              <p className="mt-4 text-sm leading-6 text-text-secondary">
                {copy.introText}
              </p>

              <div className="mt-6 rounded-3xl bg-surface-muted p-5">
                <div className="flex items-start gap-3">
                  <Info className="mt-1 h-5 w-5 shrink-0 text-text-muted" />
                  <p className="text-sm leading-6 text-text-secondary">
                    {copy.cvNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.areasTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.areasTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.areasText}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {copy.areas.map((area, index) => {
              const Icon = areaIcons[index] ?? Briefcase;

              return (
                <article
                  key={area.title}
                  className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
                    {area.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {area.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="open-positions"
        className="scroll-mt-28 border-y border-border-default bg-surface-muted/45 py-12 md:py-16"
      >
        <div className="container">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              {copy.positionsTitle}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.positionsTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              {copy.positionsText}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {copy.positions.map((position) => (
              <article
                key={position.title}
                className="rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-card"
              >
                <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
                  {position.type}
                </span>

                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
                  {position.title}
                </h3>

                <p className="mt-2 text-sm font-semibold text-text-muted">
                  {position.location}
                </p>

                <p className="mt-4 text-sm leading-6 text-text-secondary">
                  {position.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="career-form" className="scroll-mt-28 py-12 md:py-16">
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
                <FileText className="mt-1 h-5 w-5 shrink-0 text-white" />
                <div>
                  <h3 className="text-lg font-semibold">{copy.cvNoteTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {copy.cvNote}
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
                {copy.fields.fullName}
                <input
                  value={formState.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  placeholder={copy.placeholders.fullName}
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
                {copy.fields.position}
                <input
                  value={formState.position}
                  onChange={(event) =>
                    updateField("position", event.target.value)
                  }
                  placeholder={copy.placeholders.position}
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