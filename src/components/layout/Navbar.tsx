"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import {
  getOpeningStatus,
  type OpeningStatus,
} from "@/lib/opening-status";

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
    privacy: "Gizlilik",
    menu: "Menü",
    close: "Kapat",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    search: "Sitede ara",
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
    privacy: "Privacy",
    menu: "Menu",
    close: "Close",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    search: "Search the site",
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
  { href: "privacy", key: "privacy" },
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openingStatus, setOpeningStatus] = useState<OpeningStatus | null>(
    null
  );

  const allMobileItems = [...navItems, ...utilityNavItems];

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 16);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    function updateOpeningStatus() {
      setOpeningStatus(getOpeningStatus(locale));
    }

    updateOpeningStatus();

    const interval = window.setInterval(updateOpeningStatus, 60_000);

    return () => {
      window.clearInterval(interval);
    };
  }, [locale]);

  function openSearch() {
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
    setIsSearchOpen(true);
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? "border-border-default bg-surface-default/95 shadow-card backdrop-blur-xl"
            : "border-transparent bg-surface-default/90 backdrop-blur-md"
        }`}
      >
        <div
          className={`container flex items-center justify-between gap-4 transition-all duration-300 ${
            isScrolled ? "min-h-[66px]" : "min-h-[82px]"
          }`}
        >
          <Link
            href={`/${locale}`}
            className="flex shrink-0 items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
            aria-label="CityMall Cyprus home"
          >
            <span
              className={`flex items-center justify-center overflow-hidden rounded-2xl border border-border-default bg-surface-default shadow-card transition-all duration-300 ${
                isScrolled ? "h-10 w-10" : "h-12 w-12"
              }`}
            >
              <Image
                src="/citymall-logo.png"
                alt="CityMall Cyprus logo"
                width={44}
                height={44}
                className={`w-auto object-contain transition-all duration-300 ${
                  isScrolled ? "h-8" : "h-10"
                }`}
                priority
              />
            </span>

            <span className="hidden leading-tight sm:block">
              <span
                className={`block font-semibold tracking-tight text-text-primary transition-all duration-300 ${
                  isScrolled ? "text-sm" : "text-base"
                }`}
              >
                CityMall Cyprus
              </span>
            </span>
          </Link>

          {openingStatus ? (
            <div className="hidden items-center gap-2 rounded-full border border-border-default bg-surface-muted px-3 py-2 text-xs font-semibold text-text-secondary shadow-card lg:inline-flex">
              <span
                className={`h-2 w-2 rounded-full ${
                  openingStatus.isOpen ? "bg-emerald-500" : "bg-text-muted"
                }`}
                aria-hidden="true"
              />
              <span>{openingStatus.statusText}</span>
            </div>
          ) : null}

          <nav className="relative hidden items-center gap-1 rounded-full border border-border-default bg-surface-muted p-1 text-sm font-medium text-text-secondary xl:flex">
            {navItems.map((item) => {
              const href = `/${locale}/${item.href}`;
              const isActive = pathname === href;

              if (item.href === "stores") {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                  >
                    <Link
                      href={href}
                      aria-haspopup="true"
                      aria-expanded={isMegaMenuOpen}
                      onFocus={() => setIsMegaMenuOpen(true)}
                      className={`rounded-full px-4 py-2 transition ${
                        isActive || isMegaMenuOpen
                          ? "bg-surface-default text-text-primary shadow-card"
                          : "hover:bg-surface-default hover:text-text-primary"
                      }`}
                    >
                      {labels[item.key]}
                    </Link>

                    {isMegaMenuOpen ? (
                      <MegaMenu
                        locale={locale}
                        onNavigate={() => setIsMegaMenuOpen(false)}
                      />
                    ) : null}
                  </div>
                );
              }

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

          <nav className="relative hidden items-center gap-1 rounded-full border border-border-default bg-surface-muted p-1 text-sm font-medium text-text-secondary lg:flex xl:hidden">
            {navItems.slice(0, 4).map((item) => {
              const href = `/${locale}/${item.href}`;
              const isActive = pathname === href;

              if (item.href === "stores") {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                  >
                    <Link
                      href={href}
                      aria-haspopup="true"
                      aria-expanded={isMegaMenuOpen}
                      onFocus={() => setIsMegaMenuOpen(true)}
                      className={`rounded-full px-3 py-2 transition ${
                        isActive || isMegaMenuOpen
                          ? "bg-surface-default text-text-primary shadow-card"
                          : "hover:bg-surface-default hover:text-text-primary"
                      }`}
                    >
                      {labels[item.key]}
                    </Link>

                    {isMegaMenuOpen ? (
                      <MegaMenu
                        locale={locale}
                        onNavigate={() => setIsMegaMenuOpen(false)}
                      />
                    ) : null}
                  </div>
                );
              }

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
            <button
              type="button"
              onClick={openSearch}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-default bg-surface-default text-text-primary shadow-card transition hover:bg-surface-muted"
              aria-label={labels.search}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>

            <Link
              href={`/${locale}/contact`}
              className="hidden rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90 md:inline-flex"
              onClick={() => setIsMenuOpen(false)}
            >
              {labels.contact}
            </Link>

            <div className="hidden items-center rounded-full border border-border-default bg-surface-muted p-1 shadow-card sm:flex">
              <Link
                href={switchLocalePath(pathname, "tr")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  locale === "tr"
                    ? "bg-surface-default text-text-primary shadow-card"
                    : "text-text-muted hover:text-text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                TR
              </Link>

              <Link
                href={switchLocalePath(pathname, "en")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  locale === "en"
                    ? "bg-surface-default text-text-primary shadow-card"
                    : "text-text-muted hover:text-text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                EN
              </Link>
            </div>

            <Link
              href={switchLocalePath(pathname, nextLocale)}
              className="rounded-full border border-border-default bg-surface-default px-3 py-2 text-sm font-semibold text-text-primary shadow-card transition hover:bg-surface-muted sm:hidden"
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
              <div className="mb-2 flex items-center rounded-2xl border border-border-default bg-surface-muted p-1">
                <Link
                  href={switchLocalePath(pathname, "tr")}
                  className={`flex-1 rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${
                    locale === "tr"
                      ? "bg-surface-default text-text-primary shadow-card"
                      : "text-text-muted"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  TR
                </Link>

                <Link
                  href={switchLocalePath(pathname, "en")}
                  className={`flex-1 rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${
                    locale === "en"
                      ? "bg-surface-default text-text-primary shadow-card"
                      : "text-text-muted"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  EN
                </Link>
              </div>

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
                href={`/${locale}/contact`}
                className="mt-2 rounded-2xl bg-brand-primary px-4 py-3 text-center text-sm font-semibold text-brand-foreground shadow-card"
                onClick={() => setIsMenuOpen(false)}
              >
                {labels.contact}
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      <SearchOverlay
        locale={locale}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}