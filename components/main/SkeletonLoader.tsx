import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-14 rounded-lg bg-(--secondary)/20 dark:bg-(--secondary)/30 animate-pulse transition-colors"
        />
      ))}
    </div>
  );
}
