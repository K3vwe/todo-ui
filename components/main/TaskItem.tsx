import { Task } from "@/data/mockTasks";
import { PRIORITY_DOT_CLASSES } from "@/lib/taskPriority";
import { getTaskStatus } from "@/lib/taskStatus";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const status = getTaskStatus(task);
  const formattedDate = new Date(task.createdAt).toLocaleDateString();

  const inProgressClasses =
    status === "in-progress"
      ? "bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400"
      : "";

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${inProgressClasses}`}
    >
      <label className="flex items-start gap-3 cursor-pointer flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 accent-blue-500"
        />

        <div>
          <p className={`font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </p>

          <p className="text-sm text-gray-500 flex items-center gap-1.5 capitalize whitespace-nowrap">
            <span>{status}</span>
            <span>•</span>

            <span className="flex items-center gap-1">
              {task.priority}
              <span
                className={`h-2.5 w-2.5 rounded-full ${PRIORITY_DOT_CLASSES[task.priority]}`}
              />
            </span>

            <span>•</span>
            <span>{formattedDate}</span>
          </p>
        </div>
      </label>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="h-8 px-3 rounded-md text-xs font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
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
