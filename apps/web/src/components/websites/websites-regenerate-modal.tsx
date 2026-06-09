'use client';

import { AlertTriangle } from 'lucide-react';

import { WebsitesModalShell } from './websites-modal-shell';

type Props = {
  open: boolean;
  websiteName?: string;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
};

export function WebsitesRegenerateApiKeyModal({
  open,
  websiteName,
  onClose,
  onConfirm,
  isPending = false,
}: Props) {
  return (
    <WebsitesModalShell
      open={open}
      onClose={onClose}
    >
      <div>
        <div className="border-b border-[#1a1a1a] p-5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />

            <div>
              <h2 className="text-sm font-semibold text-white">
                Regenerate API Key
              </h2>

              <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                {websiteName}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-5">
          <p className="text-sm text-[#d1d5db]">
            This action will immediately revoke the current API key.
          </p>

          <p className="text-sm text-[#d1d5db]">
            Any websites using the current key will stop sending events until
            they are updated with the new key.
          </p>

          <p className="text-sm text-[#f59e0b]">
            The new key will only be shown once.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#1a1a1a] p-5">
          <button
            type="button"
            onClick={onClose}
            className="h-10 border border-[#1a1a1a] px-4 text-xs font-mono uppercase tracking-widest text-[#d1d5db]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="h-10 border border-red-500 px-4 text-xs font-mono uppercase tracking-widest text-red-400"
          >
            {isPending ? 'Regenerating...' : 'Regenerate'}
          </button>
        </div>
      </div>
    </WebsitesModalShell>
  );
}