import { DocsHeader } from '@/components/docs/docs-header';
import { DocsSidebar } from '@/components/docs/docs-sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <DocsHeader />

      <div className="flex max-w-7xl md:w-full mx-auto">
        <DocsSidebar />

        <main className="min-w-0 flex-1">
          <div className="w-full px-4 py-6 md:px-8 md:py-10 lg:px-12">{children}</div>
        </main>
      </div>
    </div>
  );
}
