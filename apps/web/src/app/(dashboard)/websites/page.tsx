'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, type Variants } from 'motion/react';

import { WebsitesAddModal } from '@/components/websites/websites-add-modal';
import { WebsitesCardGrid } from '@/components/websites/websites-card-grid';
import { WebsitesEmptyState } from '@/components/websites/websites-empty-state';
import { WebsitesPageHeader } from '@/components/websites/websites-page-header';
import { WebsitesSetupModal } from '@/components/websites/websites-setup-modal';
import { WebsitesStatsGrid } from '@/components/websites/websites-stats-grid';

import { useWebsites } from '@/hooks/use-websites';
import { createWebsite, deleteWebsite, getApiKeys, rotateApiKey } from '@/services/website.service';

const pageVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function WebsitesPage() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { data: websites = [], refetch } = useWebsites();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [setupWebsiteId, setSetupWebsiteId] = useState<string | null>(null);

  const [nameInput, setNameInput] = useState('');
  const [domainInput, setDomainInput] = useState('');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [websiteApiKey, setWebsiteApiKey] = useState<string | null>(null);

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

  const setupWebsite = useMemo(
    () => websites.find((website) => website.id === setupWebsiteId) ?? null,
    [setupWebsiteId, websites],
  );

  async function handleCreateWebsite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!domainInput.trim()) {
      return;
    }

    await createWebsite({
      name: nameInput.trim() || domainInput.trim(),
      domain: domainInput.trim(),
    });

    await refetch();

    setNameInput('');
    setDomainInput('');
    setIsAddModalOpen(false);
  }

  async function handleDeleteWebsite(websiteId: string) {
    await deleteWebsite(websiteId);

    await refetch();

    setOpenMenuId(null);

    if (setupWebsiteId === websiteId) {
      setSetupWebsiteId(null);
    }
  }

  const topStats = [
    {
      label: 'Projects',
      value: websites.length,
      detail: 'connected websites',
    },
  ];

  async function handleRotateApiKey(websiteId: string) {
    try {
      const keys = await getApiKeys(websiteId);

      const activeKey = keys.find((key) => key.isActive);

      if (!activeKey) {
        return;
      }

      const rotated = await rotateApiKey(activeKey.id);

      await navigator.clipboard.writeText(rotated.key);

      setCopiedKey(websiteId);
      setOpenMenuId(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleApiKeys(websiteId: string) {
    setSetupWebsiteId(websiteId);

    try {
      const keys = await getApiKeys(websiteId);

      console.log(keys)

      setWebsiteApiKey(keys[0]?.key ?? null);
    } catch (error) {
      console.error(error);
      setWebsiteApiKey(null);
    }
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="show"
        variants={pageVariants}
        className="flex min-h-screen w-full flex-col gap-4 bg-[#0a0a0a] pb-10 text-white"
      >
        <WebsitesStatsGrid stats={topStats} variants={pageVariants} />

        <WebsitesPageHeader
          onAddWebsite={() => setIsAddModalOpen(true)}
          variants={{
            hidden: {
              opacity: 0,
              y: 18,
            },
            show: {
              opacity: 1,
              y: 0,
            },
          }}
        />

        {websites.length === 0 ? (
          <WebsitesEmptyState
            onAddWebsite={() => setIsAddModalOpen(true)}
            variants={{
              hidden: {
                opacity: 0,
                y: 18,
              },
              show: {
                opacity: 1,
                y: 0,
              },
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
            onViewAnalytics={(website) => router.push(`/overview?website=${website.id}`)}
            onViewEvents={(website) => router.push(`/events?website=${website.id}`)}
            onCopyScript={() => {}}
            onRegenerateApiKey={handleRotateApiKey}
            onDeleteWebsite={handleDeleteWebsite}
            onOpenSetup={handleApiKeys}
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
        apiKey={websiteApiKey}
        copiedKey={copiedKey}
        onClose={() => {
          setSetupWebsiteId(null);
          setWebsiteApiKey(null);
        }}
        onCopyKey={async () => {
          if (!websiteApiKey) return;

          await navigator.clipboard.writeText(websiteApiKey);

          setCopiedKey(`key-${setupWebsite?.id}`);
        }}
        onCopyScript={async () => {
          if (!websiteApiKey) return;

          const script = `<script src="https://cdn.traqory.com/script.js" data-key="${websiteApiKey}"></script>`;

          await navigator.clipboard.writeText(script);

          setCopiedKey(`script-${setupWebsite?.id}`);
        }}
      />
    </>
  );
}
