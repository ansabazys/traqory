'use client';

export function DashboardPreviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-32">
      <div className="mb-16 text-center">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#888888]">
          Dashboard Experience
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Everything in one place.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#888888] md:text-base">
          Realtime monitoring, event tracking, and analytics
          built for modern applications.
        </p>
      </div>

      <div className="overflow-hidden border border-[#1a1a1a] bg-[#050505]">
        {/* Browser Bar */}
        <div className="flex h-12 items-center gap-2 border-b border-[#1a1a1a] px-4">
          <div className="h-2 w-2 rounded-full bg-[#444]" />
          <div className="h-2 w-2 rounded-full bg-[#444]" />
          <div className="h-2 w-2 rounded-full bg-[#444]" />

          <div className="ml-4 font-mono text-[10px] uppercase tracking-widest text-[#666]">
            app.traqory.com
          </div>
        </div>

        {/* Screenshot */}
        <img
          src="/images/overview.png"
          alt="Traqory Dashboard"
          className="w-full"
        />
      </div>
    </section>
  );
}