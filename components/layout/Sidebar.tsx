import ProfileHeader from "../ProfileHeader";
import CategoryCard from "../CategoryCard";
import ThemeToggle from "../ThemeToggle";
import categories from "@/data/categories";

export default function Sidebar() {
  return (
    <aside className="col-span-12 md:col-span-3 h-full">
      <div className="
        sticky top-0 h-full
        bg-white/80 dark:bg-gray-800/80
        backdrop-blur-md
        border-r border-gray-200 dark:border-gray-700
        flex flex-col
      ">
        {/* Profile */}
        <div className="p-6">
          <ProfileHeader
            name="Jhoan Deo"
            email="jhoandee@gmail.com"
          />
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
            Categories
          </h2>
          <div className="space-y-2">
            {categories.map(({ icon, label, count }) => (
              <CategoryCard
                key={label}
                icon={icon}
                label={label}
                count={count}
              />
            ))}
          </div>
        </div>

        {/* Theme toggle */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
