"use client";

import { KeyRound, LogOut } from "lucide-react";
import { SettingsActionButton } from "@/components/settings/settings-action-button";
import { SettingsField } from "@/components/settings/settings-field";
import { SettingsSection } from "@/components/settings/settings-section";

export function SecuritySettingsSection({
  currentPassword,
  newPassword,
  confirmPassword,
  passwordNotice,
  passwordsMatch,
  passwordReady,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onChangePassword,
}: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  passwordNotice: string | null;
  passwordsMatch: boolean;
  passwordReady: boolean;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onChangePassword: () => void;
}) {
  const noticeClassName = passwordNotice
    ? passwordNotice === "Password updated"
      ? "text-emerald-400"
      : "text-red-400"
    : !passwordsMatch && confirmPassword.length > 0
      ? "text-red-400"
      : "text-[#666666]";

  const noticeText =
    passwordNotice ??
    (!passwordsMatch && confirmPassword.length > 0
      ? "Passwords do not match"
      : "Password changes require your current password");

  return (
    <SettingsSection
      title="Security"
      description="Manage password access and sign-out behavior for this account."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <SettingsField
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={onCurrentPasswordChange}
          placeholder="Current password"
        />
        <SettingsField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={onNewPasswordChange}
          placeholder="At least 8 characters"
        />
        <SettingsField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          placeholder="Repeat new password"
        />
      </div>
      <div className="flex flex-col gap-3 border-t border-[#1a1a1a] pt-4 md:flex-row md:items-center md:justify-between">
        <p className={`text-[10px] font-mono uppercase tracking-widest ${noticeClassName}`}>
          {noticeText}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <SettingsActionButton>
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout All Sessions</span>
          </SettingsActionButton>
          <SettingsActionButton onClick={onChangePassword} disabled={!passwordReady}>
            <KeyRound className="h-3.5 w-3.5" />
            <span>Change Password</span>
          </SettingsActionButton>
        </div>
      </div>
    </SettingsSection>
  );
}
