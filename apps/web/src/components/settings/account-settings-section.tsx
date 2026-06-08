"use client";

import { Check } from "lucide-react";
import { SettingsActionButton } from "@/components/settings/settings-action-button";
import { SettingsField } from "@/components/settings/settings-field";
import { SettingsSection } from "@/components/settings/settings-section";

export function AccountSettingsSection({
  name,
  email,
  saveNotice,
  onNameChange,
  onEmailChange,
  onSave,
}: {
  name: string;
  email: string;
  saveNotice: string | null;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSave: () => void;
}) {
  return (
    <SettingsSection title="Account" description="Basic profile information for your user account.">
      <div className="grid gap-4 md:grid-cols-2">
        <SettingsField label="Name" value={name} onChange={onNameChange} />
        <SettingsField label="Email" value={email} onChange={onEmailChange} />
      </div>
      <div className="flex flex-col gap-3 border-t border-[#1a1a1a] pt-4 md:flex-row md:items-center md:justify-between">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#666666]">
          {saveNotice ?? "Update your account profile details"}
        </p>
        <SettingsActionButton onClick={onSave}>
          {saveNotice ? <Check className="h-3.5 w-3.5" /> : null}
          <span>{saveNotice ? "Saved" : "Save Changes"}</span>
        </SettingsActionButton>
      </div>
    </SettingsSection>
  );
}
