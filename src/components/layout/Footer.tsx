"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const footerContent = {
  tr: {
    description:
      "CityMall Cyprus’da alışveriş, yeme-içme, Cinemall, etkinlikler ve ziyaretçi hizmetlerini tek noktada keşfedin.",
    quickLinks: "Hızlı Linkler",
    visit: "Ziyaret",
    corporate: "Kurumsal",
    contact: "İletişim",
    social: "Sosyal Medya",
    newsletterTitle: "CityMall’dan haber alın",
    newsletterText:
      "Kampanyalar, etkinlikler ve duyurular için e-posta adresinizi bırakın.",
    newsletterPlaceholder: "E-posta adresiniz",
    newsletterButton: "Abone Ol",
    newsletterSuccess:
      "Teşekkürler. E-posta adresiniz bilgilendirme listesi için alınmıştır.",
    copyright: "© 2026 CityMall Cyprus. Tüm hakları saklıdır.",
    contactInfo: {
      addressLabel: "Adres",
      address: "Gazimağusa, Kuzey Kıbrıs",
      phoneLabel: "Telefon",
      phone: "Bilgi için iletişime geçin",
      emailLabel: "E-posta",
      email: "info@citymallcyprus.com",
      whatsappLabel: "WhatsApp",
      whatsapp: "WhatsApp için iletişim",
    },
    links: {
      stores: "Mağazalar",
      dining: "Yeme-İçme",
      campaigns: "Kampanyalar",
      events: "Etkinlikler",
      cinema: "Cinemall",
      kids: "Çocuk & Eğlence",
      giftCard: "Hediye Kartı",
      hours: "Çalışma Saatleri",
      map: "Harita",
      parking: "Otopark",
      services: "Hizmetler",
      accessibility: "Erişilebilirlik",
      about: "Hakkımızda",
      press: "Basın / Medya",
      leasing: "Kiralama",
      careers: "Kariyer",
      contact: "İletişim",
      privacy: "Gizlilik Politikası",
      terms: "Kullanım Koşulları",
      kvkk: "KVKK",
    },
  },
  en: {
    description:
      "Explore shopping, dining, Cinemall, events and visitor services at CityMall Cyprus.",
    quickLinks: "Quick Links",
    visit: "Visit",
    corporate: "Corporate",
    contact: "Contact",
    social: "Social Media",
    newsletterTitle: "Stay updated with CityMall",
    newsletterText:
      "Leave your email for campaigns, events and announcements.",
    newsletterPlaceholder: "Your email address",
    newsletterButton: "Subscribe",
    newsletterSuccess:
      "Thank you. Your email address has been received for updates.",
    copyright: "© 2026 CityMall Cyprus. All rights reserved.",
    contactInfo: {
      addressLabel: "Address",
      address: "Famagusta, Northern Cyprus",
      phoneLabel: "Phone",
      phone: "Contact us for information",
      emailLabel: "Email",
      email: "info@citymallcyprus.com",
      whatsappLabel: "WhatsApp",
      whatsapp: "Contact us on WhatsApp",
    },
    links: {
      stores: "Stores",
      dining: "Dining",
      campaigns: "Campaigns",
      events: "Events",
      cinema: "Cinemall",
      kids: "Kids & Entertainment",
      giftCard: "Gift Card",
      hours: "Opening Hours",
      map: "Map",
      parking: "Parking",
      services: "Services",
      accessibility: "Accessibility",
      about: "About Us",
      press: "Press / Media",
      leasing: "Leasing",
      careers: "Careers",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      kvkk: "KVKK",
    },
  },
};

const quickLinks = [
  { href: "stores", key: "stores" },
  { href: "dining", key: "dining" },
  { href: "campaigns", key: "campaigns" },
  { href: "events", key: "events" },
  { href: "cinema", key: "cinema" },
  { href: "kids", key: "kids" },
  { href: "gift-card", key: "giftCard" },
] as const;

const visitLinks = [
  { href: "hours", key: "hours" },
  { href: "map", key: "map" },
  { href: "map#parking", key: "parking" },
  { href: "services", key: "services" },
  { href: "services", key: "accessibility" },
] as const;

const corporateLinks = [
  { href: "about", key: "about" },
  { href: "press", key: "press" },
  { href: "leasing", key: "leasing" },
  { href: "careers", key: "careers" },
  { href: "contact", key: "contact" },
] as const;

const legalLinks = [
  { href: "privacy", key: "privacy" },
  { href: "terms", key: "terms" },
  { href: "privacy", key: "kvkk" },
] as const;

