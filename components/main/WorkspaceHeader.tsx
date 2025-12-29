import React from "react";

type Props = {
  isScrolled: boolean;
  onAddTaskClick: () => void;
  onSearchChange: (value: string) => void;
};

export default function WorkspaceHeader({
  isScrolled,
  onAddTaskClick,
  onSearchChange,
}: Props) {
  return (
    <div
      className={`
        sticky top-0 z-20 px-6 py-3
        border-b border-(--secondary)
        bg-(--background)/90 dark:bg-(--background)/90 backdrop-blur-md
        transition-colors
        ${isScrolled ? "shadow-sm" : ""}
        flex flex-col md:flex-row md:items-center md:justify-between gap-3
      `}
    >
      {/* App name */}
      <h1 className="text-2xl font-bold text-(--motion) inline-block">
        Motion
      </h1>


      {/* Search bar */}
      <div className="flex-1 max-w-md w-full">
        <input
          type="text"
          placeholder="Search tasks…"
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            w-full h-10 px-3 rounded-md
            bg-(--secondary)/10 dark:bg-(--secondary)/30 text-(--foreground)
            placeholder-(--foreground)/50
            focus:outline-none focus:ring-2 focus:ring-(--secondary)
            transition-colors
          "
        />
      </div>

      {/* Add Task Button */}
      <div className="shrink-0">
        <button
          onClick={onAddTaskClick}
          className="
            h-10 px-5 rounded-md text-sm font-medium
            bg-(--sidebar-bg) text-(--sidebar-text)
            hover:brightness-150
            transition-colors
          "
        >
          + New Task
        </button>
      </div>
    </div>
  );
}
