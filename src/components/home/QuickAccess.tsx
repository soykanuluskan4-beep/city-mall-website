import Link from "next/link";
import {
  ShoppingBag,
  Utensils,
  Tag,
  Clapperboard,
  CalendarDays,
  MapPinned,
} from "lucide-react";
import type { Locale } from "@/types/content";

type QuickAccessProps = {
  locale: Locale;
};

const content = {
  tr: {
    title: "Hızlı Erişim",
    items: [
      {
        label: "Mağazalar",
        description: "Markaları keşfet",
        href: "stores",
        icon: ShoppingBag,
      },
      {
        label: "Yeme-İçme",
        description: "Lezzet durakları",
        href: "dining",
        icon: Utensils,
      },
      {
        label: "Kampanyalar",
        description: "Fırsatları incele",
        href: "campaigns",
        icon: Tag,
      },
      {
        label: "Cinemall",
        description: "Film ve seanslar",
        href: "cinema",
        icon: Clapperboard,
      },
      {
        label: "Etkinlikler",
        description: "Güncel program",
        href: "events",
        icon: CalendarDays,
      },
      {
        label: "Ziyaret Planla",
        description: "Saatler ve ulaşım",
        href: "hours",
        icon: MapPinned,
      },
    ],
  },
  en: {
    title: "Quick Access",
    items: [
      {
        label: "Stores",
        description: "Explore brands",
        href: "stores",
        icon: ShoppingBag,
      },
      {
        label: "Dining",
        description: "Food destinations",
        href: "dining",
        icon: Utensils,
      },
      {
        label: "Campaigns",
        description: "Discover offers",
        href: "campaigns",
        icon: Tag,
      },
      {
        label: "Cinemall",
        description: "Movies and showtimes",
        href: "cinema",
        icon: Clapperboard,
      },
      {
        label: "Events",
        description: "Current program",
        href: "events",
        icon: CalendarDays,
      },
      {
        label: "Plan Visit",
        description: "Hours and access",
        href: "hours",
        icon: MapPinned,
      },
    ],
  },
};

export function QuickAccess({ locale }: QuickAccessProps) {
  const copy = content[locale];

  return (
    <section className="relative z-10 border-b border-border-default bg-surface-default">
      <div className="container -mt-8 pb-12">
        <div className="rounded-[2rem] border border-border-default bg-surface-default p-4 shadow-elevated md:p-5">
          <div className="mb-4 flex items-center justify-between gap-4 px-1">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
              {copy.title}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {copy.items.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={`/${locale}/${item.href}`}
                  className={`group col-span-3 rounded-3xl border border-border-default bg-surface-muted p-4 transition hover:-translate-y-1 hover:bg-surface-subtle hover:shadow-card min-[420px]:col-span-2 lg:col-span-1 ${
                    item.href === "events"
                      ? "min-[420px]:col-start-2 lg:col-start-auto"
                      : ""
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-default text-text-primary shadow-card transition group-hover:bg-brand-primary group-hover:text-brand-foreground md:h-12 md:w-12">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h2 className="mt-4 text-sm font-semibold text-text-primary md:text-base">
                    {item.label}
                  </h2>

                  <p className="mt-1 text-xs text-text-muted md:text-sm">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}