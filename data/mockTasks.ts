export type TaskPriority = "critical" | "high" | "medium" | "low";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;   // YYYY-MM-DD
  dueTime: string;   // HH:mm
  createdAt: string; // ISO timestamp
  startedAt?: string;
  completed: boolean;
};

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Fix production deployment",
    description: "Investigate failed CI pipeline and redeploy hotfix",
    priority: "critical",
    dueDate: "2025-01-02",
    dueTime: "14:00",
    createdAt: "2024-12-30T09:15:00.000Z",
    completed: false,
  },
  {
    id: "2",
    title: "Prepare DevOps portfolio",
    description: "Document CI/CD, Docker, and AWS projects",
    priority: "high",
    dueDate: "2025-01-05",
    dueTime: "18:00",
    createdAt: "2024-12-29T16:40:00.000Z",
    completed: false,
  },
  {
    id: "3",
    title: "Refactor task modal UI",
    description: "Improve accessibility and layout consistency",
    priority: "medium",
    dueDate: "2025-01-07",
    dueTime: "20:00",
    createdAt: "2024-12-28T11:05:00.000Z",
    completed: true,
  },
  {
    id: "4",
    title: "Clean up old branches",
    description: "Delete stale Git branches and update README",
    priority: "low",
    dueDate: "2025-01-10",
    dueTime: "12:00",
    createdAt: "2024-12-27T08:30:00.000Z",
    completed: false,
  },
];
