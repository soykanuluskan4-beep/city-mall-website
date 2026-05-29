import { PreviewHeroGrid } from "@/components/redesign/PreviewHeroGrid";
import type { Locale } from "@/types/content";

type RedesignPreviewClientProps = {
  locale: Locale;
};

const content = {
  tr: {
    roadmapEyebrow: "Preview Roadmap",
    roadmapTitle: "Hero grid tamamlandı. Sonraki bölüm Experience Bento.",
    roadmapText:
      "Sıradaki aşamalarda What’s Happening, Gift Card, FunLab/Kids ve Next Experience kartlarından oluşan ikinci premium bento bölümü eklenecek.",
  },
  en: {
    roadmapEyebrow: "Preview Roadmap",
    roadmapTitle: "Hero grid is ready. Next section is Experience Bento.",
    roadmapText:
      "In the next steps, a second premium bento section will be added with What’s Happening, Gift Card, FunLab/Kids and Next Experience cards.",
  },
};

export function RedesignPreviewClient({
  locale,
}: RedesignPreviewClientProps) {
  const copy = content[locale];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f3] text-text-primary">
      <PreviewHeroGrid locale={locale} />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="rounded-[2rem] border border-dashed border-border-default bg-white/60 p-8 text-center shadow-card backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              {copy.roadmapEyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {copy.roadmapTitle}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
              {copy.roadmapText}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}