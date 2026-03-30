"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import WorkspaceHeader from "./WorkspaceHeader";
import TaskList from "./TaskList";
import EditTaskModal from "./EditTaskModal";
import NewTaskModal from "./NewTaskModal";
import SettingsPanel from "../settings/SettingsPanel";
import { Task } from "@/types/taskType";
import { getStatus } from "@/types/taskStatus";
import { useAuth } from "@/components/auth/useAuth";

interface MainWorkspaceProps {
  activeCategory: string;
  className?: string;
}

const DashboardComingSoon = dynamic(
  () => import("../sidebar/DashboardComingSoon"),
  { ssr: false, loading: () => <div>Loading Dashboard...</div> }
);

export default function MainWorkspace({ activeCategory }: MainWorkspaceProps) {
  const STORAGE_KEY = "motion_tasks";
  const { user, openLoginModal } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalState, setModalState] = useState<{ type: "new" | "edit"; task?: Task } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Persist tasks
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, 300);
    return () => clearTimeout(handler);
  }, [tasks]);

  const handleToggleTask = useCallback((id: string) => {

    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task;
        const status = getStatus(task);

      // pending → in-progress
      if (status === "pending") {
        return {
          ...task,
          startedAt: new Date().toISOString(),
        };
      }

      // in-progress → complete
      if (status === "in-progress") {
        return {
          ...task,
          completedAt: new Date().toISOString(),
        };
      }

      // complete → in-progress (undo)
      if (status === "complete") {
        return {
          ...task,
          completedAt: undefined,
        };
      }

      return task;
      })
    );
  }, [user, openLoginModal]);

  const handleEditTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    setModalState(null);
  }, [user, openLoginModal]);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [user, openLoginModal]);

  const handleEditClick = useCallback((task: Task) => {
    setModalState({ type: "edit", task });
  }, [user, openLoginModal]);

  const handleAddTaskClick = useCallback(() => {
    setModalState({ type: "new" });
  }, [user, openLoginModal]);

  // Filtered tasks
  const filteredTasks = useMemo(
    () => tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [tasks, searchQuery]
  );

  const TasksView = useMemo(
    () => <TaskList tasks={filteredTasks} isLoading={false} onToggle={handleToggleTask} onEdit={handleEditClick} onDelete={handleDeleteTask} />,
    [filteredTasks, handleToggleTask, handleEditClick, handleDeleteTask]
  );

  return (
    <main className="col-span-12 md:col-span-9 h-full flex flex-col overflow-hidden">
      {activeCategory === "Tasks" && (
        <>
          <WorkspaceHeader
            isScrolled={isScrolled}
            onAddTaskClick={handleAddTaskClick}
            onSearchChange={setSearchQuery}
            user={user}
          />
          <div onScroll={e => setIsScrolled(e.currentTarget.scrollTop > 0)} className="flex-1 overflow-y-auto px-6 py-4">
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
            <EditTaskModal task={modalState.task} onSave={handleEditTask} onClose={() => setModalState(null)} />
          )}
        </>
      )}

      {activeCategory === "Dashboard" && <DashboardComingSoon />}
      {activeCategory === "Settings" && <SettingsPanel />}
    </main>
  );
}