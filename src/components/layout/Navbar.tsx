"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLabels = {
  tr: {
    stores: "Mağazalar",
    dining: "Yeme-İçme",
    campaigns: "Kampanyalar",
    events: "Etkinlikler",
    cinema: "Sinema",
    kids: "Çocuk & Eğlence",
    hours: "Saatler",
    map: "Harita",
    contact: "İletişim",
    menu: "Menü",
    close: "Kapat",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    visit: "Ziyaret Planla",
  },
  en: {
    stores: "Stores",
    dining: "Dining",
    campaigns: "Campaigns",
    events: "Events",
    cinema: "Cinema",
    kids: "Kids & Entertainment",
    hours: "Hours",
    map: "Map",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    visit: "Plan Visit",
  },
};

const navItems = [
  { href: "stores", key: "stores" },
  { href: "dining", key: "dining" },
  { href: "campaigns", key: "campaigns" },
  { href: "events", key: "events" },
  { href: "cinema", key: "cinema" },
  { href: "kids", key: "kids" },
] as const;

const utilityNavItems = [
  { href: "hours", key: "hours" },
  { href: "map", key: "map" },
  { href: "contact", key: "contact" },
] as const;

function getLocaleFromPathname(pathname: string) {
  const segment = pathname.split("/")[1];

  if (segment === "en" || segment === "tr") {
    return segment;
  }

  return "tr";
}

function switchLocalePath(pathname: string, nextLocale: "tr" | "en") {
  const segments = pathname.split("/");

  if (segments[1] === "tr" || segments[1] === "en") {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }

  return `/${nextLocale}`;
}

export function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const nextLocale = locale === "tr" ? "en" : "tr";
  const labels = navLabels[locale];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const allMobileItems = [...navItems, ...utilityNavItems];

  return (
    <header className="sticky top-0 z-50 border-b border-border-default bg-white/90 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <div className="container flex min-h-[76px] items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center gap-3"
          onClick={() => setIsMenuOpen(false)}
          aria-label="CityMall Cyprus home"
        >
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-border-default bg-surface-default shadow-card">
            <Image
              src="/citymall-logo.png"
              alt="CityMall Cyprus logo"
              width={44}
              height={44}
              className="h-10 w-auto object-contain"
              priority
            />
          </span>

          <span className="hidden leading-tight sm:block">
            <span className="block text-base font-semibold tracking-tight text-text-primary">
              CityMall Cyprus
            </span>
            <span className="block text-xs font-medium text-text-muted">
              {locale === "tr" ? "AVM konsept sitesi" : "Mall concept site"}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border-default bg-surface-muted p-1 text-sm font-medium text-text-secondary xl:flex">
          {navItems.map((item) => {
            const href = `/${locale}/${item.href}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item.href}
                href={href}
                className={`rounded-full px-4 py-2 transition ${
                  isActive
                    ? "bg-surface-default text-text-primary shadow-card"
                    : "hover:bg-surface-default hover:text-text-primary"
                }`}
              >
                {labels[item.key]}
              </Link>
            );
          })}
        </nav>

        <nav className="hidden items-center gap-1 rounded-full border border-border-default bg-surface-muted p-1 text-sm font-medium text-text-secondary lg:flex xl:hidden">
          {navItems.slice(0, 4).map((item) => {
            const href = `/${locale}/${item.href}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item.href}
                href={href}
                className={`rounded-full px-3 py-2 transition ${
                  isActive
                    ? "bg-surface-default text-text-primary shadow-card"
                    : "hover:bg-surface-default hover:text-text-primary"
                }`}
              >
                {labels[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/hours`}
            className="hidden rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-card transition hover:opacity-90 md:inline-flex"
            onClick={() => setIsMenuOpen(false)}
          >
            {labels.visit}
          </Link>

          <Link
            href={switchLocalePath(pathname, nextLocale)}
            className="rounded-full border border-border-default bg-surface-default px-3 py-2 text-sm font-semibold text-text-primary shadow-card transition hover:bg-surface-muted"
            onClick={() => setIsMenuOpen(false)}
          >
            {nextLocale.toUpperCase()}
          </Link>

          <button
            type="button"
            className="rounded-full border border-border-default bg-surface-default px-3 py-2 text-sm font-semibold text-text-primary shadow-card transition hover:bg-surface-muted lg:hidden"
            aria-label={isMenuOpen ? labels.closeMenu : labels.openMenu}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? labels.close : labels.menu}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-border-default bg-surface-default lg:hidden">
          <nav className="container grid gap-2 py-4">
            {allMobileItems.map((item) => {
              const href = `/${locale}/${item.href}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-brand-primary text-brand-foreground shadow-card"
                      : "bg-surface-muted text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {labels[item.key]}
                </Link>
              );
            })}

            <Link
              href={`/${locale}/hours`}
              className="mt-2 rounded-2xl bg-brand-primary px-4 py-3 text-center text-sm font-semibold text-brand-foreground shadow-card"
              onClick={() => setIsMenuOpen(false)}
            >
              {labels.visit}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}