import React from "react";

export default function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
      <div className="text-3xl mb-3">🗂️</div>

      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        No tasks yet
      </p>

      <p className="text-xs mt-1 max-w-xs">
        Add your first task and start turning intentions into checkmarks.
      </p>

      {/* Keyboard hint */}
      <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
        <kbd className="px-2 py-1 rounded border bg-gray-100 dark:bg-gray-800">
          N
        </kbd>
        <span>to create a new task</span>
      </div>
    </div>
  );
}
