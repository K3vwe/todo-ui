"use client";

import { useState } from "react";
import { Task, TaskPriority } from "@/types/taskType";
import { useAuth } from "@/components/auth/useAuth";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
  nextId: string;
};

const PRIORITIES: TaskPriority[] = ["critical", "high", "medium", "low"];

export default function NewTaskModal({ isOpen, onClose, onAddTask, nextId }: Props) {
  const { user, openLoginModal } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!user) return openLoginModal?.();
    if (!title.trim()) return;

    onAddTask({
      id: nextId,
      title: title.trim(),
      description: description.trim(),
      priority,
      status: "pending",
      createdAt: new Date().toISOString(),
      dueDate,
      dueTime,
      startedAt: undefined,
      completedAt: undefined,
    });

    setTitle(""); setDescription(""); setPriority("medium"); setDueDate(""); setDueTime("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="w-full max-w-lg rounded-xl bg-(--background) p-6 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-(--foreground)">New Task</h2>
        {/* Inputs for title, description, priority, dueDate, dueTime */}
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md bg-(--secondary) px-4 py-2">Cancel</button>
          <button onClick={handleCreate} className="rounded-md bg-(--primary) px-4 py-2 text-white">Create Task</button>
        </div>
      </div>
    </div>
  );
}