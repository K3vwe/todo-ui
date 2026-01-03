export type TaskPriority = "critical" | "high" | "medium" | "low";

export type TaskStatus = "pending" | "in-progress" | "complete";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;

  dueDate: string;   // YYYY-MM-DD
  dueTime: string;   // HH:mm

  createdAt: string; // ISO timestamp
  startedAt?: string;
  completedAt?: string;
};
