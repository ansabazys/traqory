'use client';

import { Copy, RotateCw, X } from 'lucide-react';

import { type Website } from '@/components/websites/types';
import { WebsitesModalShell } from '@/components/websites/websites-modal-shell';

function buildTrackingScript(apiKey: string) {
  return `<script src="https://cdn.tracpy.com/script.js" data-key="${apiKey}"></script>`;
}

type WebsitesSetupModalProps = {
  website: Website | null;
  apiKey: string | null;
  copiedKey: string | null;
  isNewKey: boolean;
  onClose: () => void;
  onCopyKey: (apiKey: string) => void;
  onCopyScript: (apiKey: string) => void;
  onRegenerateApiKey: () => void;
};

export function WebsitesSetupModal({
  website,
  apiKey,
  copiedKey,
  isNewKey,
  onClose,
  onCopyKey,
  onCopyScript,
  onRegenerateApiKey,
}: WebsitesSetupModalProps) {
  const hasFullApiKey = isNewKey && !!apiKey && !apiKey.includes('****');

  return (
    <WebsitesModalShell open={Boolean(website)} onClose={onClose}>
      {website ? (
        <div>
          <div className="flex items-center justify-between border-b border-[#1a1a1a] p-5">
            <div>
              <h2 className="text-sm font-semibold text-white">Tracking Setup</h2>

              <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                {website.domain}
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

          <div className="space-y-5 p-5">
            <div>
              <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                Instruction
              </p>

              <p className="text-sm text-[#d1d5db]">
                {hasFullApiKey ? (
                  <>
                    Paste this script inside{' '}
                    <code className="font-mono text-white">&lt;head&gt;</code> of your website.
                  </>
                ) : (
                  <>
                    This API key is hidden for security reasons and cannot be viewed again.
                    Regenerate a new key if you need to reinstall tracking.
                  </>
                )}
              </p>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                Project Key
              </p>

              <div className="border border-[#1a1a1a] bg-[#111111]">
                <div className="overflow-x-auto border-b border-[#1a1a1a] p-3">
                  <code className="font-mono text-sm text-white whitespace-nowrap">
                    {apiKey ?? 'No API key available'}
                  </code>
                </div>

                {hasFullApiKey && (
                  <div className="flex justify-end p-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (apiKey) {
                          onCopyKey(apiKey);
                        }
                      }}
                      className="flex items-center gap-2 px-2 py-1 text-xs font-mono uppercase tracking-widest text-[#d1d5db] hover:text-white"
                    >
                      <Copy className="h-3.5 w-3.5" />

                      <span>{copiedKey === `key-${website.id}` ? 'Copied' : 'Copy Key'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {hasFullApiKey && apiKey && (
              <div className="rounded border border-yellow-500/30 bg-yellow-500/10 p-3">
                <p className="text-xs font-medium text-yellow-400">Save this API key now.</p>

                <p className="mt-1 text-xs text-yellow-200/80">
                  For security reasons, this key will only be shown once. After you close this
                  window, you won't be able to view it again.
                </p>
              </div>
            )}

            {hasFullApiKey && apiKey && (
              <div>
                <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                  Script Snippet
                </p>

                <div className="border border-[#1a1a1a] bg-[#111111] p-4">
                  <pre className="overflow-x-auto whitespace-pre-wrap text-sm text-[#d1d5db]">
                    {buildTrackingScript(apiKey)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#1a1a1a] p-5">
            {hasFullApiKey ? (
              <button
                type="button"
                onClick={() => {
                  if (apiKey) {
                    onCopyScript(apiKey);
                  }
                }}
                className="flex h-10 items-center gap-2 border border-[#1a1a1a] px-4 text-xs font-mono uppercase tracking-widest text-[#d1d5db] transition-colors hover:bg-[#111111]"
              >
                <Copy className="h-3.5 w-3.5" />

                <span>{copiedKey === `script-${website.id}` ? 'Copied' : 'Copy Script'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onRegenerateApiKey}
                className="flex h-10 items-center gap-2 border border-[#1a1a1a] hover:border-[#22c55e]/50 hover:text-green-400 px-4 text-xs font-mono uppercase tracking-widest text-white transition-colors hover:bg-[#111111]"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>Regenerate API Key</span>
              </button>
            )}
          </div>
        </div>
      ) : null}
    </WebsitesModalShell>
  );
}
