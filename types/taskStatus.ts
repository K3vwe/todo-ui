import { Task } from "@/types/taskType";

export type TaskStatus = "pending" | "in-progress" | "complete";

export const getStatus = (task: Task): TaskStatus => {
  if (task.completedAt) return "complete";
  if (task.startedAt) return "in-progress";
  return "pending";
};