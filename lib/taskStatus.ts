import { Task } from "@/data/mockTasks";

export type TaskStatus = "pending" | "in-progress" | "complete";

export function getTaskStatus(task: Task): TaskStatus {
  if (task.completed) return "complete";
  if (task.startedAt) return "in-progress";
  return "pending";
}
