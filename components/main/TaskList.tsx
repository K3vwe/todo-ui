import React from "react";
import { Task } from "@/data/mockTasks";
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

  return (
    <div className="space-y-3">
      {tasks.map(task => (
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
