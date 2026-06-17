export function getTodayKey(date = new Date()): string {
  return formatLocalDateKey(date);
}

export function formatLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDate(date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(date = new Date()): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function getDayName(date = new Date()): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export function getMonthName(date = new Date()): string {
  return date.toLocaleDateString("en-US", { month: "long" });
}
