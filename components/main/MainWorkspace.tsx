"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic"; // ✅ lazy loading import
import WorkspaceHeader from "./WorkspaceHeader";
import TaskList from "./TaskList";
import EditTaskModal from "./EditTaskModal";
import NewTaskModal from "./NewTaskModal";
import { Task, mockTasks } from "@/data/mockTasks";

interface MainWorkspaceProps {
  activeCategory: string;
}

/* =======================
   Lazy load dashboard only when needed
   ======================= */
const DashboardComingSoon = dynamic(
  () => import("../sidebar/DashboardComingSoon"),
  { 
    ssr: false, // optional: only load on client
    loading: () => (
      <div className="h-full flex items-center justify-center text-center">
        Loading Dashboard...
      </div>
    ),
  }
);

export default function MainWorkspace({ activeCategory }: MainWorkspaceProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (activeCategory !== "Tasks") return;

    setIsLoading(true);
    const timer = setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  const handleToggleTask = useCallback((id: string) => {
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
  }, []);

  const handleEditTask = useCallback((updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === updatedTask.id
          ? { ...updatedTask, startedAt: updatedTask.startedAt ?? new Date().toISOString() }
          : task
      )
    );
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const handleEditClick = useCallback((task: Task) => setEditingTask(task), []);

  const filteredTasks = useMemo(
    () => tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [tasks, searchQuery]
  );

  const TasksView = useMemo(() => (
    <TaskList
      tasks={filteredTasks}
      isLoading={isLoading}
      onToggle={handleToggleTask}
      onEdit={handleEditClick}
      onDelete={handleDeleteTask}
    />
  ), [filteredTasks, isLoading, handleToggleTask, handleEditClick, handleDeleteTask]);

  return (
    <main className="col-span-12 md:col-span-9 h-full flex flex-col bg-(--background) text-(--foreground) overflow-hidden transition-colors">
      {activeCategory === "Tasks" && (
        <>
          <WorkspaceHeader
            isScrolled={isScrolled}
            onAddTaskClick={() => setShowNewTaskModal(true)}
            onSearchChange={setSearchQuery}
          />

          <div
            onScroll={e => setIsScrolled(e.currentTarget.scrollTop > 0)}
            className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-[var(--secondary)] scrollbar-track-transparent"
          >
            {TasksView}
          </div>

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
        </>
      )}

      {activeCategory === "Dashboard" && <DashboardComingSoon />}
    </main>
  );
}