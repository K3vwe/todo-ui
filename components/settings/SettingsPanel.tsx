"use client";

import dynamic from "next/dynamic";

// Lazy-load settings components
const ThemeSettings = dynamic(() => import("./ThemeSettings"));
const NotificationsSettings = dynamic(() => import("./NotificationsSettings"));
const PrivacySettings = dynamic(() => import("./PrivacySettings"));
const AccountSettings = dynamic(() => import("./AccountSettings"));

interface Section {
  label: string;
  component: React.ReactNode;
}

export default function SettingsPanel() {
  const sections: Section[] = [
    { label: "Theme", component: <ThemeSettings /> },
    { label: "Notifications", component: <NotificationsSettings /> },
    { label: "Privacy", component: <PrivacySettings /> },
    { label: "Account", component: <AccountSettings /> },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 scrollbar-thin scrollbar-thumb-[var(--secondary)] scrollbar-track-transparent">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>

      {sections.map((section) => (
        <div key={section.label} className="mb-4 border rounded-md overflow-hidden">
          <div className="px-4 py-3 bg-white">
            <h3 className="font-medium mb-2">{section.label}</h3>
            {section.component}
          </div>
        </div>
      ))}
    </div>
  );
}
