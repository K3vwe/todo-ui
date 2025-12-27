import { Task } from "@/data/mockTasks";

export type TaskStatus = "todo" | "in-progress" | "done";

export function getTaskStatus(task: Task): TaskStatus {
  if (task.completed) return "done";
  if (task.startedAt) return "in-progress";
  return "todo";
}
