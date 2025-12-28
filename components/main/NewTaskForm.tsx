import { useState } from "react";
import { Task } from "@/data/mockTasks";

type Props = {
  onAddTask: (task: Task) => void;
  nextId: string;
};

export default function NewTaskForm({ onAddTask, nextId }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      id: nextId,
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
    });

    setTitle("");
    setPriority("medium");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 px-6 py-4 items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4"
    >
      <input
        type="text"
        placeholder="New task title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
      />

      <select
        value={priority}
        onChange={e => setPriority(e.target.value as Task["priority"])}
        className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
      >
        <option value="critical">Critical</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <button
        type="submit"
        className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Add
      </button>
    </form>
  );
}
