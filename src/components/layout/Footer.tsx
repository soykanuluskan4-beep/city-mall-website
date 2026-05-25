import Image from "next/image";
import Link from "next/link";

const footerContent = {
  tr: {
    tagline: "AVM konsept sitesi",
    description:
      "CityMall Cyprus için hazırlanmış çok dilli, modern ve responsive AVM web sitesi konsepti.",
    quickLinks: "Hızlı Linkler",
    visit: "Ziyaret",
    disclaimer:
      "Bu site CityMall Cyprus'un resmi sitesi değildir. Portföy ve konsept demonstrasyonu amacıyla hazırlanmıştır.",
    copyright: "© 2026 CityMall Cyprus konsept demo. Tüm hakları saklıdır.",
    links: {
      stores: "Mağazalar",
      dining: "Yeme-İçme",
      campaigns: "Kampanyalar",
      events: "Etkinlikler",
      cinema: "Sinema",
      kids: "Çocuk & Eğlence",
      hours: "Çalışma Saatleri",
      map: "Harita",
      contact: "İletişim",
    },
  },
  en: {
    tagline: "Mall concept site",
    description:
      "A multilingual, modern and responsive mall website concept prepared for CityMall Cyprus.",
    quickLinks: "Quick Links",
    visit: "Visit",
    disclaimer:
      "This site is not the official website of CityMall Cyprus. It was created for portfolio and concept demonstration purposes.",
    copyright: "© 2026 CityMall Cyprus concept demo. All rights reserved.",
    links: {
      stores: "Stores",
      dining: "Dining",
      campaigns: "Campaigns",
      events: "Events",
      cinema: "Cinema",
      kids: "Kids & Entertainment",
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
              <p className="text-xs font-medium text-text-muted">
                {content.tagline}
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-6 text-text-secondary">
            {content.description}
          </p>

          <div className="mt-6 rounded-2xl border border-border-default bg-surface-default p-4 shadow-card">
            <p className="text-xs leading-5 text-text-muted">
              {content.disclaimer}
            </p>
          </div>
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

      <p>{locale === "tr" ? "Çok dilli demo konsept" : "Multilingual demo concept"}</p>
    </div>
  </div>
</div>
    </footer>
  );
}