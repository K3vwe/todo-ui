import { Task } from "@/data/mockTasks";
import SkeletonLoader from "./SkeletonLoader";
import EmptyState from "./EmptyState";
import TaskItem from "./TaskItem";
import { getTaskStatus } from "@/lib/taskStatus";

type Props = {
  tasks: Task[];
  isLoading: boolean;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, isLoading, onToggle, onEdit, onDelete }: Props) {
  if (isLoading) return <SkeletonLoader />;
  if (tasks.length === 0) return <EmptyState />;

  const sortedTasks = [...tasks].sort((a, b) => {
    const order = { "in-progress": 0, "pending": 1, "complete": 2 };
    return order[getTaskStatus(a)] - order[getTaskStatus(b)];
  });

  return <div className="space-y-3">{sortedTasks.map(task => (
    <TaskItem
      key={task.id}
      task={task}
      onToggle={onToggle}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ))}</div>;
}
