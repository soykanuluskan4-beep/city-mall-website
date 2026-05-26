import Link from "next/link";
import {
  CalendarDays,
  Clapperboard,
  MapPinned,
  ShoppingBag,
  Utensils,
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
        label: "Sinema",
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
        description: "Harita ve ulaşım",
        href: "map",
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
        label: "Cinema",
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
        description: "Map and access",
        href: "map",
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

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {copy.items.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={`/${locale}/${item.href}`}
                  className="group rounded-3xl border border-border-default bg-surface-muted p-5 transition hover:-translate-y-1 hover:bg-surface-subtle hover:shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-default text-text-primary shadow-card transition group-hover:bg-brand-primary group-hover:text-brand-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h2 className="mt-4 text-base font-semibold text-text-primary">
                    {item.label}
                  </h2>

                  <p className="mt-1 text-sm text-text-muted">
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