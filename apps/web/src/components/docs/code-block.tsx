'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

type CodeBlockProps = {
  title?: string;
  code: string;
  codeClassName?: string;
};

export function CodeBlock({ title = 'Code', code, codeClassName = 'text-white' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="overflow-hidden border border-[#1a1a1a] bg-[#050505]">
      <div className="flex items-center justify-between border-b border-[#1a1a1a] px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#666666]">
          {title}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[#666666] transition-colors hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#86efac]" />
              <span className="font-mono text-[10px] uppercase tracking-widest">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="font-mono text-[10px] uppercase tracking-widest">Copy</span>
            </>
          )}
        </button>
      </div>

      <pre className={`overflow-x-auto p-5 font-mono text-sm ${codeClassName}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
