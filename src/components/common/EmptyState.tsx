import Link from "next/link";

type EmptyStateProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({
  eyebrow = "Empty",
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <section className="rounded-2xl border border-border-default bg-surface-muted p-8 text-center shadow-card">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
        {eyebrow}
      </p>

      <h2 className="mx-auto mt-4 max-w-xl text-2xl font-semibold text-text-primary">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-text-secondary">
        {description}
      </p>

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-6 inline-flex rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-foreground transition hover:opacity-90"
        >
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}