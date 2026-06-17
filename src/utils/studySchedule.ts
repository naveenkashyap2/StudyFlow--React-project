export interface StudyTask {
  id: string;
  label: string;
  icon: string;
  completed: boolean;
}

export const backendTopics: string[] = [
  "Node.js",
  "Spring Boot",
  "Express.js",
  "Next.js",
  "SQL",
  "Core Java",
  "Technical Interview Preparation",
  "HR Preparation",
];

export const frontendTopics: string[] = [
  "React.js",
  "Angular",
  "TypeScript",
  "JavaScript",
  "MongoDB",
  "Core Java",
  "Technical Interview Preparation",
  "HR Preparation",
];

export const allTopics: string[] = [
  "React.js",
  "Angular",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Express.js",
  "Spring Boot",
  "Next.js",
  "SQL",
  "MongoDB",
  "Redis",
  "Core Java",
  "HR Preparation",
  "Technical Interview Preparation",
];

export function isBackendDay(date = new Date()): boolean {
  return date.getDate() % 2 === 0;
}

export function getTodayMode(date = new Date()): "Backend" | "Frontend" {
  return isBackendDay(date) ? "Backend" : "Frontend";
}

export function getTodayTasks(date = new Date()): StudyTask[] {
  const topics = isBackendDay(date) ? backendTopics : frontendTopics;
  const baseId = date.toISOString().split("T")[0];
  return topics.map((label, index) => ({
    id: `${baseId}-${index}`,
    label,
    icon: getTopicIcon(label),
    completed: false,
  }));
}

export function getTopicIcon(topic: string): string {
  const icons: Record<string, string> = {
    "React.js": "⚛️",
    Angular: "🅰️",
    TypeScript: "🔷",
    JavaScript: "💛",
    "Node.js": "🟢",
    "Express.js": "🚂",
    "Spring Boot": "🍃",
    "Next.js": "▲",
    SQL: "🗄️",
    MongoDB: "🍃",
    Redis: "🔴",
    "Core Java": "☕",
    "HR Preparation": "🤝",
    "Technical Interview Preparation": "💻",
  };
  return icons[topic] || "📚";
}

export function getDatabaseForBackendDay(date = new Date()): string {
  const databases = ["SQL", "MongoDB", "Redis"];
  const dayIndex = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  return databases[dayIndex % databases.length];
}
