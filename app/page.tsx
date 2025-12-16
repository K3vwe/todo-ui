import React from "react";

import ProfileHeader from "@/components/ProfileHeader";
import CategoryCard from "@/components/CategoryCard";
import WorkCard from "@/components/WorkCard";
import ThemeToggle from "@/components/ThemeToggle";

const HomePage: React.FC = () => {
  return(
    <div className="min-h-screen justify-center items-center bg-gray-100 dark:bg-gray-900 p-10">
      {/* Main Container */}
      <div className="w-full m-auto max-w-8xl bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 space-y-8">

        {/* Profile */}
        <div className="rounded-3xl">
          <ProfileHeader name="Jhoan Deo" email="jhoandee@gmail.com" />
        </div>

        {/* Categories Section */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 md:p-8 rounded-3xl shadow-inner space-y-4">
          <h2 className="text-2xl font-semibold mb-2">Categories</h2>
          <div className="space-y-4 p-4">
            <CategoryCard icon="☀️" label="My Days" count={5} />
            <CategoryCard icon="⭐" label="Important" count={45} />
            <CategoryCard icon="🗓️" label="Planned" count={23} />
            <CategoryCard icon="👥" label="Shared tasks" count={2} />
            <CategoryCard icon="📦" label="Tasks" count={8} />
          </div>
        </div>

        {/* Work Section */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 md:p-8 rounded-3xl shadow-inner space-y-4">
          <h2 className="text-2xl font-semibold mb-2">Work</h2>
          <div className="space-y-4 p-4">
            <WorkCard label="Office work" count={16} color="red" />
            <WorkCard label="Groceries list" count={8} color="blue" />
            <WorkCard label="Shopping list" count={55} color="green" />
          </div>
        </div>


        {/* Theme Toggle */}
        <div className="flex justify-end">
          <ThemeToggle />
        </div>

      </div>
    </div>
  );
}

export default HomePage;