'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AccountActionsSection } from '@/components/settings/account-actions-section';
import { AccountSettingsSection } from '@/components/settings/account-settings-section';
import { DangerZoneSection } from '@/components/settings/danger-zone-section';
import { PreferencesSettingsSection } from '@/components/settings/preferences-settings-section';
import { SecuritySettingsSection } from '@/components/settings/security-settings-section';
import { useSession } from '@/hooks/auth/use-session';

type SettingsState = {
  name: string;
  email: string;
  preferences: {
    emailNotifications: boolean;
    weeklySummary: boolean;
    productUpdates: boolean;
  };
};

const initialSettings: SettingsState = {
  name: 'Ansab',
  email: 'ansab@email.com',
  preferences: {
    emailNotifications: true,
    weeklySummary: false,
    productUpdates: true,
  },
};

const pageVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [settings, setSettings] = useState<SettingsState>(() => ({
    ...initialSettings,
    name: user?.name ?? initialSettings.name,
    email: user?.email ?? initialSettings.email,
  }));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [passwordNotice, setPasswordNotice] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);

  const passwordsMatch =
    newPassword.length > 0 && confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordReady =
    currentPassword.trim().length > 0 &&
    newPassword.trim().length >= 8 &&
    confirmPassword.trim().length > 0 &&
    passwordsMatch;

  useEffect(() => {
    if (!saveNotice) return;
    const timeout = window.setTimeout(() => setSaveNotice(null), 1500);
    return () => window.clearTimeout(timeout);
  }, [saveNotice]);

  useEffect(() => {
    if (!passwordNotice) return;
    const timeout = window.setTimeout(() => setPasswordNotice(null), 1800);
    return () => window.clearTimeout(timeout);
  }, [passwordNotice]);

  useEffect(() => {
    if (!deleteNotice) return;
    const timeout = window.setTimeout(() => setDeleteNotice(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [deleteNotice]);

  function handleSaveAccount() {
    setSaveNotice('Changes saved');
  }

  function handleChangePassword() {
    if (!passwordReady) {
      setPasswordNotice(
        !passwordsMatch && confirmPassword.length > 0
          ? 'New password and confirmation must match'
          : 'Enter current password and use at least 8 characters',
      );
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordNotice('Password updated');
  }

  function handleStartDelete() {
    setDeleteNotice(null);
    setIsDeleteConfirming(true);
  }

  function handleCancelDelete() {
    setDeleteConfirm('');
    setDeleteNotice(null);
    setIsDeleteConfirming(false);
  }

  function handleDeleteAccount() {
    if (deleteConfirm !== 'DELETE') {
      setDeleteNotice('Type "DELETE" to confirm');
      return;
    }

    setDeleteConfirm('');
    setIsDeleteConfirming(false);
    setDeleteNotice(
      'Account deletion confirmed. Wire this action to your backend before production.',
    );
  }

  const topStats = [
    {
      label: 'Profile',
      value: settings.name || 'Pending',
      detail: settings.email,
    },
    {
      label: 'Notifications',
      value: Object.values(settings.preferences).filter(Boolean).length,
      detail: 'enabled preferences',
    },
    {
      label: 'Security',
      value: isDeleteConfirming ? 'Attention' : 'Protected',
      detail: isDeleteConfirming ? 'delete confirmation open' : 'account access stable',
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={pageVariants}
      className="flex min-h-screen w-full flex-col gap-4 pb-12 text-white"
    >
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {topStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={sectionVariants}
            whileHover={{ y: -4, borderColor: '#2a2a2a' }}
            transition={{ duration: 0.2 }}
            className="flex min-h-28 flex-col justify-between border border-[#1a1a1a] bg-[#0a0a0a] p-5"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#888888]">
              {stat.label}
            </span>
            <span className="truncate text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {stat.value}
            </span>
            <span className="truncate text-xs font-mono tracking-widest text-[#666666]">
              {stat.detail}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={sectionVariants}>
        <div>
          <h1 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white">
            Settings
          </h1>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
            Personal account settings, security controls, and communication preferences.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]">
        <div className="flex min-w-0 flex-col gap-4">
          <motion.div variants={sectionVariants}>
            <AccountSettingsSection
              name={settings.name}
              email={settings.email}
              saveNotice={saveNotice}
              onNameChange={(value) => setSettings((current) => ({ ...current, name: value }))}
              onEmailChange={(value) => setSettings((current) => ({ ...current, email: value }))}
              onSave={handleSaveAccount}
            />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <SecuritySettingsSection
              currentPassword={currentPassword}
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              passwordNotice={passwordNotice}
              passwordsMatch={passwordsMatch}
              passwordReady={passwordReady}
              onCurrentPasswordChange={setCurrentPassword}
              onNewPasswordChange={setNewPassword}
              onConfirmPasswordChange={setConfirmPassword}
              onChangePassword={handleChangePassword}
            />
          </motion.div>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <motion.div variants={sectionVariants}>
            <PreferencesSettingsSection
              preferences={settings.preferences}
              onPreferenceChange={(key, value) =>
                setSettings((current) => ({
                  ...current,
                  preferences: { ...current.preferences, [key]: value },
                }))
              }
            />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <AccountActionsSection />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <DangerZoneSection
              isDeleteConfirming={isDeleteConfirming}
              deleteConfirm={deleteConfirm}
              deleteNotice={deleteNotice}
              onDeleteConfirmChange={setDeleteConfirm}
              onStartDelete={handleStartDelete}
              onCancelDelete={handleCancelDelete}
              onConfirmDelete={handleDeleteAccount}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
