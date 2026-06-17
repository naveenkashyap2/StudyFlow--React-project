import { motion } from "framer-motion";
import { useStudy } from "../context/StudyContext";

interface Badge {
  days: number;
  name: string;
  icon: string;
  description: string;
  color: string;
}

const badges: Badge[] = [
  {
    days: 3,
    name: "Beginner",
    icon: "🌱",
    description: "Completed 3 days of study",
    color: "#22c55e",
  },
  {
    days: 7,
    name: "Warrior",
    icon: "⚔️",
    description: "Completed 7 days of study",
    color: "#3b82f6",
  },
  {
    days: 15,
    name: "Discipline Master",
    icon: "🧘",
    description: "Completed 15 days of study",
    color: "#8b5cf6",
  },
  {
    days: 30,
    name: "Full Stack Legend",
    icon: "👑",
    description: "Completed 30 days of study",
    color: "#f59e0b",
  },
];

export default function AchievementCard() {
  const { achievements, totalDaysCompleted } = useStudy();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {badges.map((badge, index) => {
        const unlocked = achievements.includes(badge.name);
        return (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className={`glass relative overflow-hidden rounded-2xl p-5 transition-all ${
              unlocked ? "ring-1" : "opacity-60 grayscale"
            }`}
            style={{ borderColor: unlocked ? `${badge.color}40` : undefined }}
          >
            {unlocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 opacity-10"
                style={{
                  background: `radial-gradient(circle at top right, ${badge.color}, transparent 70%)`,
                }}
              />
            )}
            <div className="relative z-10">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-3xl">{badge.icon}</span>
                {unlocked && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                    UNLOCKED
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white">{badge.name}</h3>
              <p className="text-xs text-white/50">{badge.description}</p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (totalDaysCompleted / badge.days) * 100)}%`,
                  }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: badge.color }}
                />
              </div>
              <p className="mt-1 text-[10px] text-white/40">
                {totalDaysCompleted}/{badge.days} days
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
