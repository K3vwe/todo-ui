"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import WorkspaceHeader from "./WorkspaceHeader";
import TaskList from "./TaskList";
import EditTaskModal from "./EditTaskModal";
import NewTaskModal from "./NewTaskModal";
import SettingsPanel from "../settings/SettingsPanel";
import { Task, TaskStatus } from "@/types/taskType";
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

  /* =======================
     State
  ======================= */
  const [isScrolled, setIsScrolled] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalState, setModalState] = useState<{ type: "new" | "edit"; task?: Task } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  /* =======================
     Load Tasks
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
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  /* =======================
     Persist Tasks (debounced)
  ======================= */
  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks to localStorage:", error);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [tasks]);

  /* =======================
     Task Handlers
  ======================= */
  const handleToggleTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task;

        if (task.status === "complete") {
          // Allow unchecking complete
          return { ...task, status: "in-progress", completedAt: undefined };
        }

        try {
          const nextStatus: TaskStatus =
            task.status === "pending" ? "in-progress" : "complete";
          return transitionTask(task, nextStatus);
        } catch (err) {
          console.error(err);
          return task;
        }
      })
    );
  }, []);

  const handleEditTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setModalState(null);
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const handleEditClick = useCallback((task: Task) => {
    setModalState({ type: "edit", task });
  }, []);

  const handleAddTaskClick = useCallback(() => setModalState({ type: "new" }), []);

  /* =======================
     Scroll Handler
  ======================= */
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 0);
  }, []);

  /* =======================
     Filtered Tasks
  ======================= */
  const filteredTasks = useMemo(
    () => tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [tasks, searchQuery]
  );

  /* =======================
     TasksView
  ======================= */
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
     Keyboard Shortcuts
  ======================= */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore typing in inputs/textareas
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      switch (e.key) {
        case "n":
        case "N":
          setModalState({ type: "new" });
          break;
        case "Escape":
          setModalState(null);
          break;
        case "Enter":
          if (modalState?.type === "edit" && modalState.task) {
            handleEditTask(modalState.task);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalState, handleEditTask]);

  /* =======================
     Render
  ======================= */
  return (
    <main className="col-span-12 md:col-span-9 h-full flex flex-col overflow-hidden transition-colors">
      {activeCategory === "Tasks" && (
        <>
          <WorkspaceHeader
            isScrolled={isScrolled}
            onAddTaskClick={handleAddTaskClick}
            onSearchChange={setSearchQuery}
          />

          <div
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-[var(--secondary)] scrollbar-track-transparent"
          >
            {TasksView}
          </div>

          {modalState?.type === "new" && (
            <NewTaskModal
              isOpen
              onClose={() => setModalState(null)}
              onAddTask={task => setTasks(prev => [task, ...prev])}
              nextId={(tasks.length + 1).toString()}
            />
          )}

          {modalState?.type === "edit" && modalState.task && (
            <EditTaskModal
              task={modalState.task}
              onSave={handleEditTask}
              onClose={() => setModalState(null)}
            />
          )}
        </>
      )}

      {activeCategory === "Dashboard" && <DashboardComingSoon />}
      {activeCategory === "Settings" && <SettingsPanel />}
    </main>
  );
}
