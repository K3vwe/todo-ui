"use client";

import ProfileHeader from "../ProfileHeader";
import { Settings, LayoutDashboard, ClipboardList } from "lucide-react";
import AuthTrigger from "../auth/AuthTrigger";
import { useAuth } from "../auth/useAuth";

interface SidebarProps {
  activeCategory?: string;
  onSelect: (category: string) => void;
  className?: string;
}

export default function Sidebar({ activeCategory, onSelect }: SidebarProps) {
  const { user, openLoginModal } = useAuth();

  // helper for guest-protected navigation
  const handleSelect = (category: string) => {
    if (!user) {
      openLoginModal?.(); // prompt login/signup
      return;
    }
    onSelect(category);
  };

  return (
    <aside className="col-span-12 md:col-span-3 h-full flex flex-col bg-(--sidebar-bg) text-(--sidebar-text) transition-colors duration-300">
      <div className="flex flex-col h-full border-r border-(--secondary)">

        {/* =======================
           Sticky Profile Header
        ======================= */}
        <div className="sticky top-0 z-10 bg-(--sidebar-bg) px-3 py-3 shadow-sm">
          <ProfileHeader
            name={user?.name || "Guest"}
            email={user?.email || "Not signed in"}
            profileImageUrl=""
          />
        </div>

        {/* =======================
           Scrollable Navigation
        ======================= */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-3 space-y-2
          scrollbar-thin scrollbar-thumb-(--accent)/50 
          scrollbar-track-(--sidebar-bg) scrollbar-thumb-rounded-md"
        >
          <SidebarItem
            label="Dashboard"
            icon={<LayoutDashboard size={20} />}
            active={activeCategory === "Dashboard"}
            onClick={() => handleSelect("Dashboard")}
          />

          <SidebarItem
            label="Tasks"
            icon={<ClipboardList size={16} />}
            active={activeCategory === "Tasks"}
            onClick={() => handleSelect("Tasks")}
          />
        </nav>

        {/* =======================
           Sticky Footer
        ======================= */}
        <div className="sticky bottom-0 z-10 bg-(--sidebar-bg) px-3 py-3 border-t border-(--secondary) shadow-sm space-y-2">

          {/* Settings */}
          <SidebarItem
            label="Settings"
            icon={<Settings size={20} />}
            active={activeCategory === "Settings"}
            onClick={() => handleSelect("Settings")}
          />

          {/* Divider */}
          <div className="border-t border-(--secondary) my-2" />

          {/* Auth Section */}
          <AuthTrigger SidebarItem={SidebarItem} />
        </div>
      </div>
    </aside>
  );
}

/* =======================
   Sidebar Item Component
======================= */
function SidebarItem({
  label,
  icon,
  count,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        relative flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors
        ${active ? "bg-(--accent)/30 font-semibold" : "hover:bg-(--sidebar-hover)"}
      `}
    >
      <span className="shrink-0">{icon}</span>
      <span className="text-sm truncate">{label}</span>

      {count !== undefined && count > 0 && (
        <span className="ml-auto text-xs bg-(--secondary)/30 px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}

      {active && (
        <span className="absolute left-0 h-full w-1.5 bg-(--accent) rounded-r-md shadow-md" />
      )}
    </div>
  );
}