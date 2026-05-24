import Link from "next/link";

const footerContent = {
  tr: {
    quickLinks: "Hızlı Linkler",
    disclaimer:
      "Bu site CityMall Cyprus'un resmi sitesi değildir. Portföy ve konsept demonstrasyonu amacıyla hazırlanmıştır.",
    copyright: "© 2026 CityMall Cyprus konsept demo. Tüm hakları saklıdır.",
links: {
  stores: "Mağazalar",
  dining: "Yeme-İçme",
  campaigns: "Kampanyalar",
  events: "Etkinlikler",
  hours: "Çalışma Saatleri",
  map: "Harita",
  contact: "İletişim",
},
  },
  en: {
    quickLinks: "Quick Links",
    disclaimer:
      "This site is not the official website of CityMall Cyprus. It was created for portfolio and concept demonstration purposes.",
    copyright: "© 2026 CityMall Cyprus concept demo. All rights reserved.",
links: {
  stores: "Stores",
  dining: "Dining",
  campaigns: "Campaigns",
  events: "Events",
  hours: "Opening Hours",
  map: "Map",
  contact: "Contact",
},
  },
};

const footerLinks = [
  { href: "stores", key: "stores" },
  { href: "dining", key: "dining" },
  { href: "campaigns", key: "campaigns" },
  { href: "events", key: "events" },
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
      <div className="container grid gap-8 py-10 md:grid-cols-[1.4fr_1fr]">
        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            CityMall Cyprus
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary">
            {content.disclaimer}
          </p>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-text-primary">
            {content.quickLinks}
          </h3>

          <div className="mt-4 grid gap-2 text-sm text-text-secondary">
            {footerLinks.map((link) => (
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
      </div>

      <div className="border-t border-border-default py-4">
        <div className="container text-xs text-text-muted">
          {content.copyright}
        </div>
      </div>
    </footer>
  );
}