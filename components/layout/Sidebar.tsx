"use client";

import ProfileHeader from "../ProfileHeader";
import categories from "@/data/categories";
import ThemeToggle from "../ThemeToggle";

interface SidebarProps {
  activeCategory?: string;
}

export default function Sidebar({ activeCategory }: SidebarProps) {
  return (
    <aside
      className="
        col-span-12 md:col-span-3 h-full flex flex-col
        bg-(--sidebar-bg) text-(--sidebar-text)
        transition-colors duration-300
      "
    >
      <div className="sticky top-0 h-full flex flex-col backdrop-blur-md border-r border-(--secondary)">
        {/* Profile */}
        <ProfileHeader
          name="Jhoan Deo"
          email="jhoandee@gmail.com"
          profileImageUrl=""
        />

        {/* Categories */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1 scrollbar-thin scrollbar-thumb-[var(--secondary)]/60 scrollbar-track-transparent">
          {categories.map(({ icon, label, count }) => {
            const isActive = activeCategory === label;
            return (
              <div
                key={label}
                className={`
                  flex items-center justify-between px-3 py-1.5 cursor-pointer transition-colors relative
                  ${isActive 
                    ? "bg-(--accent)/50 font-semibold rounded-md" 
                    : "hover:bg-(--sidebar-hover) rounded-md"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span>{icon}</span>
                  <span className="text-sm">{label}</span>
                </div>
                {count > 0 && (
                  <span className="text-xs bg-(--secondary)/30 px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
                {isActive && (
                  <span className="absolute left-0 h-full w-1.5 bg-(--accent) rounded-r-md shadow-md" />
                )}
              </div>
            );
          })}
        </div>

        {/* Theme toggle */}
        <div className="flex justify-end py-3 px-3 border-t border-(--secondary)">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
