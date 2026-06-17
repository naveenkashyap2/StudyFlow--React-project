import { motion } from "framer-motion";
import { useStudy } from "../context/StudyContext";

export default function StreakCard() {
  const { streak, longestStreak, totalDaysCompleted } = useStudy();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass relative overflow-hidden rounded-3xl p-6"
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="animate-fire-glow text-4xl">🔥</span>
          <div>
            <p className="text-3xl font-bold text-white">{streak} Days</p>
            <p className="text-sm text-orange-300">Current Streak</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-2xl font-bold text-white">{longestStreak}</p>
            <p className="text-xs text-white/50">Longest Streak</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-2xl font-bold text-white">
              {totalDaysCompleted}
            </p>
            <p className="text-xs text-white/50">Total Days Done</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
