"use client";

export function SettingsField({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-[#666666]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        className="h-10 w-full border border-[#1a1a1a] bg-[#0a0a0a] px-3 text-sm text-[#e5e7eb] outline-none transition-all duration-200 placeholder:text-[#4b5563] focus:border-[#2a2a2a] focus:ring-1 focus:ring-[#222222] disabled:cursor-not-allowed disabled:text-[#888888]"
      />
    </label>
  );
}
