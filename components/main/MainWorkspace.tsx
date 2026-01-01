"use client";

import { useEffect, useState } from "react";
import WorkspaceHeader from "./WorkspaceHeader";
import TaskList from "./TaskList";
import EditTaskModal from "./EditTaskModal";
import NewTaskModal from "./NewTaskModal";
import DashboardComingSoon from "@/components/sidebar/DashboardComingSoon";
import { Task, mockTasks } from "@/data/mockTasks";

interface MainWorkspaceProps {
  activeCategory: string;
}

export default function MainWorkspace({ activeCategory }: MainWorkspaceProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (activeCategory !== "Tasks") return;

    const timer = setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  /* =====================
     DASHBOARD PLACEHOLDER
     ===================== */
  if (activeCategory === "Dashboard") {
    return (
      <main className="col-span-12 md:col-span-9 h-full flex items-center justify-center bg-(--background) text-(--foreground)">
        <DashboardComingSoon />
      </main>
    );
  }

  /* =====================
     TASKS LOGIC
     ===================== */
  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed
                ? new Date().toISOString()
                : undefined,
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
              startedAt:
                updatedTask.startedAt ?? new Date().toISOString(),
            }
          : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* =====================
     TASKS UI
     ===================== */
  return (
    <main className="col-span-12 md:col-span-9 h-full flex flex-col bg-(--background) text-(--foreground) overflow-hidden transition-colors">
      {/* Header */}
      <WorkspaceHeader
        isScrolled={isScrolled}
        onAddTaskClick={() => setShowNewTaskModal(true)}
        onSearchChange={setSearchQuery}
      />

      {/* Scrollable Content */}
      <div
        onScroll={e => setIsScrolled(e.currentTarget.scrollTop > 0)}
        className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-[var(--secondary)] scrollbar-track-transparent"
      >
        <TaskList
          tasks={filteredTasks}
          isLoading={isLoading}
          onToggle={handleToggleTask}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
        />
      </div>

      {/* Modals */}
      <NewTaskModal
        isOpen={showNewTaskModal}
        onClose={() => setShowNewTaskModal(false)}
        onAddTask={task => setTasks(prev => [task, ...prev])}
        nextId={(tasks.length + 1).toString()}
      />

      <EditTaskModal
        task={editingTask}
        onSave={handleEditTask}
        onClose={() => setEditingTask(null)}
      />
    </main>
  );
}
