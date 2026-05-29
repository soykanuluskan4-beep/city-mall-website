import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import type { Locale } from "@/types/content";

type RedesignPreviewClientProps = {
  locale: Locale;
};

const content = {
  tr: {
    eyebrow: "Cinematic Redesign Preview",
    title: "CityMall’in yeni deneyimi burada test edilecek.",
    description:
      "Bu sayfa canlı anasayfayı bozmadan yeni cinematic hero, bento grid, premium motion, events carousel, store motion ve Explore City Mall fikirlerini adım adım denemek için oluşturuldu.",
    statusTitle: "Güvenli Önizleme Alanı",
    statusText:
      "Bu route mevcut siteyi değiştirmez. Yeni redesign bölümleri önce burada test edilecek.",
    backHome: "Mevcut Anasayfaya Dön",
    nextStep: "Sonraki Adım: Cinematic Hero Bento",
    checklist: [
      "Mevcut anasayfa değiştirilmedi",
      "Navbar ve Footer değiştirilmedi",
      "Yeni npm dependency eklenmedi",
      "Three.js, GSAP ve WebGL kullanılmadı",
      "TR/EN route desteği hazır",
    ],
  },
  en: {
    eyebrow: "Cinematic Redesign Preview",
    title: "CityMall’s new experience will be tested here.",
    description:
      "This page was created to test the new cinematic hero, bento grid, premium motion, events carousel, store motion and Explore City Mall ideas step by step without breaking the live homepage.",
    statusTitle: "Safe Preview Area",
    statusText:
      "This route does not change the existing site. New redesign sections will be tested here first.",
    backHome: "Back to Current Homepage",
    nextStep: "Next Step: Cinematic Hero Bento",
    checklist: [
      "Existing homepage was not changed",
      "Navbar and Footer were not changed",
      "No new npm dependency was added",
      "Three.js, GSAP and WebGL were not used",
      "TR/EN route support is ready",
    ],
  },
};

export function RedesignPreviewClient({
  locale,
}: RedesignPreviewClientProps) {
  const copy = content[locale];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f3] text-text-primary">
      <section className="relative isolate overflow-hidden border-b border-border-default">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(180,126,47,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(17,24,39,0.10),transparent_32%)]" />

        <div className="container py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-border-default bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-text-muted shadow-card backdrop-blur">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {copy.eyebrow}
              </p>

              <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-tight text-text-primary md:text-7xl">
                {copy.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary md:text-lg">
                {copy.description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
                >
                  {copy.backHome}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <div className="inline-flex items-center justify-center rounded-full border border-border-default bg-white/70 px-6 py-3 text-sm font-semibold text-text-primary shadow-card backdrop-blur">
                  {copy.nextStep}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border-default bg-white/72 p-5 shadow-elevated backdrop-blur md:p-6">
              <div className="rounded-[1.5rem] border border-border-default bg-text-primary p-6 text-white shadow-card">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
                  {copy.statusTitle}
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  Redesign Preview
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/68">
                  {copy.statusText}
                </p>
              </div>

              <div className="mt-5 grid gap-3">
                {copy.checklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border-default bg-surface-default p-4 shadow-card"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
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

      <section className="py-14 md:py-20">
        <div className="container">
          <div className="rounded-[2rem] border border-dashed border-border-default bg-white/60 p-8 text-center shadow-card backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              Preview Roadmap
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              Sections will be added one by one.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
              Cinematic Hero Bento, Experience Bento, Live Events,
              Discover Brands, Explore City Mall and Preview Footer will be
              implemented as isolated preview components.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}