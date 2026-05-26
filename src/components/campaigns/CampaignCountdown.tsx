"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/types/content";

type CampaignCountdownProps = {
  startDate: string;
  endDate: string;
  locale: Locale;
};

export type ComputedCampaignStatus = "active" | "upcoming" | "expired";

function getDateStatus(startDate: string, endDate: string): ComputedCampaignStatus {
  const now = new Date();
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T23:59:59`);

  if (now < start) {
    return "upcoming";
  }

  if (now > end) {
    return "expired";
  }

  return "active";
}

function getDayDifference(targetDate: Date) {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
}

export function getCampaignStatus(startDate: string, endDate: string) {
  return getDateStatus(startDate, endDate);
}

export function CampaignCountdown({
  startDate,
  endDate,
  locale,
}: CampaignCountdownProps) {
  const [nowTick, setNowTick] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNowTick((current) => current + 1);
    }, 60_000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const status = getDateStatus(startDate, endDate);
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T23:59:59`);

  void nowTick;

  if (status === "upcoming") {
    const days = getDayDifference(start);

    return (
      <span>
        {locale === "tr"
          ? `${days} gün sonra başlıyor`
          : `Starts in ${days} days`}
      </span>
    );
  }

  if (status === "expired") {
    return <span>{locale === "tr" ? "Sona erdi" : "Expired"}</span>;
  }

  const daysLeft = getDayDifference(end);

  if (daysLeft === 0) {
    return <span>{locale === "tr" ? "Bugün bitiyor" : "Ends today"}</span>;
  }

  return (
    <span>
      {locale === "tr" ? `${daysLeft} gün kaldı` : `${daysLeft} days left`}
    </span>
  );
}