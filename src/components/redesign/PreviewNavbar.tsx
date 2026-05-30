"use client";

import Link from "next/link";
import { Search, } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import type { Locale } from "@/types/content";

type PreviewNavbarProps = {
  locale: Locale;
};

type NavItem = {
  href: string;
  key: "stores" | "dining" | "events" | "cinema" | "visit";
};

const content = {
  tr: {
    brand: "CityMall Cyprus",
    location: "Gazimağusa",
    search: "Sitede ara",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    cta: "Ziyaret Planla",
    links: {
      stores: "Mağazalar",
      dining: "Restoranlar",
      events: "Etkinlikler",
      cinema: "Cinemall",
      visit: "Ziyaret Planla",
      kids: "Çocuk & Eğlence",
      services: "Hizmetler",
      map: "Harita",
      contact: "İletişim",
    },
    social: "Sosyal Medya",
  },
  en: {
    brand: "CityMall Cyprus",
    location: "Famagusta",
    search: "Search the site",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cta: "Plan Visit",
    links: {
      stores: "Stores",
      dining: "Dining",
      events: "Events",
      cinema: "Cinemall",
      visit: "Plan Visit",
      kids: "Kids & Entertainment",
      services: "Services",
      map: "Map",
      contact: "Contact",
    },
    social: "Social Media",
  },
};

const desktopNavItems: NavItem[] = [
  { href: "stores", key: "stores" },
  { href: "dining", key: "dining" },
  { href: "events", key: "events" },
  { href: "cinema", key: "cinema" },
  { href: "map", key: "visit" },
];

const mobileNavItems = [
  { href: "stores", key: "stores" },
  { href: "dining", key: "dining" },
  { href: "events", key: "events" },
  { href: "cinema", key: "cinema" },
  { href: "kids", key: "kids" },
  { href: "map", key: "map" },
  { href: "services", key: "services" },
  { href: "contact", key: "contact" },
] as const;

const socialLinks = [
  { label: "Instagram", icon: InstagramIcon },
  { label: "TikTok", icon: TikTokIcon },
  { label: "YouTube", icon: YouTubeIcon },
  { label: "Facebook", icon: FacebookIcon },
] as const;

function switchLocalePath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/");

  if (segments[1] === "tr" || segments[1] === "en") {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }

  return `/${nextLocale}`;
}

