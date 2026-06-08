"use client";

import { AnimatePresence, motion } from "motion/react";
import { ShieldAlert, Trash2 } from "lucide-react";
import { SettingsActionButton } from "@/components/settings/settings-action-button";
import { SettingsField } from "@/components/settings/settings-field";
import { SettingsSection } from "@/components/settings/settings-section";

export function DangerZoneSection({
  isDeleteConfirming,
  deleteConfirm,
  deleteNotice,
  onDeleteConfirmChange,
  onStartDelete,
  onCancelDelete,
  onConfirmDelete,
}: {
  isDeleteConfirming: boolean;
  deleteConfirm: string;
  deleteNotice: string | null;
  onDeleteConfirmChange: (value: string) => void;
  onStartDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}) {
  const noticeClassName =
    deleteNotice && deleteNotice.startsWith("Account deletion confirmed")
      ? "text-red-400"
      : deleteNotice
        ? "text-red-400"
        : "text-[#666666]";

  return (
    <SettingsSection
      title="Danger Zone"
      description="This action is permanent and should only be used with care."
      danger
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm text-[#f3f4f6]">Delete Account</p>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
            Permanently remove your account, preferences, and access.
          </p>
        </div>
        <SettingsActionButton tone="danger" onClick={onStartDelete}>
          <Trash2 className="h-3.5 w-3.5" />
          <span>Delete Account</span>
        </SettingsActionButton>
      </div>

      <AnimatePresence initial={false}>
        {isDeleteConfirming ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-[#1a1a1a] pt-4">
              <div className="border border-[#1a1a1a] p-3">
                <SettingsField
                  label='Type "DELETE" to confirm'
                  value={deleteConfirm}
                  onChange={onDeleteConfirmChange}
                  placeholder="DELETE"
                />
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <SettingsActionButton onClick={onCancelDelete}>
                  <span>Cancel</span>
                </SettingsActionButton>
                <SettingsActionButton tone="danger" onClick={onConfirmDelete}>
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Confirm Delete</span>
                </SettingsActionButton>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {deleteNotice ? (
        <p className={`text-[10px] font-mono uppercase tracking-widest ${noticeClassName}`}>
          {deleteNotice}
        </p>
      ) : null}
    </SettingsSection>
  );
}
