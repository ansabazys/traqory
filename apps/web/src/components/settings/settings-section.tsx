"use client";

export function SettingsSection({
  title,
  description,
  children,
  danger = false,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <section className="h-full overflow-hidden border border-[#1a1a1a] bg-[#0a0a0a] px-5 py-4">
      <div className="mb-4 border-b border-[#1a1a1a] pb-3">
        <h2
          className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${
            danger ? "text-red-400" : "text-white"
          }`}
        >
          {title}
        </h2>
        <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
          {description}
        </p>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