const socialLinks = [
  {
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    label: "Facebook",
    icon: FacebookIcon,
  },
] as const;

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14.2 8.4V6.9c0-.7.5-1.1 1.2-1.1h1.5V3.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v1H7.5v3h2.7v9.5h3.3v-9.5h2.7l.4-3h-3.1Z" />
    </svg>
  );
}

type FooterProps = {
  locale?: "tr" | "en";
};

export function Footer({ locale = "tr" }: FooterProps) {
  const content = footerContent[locale];
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="overflow-x-hidden border-t border-border-default bg-text-primary text-white">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 xl:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr_1fr]">
          <section className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white shadow-card">
                <Image
                  src="/citymall-logo.png"
                  alt="CityMall Cyprus logo"
                  width={48}
                  height={48}
                  className="h-11 w-auto object-contain"
                />
              </span>

              <div className="min-w-0">
                <h2 className="text-xl font-semibold tracking-tight">
                  CityMall Cyprus
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                  {locale === "tr" ? "Gazimağusa" : "Famagusta"}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white/68">
              {content.description}
            </p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                {content.social}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={`/${locale}/contact`}
                      aria-label={item.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white/18"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <FooterLinkColumn
            title={content.quickLinks}
            links={quickLinks}
            locale={locale}
            labels={content.links}
          />

          <FooterLinkColumn
            title={content.visit}
            links={visitLinks}
            locale={locale}
            labels={content.links}
          />

          <FooterLinkColumn
            title={content.corporate}
            links={corporateLinks}
            locale={locale}
            labels={content.links}
          />

          <section className="min-w-0">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
              {content.contact}
            </h3>

            <div className="mt-5 grid gap-4">
              <ContactRow
                icon={MapPin}
                label={content.contactInfo.addressLabel}
                value={content.contactInfo.address}
              />

              <ContactRow
                icon={Phone}
                label={content.contactInfo.phoneLabel}
                value={content.contactInfo.phone}
              />

              <ContactRow
                icon={Mail}
                label={content.contactInfo.emailLabel}
                value={content.contactInfo.email}
                href={`mailto:${content.contactInfo.email}`}
              />

              <ContactRow
                icon={MessageCircle}
                label={content.contactInfo.whatsappLabel}
                value={content.contactInfo.whatsapp}
                href={`/${locale}/contact`}
              />
            </div>

            <Link
              href={`/${locale}/contact`}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
            >
              {content.links.contact}
            </Link>
          </section>
        </div>

        <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur md:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                {content.newsletterTitle}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/64">
                {content.newsletterText}
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex min-w-0 flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="footer-newsletter">
                {content.newsletterPlaceholder}
              </label>

              <input
                id="footer-newsletter"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (subscribed) {
                    setSubscribed(false);
                  }
                }}
                placeholder={content.newsletterPlaceholder}
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary"
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {content.newsletterButton}
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>

          {subscribed ? (
            <div className="mt-4 flex items-start gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{content.newsletterSuccess}</span>
            </div>
          ) : null}
        </section>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container flex flex-col gap-4 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>{content.copyright}</p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {legalLinks.map((link, index) => (
              <span key={link.key} className="inline-flex items-center gap-3">
                {index > 0 ? <span aria-hidden="true">·</span> : null}

                <Link
                  href={`/${locale}/${link.href}`}
                  className="transition hover:text-white"
                >
                  {content.links[link.key]}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLinkColumnProps = {
  title: string;
  links: readonly {
    href: string;
    key: keyof (typeof footerContent)["tr"]["links"];
  }[];
  locale: "tr" | "en";
  labels: (typeof footerContent)["tr"]["links"];
};

function FooterLinkColumn({
  title,
  links,
  locale,
  labels,
}: FooterLinkColumnProps) {
  return (
    <section className="min-w-0">
      <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
        {title}
      </h3>

      <div className="mt-5 grid gap-3 text-sm text-white/68">
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.key}`}
            href={`/${locale}/${link.href}`}
            className="w-fit transition hover:text-white"
          >
            {labels[link.key]}
          </Link>
        ))}
      </div>
    </section>
  );
}

type ContactRowProps = {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
};

function ContactRow({ icon: Icon, label, value, href }: ContactRowProps) {
  const content = (
    <div className="flex min-w-0 gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/38">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-medium leading-5 text-white/72">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block transition hover:text-white">
        {content}
      </Link>
    );
  }

  return content;
}