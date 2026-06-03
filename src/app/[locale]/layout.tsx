import { CookieBanner } from "@/components/common/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { Locale } from "@/types/content";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = params.locale;

  return (
    <div
      className={`${outfit.variable} ${outfit.className} min-h-screen bg-surface-default font-sans text-text-primary antialiased`}
    >
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
      <CookieBanner locale={locale} />
    </div>
  );
}