'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

import { WebsitesModalShell } from './websites-modal-shell';

type Props = {
  open: boolean;
  websiteName?: string;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
};

export function WebsitesDeleteModal({
  open,
  websiteName,
  onClose,
  onConfirm,
  isPending = false,
}: Props) {
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    if (!open) {
      setConfirmation('');
    }
  }, [open]);

  const canDelete =
    websiteName &&
    confirmation.trim() === websiteName;

  return (
    <WebsitesModalShell
      open={open}
      onClose={onClose}
    >
      <div>
        <div className="border-b border-[#1a1a1a] p-5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />

            <div>
              <h2 className="text-sm font-semibold text-white">
                Delete Website
              </h2>

              <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                {websiteName}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <p className="text-sm text-[#d1d5db]">
            This will remove the website from your dashboard and revoke all
            associated API keys.
          </p>

          <p className="text-sm text-[#d1d5db]">
            Any websites using these keys will stop sending events immediately.
          </p>

          <p className="text-sm text-red-400">
            This action cannot be undone.
          </p>

          <div className="space-y-2 pt-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#666666]">
              Confirmation Required
            </p>

            <p className="text-sm text-[#d1d5db]">
              Type{' '}
              <span className="font-mono text-red-400">
                {websiteName}
              </span>{' '}
              to confirm.
            </p>

            <input
              type="text"
              value={confirmation}
              onChange={(e) =>
                setConfirmation(e.target.value)
              }
              placeholder={websiteName}
              disabled={isPending}
              className="w-full border border-[#1a1a1a] bg-[#111111] px-3 py-3 text-sm text-white outline-none transition-colors focus:border-red-500/50"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#1a1a1a] p-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="h-10 border border-[#1a1a1a] px-4 text-xs font-mono uppercase tracking-widest text-[#d1d5db]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={!canDelete || isPending}
            className="h-10 border border-red-500 px-4 text-xs font-mono uppercase tracking-widest text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending
              ? 'Deleting...'
              : 'Delete Website'}
          </button>
        </div>
      </div>
    </WebsitesModalShell>
  );
}