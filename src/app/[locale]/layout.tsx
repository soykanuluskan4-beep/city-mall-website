import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSeoContent, siteConfig } from "@/lib/seo";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

async function getLocaleMessages(locale: Locale) {
  return (await import(`../../messages/${locale}.json`)).default;
}

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    return {};
  }

  const seo = getSeoContent(locale);
  const url = `${siteConfig.url}/${locale}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: seo.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: seo.description,
    applicationName: siteConfig.name,
    authors: [{ name: "CityMall Cyprus Concept" }],
    creator: "CityMall Cyprus Concept",
    publisher: "CityMall Cyprus Concept",
    alternates: {
      canonical: url,
      languages: {
        tr: `${siteConfig.url}/tr`,
        en: `${siteConfig.url}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url,
      siteName: siteConfig.name,
      title: seo.ogTitle,
      description: seo.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle,
      description: seo.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getLocaleMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      {children}
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}