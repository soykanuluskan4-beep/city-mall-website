export default function Loading() {
  return (
    <main className="min-h-screen bg-surface-default">
      <section className="container py-20">
        <div className="animate-pulse">
          <div className="h-4 w-48 rounded-full bg-surface-subtle" />

          <div className="mt-8 h-16 max-w-3xl rounded-2xl bg-surface-subtle" />
          <div className="mt-4 h-16 max-w-2xl rounded-2xl bg-surface-subtle" />

          <div className="mt-8 h-6 max-w-xl rounded-full bg-surface-subtle" />
          <div className="mt-3 h-6 max-w-lg rounded-full bg-surface-subtle" />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="h-48 rounded-2xl bg-surface-subtle" />
            <div className="h-48 rounded-2xl bg-surface-subtle" />
            <div className="h-48 rounded-2xl bg-surface-subtle" />
          </div>
        </div>
      </section>
    </main>
  );
}