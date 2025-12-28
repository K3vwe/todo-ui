import { Task } from "@/data/mockTasks";
import { PRIORITY_DOT_CLASSES } from "@/lib/taskPriority";
import { getTaskStatus } from "@/lib/taskStatus";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

const STATUS_STYLES = {
  todo: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  done: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
};

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const status = getTaskStatus(task);

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 accent-blue-500"
        />

        <div>
          <div className="flex items-center gap-2">
            <p
              className={`font-medium ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </p>

            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[status]}`}
            >
              {status.replace("-", " ")}
            </span>
          </div>

          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 capitalize">
            <span className="flex items-center gap-1">
              {task.priority}
              <span
                className={`h-2.5 w-2.5 rounded-full ${PRIORITY_DOT_CLASSES[task.priority]}`}
              />
            </span>
            • {task.createdAt}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
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
