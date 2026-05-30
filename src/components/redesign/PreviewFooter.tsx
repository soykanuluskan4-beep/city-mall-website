"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight, ChevronDown, Mail } from "lucide-react";
import type { Locale } from "@/types/content";

type PreviewFooterProps = {
  locale: Locale;
};

type FooterLink = {
  href: string;
  label: string;
};

const content = {
  tr: {
    brand: "CityMall Cyprus",
    location: "Gazimağusa",
    slogan: "Alışveriş, lezzet ve deneyimin buluştuğu yer.",
    movingText: "CITYMALL • FASHION • EVENTS • FOOD • CINEMA • LIFESTYLE •",
    exploreTitle: "Keşfet",
    visitTitle: "Ziyaret",
    newsletterTitle: "Güncel kal",
    newsletterText: "Etkinlikler ve fırsatlardan haberdar ol.",
    newsletterHelper: "CityMall’dan haftalık güncellemeler alın.",
    newsletterPlaceholder: "E-posta adresiniz",
    newsletterButton: "Abone Ol",
    newsletterSuccess: "Teşekkürler. E-posta adresiniz alındı.",
    copyright: "© 2026 CityMall Cyprus",
    rights: "Tüm hakları saklıdır.",
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Koşulları",
    exploreLinks: [
      { href: "stores", label: "Mağazalar" },
      { href: "dining", label: "Yeme-İçme" },
      { href: "events", label: "Etkinlikler" },
      { href: "cinema", label: "Cinemall" },
      { href: "kids", label: "Çocuk & Eğlence" },
      { href: "gift-card", label: "Hediye Kartı" },
    ],
    visitLinks: [
      { href: "hours", label: "Çalışma Saatleri" },
      { href: "map#parking", label: "Otopark" },
      { href: "services", label: "Hizmetler" },
      { href: "map", label: "Harita" },
      { href: "contact", label: "İletişim" },
    ],
  },
  en: {
    brand: "CityMall Cyprus",
    location: "Famagusta",
    slogan: "Where shopping, dining & experiences come together.",
    movingText: "CITYMALL • FASHION • EVENTS • FOOD • CINEMA • LIFESTYLE •",
    exploreTitle: "Explore",
    visitTitle: "Visit",
    newsletterTitle: "Stay updated",
    newsletterText: "Stay updated with events & offers.",
    newsletterHelper: "Get weekly updates from CityMall.",
    newsletterPlaceholder: "Your email address",
    newsletterButton: "Subscribe",
    newsletterSuccess: "Thank you. Your email address has been received.",
    copyright: "© 2026 CityMall Cyprus",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    exploreLinks: [
      { href: "stores", label: "Stores" },
      { href: "dining", label: "Dining" },
      { href: "events", label: "Events" },
      { href: "cinema", label: "Cinemall" },
      { href: "kids", label: "Kids & Entertainment" },
      { href: "gift-card", label: "Gift Card" },
    ],
    visitLinks: [
      { href: "hours", label: "Opening Hours" },
      { href: "map#parking", label: "Parking" },
      { href: "services", label: "Services" },
      { href: "map", label: "Map" },
      { href: "contact", label: "Contact" },
    ],
  },
};

const socialLinks = [
  { label: "Instagram", icon: InstagramIcon },
  { label: "TikTok", icon: TikTokIcon },
  { label: "YouTube", icon: YouTubeIcon },
  { label: "Facebook", icon: FacebookIcon },
] as const;

