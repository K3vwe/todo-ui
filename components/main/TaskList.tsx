import React from "react";
import { Task } from "./MainWorkspace";
import SkeletonLoader from "./SkeletonLoader";
import EmptyState from "./EmptyState";

type Props = {
  tasks: Task[];
  isLoading: boolean;
};

export default function TaskList({ tasks, isLoading }: Props) {
  if (isLoading) return <SkeletonLoader />;
  if (!isLoading && tasks.length === 0) return <EmptyState />;

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
        >
          {task.title}
        </div>
      ))}
    </div>
  );
}
