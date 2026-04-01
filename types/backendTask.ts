export type BackendTask = {
  id: string;
  title: string;
  description: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETE";

  due_at: string;
  created_at: string;
  started_at?: string | null;
  completed_at?: string | null;

  user_id: string;
};