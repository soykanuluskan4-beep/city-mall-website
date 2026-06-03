import { redirect } from "next/navigation";
import { locales } from "@/i18n/routing";
import type { Locale } from "@/types/content";

type RedesignPreviewPageProps = {
  params: {
    locale: string;
  };
};

export default function RedesignPreviewPage({
  params,
}: RedesignPreviewPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    redirect("/tr");
  }

  redirect(`/${locale}`);
}