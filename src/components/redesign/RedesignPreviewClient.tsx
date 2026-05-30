import { ExploreCityMall } from "@/components/redesign/ExploreCityMall";
import { LiveEventsCarousel } from "@/components/redesign/LiveEventsCarousel";
import { PlanVisitBento } from "@/components/redesign/PlanVisitBento";
import { PreviewFooter } from "@/components/redesign/PreviewFooter";
import { PreviewHeroGrid } from "@/components/redesign/PreviewHeroGrid";
import { PreviewNavbar } from "@/components/redesign/PreviewNavbar";
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
    <div className="redesign-preview-root [&~footer]:hidden">
      <style>{`
  body:has(.redesign-preview-root) header:not(.preview-navbar) {
    display: none !important;
  }

  body:has(.redesign-preview-root) footer:not(.preview-footer) {
    display: none !important;
  }

  body:has(.redesign-preview-root) header.preview-navbar {
    display: block !important;
  }

  body:has(.redesign-preview-root) footer.preview-footer {
    display: block !important;
  }
`}</style>

      <PreviewNavbar locale={locale} />

      <main className="min-h-screen overflow-x-hidden bg-[#f5f5f3] text-text-primary">
        <PreviewVideoHero locale={locale} />

        <div id="preview-mosaic">
          <PreviewHeroGrid locale={locale} />
        </div>

        <PlanVisitBento locale={locale} />

        <LiveEventsCarousel locale={locale} />

        <StoresBrandCarousel locale={locale} />

        <ExploreCityMall locale={locale} />

        <PreviewFooter locale={locale} />
      </main>
    </div>
  );
}