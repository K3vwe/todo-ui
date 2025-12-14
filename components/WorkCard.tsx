import React from "react";

// Restrict color to valid Tailwind colors
type TailwindColor = "red" | "green" | "blue" | "yellow" | "purple" | "indigo" | "pink";

interface WorkCardProps {
  label: string;
  count: number;
  color: TailwindColor;
}

const WorkCard: React.FC<WorkCardProps> = ({ label, count, color }) => {
  // Map color prop to Tailwind class
  const colorClass = `bg-${color}-500`;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${colorClass}`} />
        <p>{label}</p>
      </div>
      <p className="text-gray-400">{count}</p>
    </div>
  );
};

export default WorkCard;


// // usage
// <WorkCard label="Completed" count={12} color="green" />
// <WorkCard label="Pending" count={5} color="red" />
