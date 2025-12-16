import React, { ReactNode } from "react";

interface CategoryCardProps {
  icon: ReactNode; // emoji, string, or React component
  label: string;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, label, count }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <p>{label}</p>
      </div>
      <p className="text-gray-400">{count}</p>
    </div>
  );
};

export default CategoryCard;
// next: show a version where icon can accept multiple types safely (like emoji, string, or React component),