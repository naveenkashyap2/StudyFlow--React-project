import { useMemo } from "react";
import { allTopics } from "../utils/studySchedule";

export interface ProgressItem {
  topic: string;
  percentage: number;
  hours: number;
  icon: string;
  color: string;
}

const topicColors: Record<string, string> = {
  "React.js": "#3b82f6",
  Angular: "#ef4444",
  JavaScript: "#facc15",
  TypeScript: "#3b82f6",
  "Node.js": "#22c55e",
  "Express.js": "#94a3b8",
  "Spring Boot": "#22c55e",
  "Next.js": "#1e293b",
  SQL: "#f97316",
  MongoDB: "#22c55e",
  Redis: "#ef4444",
  "Core Java": "#f97316",
  "HR Preparation": "#ec4899",
  "Technical Interview Preparation": "#8b5cf6",
};

export function useProgress(studyHours: Record<string, number>): ProgressItem[] {
  return useMemo(() => {
    return allTopics.map((topic) => {
      const hours = studyHours[topic] || 0;
      const target = topic.includes("Preparation") ? 10 : 20;
      const percentage = Math.min(100, Math.round((hours / target) * 100));
      return {
        topic,
        percentage,
        hours,
        icon: getIcon(topic),
        color: topicColors[topic] || "#8b5cf6",
      };
    });
  }, [studyHours]);
}

function getIcon(topic: string): string {
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
