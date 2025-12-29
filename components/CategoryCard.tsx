type CategoryCardProps = {
  icon: string;
  label: string;
  count: number;
  className?: string; // optional
};

export default function CategoryCard({ icon, label, count, className }: CategoryCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-3 bg-(--secondary) rounded-lg ${className} transition-colors`}
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="font-medium text-(--foreground)">{label}</span>
      </div>
      <span className="text-md text-(--foreground)/70">{count}</span>
    </div>
  );
}
