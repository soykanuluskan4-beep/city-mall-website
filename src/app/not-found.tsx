import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-muted px-6 py-20">
      <section className="w-full max-w-2xl rounded-2xl border border-border-default bg-surface-default p-8 text-center shadow-elevated md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-text-muted">
          404
        </p>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
          Sayfa bulunamadı
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-text-secondary">
          Aradığınız sayfa taşınmış, kaldırılmış veya henüz oluşturulmamış
          olabilir.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/tr"
            className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-foreground shadow-card transition hover:opacity-90"
          >
            Ana sayfaya dön
          </Link>

          <Link
            href="/tr/contact"
            className="rounded-full border border-border-default bg-surface-default px-6 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-subtle"
          >
            İletişim
          </Link>
        </div>

        <p className="mt-8 text-xs leading-5 text-text-muted">
          Aradığınız sayfa taşınmış veya artık mevcut olmayabilir. CityMall Cyprus sayfalarına ana sayfadan devam edebilirsiniz.
        </p>
      </section>
    </main>
  );
}