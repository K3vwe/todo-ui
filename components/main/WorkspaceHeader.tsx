import React from "react";

type Props = {
  isScrolled: boolean;
  onAddTaskClick: () => void;
};

export default function WorkspaceHeader({
  isScrolled,
  onAddTaskClick,
}: Props) {
  return (
    <div
      className={`
        sticky top-0 z-20 px-6 py-3
        border-b border-gray-200 dark:border-gray-700
        bg-white/90 dark:bg-gray-800/90 backdrop-blur-md
        transition-shadow
        ${isScrolled ? "shadow-sm" : ""}
        flex flex-col md:flex-row md:items-center md:justify-between gap-3
      `}
    >
      {/* App name */}
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
        Workstream
      </h1>

      {/* Search bar */}
      <div className="flex-1 max-w-md w-full">
        <input
          type="text"
          placeholder="Search tasks…"
          className="
            w-full h-10 px-3 rounded-md text-sm
            bg-gray-100 dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      </div>

      {/* Add Task */}
      <div className="shrink-0">
        <button
          onClick={onAddTaskClick}
          className="
            h-10 px-5 rounded-md text-sm font-medium
            dark:bg-gray-800 text-white
            hover:bg-gray-600
            transition-colors
          "
        >
          + New Task
        </button>
      </div>
    </div>
  );
}