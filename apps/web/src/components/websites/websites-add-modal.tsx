"use client";

import { Check, X } from "lucide-react";
import { WebsitesModalShell } from "@/components/websites/websites-modal-shell";

export function WebsitesAddModal({
  open,
  nameInput,
  domainInput,
  onClose,
  onNameChange,
  onDomainChange,
  onSubmit,
}: {
  open: boolean;
  nameInput: string;
  domainInput: string;
  onClose: () => void;
  onNameChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <WebsitesModalShell open={open} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between border-b border-[#1a1a1a] p-5">
          <div>
            <h2 className="text-sm font-semibold text-white">Add Website</h2>
            <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
              Create a new tracked project.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center border border-[#1a1a1a] bg-[#0a0a0a] text-[#888888] transition-colors hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-[#666666]">
              Website Name
            </label>
            <input
              value={nameInput}
              onChange={(event) => onNameChange(event.target.value)}
              placeholder="tracpy marketing"
              className="h-10 w-full border border-[#1a1a1a] bg-[#0a0a0a] px-3 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#2a2a2a]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-[#666666]">
              Domain
            </label>
            <input
              required
              value={domainInput}
              onChange={(event) => onDomainChange(event.target.value)}
              placeholder="example.com"
              className="h-10 w-full border border-[#1a1a1a] bg-[#0a0a0a] px-3 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#2a2a2a]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#1a1a1a] p-5">
          <button
            type="button"
            onClick={onClose}
            className="h-10 border border-[#1a1a1a] px-4 text-xs font-mono uppercase tracking-widest text-[#d1d5db] transition-colors hover:bg-[#111111]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex h-10 items-center gap-2 border border-[#1a1a1a] bg-[#111111] px-4 text-xs font-mono uppercase tracking-widest text-white transition-colors hover:border-[#2a2a2a]"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Create Website</span>
          </button>
        </div>
      </form>
    </WebsitesModalShell>
  );
}
