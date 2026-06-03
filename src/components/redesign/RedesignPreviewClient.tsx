import { ExploreCityMall } from "@/components/redesign/ExploreCityMall";
import { LiveEventsCarousel } from "@/components/redesign/LiveEventsCarousel";
import { PlanVisitBento } from "@/components/redesign/PlanVisitBento";
import { PreviewHeroGrid } from "@/components/redesign/PreviewHeroGrid";
import { PreviewVideoHero } from "@/components/redesign/PreviewVideoHero";
import { StoresBrandCarousel } from "@/components/redesign/StoresBrandCarousel";
import type { Locale } from "@/types/content";

type RedesignPreviewClientProps = {
  locale: Locale;
};

export function RedesignPreviewClient({
  locale,
}: RedesignPreviewClientProps) {
  return (
    <div className="redesign-preview-root">
      <main className="min-h-screen overflow-x-hidden bg-[#f5f5f3] text-text-primary">
        <PreviewVideoHero locale={locale} />
        <PreviewHeroGrid locale={locale} />
        <PlanVisitBento locale={locale} />
        <LiveEventsCarousel locale={locale} />
        <StoresBrandCarousel locale={locale} />
        <ExploreCityMall locale={locale} />
      </main>
    </div>
  );
}