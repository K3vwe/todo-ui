"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/components/auth/useAuth";
import WorkspaceHeader from "./WorkspaceHeader";
import TaskList from "./TaskList";
import EditTaskModal from "./EditTaskModal";
import NewTaskModal from "./NewTaskModal";
import SettingsPanel from "../settings/SettingsPanel";
import { adaptTaskFromData } from "@/types/taskAdapter";
import { Task } from "@/types/taskType";
import { BackendTask } from "@/types/backendTask";

interface MainWorkspaceProps {
  activeCategory: string;
  className?: string;
}

const DashboardComingSoon = dynamic(
  () => import("../sidebar/DashboardComingSoon"),
  { ssr: false, loading: () => <div>Loading Dashboard...</div> }
);

export default function MainWorkspace({ activeCategory }: MainWorkspaceProps) {
  const { user, openLoginModal, logout } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [modalState, setModalState] = useState<{ type: "new" | "edit"; task?: Task } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // -----------------------------
  // Load tasks
  // -----------------------------
  const loadTasks = useCallback(async () => {
    if (!user) return openLoginModal();

    setLoadingTasks(true);
    try {
      const data = await apiFetch<BackendTask[]>("/api/v1/tasks");
      setTasks(data.map(adaptTaskFromData));
    } catch (err: unknown) {
      console.error("Failed to load tasks:", err);
      if (err instanceof Error && err.message.includes("401")) logout();
    } finally {
      setLoadingTasks(false);
    }
  }, [user, openLoginModal, logout]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // -----------------------------
  // Toggle task (optimistic + backend)
  // -----------------------------
  const handleToggleTask = useCallback(async (id: string) => {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  // Optimistic UI update
  setTasks(prev =>
    prev.map(t => {
      if (t.id !== id) return t;

      if (!t.startedAt) {
        // Pending → In Progress
        return { ...t, startedAt: new Date().toISOString(), status: "in_progress" };
      }
      if (t.startedAt && !t.completedAt) {
        // In Progress → Completed
        return { ...t, completedAt: new Date().toISOString(), status: "completed" };
      }
      if (t.completedAt) {
        // Completed → back to In Progress
        return { ...t, completedAt: undefined, status: "in_progress" };
      }
      return t;
    })
  );

  // Prepare payload for backend
  const payload: any = {};
  if (!task.startedAt) payload.started_at = new Date().toISOString();
  else if (task.startedAt && !task.completedAt) payload.completed_at = new Date().toISOString();
  else if (task.completedAt) payload.completed_at = null; // remove completed

  try {
    const updated = await apiFetch<BackendTask>(`/api/v1/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    setTasks(prev => prev.map(t => (t.id === id ? adaptTaskFromData(updated) : t)));
  } catch (err: unknown) {
    console.error("Toggle task failed:", err);
    if (err instanceof Error && err.message.includes("401")) logout();
    loadTasks(); // fallback
  }
}, [tasks, logout, loadTasks]);

  // -----------------------------
  // Add/Edit/Delete tasks
  // -----------------------------
  const handleAddTask = useCallback(async (task: Task) => {
    try {
      const newTask = await apiFetch<BackendTask>("/api/v1/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          priority: task.priority.toUpperCase(),
          due_at: task.dueDate ? `${task.dueDate}T${task.dueTime}` : null,
        }),
      });
      setTasks(prev => [adaptTaskFromData(newTask), ...prev]);
      setModalState(null);
    } catch (err: unknown) {
      console.error("Failed to add task:", err);
    }
  }, []);

  const handleEditTask = useCallback(async (task: Task) => {
    try {
      const updated = await apiFetch<BackendTask>(`/api/v1/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          priority: task.priority.toUpperCase(),
          due_at: task.dueDate ? `${task.dueDate}T${task.dueTime}` : null,
        }),
      });
      setTasks(prev => prev.map(t => (t.id === updated.id ? adaptTaskFromData(updated) : t)));
      setModalState(null);
    } catch (err: unknown) {
      console.error("Failed to edit task:", err);
    }
  }, []);

  const handleDeleteTask = useCallback(async (id: string) => {
    try {
      await apiFetch(`/api/v1/tasks/${id}`, { method: "DELETE" });
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err: unknown) {
      console.error("Failed to delete task:", err);
    }
  }, []);

  // -----------------------------
  // Filtered tasks
  // -----------------------------
  const filteredTasks = useMemo(
    () => tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [tasks, searchQuery]
  );

  return (
    <main className="col-span-12 md:col-span-9 h-full flex flex-col overflow-hidden">
      {activeCategory === "Tasks" && (
        <>
          <WorkspaceHeader
            user={user}
            isScrolled={isScrolled}
            onAddTaskClick={() => setModalState({ type: "new" })}
            onSearchChange={setSearchQuery}
          />
          <div
            onScroll={e => setIsScrolled(e.currentTarget.scrollTop > 0)}
            className="flex-1 overflow-y-auto px-6 py-4"
          >
            <TaskList
              tasks={filteredTasks}
              isLoading={loadingTasks}
              onToggle={handleToggleTask}
              onEdit={task => setModalState({ type: "edit", task })}
              onDelete={handleDeleteTask}
            />
          </div>

          {modalState?.type === "new" && (
            <NewTaskModal
              isOpen
              onClose={() => setModalState(null)}
              onAddTask={handleAddTask}
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