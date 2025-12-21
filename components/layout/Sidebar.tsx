import ProfileHeader from "../ProfileHeader";
import categories from "@/data/categories";
import ThemeToggle from "../ThemeToggle";

interface SidebarProps {
  activeCategory?: string;
}

export default function Sidebar({ activeCategory }: SidebarProps) {
  return (
    <aside className="col-span-12 md:col-span-3 h-full bg-gray-100 dark:bg-gray-900">
      <div
        className="
          sticky top-0 h-full
          bg-white/80 dark:bg-gray-800/80
          backdrop-blur-md
          border-r border-gray-200 dark:border-gray-700
          flex flex-col
        "
      >
        {/* Profile */}
        <ProfileHeader
          name="Jhoan Deo"
          email="jhoandee@gmail.com"
          profileImageUrl=""
        />

        {/* Categories */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-400/60 dark:scrollbar-thumb-gray-600/60 scrollbar-track-transparent">
          {categories.map(({ icon, label, count }) => {
            const isActive = activeCategory === label;
            return (
              <div
                key={label}
                className={`
                  flex items-center justify-between px-3 py-1.5 cursor-pointer transition-colors relative
                  ${isActive 
                    ? "bg-white/30 dark:bg-gray-700/70 font-semibold" 
                    : "hover:bg-white/20 dark:hover:bg-gray-700/50 rounded-md"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span>{icon}</span>
                  <span className="text-sm">{label}</span>
                </div>
                {count > 0 && (
                  <span className="text-xs bg-gray-300/80 dark:bg-gray-600/80 px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
                {isActive && (
                  <span className="absolute left-0 h-full w-2 bg-blue-500 rounded-r-md shadow-lg" />
                )}
              </div>
            );
          })}
        </div>

        {/* Theme toggle */}
        <div className="flex justify-end py-3 px-3 border-t border-gray-200 dark:border-gray-700">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
