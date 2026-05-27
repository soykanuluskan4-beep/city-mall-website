import Image from "next/image";
import Link from "next/link";

const footerContent = {
  tr: {
    description:
      "CityMall Cyprus’ta alışveriş, yeme-içme, eğlence, Cinemall ve ziyaretçi hizmetlerini tek noktada keşfedin.",
    quickLinks: "Hızlı Linkler",
    visit: "Ziyaret",
    copyright: "© 2026 CityMall Cyprus. Tüm hakları saklıdır.",
    links: {
      stores: "Mağazalar",
      dining: "Yeme-İçme",
      campaigns: "Kampanyalar",
      events: "Etkinlikler",
      cinema: "Cinemall",
      kids: "Çocuk & Eğlence",
      services: "Hizmetler",
      giftCard: "Hediye Kartı",
      hours: "Çalışma Saatleri",
      map: "Harita",
      contact: "İletişim",
    },
  },
  en: {
    description:
      "Explore shopping, dining, entertainment, Cinemall and visitor services at CityMall Cyprus.",
    quickLinks: "Quick Links",
    visit: "Visit",
    copyright: "© 2026 CityMall Cyprus. All rights reserved.",
    links: {
      stores: "Stores",
      dining: "Dining",
      campaigns: "Campaigns",
      events: "Events",
      cinema: "Cinemall",
      kids: "Kids & Entertainment",
      services: "Services",
      giftCard: "Gift Card",
      hours: "Opening Hours",
      map: "Map",
      contact: "Contact",
    },
  },
};

const mainFooterLinks = [
  { href: "stores", key: "stores" },
  { href: "dining", key: "dining" },
  { href: "campaigns", key: "campaigns" },
  { href: "events", key: "events" },
  { href: "cinema", key: "cinema" },
  { href: "kids", key: "kids" },
] as const;

const visitFooterLinks = [
  { href: "services", key: "services" },
  { href: "gift-card", key: "giftCard" },
  { href: "hours", key: "hours" },
  { href: "map", key: "map" },
  { href: "contact", key: "contact" },
] as const;

type FooterProps = {
  locale?: "tr" | "en";
};

export function Footer({ locale = "tr" }: FooterProps) {
  const content = footerContent[locale];

  return (
    <footer className="border-t border-border-default bg-surface-muted">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <section>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-border-default bg-surface-default shadow-card">
              <Image
                src="/citymall-logo.png"
                alt="CityMall Cyprus logo"
                width={44}
                height={44}
                className="h-10 w-auto object-contain"
              />
            </span>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-text-primary">
                CityMall Cyprus
              </h2>
            </div>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-6 text-text-secondary">
            {content.description}
          </p>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
            {content.quickLinks}
          </h3>

          <div className="mt-5 grid gap-3 text-sm text-text-secondary">
            {mainFooterLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}/${link.href}`}
                className="transition hover:text-text-primary"
              >
                {content.links[link.key]}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
            {content.visit}
          </h3>

          <div className="mt-5 grid gap-3 text-sm text-text-secondary">
            {visitFooterLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}/${link.href}`}
                className="transition hover:text-text-primary"
              >
                {content.links[link.key]}
              </Link>
            ))}
          </div>

          <Link
            href={`/${locale}/contact`}
            className="mt-6 inline-flex rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:opacity-90"
          >
            {content.links.contact}
          </Link>
        </section>
      </div>

      <div className="border-t border-border-default py-5">
        <div className="container flex flex-col gap-3 text-xs text-text-muted md:flex-row md:items-center md:justify-between">
          <p>{content.copyright}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}/privacy`}
              className="transition hover:text-text-primary"
            >
              {locale === "tr" ? "Gizlilik ve Çerezler" : "Privacy and Cookies"}
            </Link>

            <span aria-hidden="true">·</span>

            <Link
              href={`/${locale}/services`}
              className="transition hover:text-text-primary"
            >
              {content.links.services}
            </Link>

            <span aria-hidden="true">·</span>

            <Link
              href={`/${locale}/gift-card`}
              className="transition hover:text-text-primary"
            >
              {content.links.giftCard}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}