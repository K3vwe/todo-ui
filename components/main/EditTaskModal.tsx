"use client";

import { useState, useEffect } from "react";
import { Task } from "@/data/mockTasks";

type Props = {
  task: Task | null;
  onSave: (updatedTask: Task) => void;
  onClose: () => void;
};

export default function EditTaskModal({ task, onSave, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
    }
  }, [task]);

  if (!task) return null;

  const handleSave = () => {
    onSave({
      ...task,
      title: title.trim(),
      priority,
      startedAt: task.startedAt ?? new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-(--background) dark:bg-(--background) rounded-lg p-6 w-full max-w-md shadow-lg transition-colors">
        <h2 className="text-lg font-medium mb-4 text-(--foreground)">Edit Task</h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="p-2 rounded border border-(--secondary) bg-(--secondary) text-(--foreground] transition-colors"
          />

          <select
            value={priority}
            onChange={e => setPriority(e.target.value as Task["priority"])}
            className="p-2 rounded border border-(--secondary) bg-(--secondary) text-(--foreground] transition-colors"
          >
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-md bg-(--secondary)]text-(--foreground) hover:brightness-110 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-3 py-2 rounded-md bg-(--primary)] txt-white hover:brightness-110 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
