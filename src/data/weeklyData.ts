export interface DailyMetric {
  day: string;
  hours: number;
  completed: number;
  remaining: number;
  percentage: number;
}

export const weeklyData: DailyMetric[] = [
  { day: "Monday", hours: 4.5, completed: 7, remaining: 3, percentage: 70 },
  { day: "Tuesday", hours: 5.2, completed: 9, remaining: 2, percentage: 82 },
  { day: "Wednesday", hours: 3.8, completed: 6, remaining: 4, percentage: 60 },
  { day: "Thursday", hours: 6.1, completed: 10, remaining: 1, percentage: 91 },
  { day: "Friday", hours: 4.2, completed: 7, remaining: 3, percentage: 70 },
  { day: "Saturday", hours: 7.3, completed: 12, remaining: 0, percentage: 100 },
  { day: "Sunday", hours: 5.5, completed: 8, remaining: 2, percentage: 80 },
];

export const subjectDistribution = [
  { name: "Frontend", value: 35, color: "#3b82f6" },
  { name: "Backend", value: 30, color: "#8b5cf6" },
  { name: "Database", value: 15, color: "#ec4899" },
  { name: "Core Java", value: 12, color: "#10b981" },
  { name: "Interview Prep", value: 8, color: "#f97316" },
];

export const longTermProgress = [
  { label: "10 Days Progress", days: 10, percentage: 42, from: "#3b82f6", to: "#8b5cf6" },
  { label: "15 Days Progress", days: 15, percentage: 58, from: "#8b5cf6", to: "#ec4899" },
  { label: "20 Days Progress", days: 20, percentage: 71, from: "#ec4899", to: "#10b981" },
  { label: "25 Days Progress", days: 25, percentage: 84, from: "#10b981", to: "#14b8a6" },
  { label: "30 Days Progress", days: 30, percentage: 93, from: "#f97316", to: "#fbbf24" },
];
