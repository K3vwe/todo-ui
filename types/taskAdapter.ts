import { Task, TaskPriority, TaskStatus } from "@/types/taskType";
import { BackendTask } from "@/types/backendTask";

const priorityMap: Record<string, TaskPriority> = {
  CRITICAL: "critical",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

const statusMap: Record<string, TaskStatus> = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

export const adaptTaskFromData = (mockdataTask: BackendTask): Task => {
  const dueDateTime = mockdataTask.due_at
    ? mockdataTask.due_at.split("T")
    : [];

  return {
    id: mockdataTask.id,
    title: mockdataTask.title,
    description: mockdataTask.description,

    priority: priorityMap[mockdataTask.priority] ?? "low",
    status: statusMap[mockdataTask.status] ?? "pending",

    createdAt: mockdataTask.created_at,
    startedAt: mockdataTask.started_at || undefined,
    completedAt: mockdataTask.completed_at || undefined,

    dueDate: dueDateTime[0] || "",
    dueTime: dueDateTime[1]?.slice(0, 5) || "",
  };
};