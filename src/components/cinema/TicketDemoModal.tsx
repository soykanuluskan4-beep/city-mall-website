"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { Locale } from "@/types/content";

export type TicketSelection = {
  movieTitle: string;
  dateLabel: string;
  time: string;
};

type TicketDemoModalProps = {
  locale: Locale;
  selection: TicketSelection | null;
  onClose: () => void;
};

const content = {
  tr: {
    title: "Demo bilet akışı",
    description:
      "Bu seans seçimi gerçek bilet satışına bağlı değildir. Gerçek projede Cinemall bilet sağlayıcısı ile entegre edilebilir.",
    movie: "Film",
    session: "Seans",
    note: "Demo modundayız.",
    close: "Kapat",
  },
  en: {
    title: "Demo ticket flow",
    description:
      "This showtime is not connected to a real ticketing provider. In production, it can be integrated with a Cinemall ticketing system.",
    movie: "Movie",
    session: "Session",
    note: "Demo mode.",
    close: "Close",
  },
};

export function TicketDemoModal({
  locale,
  selection,
  onClose,
}: TicketDemoModalProps) {
  const copy = content[locale];

  useEffect(() => {
    if (!selection) {
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
  }, [selection, onClose]);

  if (!selection) {
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
              Cinemall
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
          <p className="text-sm font-semibold text-text-muted">{copy.note}</p>

          <div className="mt-5 grid gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                {copy.movie}
              </p>
              <p className="mt-1 text-lg font-semibold text-text-primary">
                {selection.movieTitle}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                {copy.session}
              </p>
              <p className="mt-1 text-lg font-semibold text-text-primary">
                {selection.dateLabel} · {selection.time}
              </p>
            </div>
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