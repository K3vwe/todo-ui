"use client";

import { Task } from "@/types/taskType";
import SkeletonLoader from "./SkeletonLoader";
import EmptyState from "./EmptyState";
import TaskItem from "./TaskItem";

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

  // Order for display: in_progress → pending → complete
  const order = { in_progress: 0, pending: 1, completed: 2 };

  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by backend-driven status first
    const diff = order[a.status] - order[b.status];
    if (diff !== 0) return diff;

    // Then by recency
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-3">
      {sortedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle} // updates timestamps only
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}