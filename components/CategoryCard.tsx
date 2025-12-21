// CategoryCard.tsx
type CategoryCardProps = {
  icon: string;
  label: string;
  count: number;
  className?: string; // optional
};

export default function CategoryCard({ icon, label, count, className }: CategoryCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="font-large text-gray-900 dark:text-gray-100">{label}</span>
      </div>
      <span className="text-md text-gray-500 dark:text-gray-400">{count}</span>
    </div>
  );
}
