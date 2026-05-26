"use client";

import { useEffect } from "react";
import { FileText, X } from "lucide-react";
import type { Locale } from "@/types/content";

type MenuDemoModalProps = {
  locale: Locale;
  placeName: string;
  open: boolean;
  onClose: () => void;
};

const content = {
  tr: {
    eyebrow: "Menü",
    title: "Demo menü alanı",
    description:
      "Bu alanda gerçek restoran menüsü gösterilmez. Gerçek projede menü PDF, görsel menü veya admin panelden yönetilen dijital menü olarak eklenebilir.",
    place: "Mekan",
    note: "Demo modundayız.",
    close: "Kapat",
  },
  en: {
    eyebrow: "Menu",
    title: "Demo menu area",
    description:
      "This area does not display a real restaurant menu. In production, the menu can be added as a PDF, image menu or managed digital menu.",
    place: "Place",
    note: "Demo mode.",
    close: "Close",
  },
};

export function MenuDemoModal({
  locale,
  placeName,
  open,
  onClose,
}: MenuDemoModalProps) {
  const copy = content[locale];

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-text-primary/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-lg rounded-[2rem] border border-border-default bg-surface-default p-6 shadow-elevated"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={copy.title}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              {copy.eyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">
              {copy.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface-muted text-text-primary transition hover:bg-surface-subtle"
            aria-label={copy.close}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 rounded-3xl bg-surface-muted p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-brand-foreground">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </div>

          <p className="mt-5 text-sm font-semibold text-text-muted">
            {copy.note}
          </p>

          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              {copy.place}
            </p>
            <p className="mt-1 text-lg font-semibold text-text-primary">
              {placeName}
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-text-secondary">
          {copy.description}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
        >
          {copy.close}
        </button>
      </div>
    </div>
  );
}