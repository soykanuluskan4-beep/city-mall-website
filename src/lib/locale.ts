import type { Locale, LocalizedString } from "@/types/content";

export function getLocalizedText(value: LocalizedString, locale: Locale) {
  return value[locale];
}