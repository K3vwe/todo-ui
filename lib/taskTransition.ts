import { Task, TaskStatus } from "@/types/taskType";

const ALLOWED_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  pending: ["in-progress"],
  "in-progress": ["complete"],
  complete: [],
};

export function transitionTask(task: Task, next: TaskStatus): Task {
  if (!ALLOWED_TRANSITIONS[task.status].includes(next)) {
    throw new Error(`Illegal transition: ${task.status} → ${next}`);
  }

  return {
    ...task,
    status: next,
    startedAt:
      next === "in-progress" && !task.startedAt
        ? new Date().toISOString()
        : task.startedAt,
    completedAt:
      next === "complete" && !task.completedAt
        ? new Date().toISOString()
        : task.completedAt,
  };
}
