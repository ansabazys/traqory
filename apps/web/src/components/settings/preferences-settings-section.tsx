"use client";

import { SettingsSection } from "@/components/settings/settings-section";
import { SettingsToggleRow } from "@/components/settings/settings-toggle-row";

export function PreferencesSettingsSection({
  preferences,
  onPreferenceChange,
}: {
  preferences: {
    emailNotifications: boolean;
    weeklySummary: boolean;
    productUpdates: boolean;
  };
  onPreferenceChange: (
    key: "emailNotifications" | "weeklySummary" | "productUpdates",
    value: boolean,
  ) => void;
}) {
  return (
    <SettingsSection
      title="Preferences"
      description="Choose which account-level emails and updates you want to receive."
    >
      <SettingsToggleRow
        label="Email Notifications"
        description="Important alerts and account activity notices."
        checked={preferences.emailNotifications}
        onChange={(checked) => onPreferenceChange("emailNotifications", checked)}
      />
      <SettingsToggleRow
        label="Weekly Summary Emails"
        description="A compact weekly recap of your workspace activity."
        checked={preferences.weeklySummary}
        onChange={(checked) => onPreferenceChange("weeklySummary", checked)}
      />
      <SettingsToggleRow
        label="Product Updates"
        description="New features, improvements, and release notes from Tracpy."
        checked={preferences.productUpdates}
        onChange={(checked) => onPreferenceChange("productUpdates", checked)}
      />
    </SettingsSection>
  );
}
