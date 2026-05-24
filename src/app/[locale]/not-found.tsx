import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-surface-default px-6 py-20">
      <section className="w-full max-w-2xl rounded-2xl border border-border-default bg-surface-muted p-8 text-center shadow-card md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-text-muted">
          404
        </p>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-text-secondary">
          This page may have moved, been removed, or has not been created yet.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/tr"
            className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:opacity-90"
          >
            Home
          </Link>

          <Link
            href="/tr/contact"
            className="rounded-full border border-border-default bg-surface-default px-6 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
          >
            Contact
          </Link>
        </div>
      </section>
    </main>
  );
}