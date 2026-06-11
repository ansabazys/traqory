'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { WebsitesAddModal } from '@/components/websites/websites-add-modal';
import { WebsitesCardGrid } from '@/components/websites/websites-card-grid';
import { WebsitesEmptyState } from '@/components/websites/websites-empty-state';
import { WebsitesPageHeader } from '@/components/websites/websites-page-header';
import { WebsitesSetupModal } from '@/components/websites/websites-setup-modal';
import { WebsitesStatsGrid } from '@/components/websites/websites-stats-grid';

import { useWebsites } from '@/hooks/websites/use-websites';
import { useCreateWebsite } from '@/hooks/websites/use-create-website';
import { useDeleteWebsite } from '@/hooks/websites/use-delete-website';
import { WebsitesRegenerateApiKeyModal } from '@/components/websites/websites-regenerate-modal';
import { Website } from '@/components/websites/types';
import { useRotateApiKey } from '@/hooks/websites/use-rotate-api-key';
import { WebsitesDeleteModal } from '@/components/websites/websites-delete-modal';

const pageVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function formatCompactNumber(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return String(value);
}

export default function WebsitesPage() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { data: websites = [], refetch, isFetching } = useWebsites();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [setupWebsiteId, setSetupWebsiteId] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState('');
  const [domainInput, setDomainInput] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [generatedApiKey, setGeneratedApiKey] = useState<{
    websiteId: string;
    key: string;
  } | null>(null);
  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
  const [deleteWebsite, setDeleteWebsite] = useState<Website | null>(null);

  const createWebsiteMutation = useCreateWebsite();

  const deleteWebsiteMutation = useDeleteWebsite();

  const rotateApiKeyMutation = useRotateApiKey();

  const [regenerateWebsite, setRegenerateWebsite] = useState<Website | null>(null);

  useEffect(() => {
    if (!copiedKey) return;
    const timeout = window.setTimeout(() => setCopiedKey(null), 1600);
    return () => window.clearTimeout(timeout);
  }, [copiedKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totals = useMemo(() => {
    const totalEvents = websites.reduce((sum, website) => sum + website.events24h, 0);
    const activeCount = websites.filter((website) => website.status === 'ACTIVE').length;

    const noDataCount = websites.filter((website) => website.status === 'PENDING').length;

    return {
      totalEvents,
      activeCount,
      noDataCount,
    };
  }, [websites]);

  const setupWebsite = useMemo(
    () => websites.find((website) => website.id === setupWebsiteId) ?? null,
    [setupWebsiteId, websites],
  );

  // const { data: apiKeys = [] } = useApiKeys(setupWebsite?.id);

  const currentApiKey =
    generatedApiKey?.websiteId === setupWebsite?.id
      ? generatedApiKey?.key
      : (setupWebsite?.apiKey ?? null);

  async function handleCreateWebsite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!domainInput.trim()) {
      return;
    }

    const website = await createWebsiteMutation.mutateAsync({
      name: nameInput.trim() || domainInput.trim(),
      domain: domainInput.trim(),
    });

    if (website.apiKey) {
      setGeneratedApiKey({
        websiteId: website.id,
        key: website.apiKey,
      });

      setSetupWebsiteId(website.id);
    }

    setNameInput('');
    setDomainInput('');
    setIsAddModalOpen(false);
  }
  function handleCopyScript() {
    setOpenMenuId(null);
  }
  function handleRegenerateApiKey() {
    setOpenMenuId(null);
  }

  const topStats = [
    { label: 'Projects', value: websites.length, detail: `${totals.activeCount} active` },
    {
      label: 'Events / 24h',
      value: formatCompactNumber(totals.totalEvents),
      detail: 'all websites',
    },
    { label: 'No Data', value: totals.noDataCount, detail: 'needs setup' },
  ];

  return (
    <>
      <motion.div
        initial="hidden"
        animate="show"
        variants={pageVariants}
        className="flex min-h-screen w-full flex-col gap-4 pb-10 text-white"
      >
        <WebsitesStatsGrid stats={topStats} variants={pageVariants} />
        <WebsitesPageHeader
          onAddWebsite={() => setIsAddModalOpen(true)}
          onRefresh={() => refetch()}
          isRefreshing={isFetching}
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
          }}
        />

        {websites.length === 0 ? (
          <WebsitesEmptyState
            onAddWebsite={() => setIsAddModalOpen(true)}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
            }}
          />
        ) : (
          <WebsitesCardGrid
            websites={websites}
            copiedKey={copiedKey}
            openMenuId={openMenuId}
            menuRef={menuRef}
            onToggleMenu={(websiteId) =>
              setOpenMenuId((current) => (current === websiteId ? null : websiteId))
            }
            onViewAnalytics={(website) => router.push(`/analytics?website=${website.id}`)}
            onViewEvents={(website) => router.push(`/events?website=${website.id}`)}
            onCopyScript={handleCopyScript}
            onRegenerateApiKey={handleRegenerateApiKey}
            onDeleteWebsite={(websiteId) => {
              const website = websites.find((w) => w.id === websiteId);

              if (website) {
                setDeleteWebsite(website);
              }

              setOpenMenuId(null);
            }}
            onOpenSetup={setSetupWebsiteId}
            variants={pageVariants}
          />
        )}
      </motion.div>

      <WebsitesAddModal
        open={isAddModalOpen}
        nameInput={nameInput}
        domainInput={domainInput}
        onClose={() => setIsAddModalOpen(false)}
        onNameChange={setNameInput}
        onDomainChange={setDomainInput}
        onSubmit={handleCreateWebsite}
      />

      <WebsitesSetupModal
        website={setupWebsite}
        apiKey={currentApiKey ?? ''}
        isNewKey={generatedApiKey?.websiteId === setupWebsite?.id}
        copiedKey={copiedKey}
        onClose={() => {
          setGeneratedApiKey(null);
          setSetupWebsiteId(null);
        }}
        onCopyKey={(apiKey) => {
          navigator.clipboard.writeText(apiKey);
          setCopiedKey(`key-${setupWebsite?.id}`);
        }}
        onCopyScript={(apiKey) => {
          navigator.clipboard.writeText(
            `<script src="https://cdn.tracpy.com/script.js" data-key="${apiKey}"></script>`,
          );
          setCopiedKey(`script-${setupWebsite?.id}`);
        }}
        onRegenerateApiKey={() => {
          if (!setupWebsite) return;

          setRegenerateWebsite(setupWebsite);

          setSetupWebsiteId(null); // close setup modal

          setIsRegenerateModalOpen(true);
        }}
      />

      <WebsitesRegenerateApiKeyModal
        open={isRegenerateModalOpen}
        websiteName={regenerateWebsite?.name}
        onClose={() => {
          setRegenerateWebsite(null);
          setIsRegenerateModalOpen(false);
        }}
        onConfirm={async () => {
          if (!regenerateWebsite?.apiKeyId) return;

          try {
            const response = await rotateApiKeyMutation.mutateAsync({
              apiKeyId: regenerateWebsite.apiKeyId,
              websiteId: regenerateWebsite.id,
            });

            setGeneratedApiKey({
              websiteId: regenerateWebsite.id,
              key: response.key,
            });

            setIsRegenerateModalOpen(false);
            setSetupWebsiteId(regenerateWebsite.id);
            setRegenerateWebsite(null);
          } catch (error) {
            console.error(error);
          }
        }}
        isPending={rotateApiKeyMutation.isPending}
      />

      <WebsitesDeleteModal
        open={Boolean(deleteWebsite)}
        websiteName={deleteWebsite?.name}
        isPending={deleteWebsiteMutation.isPending}
        onClose={() => {
          setDeleteWebsite(null);
        }}
        onConfirm={async () => {
          if (!deleteWebsite) {
            return;
          }

          try {
            await deleteWebsiteMutation.mutateAsync(deleteWebsite.id);

            if (setupWebsiteId === deleteWebsite.id) {
              setSetupWebsiteId(null);
            }

            setDeleteWebsite(null);
          } catch (error) {
            console.error(error);
          }
        }}
      />
    </>
  );
}
