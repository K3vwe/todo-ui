// utils/date.ts
export function formatTaskDate(dateString: string) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString(undefined, options);
}
