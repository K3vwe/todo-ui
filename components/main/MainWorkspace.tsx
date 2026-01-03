"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import WorkspaceHeader from "./WorkspaceHeader";
import TaskList from "./TaskList";
import EditTaskModal from "./EditTaskModal";
import NewTaskModal from "./NewTaskModal";
import SettingsPanel from "../settings/SettingsPanel";
import { Task } from "@/types/taskType";
import { transitionTask } from "@/lib/taskTransition";

interface MainWorkspaceProps {
  activeCategory: string;
}

const DashboardComingSoon = dynamic(
  () => import("../sidebar/DashboardComingSoon"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full flex items-center justify-center text-center">
        Loading Dashboard...
      </div>
    ),
  }
);

export default function MainWorkspace({ activeCategory }: MainWorkspaceProps) {
  const STORAGE_KEY = "motion_tasks";

  const [isScrolled, setIsScrolled] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* =======================
     Load Tasks (with safe fallback)
  ======================= */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage:", error);
      setTasks([]);
      localStorage.removeItem(STORAGE_KEY); // clean corrupted data
    }
  }, []);

  /* =======================
     Persist Tasks
  ======================= */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  /* =======================
     Task Handlers
  ======================= */
  const handleToggleTask = useCallback((id: string) => {
  setTasks(prev =>
    prev.map(task => {
      if (task.id !== id) return task;

      const now = new Date().toISOString();

      switch (task.status) {
        case "pending":
          // Move to in-progress
          return {
            ...task,
            status: "in-progress",
            startedAt: task.startedAt || now,
          };

        case "in-progress":
          // Move to complete
          return {
            ...task,
            status: "complete",
            completedAt: now,
          };

        case "complete":
          // Optionally, allow unchecking back to in-progress?
          // return task; // stays complete
          // Allow unchecking: go back to in-progress
          return { ...task, status: "in-progress", completedAt: undefined };
      }
    })
  );
}, []);



  const handleEditTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const handleEditClick = useCallback((task: Task) => setEditingTask(task), []);

  /* =======================
     Filtered Tasks
  ======================= */
  const filteredTasks = useMemo(
    () => tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [tasks, searchQuery]
  );

  const TasksView = useMemo(
    () => (
      <TaskList
        tasks={filteredTasks}
        isLoading={false}
        onToggle={handleToggleTask}
        onEdit={handleEditClick}
        onDelete={handleDeleteTask}
      />
    ),
    [filteredTasks, handleToggleTask, handleEditClick, handleDeleteTask]
  );

  /* =======================
     Render
  ======================= */
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

          {editingTask && (
            <EditTaskModal
              task={editingTask}
              onSave={handleEditTask}
              onClose={() => setEditingTask(null)}
            />
          )}
        </>
      )}

      {activeCategory === "Dashboard" && <DashboardComingSoon />}
      {activeCategory === "Settings" && <SettingsPanel />}
    </main>
  );
}
