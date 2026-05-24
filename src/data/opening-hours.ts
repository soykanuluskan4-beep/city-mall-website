import type { OpeningHours } from "@/types/content";

export const openingHours: OpeningHours = {
  mall: [
    {
      day: "monday",
      label: {
        tr: "Pazartesi",
        en: "Monday",
      },
      open: "10:00",
      close: "22:00",
    },
    {
      day: "tuesday",
      label: {
        tr: "Salı",
        en: "Tuesday",
      },
      open: "10:00",
      close: "22:00",
    },
    {
      day: "wednesday",
      label: {
        tr: "Çarşamba",
        en: "Wednesday",
      },
      open: "10:00",
      close: "22:00",
    },
    {
      day: "thursday",
      label: {
        tr: "Perşembe",
        en: "Thursday",
      },
      open: "10:00",
      close: "22:00",
    },
    {
      day: "friday",
      label: {
        tr: "Cuma",
        en: "Friday",
      },
      open: "10:00",
      close: "22:00",
    },
    {
      day: "saturday",
      label: {
        tr: "Cumartesi",
        en: "Saturday",
      },
      open: "10:00",
      close: "23:00",
    },
    {
      day: "sunday",
      label: {
        tr: "Pazar",
        en: "Sunday",
      },
      open: "10:00",
      close: "23:00",
    },
  ],
  cinema: [
    {
      day: "monday",
      label: {
        tr: "Her Gün",
        en: "Every Day",
      },
      open: "11:00",
      close: "00:00",
    },
  ],
  dining: [
    {
      day: "monday",
      label: {
        tr: "Her Gün",
        en: "Every Day",
      },
      open: "10:00",
      close: "23:00",
    },
  ],
  specialNotes: [
    {
      tr: "Resmi tatiller ve özel günlerde çalışma saatleri değişebilir.",
      en: "Opening hours may vary on public holidays and special days.",
    },
  ],
};