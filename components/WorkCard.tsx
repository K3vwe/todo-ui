import React from "react";

// Only allow these Tailwind colors
type TailwindColor = "red" | "green" | "blue" | "yellow" | "purple" | "indigo" | "pink";

interface WorkCardProps {
  label: string;
  count: number;
  color: TailwindColor;
}

// Map each allowed color to its Tailwind class
const colorMap: Record<TailwindColor, string> = {
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  indigo: "bg-indigo-500",
  pink: "bg-pink-500",
};

const WorkCard: React.FC<WorkCardProps> = ({ label, count, color }) => {
  const colorClass = colorMap[color];

  return (
    <div className="flex justify-between p-2 border-b rounded-b-sm border-b-gray-800">
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${colorClass}`} />
        <p className="text-lg">{label}</p>
      </div>
      <p className="text-gray-400">{count}</p>
    </div>
  );
};

export default WorkCard;

// // usage
// <WorkCard label="Completed" count={12} color="green" />
// <WorkCard label="Pending" count={5} color="red" />