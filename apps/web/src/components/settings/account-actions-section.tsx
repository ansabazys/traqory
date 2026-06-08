"use client";

import { LogOut, ShieldAlert } from "lucide-react";
import { SettingsActionButton } from "@/components/settings/settings-action-button";
import { SettingsSection } from "@/components/settings/settings-section";

export function AccountActionsSection() {
  return (
    <SettingsSection
      title="Account Actions"
      description="Quick sign-out actions for this account and other active sessions."
    >
      <div className="flex flex-col gap-3 border-b border-[#1a1a1a] pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-[#f3f4f6]">Logout</p>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
            End your current session on this device.
          </p>
        </div>
        <SettingsActionButton>
          <LogOut className="h-3.5 w-3.5" />
          <span>Logout</span>
        </SettingsActionButton>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-[#f3f4f6]">Sign Out Of All Devices</p>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
            Invalidate active sessions across all logged-in devices.
          </p>
        </div>
        <SettingsActionButton>
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>Sign Out All</span>
        </SettingsActionButton>
      </div>
    </SettingsSection>
  );
}
