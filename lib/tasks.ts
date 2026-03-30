import { Task, CreateTaskInput, UpdateTaskInput } from "@/types/taskType";
import { apiFetch } from "./api";

export const tasksApi = {
  // Get all tasks for current user
  getTasks: async (): Promise<Task[]> => {
    const response = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return response.json();
  },

  // Get single task
  getTask: async (id: string): Promise<Task> => {
    const response = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }
    return response.json();
  },

  // Create new task
  createTask: async (task: CreateTaskInput): Promise<Task> => {
    const response = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/`, {
      method: "POST",
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to create task");
    }
    return response.json();
  },

  // Update task
  updateTask: async (id: string, updates: UpdateTaskInput): Promise<Task> => {
    const response = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to update task");
    }
    return response.json();
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    const response = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to delete task");
    }
  },
};