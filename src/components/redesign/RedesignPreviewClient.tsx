import { ExploreCityMall } from "@/components/redesign/ExploreCityMall";
import { StoresBrandCarousel } from "@/components/redesign/StoresBrandCarousel";
import { LiveEventsCarousel } from "@/components/redesign/LiveEventsCarousel";
import { PlanVisitBento } from "@/components/redesign/PlanVisitBento";
import { PreviewHeroGrid } from "@/components/redesign/PreviewHeroGrid";
import { PreviewVideoHero } from "@/components/redesign/PreviewVideoHero";
import type { Locale } from "@/types/content";

type RedesignPreviewClientProps = {
  locale: Locale;
};

const content = {
  tr: {
    roadmapEyebrow: "Preview Roadmap",
    roadmapTitle: "Video hero ve mosaic grid hazır.",
    roadmapText:
      "Sıradaki aşamada What’s Happening, Gift Card, FunLab/Kids ve Next Experience kartlarından oluşan ikinci premium experience bölümü eklenecek.",
  },
  en: {
    roadmapEyebrow: "Preview Roadmap",
    roadmapTitle: "Video hero and mosaic grid are ready.",
    roadmapText:
      "In the next step, a second premium experience section will be added with What’s Happening, Gift Card, FunLab/Kids and Next Experience cards.",
  },
};

export function RedesignPreviewClient({
  locale,
}: RedesignPreviewClientProps) {
  const copy = content[locale];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f3] text-text-primary">
      <PreviewVideoHero locale={locale} />

      <div id="preview-mosaic">
          <PreviewHeroGrid locale={locale} />
      </div>

      <PlanVisitBento locale={locale} />

      <LiveEventsCarousel locale={locale} />

      <StoresBrandCarousel locale={locale} />

      <ExploreCityMall locale={locale} />

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