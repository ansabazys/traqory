import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { CodeBlock } from '@/components/docs/code-block';

export default function InstallSDKPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#666666]">
          Step 02
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-white">Install the SDK</h1>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#888888]">
          Install the Traqory SDK into your application using your preferred package manager.
        </p>
      </div>

      {/* PNPM */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-white">Using PNPM</h2>

        <CodeBlock title="Terminal" code={`pnpm add @traqory/sdk`} codeClassName="text-[#86efac]" />
      </section>

      {/* NPM */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-white">Using NPM</h2>

        <CodeBlock
          title="Terminal"
          code={`npm install @traqory/sdk`}
          codeClassName="text-[#86efac]"
        />
      </section>

      {/* Yarn */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Using Yarn</h2>

        <CodeBlock title="Terminal" code={`yarn add @traqory/sdk`} codeClassName="text-[#86efac]" />
      </section>

      {/* Verify */}
      <section className="mb-10 border border-[#1a1a1a] bg-[#050505] p-5">
        <h2 className="mb-3 text-lg font-semibold text-white">Verify Installation</h2>

        <p className="mb-4 text-sm text-[#888888]">
          Once installed, you should see the package listed inside your dependencies.
        </p>

        <CodeBlock
          title="package.json"
          code={`{
  "dependencies": {
    "@traqory/sdk": "^1.0.0"
  }
}`}
        />
      </section>

      {/* Next Step */}
      <section className="mb-10 border border-[#14532d] bg-[#052e16] p-5">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-[#86efac]">
          Next Step
        </h2>

        <p className="text-sm text-[#bbf7d0]">
          Now that the SDK is installed, let's initialize Traqory when your application starts.
        </p>
      </section>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-8">
        <Link
          href="/docs/getting-started/create-website"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#888888] transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Create Website
        </Link>

        <Link
          href="/docs/getting-started/create-provider"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#86efac] transition-colors hover:text-white"
        >
          Create Provider
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
