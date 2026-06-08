'use client';

import { Copy, X } from 'lucide-react';
import { type Website } from '@/components/websites/types';
import { WebsitesModalShell } from '@/components/websites/websites-modal-shell';

function buildTrackingScript(apiKey: string) {
  return `<script src="https://cdn.tracpy.com/script.js" data-key="${apiKey}"></script>`;
}

export function WebsitesSetupModal({
  website,
  apiKey,
  copiedKey,
  onClose,
  onCopyKey,
  onCopyScript,
}: {
  website: Website | null;
  apiKey: string | null;
  copiedKey: string | null;
  onClose: () => void;
  onCopyKey: (apiKey: string) => void;
  onCopyScript: (apiKey: string) => void;
}) {
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
                Paste this script inside <code className="font-mono text-white">&lt;head&gt;</code>{' '}
                of your website.
              </p>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                Project Key
              </p>
              <div className="flex items-center justify-between border border-[#1a1a1a] bg-[#111111] px-3 py-3">
                <code className="text-sm text-white">{apiKey ?? 'No API key available'}</code>
                <button
                  type="button"
                  onClick={() => {
                    if (apiKey) {
                      onCopyKey(apiKey);
                    }
                  }}
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d1d5db]"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copiedKey === `key-${website.id}` ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                Script Snippet
              </p>
              <div className="border border-[#1a1a1a] bg-[#111111] p-4">
                <pre className="overflow-x-auto whitespace-pre-wrap text-sm text-[#d1d5db]">
                  {buildTrackingScript(apiKey ?? 'No API key available')}
                </pre>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#1a1a1a] p-5">
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
          </div>
        </div>
      ) : null}
    </WebsitesModalShell>
  );
}
