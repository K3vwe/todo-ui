"use client";

import { useEffect, useState } from "react";
import WorkspaceHeader from "./WorkspaceHeader";
import TaskList from "./TaskList";

export type Task = {
  id: string;
  title: string;
};

export default function MainWorkspace() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Simulate loading — replace with real data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="col-span-12 md:col-span-9 h-full flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <WorkspaceHeader isScrolled={isScrolled} />

      {/* Scrollable task area */}
      <div
        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 0)}
        className="flex-1 overflow-y-auto px-6 py-4"
      >
        <TaskList tasks={tasks} isLoading={isLoading} />
      </div>
    </main>
  );
}