export function PreviewNavbar({ locale }: PreviewNavbarProps) {
  const pathname = usePathname();
  const copy = content[locale];
  const nextLocale = locale === "tr" ? "en" : "tr";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  function openSearch() {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <header
        className={`preview-navbar fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "border-b border-white/10 bg-[#0f0f10]/85 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <style>{`
          @keyframes previewMenuEnter {
            0% {
              opacity: 0;
              transform: translateY(-12px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .preview-navbar,
            .preview-navbar-menu,
            .preview-navbar-link,
            .preview-navbar-social,
            .preview-navbar-line {
              animation: none !important;
              transition: none !important;
              transform: none !important;
            }
          }
        `}</style>

        <div
          className={`container flex items-center justify-between gap-5 transition-all duration-300 ${
            isScrolled || isMenuOpen ? "min-h-[74px]" : "min-h-[92px]"
          }`}
        >
          <Link
  href={`/${locale}/redesign-preview`}
  className="group flex min-w-0 shrink-0 flex-col leading-none"
  onClick={closeMenu}
  aria-label="CityMall Cyprus redesign preview"
>
  <span className="block text-base font-semibold tracking-tight text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.55)] md:text-lg">
    {copy.brand}
  </span>

  <span className="mt-2 block text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.55)]">
    {copy.location}
  </span>
</Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex">
            {desktopNavItems.map((item) => {
              const href = `/${locale}/${item.href}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`preview-navbar-link group relative font-semibold text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)] transition ${
                   isActive ? "text-white" : "text-white/88 hover:text-white"
                  }`}
                >
                  {copy.links[item.key]}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-white/80 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={openSearch}
              aria-label={copy.search}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="hidden items-center rounded-full border border-white/18 bg-white/10 p-1 text-xs font-semibold text-white backdrop-blur-md sm:flex">
  <Link
    href={switchLocalePath(pathname, "tr")}
    className={`rounded-full px-3 py-2 text-white transition ${
      locale === "tr"
        ? "bg-white/18 shadow-[0_0_22px_rgba(255,255,255,0.12)]"
        : "text-white/70 hover:bg-white/10 hover:text-white"
    }`}
    onClick={closeMenu}
  >
    TR
  </Link>

  <Link
    href={switchLocalePath(pathname, "en")}
    className={`rounded-full px-3 py-2 text-white transition ${
      locale === "en"
        ? "bg-white/18 shadow-[0_0_22px_rgba(255,255,255,0.12)]"
        : "text-white/70 hover:bg-white/10 hover:text-white"
    }`}
    onClick={closeMenu}
  >
    EN
  </Link>
</div>

            <Link
              href={`/${locale}/map`}
              className="hidden rounded-full border border-white/24 bg-white/8 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white hover:text-text-primary xl:inline-flex"
            >
              {copy.cta}
            </Link>

            <Link
              href={switchLocalePath(pathname, nextLocale)}
              className="flex h-11 items-center rounded-full border border-white/14 bg-white/8 px-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/14 sm:hidden"
              onClick={closeMenu}
            >
              {nextLocale.toUpperCase()}
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              aria-label={isMenuOpen ? copy.closeMenu : copy.openMenu}
              aria-expanded={isMenuOpen}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white backdrop-blur-md transition hover:bg-white/14 lg:hidden"
            >
              <span className="sr-only">
                {isMenuOpen ? copy.closeMenu : copy.openMenu}
              </span>

              <span
                className={`preview-navbar-line absolute h-px w-5 bg-current transition duration-300 ${
                  isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`preview-navbar-line absolute h-px w-5 bg-current transition duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`preview-navbar-line absolute h-px w-5 bg-current transition duration-300 ${
                  isMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="preview-navbar-menu fixed inset-0 z-[90] bg-[#0f0f10] text-white [animation:previewMenuEnter_320ms_cubic-bezier(0.22,1,0.36,1)_both] lg:hidden">
          <div className="container flex min-h-screen flex-col pb-8 pt-28">
            <nav className="grid gap-2">
              {mobileNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}/${item.href}`}
                  onClick={closeMenu}
                  className="group flex items-center justify-between rounded-3xl border border-white/8 bg-white/[0.04] px-5 py-4 text-3xl font-semibold tracking-tight text-white transition hover:bg-white/[0.08]"
                >
                  {copy.links[item.key]}
                  <span className="text-base text-white/34 transition group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 rounded-3xl border border-white/8 bg-white/[0.04] p-2">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={switchLocalePath(pathname, "tr")}
                  onClick={closeMenu}
                  className={`rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white transition ${
  locale === "tr"
    ? "bg-white/18 shadow-[0_0_22px_rgba(255,255,255,0.12)]"
    : "text-white/60 hover:bg-white/10 hover:text-white"
}`}
                >
                  TR
                </Link>

                <Link
                  href={switchLocalePath(pathname, "en")}
                  onClick={closeMenu}
                  className={`rounded-2xl px-4 py-3 text-center text-sm font-semibold transition ${
                    locale === "en"
                      ? "bg-white text-text-primary"
                      : "text-white/52"
                  }`}
                >
                  EN
                </Link>
              </div>
            </div>

            <Link
  href={`/${locale}/map`}
  className="hidden whitespace-nowrap rounded-full border border-white/28 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white hover:text-text-primary xl:inline-flex"
>
  {copy.cta}
</Link>

            <div className="mt-auto pt-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/34">
                {copy.social}
              </p>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={`/${locale}/contact`}
                      aria-label={item.label}
                      onClick={closeMenu}
                      className="preview-navbar-social flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/72 transition hover:-translate-y-1 hover:bg-white/[0.12] hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <SearchOverlay
        locale={locale}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M14.5 3v10.2a4.2 4.2 0 1 1-4.2-4.2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 5.4c1.1 2.1 2.8 3.2 5 3.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect
        x="3"
        y="6"
        width="18"
        height="12"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M10 9.5v5l4.5-2.5L10 9.5Z" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M14.2 8.4V6.9c0-.7.5-1.1 1.2-1.1h1.5V3.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v1H7.5v3h2.7v9.5h3.3v-9.5h2.7l.4-3h-3.1Z" />
    </svg>
  );
}