export function PreviewFooter({ locale }: PreviewFooterProps) {
  const copy = content[locale];
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openGroup, setOpenGroup] = useState<"explore" | "visit" | null>(
    "explore"
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="preview-footer relative overflow-hidden bg-[#0f0f10] text-white">
      <style>{`
        @keyframes previewFooterMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes footerReveal {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .preview-footer-marquee,
          .preview-footer-reveal,
          .preview-footer-link,
          .preview-footer-social {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f5f5f3] via-[#1d1d1b] to-[#0f0f10]" />

      <div className="relative border-y border-white/8 pt-24">
        <div className="pointer-events-none overflow-hidden whitespace-nowrap pb-10">
          <div className="preview-footer-marquee flex w-max gap-10 text-[clamp(3.8rem,10vw,9rem)] font-semibold uppercase leading-none tracking-[-0.06em] text-white/[0.09] [animation:previewFooterMarquee_58s_linear_infinite]">
            <span>{copy.movingText}</span>
            <span>{copy.movingText}</span>
            <span>{copy.movingText}</span>
            <span>{copy.movingText}</span>
          </div>
        </div>
      </div>

      <div className="container relative pb-10 pt-14 md:pb-12 md:pt-20">
        <div className="preview-footer-reveal grid gap-10 [animation:footerReveal_800ms_cubic-bezier(0.22,1,0.36,1)_both] lg:grid-cols-[1.35fr_0.75fr_0.75fr_1fr] lg:gap-14">
          <section>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-4"
              aria-label="CityMall Cyprus home"
            >
              <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
                <Image
                  src="/citymall-logo.png"
                  alt="CityMall Cyprus logo"
                  width={56}
                  height={56}
                  className="h-12 w-auto object-contain"
                />
              </span>

              <span>
                <span className="block text-xl font-semibold tracking-tight">
                  {copy.brand}
                </span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.24em] text-white/38">
                  {copy.location}
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/58 md:text-base">
              {copy.slogan}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={`/${locale}/contact`}
                    aria-label={item.label}
                    className="preview-footer-social flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/74 transition hover:-translate-y-1 hover:border-white/22 hover:bg-white/[0.12] hover:text-white hover:shadow-[0_0_28px_rgba(255,255,255,0.12)]"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </section>

          <FooterColumn
            title={copy.exploreTitle}
            links={copy.exploreLinks}
            locale={locale}
          />

          <FooterColumn
            title={copy.visitTitle}
            links={copy.visitLinks}
            locale={locale}
          />

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/38">
              {copy.newsletterTitle}
            </h3>

            <p className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-white">
              {copy.newsletterText}
            </p>

            <p className="mt-3 text-sm leading-6 text-white/54">
              {copy.newsletterHelper}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <label htmlFor="preview-footer-email" className="sr-only">
                {copy.newsletterPlaceholder}
              </label>

              <div className="flex overflow-hidden rounded-full border border-white/12 bg-white/[0.06] p-1 backdrop-blur-md focus-within:border-white/28">
                <div className="flex min-w-0 flex-1 items-center gap-2 px-4">
                  <Mail className="h-4 w-4 shrink-0 text-white/42" />
                  <input
                    id="preview-footer-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);

                      if (submitted) {
                        setSubmitted(false);
                      }
                    }}
                    placeholder={copy.newsletterPlaceholder}
                    className="min-w-0 flex-1 bg-transparent py-3 text-sm font-medium text-white outline-none placeholder:text-white/34"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
                >
                  <span className="hidden sm:inline">{copy.newsletterButton}</span>
                  <ArrowRight className="h-4 w-4 sm:ml-2" aria-hidden="true" />
                </button>
              </div>

              {submitted ? (
                <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm leading-6 text-emerald-100">
                  {copy.newsletterSuccess}
                </p>
              ) : null}
            </form>
          </section>

          <section className="grid gap-3 lg:hidden">
            <MobileAccordion
              title={copy.exploreTitle}
              links={copy.exploreLinks}
              locale={locale}
              isOpen={openGroup === "explore"}
              onToggle={() =>
                setOpenGroup((current) =>
                  current === "explore" ? null : "explore"
                )
              }
            />

            <MobileAccordion
              title={copy.visitTitle}
              links={copy.visitLinks}
              locale={locale}
              isOpen={openGroup === "visit"}
              onToggle={() =>
                setOpenGroup((current) => (current === "visit" ? null : "visit"))
              }
            />
          </section>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 text-xs text-white/42 md:flex-row md:items-center md:justify-between">
            <p>
              {copy.copyright}. {copy.rights}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Link
                href={`/${locale}/privacy`}
                className="transition hover:text-white"
              >
                {copy.privacy}
              </Link>
              <span aria-hidden="true">·</span>
              <Link
                href={`/${locale}/terms`}
                className="transition hover:text-white"
              >
                {copy.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  locale,
}: {
  title: string;
  links: FooterLink[];
  locale: Locale;
}) {
  return (
    <section className="hidden lg:block">
      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/38">
        {title}
      </h3>

      <div className="mt-5 grid gap-3">
        {links.map((link) => (
          <FooterTextLink key={link.href} link={link} locale={locale} />
        ))}
      </div>
    </section>
  );
}

function MobileAccordion({
  title,
  links,
  locale,
  isOpen,
  onToggle,
}: {
  title: string;
  links: FooterLink[];
  locale: Locale;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.2em] text-white/70"
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div className="grid gap-3 px-5 pb-5">
          {links.map((link) => (
            <FooterTextLink key={link.href} link={link} locale={locale} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FooterTextLink({
  link,
  locale,
}: {
  link: FooterLink;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/${link.href}`}
      className="preview-footer-link group relative w-fit text-sm font-medium text-white/58 transition hover:text-white"
    >
      {link.label}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/70 transition-all duration-300 group-hover:w-full" />
    </Link>
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