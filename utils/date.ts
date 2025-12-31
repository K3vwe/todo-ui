// utils/date.ts
export function formatTaskDate(dateString: string) {
  const date = new Date(dateString);

  return `${date.toLocaleDateString("en-CA")} ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;
}
