export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  priority: "critical" | "high" | "medium" | "low";
};

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Learn Next.js",
    completed: false,
    createdAt: "2025-12-27T09:00:00Z",
    priority: "high",
  },
  {
    id: "2",
    title: "Build Todo App",
    completed: false,
    createdAt: "2025-12-26T10:00:00Z",
    priority: "medium",
  },
  {
    id: "3",
    title: "Fix critical bug in backend",
    completed: false,
    createdAt: "2025-12-25T14:30:00Z",
    priority: "critical",
  },
  {
    id: "4",
    title: "Refactor UI components",
    completed: false,
    createdAt: "2025-12-24T08:15:00Z",
    priority: "low",
  },
];

