"use client";

import dynamic from "next/dynamic";
import { useThemeContext } from "@/context/ThemeContext";

const ThemeSettings = dynamic(() => import("./ThemeSettings"));
const NotificationsSettings = dynamic(() => import("./NotificationsSettings"));
const PrivacySettings = dynamic(() => import("./PrivacySettings"));
const AccountSettings = dynamic(() => import("./AccountSettings"));

interface Section {
  label: string;
  component: React.ReactNode;
}

export default function SettingsPanel() {
  const { theme } = useThemeContext();
  const sections: Section[] = [
    { label: "Theme", component: <ThemeSettings /> },
    { label: "Notifications", component: <NotificationsSettings /> },
    { label: "Privacy", component: <PrivacySettings /> },
    { label: "Account", component: <AccountSettings /> },
  ];

  return (
    <div
      className={`
        flex-1 overflow-y-auto px-4 sm:px-6 py-4 scrollbar-thin scrollbar-thumb-(--accent)/50 scrollbar-track-transparent
        transition-colors duration-300
        ${theme === "dark" ? "bg-(--sidebar-bg) text-(--sidebar-text)" : "bg-(--background) text-(--foreground)"}
      `}
    >
      <h2 className="text-lg font-semibold mb-4">Settings</h2>

      {sections.map((section) => (
        <div
          key={section.label}
          className={`
            mb-4 rounded-md overflow-hidden
            transition-colors duration-300
            ${theme === "dark" ? "border-(--secondary)" : "border-(--secondary)/40"}
          `}
        >
          {/* Make the header look like a sidebar item */}
          <div
            className={`
              flex items-center px-3 py-2 cursor-pointer rounded-md transition-all duration-200
              ${theme === "dark" ? "hover:bg-(--sidebar-hover) bg-(--sidebar-bg) font-medium" : "hover:bg-(--sidebar-hover)/20 bg-(--background) font-medium"}
            `}
          >
            <span className="text-sm">{section.label}</span>
          </div>

          {/* Section content */}
          <div
            className={`
              px-4 py-3
              ${theme === "dark" ? "bg-(--sidebar-bg)" : "bg-(--background)"}
            `}
          >
            {section.component}
          </div>
        </div>
      ))}
    </div>
  );
}
