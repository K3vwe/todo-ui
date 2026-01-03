// components/TaskItem.tsx
"use client";

import { Task } from "@/types/taskType";
import { PRIORITY_DOT_CLASSES } from "@/lib/taskPriority";
import { formatTaskDate } from "@/utils/date";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

const STATUS_STYLES = {
  pending: "bg-(--secondary)/20 text-(--foreground)",
  "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  complete: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
};

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const dueDateTime = task.dueDate && task.dueTime
    ? formatTaskDate(`${task.dueDate}T${task.dueTime}`)
    : "No due date";

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-(--secondary)/10 dark:bg-(--secondary)/30 shadow-sm transition-colors hover:shadow-md hover:bg-(--secondary)/20 dark:hover:bg-(--secondary)/40">
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.status === "complete"}
          onChange={() => onToggle(task.id)}
          className="mt-1 accent-(--primary)"
        />

        {/* Task Info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p
              className={`font-medium ${
                task.status === "complete"
                  ? "line-through text-(--foreground)/50"
                  : "text-(--foreground)"
              }`}
            >
              {task.title}
            </p>

            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[task.status]}`}
            >
              {task.status.replace("-", " ")}
            </span>
          </div>

          <p className="text-xs flex flex-col md:flex-row md:items-center md:gap-3 mt-1 capitalize border-t border-(--secondary)/30 pt-2 md:border-0 md:pt-0">
            {/* Priority */}
            <span className="flex items-center gap-1">
              <span className="font-medium">Priority:</span>
              <span className="flex items-center gap-1">
                {task.priority}
                <span className={`h-2.5 w-2.5 rounded-full ${PRIORITY_DOT_CLASSES[task.priority]}`} />
              </span>
            </span>

            {/* Due Date */}
            <span className="text-(--foreground)/60 mt-1 md:mt-0 md:before:content-['|'] md:before:mr-1">
              Due: {dueDateTime}
            </span>

            {/* Created At */}
            <span className="text-(--foreground)/60 mt-1 md:mt-0 md:before:content-['|'] md:before:mr-1">
              Created: {formatTaskDate(task.createdAt)}
            </span>

            {/* Optionally show startedAt / completedAt */}
            {task.startedAt && (
              <span className="text-(--foreground)/60 mt-1 md:mt-0 md:before:content-['|'] md:before:mr-1">
                Started: {formatTaskDate(task.startedAt)}
              </span>
            )}
            {task.completedAt && (
              <span className="text-(--foreground)/60 mt-1 md:mt-0 md:before:content-['|'] md:before:mr-1">
                Completed: {formatTaskDate(task.completedAt)}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="h-8 px-3 rounded-md text-xs font-medium bg-(--sidebar-bg) text-(--sidebar-text) hover:brightness-150 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="h-8 px-3 rounded-md text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
