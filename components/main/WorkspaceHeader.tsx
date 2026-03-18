"use client";

import React, { useState, useEffect } from "react";
import type { User } from "@/types/user";
import { useAuth } from "@/components/auth/useAuth";

type Props = {
  isScrolled: boolean;
  onAddTaskClick: () => void;
  onSearchChange: (value: string) => void;
  user: User | null;
};

export default function WorkspaceHeader({
  isScrolled,
  onAddTaskClick,
  onSearchChange,
  user,
}: Props) {
  const { user: authUser, openLoginModal } = useAuth();
  const [loginPrompted, setLoginPrompted] = useState(false);
  const [pendingSearch, setPendingSearch] = useState(""); // store guest input

  // Apply pending search once user logs in
  useEffect(() => {
    if (authUser && pendingSearch) {
      onSearchChange(pendingSearch);
      setPendingSearch(""); // clear after applying
    }
  }, [authUser, pendingSearch, onSearchChange]);

  const handleAddTask = () => {
    if (!authUser) return openLoginModal?.();
    onAddTaskClick();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!authUser) {
      if (!loginPrompted) {
        openLoginModal?.();
        setLoginPrompted(true);
      }
      setPendingSearch(value); // store guest input
      return;
    }

    onSearchChange(value);
  };

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
      <h1 className="text-2xl font-bold text-(--motion) inline-block">Motion</h1>

      <div className="flex-1 max-w-md w-full">
        <input
          type="text"
          placeholder="Search tasks…"
          onChange={handleSearchChange}
          className="
            w-full h-10 px-3 rounded-md
            bg-(--secondary)/10 dark:bg-(--secondary)/30 text-(--foreground)
            placeholder-(--foreground)/50
            focus:outline-none focus:ring-2 focus:ring-(--secondary)
            transition-colors
          "
        />
      </div>

      <div className="shrink-0">
        <button
          onClick={handleAddTask}
          className={`
            h-10 px-5 rounded-md text-sm font-medium
            ${authUser ? "bg-(--sidebar-bg) text-(--sidebar-text) hover:brightness-150 cursor-pointer"
                       : "bg-(--secondary)/50 text-(--foreground)/50 cursor-pointer"}
            transition-colors
          `}
        >
          + New Task
        </button>
      </div>
    </div>
  );
}