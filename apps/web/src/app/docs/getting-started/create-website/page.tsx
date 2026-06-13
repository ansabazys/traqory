import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function CreateWebsitePage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#666666]">
          Step 01
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Create Your First Website
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#888888]">
          Before integrating the SDK, create a website project and securely copy your API
          credentials.
        </p>
      </div>

      {/* Step */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Open Websites</h2>

        <p className="mb-4 text-sm text-[#888888]">
          Navigate to the Websites page from the Traqory dashboard.
        </p>

        <div className="border border-[#1a1a1a] bg-[#050505] p-5 font-mono text-sm text-white">
          Dashboard
          <br />
          └── Websites
        </div>
      </section>

      {/* Screenshot */}
      {/* <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Create Website</h2>

        <p className="mb-4 text-sm text-[#888888]">
          Click the Add Website button and fill in your project details.
        </p>

        <div className="flex h-72 items-center justify-center border border-dashed border-[#1a1a1a] bg-[#050505]">
          <img src="/images/create-website.png" alt="Traqory Dashboard"className="w-full" />
        </div>
      </section> */}

      {/* API Modal */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Copy Your API Keys</h2>

        <p className="mb-6 text-sm text-[#888888]">
          After creating a website, Traqory automatically generates API credentials.
        </p>

        <div className="overflow-hidden border border-[#1a1a1a] bg-[#050505]">
          <div className="border-b border-[#1a1a1a] px-5 py-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white">
              API Keys Generated
            </h3>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#666666]">
                Website ID
              </div>

              <code className="text-sm text-white">ws_xxxxxxxxxxxxxxxxxxxxxx</code>
            </div>

            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#666666]">
                Public API Key
              </div>

              <code className="text-sm text-[#86efac]">trq_live_xxxxxxxxxxxxxxxxxxxxxx</code>
            </div>

            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#666666]">
                Endpoint
              </div>

              <code className="text-sm text-white">https://api.traqory.com/v1/events</code>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="mb-10 border border-[#14532d] bg-[#052e16] p-5">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-[#86efac]">
          Security Notice
        </h2>

        <p className="text-sm leading-relaxed text-[#bbf7d0]">API keys are displayed only once.</p>

        <p className="mt-3 text-sm leading-relaxed text-[#bbf7d0]">
          After closing the modal, the original key cannot be viewed again.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-[#bbf7d0]">
          Save your credentials before continuing.
        </p>
      </section>

      {/* Regenerate */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Lost Your Key?</h2>

        <p className="mb-4 text-sm text-[#888888]">Generate a new API key from website settings.</p>

        <div className="border border-[#1a1a1a] bg-[#050505] p-5 font-mono text-sm text-white">
          Website Settings
          <br />
          └── Regenerate API Key
        </div>
      </section>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-8">
        <Link
          href="/docs/getting-started"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#888888] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Getting Started
        </Link>

        <Link
          href="/docs/getting-started/install-sdk"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#86efac]"
        >
          Install SDK
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
