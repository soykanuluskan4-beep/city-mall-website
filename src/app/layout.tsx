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
  title: "CityMall Cyprus",
  description:
    "CityMall Cyprus için hazırlanmış çok dilli AVM web sitesi konsepti.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/citymall-logo.png",
    shortcut: "/citymall-logo.png",
    apple: "/citymall-logo.png",
  },
  openGraph: {
    title: "CityMall Cyprus",
    description:
      "CityMall Cyprus için hazırlanmış çok dilli AVM web sitesi konsepti.",
    siteName: "CityMall Cyprus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CityMall Cyprus",
    description:
      "CityMall Cyprus için hazırlanmış çok dilli AVM web sitesi konsepti.",
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