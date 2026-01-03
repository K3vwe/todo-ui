"use client";

import { useState } from "react";
import { Task, TaskPriority } from "@/types/taskType";
import { PRIORITY_DOT_CLASSES } from "@/lib/taskPriority";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
  nextId: string;
};

const PRIORITIES: TaskPriority[] = ["critical", "high", "medium", "low"];

export default function NewTaskModal({ isOpen, onClose, onAddTask, nextId }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  if (!isOpen) return null;

  const handleCreate = () => {
  if (!title.trim()) return;

  const createdAt = new Date().toISOString();

  onAddTask({
    id: nextId,
    title: title.trim(),
    description: description.trim(),
    priority,
    status: "pending",
    createdAt,
    dueDate,
    dueTime,
    startedAt: undefined,
    completedAt: undefined,
  });

  // reset form
  setTitle("");
  setDescription("");
  setPriority("medium");
  setDueDate("");
  setDueTime("");
  onClose();
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-(--background) p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-(--foreground)">New Task</h2>

        {/* Title */}
        <div className="mt-4">
          <label className="text-sm font-medium text-(--foreground)">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border border-(--secondary) bg-(--secondary) p-2"
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="text-sm font-medium text-(--foreground)">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-(--secondary) bg-(--secondary) p-2"
          />
        </div>

        {/* Priority */}
        <div className="mt-4">
          <label className="text-sm font-medium text-(--foreground)">Priority</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {PRIORITIES.map(p => (
              <label
                key={p}
                className={`flex cursor-pointer items-center gap-2 rounded-md border p-2 ${
                  priority === p ? "border-(--primary)" : "border-(--secondary)"
                }`}
              >
                <input
                  type="radio"
                  checked={priority === p}
                  onChange={() => setPriority(p)}
                  className="hidden"
                />
                <span className={`h-3 w-3 rounded-full ${PRIORITY_DOT_CLASSES[p]}`} />
                <span className="text-sm capitalize text-(--foreground)">{p}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Due Date & Time */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-(--foreground)">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-(--secondary) bg-(--secondary) p-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-(--foreground)">Due Time</label>
            <input
              type="time"
              value={dueTime}
              onChange={e => setDueTime(e.target.value)}
              className="mt-1 w-full rounded-md border border-(--secondary) bg-(--secondary) p-2"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md bg-(--secondary) px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="rounded-md bg-(--primary) px-4 py-2 text-white"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
