import type { Locale } from "@/types/content";

export type OpeningStatus = {
  isOpen: boolean;
  statusText: string;
  closingTime?: string;
  nextOpenTime?: string;
};

const WEEKDAY_CLOSE = "22:00";
const WEEKEND_CLOSE = "23:00";
const OPEN_TIME = "10:00";

function getMinutesFromTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function getCurrentMinutes(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

function isWeekend(day: number) {
  return day === 0 || day === 6;
}

function getClosingTime(day: number) {
  return isWeekend(day) ? WEEKEND_CLOSE : WEEKDAY_CLOSE;
}

export function getOpeningStatus(
  locale: Locale,
  date = new Date()
): OpeningStatus {
  const day = date.getDay();
  const currentMinutes = getCurrentMinutes(date);
  const openMinutes = getMinutesFromTime(OPEN_TIME);
  const closeTime = getClosingTime(day);
  const closeMinutes = getMinutesFromTime(closeTime);

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  if (isOpen) {
    return {
      isOpen: true,
      statusText:
        locale === "tr"
          ? `Şu an açık · ${closeTime}'ye kadar`
          : `Open now · Until ${closeTime}`,
      closingTime: closeTime,
    };
  }

  if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      statusText:
        locale === "tr"
          ? `Şu an kapalı · Bugün ${OPEN_TIME}'da açılıyor`
          : `Closed now · Opens today at ${OPEN_TIME}`,
      nextOpenTime: OPEN_TIME,
    };
  }

  return {
    isOpen: false,
    statusText:
      locale === "tr"
        ? `Şu an kapalı · Yarın ${OPEN_TIME}'da açılıyor`
        : `Closed now · Opens tomorrow at ${OPEN_TIME}`,
    nextOpenTime: OPEN_TIME,
  };
}