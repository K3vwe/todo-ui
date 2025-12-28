"use client";

import { useState } from "react";
import { Task } from "@/data/mockTasks";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
  nextId: string;
};

export default function NewTaskModal({
  isOpen,
  onClose,
  onAddTask,
  nextId,
}: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      id: nextId,
      title: title.trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setPriority("medium");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Add New Task
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          />

          <select
            value={priority}
            onChange={e => setPriority(e.target.value as Task["priority"])}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          >
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
