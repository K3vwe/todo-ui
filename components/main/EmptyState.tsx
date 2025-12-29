"use client";

import React from "react";

export default function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center text-(--secondary)">
      <div className="text-3xl mb-3">🗂️</div>

      <p className="text-sm font-medium text-(--foreground)">
        No tasks yet
      </p>

      <p className="text-xs mt-1 max-w-xs text-(--secondary)">
        Add your first task and start turning intentions into checkmarks.
      </p>

      <div className="mt-6 flex items-center gap-2 text-xs text-(--secondary)">
        <kbd className="px-2 py-1 rounded border bg-(--background) text-(--foreground)">
          N
        </kbd>
        <span>to create a new task</span>
      </div>
    </div>
  );
}
