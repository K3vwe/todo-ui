"use client";

import { useEffect, useState } from "react";
import WorkspaceHeader from "./WorkspaceHeader";
import TaskList from "./TaskList";
import { Task, mockTasks } from "@/data/mockTasks";

export default function MainWorkspace() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : undefined,
            }
          : task
      )
    );
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === updatedTask.id
          ? {
              ...updatedTask,
              startedAt: updatedTask.startedAt ?? new Date().toISOString(),
            }
          : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <main className="col-span-12 md:col-span-9 h-full flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <WorkspaceHeader isScrolled={isScrolled} />

      <div
        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 0)}
        className="flex-1 overflow-y-auto px-6 py-4"
      >
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onToggle={handleToggleTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </main>
  );
}
