export interface Category {
  id: string;       // unique identifier (uuid or timestamp)
  icon: string;     // emoji or icon class
  label: string;    // category name
  count: number;    // dynamically computed
}

const categories: Category[] = [
  { id: "", icon: "⭐", label: "Important", count: 0 },
  { id: "", icon: "🗓️", label: "Planned", count: 0 },
  { id: "", icon: "👥", label: "Shared Tasks", count: 0 },
  { id: "", icon: "😄", label: "Personal", count: 0 },
  { id: "", icon: "💼", label: "Work", count: 0 },
  { id: "", icon: "📦", label: "Custom Task", count: 0 },
];

export default categories;
