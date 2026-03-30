"use client";

import { Task } from "@/types/taskType";
import SkeletonLoader from "./SkeletonLoader";
import EmptyState from "./EmptyState";
import TaskItem from "./TaskItem";
import { getStatus } from "@/types/taskStatus";

type Props = {
  tasks: Task[];
  isLoading: boolean;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({
  tasks,
  isLoading,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  if (isLoading) return <SkeletonLoader />;
  if (tasks.length === 0) return <EmptyState />;

  const order = { "in-progress": 0, pending: 1, complete: 2 };

  const sortedTasks = [...tasks].sort((a, b) => {
  const statusA = getStatus(a);
  const statusB = getStatus(b);

  // First: by status
  const diff = order[statusA] - order[statusB];
  if (diff !== 0) return diff;

  // Second: by recency
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
});

  return (
    <div className="space-y-3">
      {sortedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}