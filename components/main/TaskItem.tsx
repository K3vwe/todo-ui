"use client";

import { Task } from "@/types/taskType";
import { formatTaskDate } from "@/utils/date";
import { useAuth } from "@/components/auth/useAuth";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const { user, openLoginModal } = useAuth();

  const dueDateTime = task.dueDate && task.dueTime
    ? formatTaskDate(`${task.dueDate}T${task.dueTime}`)
    : "No due date";

  const requireAuth = (action: () => void) => {
    if (!user) return openLoginModal?.();
    action();
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-(--secondary)/10 shadow-sm">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.status === "complete"}
          onChange={() => requireAuth(() => onToggle(task.id))}
          className="mt-1 accent-(--primary)"
        />
        <div className="flex flex-col gap-2">
          <p className={`${task.status === "complete" ? "line-through" : ""}`}>{task.title}</p>
          <span>Priority: {task.priority}</span>
          <span>Due: {dueDateTime}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => requireAuth(() => onEdit(task))}>Edit</button>
        <button onClick={() => requireAuth(() => onDelete(task.id))}>Delete</button>
      </div>
    </div>
  );
}