'use client';

import { Loader } from 'lucide-react';

import { useWebsiteState } from '@/hooks/websites/use-website-state';

type WebsiteGateProps = {
  children: React.ReactNode;
};

export function WebsiteGate({ children }: WebsiteGateProps) {
  const { isLoading, hasWebsites } = useWebsiteState();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#666666]">
          <Loader className="h-4 w-4 animate-spin" />
          Querying tracked websites...
        </div>
      </div>
    );
  }

  if (!hasWebsites) {
    return (
      <div className="flex h-[60vh] items-center justify-center border border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white">No Websites Yet</h2>

          <p className="mt-2 text-sm text-[#888888]">
            Create your first website to start collecting analytics.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
