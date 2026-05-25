import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { CookieBanner } from "@/components/common/CookieBanner";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createPageMetadata } from "@/lib/metadata";

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

  return createPageMetadata({
    locale,
    path: "",
  });
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
    <CookieBanner locale={locale} />
  </NextIntlClientProvider>
);
}