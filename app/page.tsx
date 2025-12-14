import React from "react";
import ProfileHeader from "@/components/ProfileHeader";
import CategoryCard from "@/components/CategoryCard";
import WorkCard from "@/components/WorkCard";
import ThemeToggle from "@/components/ThemeToggle";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm md:max-w-md bg-white dark:bg-gray-800 rounded-card shadow-soft dark:shadow-softLight p-4">
        <ProfileHeader />

        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-card shadow-inner">
          <CategoryCard icon="☀️" label="My Day" count={5} />
          <CategoryCard icon="⭐" label="Important" count={45} />
          <CategoryCard icon="🗓️" label="Planned" count={23} />
          <CategoryCard icon="👥" label="Shared tasks" count={2} />
          <CategoryCard icon="📦" label="Tasks" count={8} />
        </div>

        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-card shadow-inner">
          <p className="font-semibold mb-2">Work</p>

          <WorkCard label="Office work" count={16} color="red" />
          <WorkCard label="Groceries list" count={8} color="blue" />
          <WorkCard label="Shopping list" count={55} color="green" />
        </div>

        <div className="mt-6">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Home;
