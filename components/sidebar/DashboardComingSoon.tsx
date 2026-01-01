"use client";

export default function DashboardComingSoon() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-6 gap-3">
      {/* Icon */}
      <div className="text-4xl mb-2 opacity-80">📊</div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-(--foreground)">
        Dashboard
      </h1>

      {/* Description */}
      <p className="text-sm max-w-xs text-(--secondary)">
        This feature is coming soon 🚧. Your future dashboard will display insights,
        trends, and your key metrics at a glance.
      </p>

      {/* Optional roadmap hint */}
      <p className="text-xs text-(--secondary) opacity-70">
        Planned feature · Active design
      </p>
    </div>
  );
}
