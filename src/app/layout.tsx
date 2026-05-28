import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/seo";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "CityMall Cyprus | Gazimağusa’nın buluşma noktası",
  description:
    "CityMall Cyprus mağazaları, yeme-içme alanları, Cinemall, etkinlikler ve ziyaretçi hizmetlerini keşfedin.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/citymall-logo.png",
    shortcut: "/citymall-logo.png",
    apple: "/citymall-logo.png",
  },
  openGraph: {
    title: "CityMall Cyprus | Gazimağusa’nın alışveriş ve yaşam noktası",
    description:
      "CityMall Cyprus; mağazalar, yeme-içme, sinema, etkinlikler ve ziyaret bilgilerini Gazimağusa’da tek noktada buluşturur.",
    siteName: "CityMall Cyprus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CityMall Cyprus | Gazimağusa’nın buluşma noktası",
    description:
      "CityMall Cyprus; mağazalar, yeme-içme, sinema, etkinlikler ve ziyaret bilgilerini Gazimağusa’da tek noktada buluşturur.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} min-h-screen bg-surface-default font-sans text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}